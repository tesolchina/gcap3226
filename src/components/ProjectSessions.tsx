import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, Calendar, GraduationCap, Mic, MicOff, Send, Bot, User, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Session {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string | null;
  created_by: string | null;
  created_at: string;
}

interface SessionMessage {
  id: string;
  content: string;
  is_ai: boolean;
  is_teacher: boolean;
  is_voice_transcription: boolean;
  created_at: string;
  member_id: string | null;
}

interface ProjectSessionsProps {
  projectGroupId: string;
  topicSlug: string;
  memberId: string | null;
  isTeacher: boolean;
}

const ProjectSessions = ({ projectGroupId, topicSlug, memberId, isTeacher }: ProjectSessionsProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [newSessionDesc, setNewSessionDesc] = useState("");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch sessions
  useEffect(() => {
    if (!projectGroupId) return;

    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from("project_sessions" as any)
        .select("*")
        .eq("project_group_id", projectGroupId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSessions(data as unknown as Session[]);
      }
    };

    fetchSessions();
  }, [projectGroupId]);

  // Fetch messages for active session
  useEffect(() => {
    if (!activeSession) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("session_messages" as any)
        .select("*")
        .eq("session_id", activeSession.id)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data as unknown as SessionMessage[]);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`session_messages_${activeSession.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "session_messages",
          filter: `session_id=eq.${activeSession.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as SessionMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeSession]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createSession = async () => {
    if (!newSessionTitle.trim()) return;

    setIsCreatingSession(true);
    try {
      const { data, error } = await supabase
        .from("project_sessions" as any)
        .insert({
          project_group_id: projectGroupId,
          title: newSessionTitle.trim(),
          description: newSessionDesc.trim() || null,
          created_by: memberId,
        })
        .select()
        .single();

      if (error) throw error;

      setSessions((prev) => [data as unknown as Session, ...prev]);
      setNewSessionTitle("");
      setNewSessionDesc("");
      toast({ title: "Session Created", description: "New discussion session is ready." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsCreatingSession(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({ title: "Microphone Error", description: "Please allow microphone access.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(",")[1];
        
        const { data, error } = await supabase.functions.invoke("voice-transcribe", {
          body: { audio: base64Audio },
        });

        if (error) throw error;

        if (data?.text) {
          setNewMessage((prev) => prev + (prev ? " " : "") + data.text);
          toast({ title: "Transcription Complete" });
        }
        setIsTranscribing(false);
      };
    } catch (error: any) {
      toast({ title: "Transcription Failed", description: error.message, variant: "destructive" });
      setIsTranscribing(false);
    }
  };

  const sendMessage = async (isVoice: boolean = false) => {
    if (!newMessage.trim() || !activeSession || !memberId) return;

    const content = newMessage.trim();
    setNewMessage("");
    setIsSending(true);

    try {
      const { error } = await supabase.from("session_messages" as any).insert({
        session_id: activeSession.id,
        member_id: memberId,
        content,
        is_ai: false,
        is_teacher: isTeacher,
        is_voice_transcription: isVoice,
      });

      if (error) throw error;

      // Also add to knowledge base
      await supabase.from("project_knowledge" as any).insert({
        project_group_id: projectGroupId,
        source_type: "session_notes",
        source_id: activeSession.id,
        title: `Session: ${activeSession.title}`,
        content,
        metadata: { session_id: activeSession.id, is_teacher: isTeacher },
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setNewMessage(content);
    } finally {
      setIsSending(false);
    }
  };

  if (!memberId) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        Please join the group first to access discussion sessions.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Session List / Create */}
      {!activeSession && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Discussion Sessions</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Discussion Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Session title (e.g., Week 5 Meeting)"
                    value={newSessionTitle}
                    onChange={(e) => setNewSessionTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Description or agenda (optional)"
                    value={newSessionDesc}
                    onChange={(e) => setNewSessionDesc(e.target.value)}
                  />
                  <Button onClick={createSession} disabled={isCreatingSession || !newSessionTitle.trim()} className="w-full">
                    {isCreatingSession ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {sessions.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No discussion sessions yet.</p>
              <p className="text-sm">Create one to start collaborating!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveSession(session)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      {session.description && (
                        <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {session.scheduled_at ? format(new Date(session.scheduled_at), "MMM d") : format(new Date(session.created_at), "MMM d")}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Active Session Chat - Mobile Optimized */}
      {activeSession && (
        <Card className="flex flex-col h-[400px] sm:h-[500px]">
          {/* Header - responsive padding */}
          <div className="p-3 sm:p-4 border-b flex items-center justify-between gap-2">
            <div className="flex items-center min-w-0">
              <Button variant="ghost" size="sm" onClick={() => setActiveSession(null)} className="mr-1 sm:mr-2 px-2">
                ←
              </Button>
              <span className="font-semibold text-sm sm:text-base truncate">{activeSession.title}</span>
            </div>
          </div>

          {/* Messages - adjusted padding for mobile */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-muted-foreground py-6 sm:py-8 text-sm">
                No messages yet. Start the discussion!
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.is_ai ? "bg-accent/50 -mx-3 sm:-mx-4 px-3 sm:px-4 py-2 sm:py-3" : ""}`}>
                {/* Avatar - smaller on mobile */}
                <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.is_ai ? "bg-primary text-primary-foreground" : msg.is_teacher ? "bg-amber-500 text-white" : "bg-muted"
                }`}>
                  {msg.is_ai ? <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : msg.is_teacher ? <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 sm:gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-xs sm:text-sm">
                      {msg.is_ai ? "AI" : msg.is_teacher ? "Teacher" : "Student"}
                    </span>
                    {msg.is_voice_transcription && <Badge variant="outline" className="text-[10px] sm:text-xs px-1">🎤</Badge>}
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      {format(new Date(msg.created_at), "h:mm a")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area - mobile optimized */}
          <div className="p-3 sm:p-4 border-t space-y-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[50px] sm:min-h-[60px] resize-none text-sm"
              disabled={isTranscribing}
            />
            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
              >
                {isTranscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={() => sendMessage(false)} disabled={!newMessage.trim() || isSending} className="flex-1 text-sm">
                {isSending ? <Loader2 className="h-4 w-4 mr-1 sm:mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-1 sm:mr-2" />}
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProjectSessions;
