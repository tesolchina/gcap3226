import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { streamChat } from "@/lib/ai-chat";
import { Send, Bot, User, GraduationCap, Loader2 } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  is_ai: boolean;
  is_teacher: boolean;
  created_at: string;
  member?: {
    display_name: string | null;
    student_id_last4: string;
  } | null;
}

interface ProjectMessageBoardProps {
  projectGroupId: string;
  topicSlug: string;
}

const ProjectMessageBoard = ({ projectGroupId, topicSlug }: ProjectMessageBoardProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingAI, setIsSendingAI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check for existing registration in localStorage
  useEffect(() => {
    const storedMemberId = localStorage.getItem(`project_member_${topicSlug}`);
    const storedStudentId = localStorage.getItem(`project_student_id_${topicSlug}`);
    const storedIsTeacher = localStorage.getItem(`project_is_teacher_${topicSlug}`);
    const storedDisplayName = localStorage.getItem(`project_display_name_${topicSlug}`);
    if (storedMemberId && storedStudentId) {
      setMemberId(storedMemberId);
      setStudentId(storedStudentId);
      setIsTeacher(storedIsTeacher === "true");
      setDisplayName(storedDisplayName || null);
      setIsRegistered(true);
    }
  }, [topicSlug]);

  // Fetch messages
  useEffect(() => {
    if (!projectGroupId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("project_messages")
        .select(
          `
          id,
          content,
          is_ai,
          is_teacher,
          created_at,
          member_id
        `
        )
        .eq("project_group_id", projectGroupId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      // Fetch member info for each message
      const messagesWithMembers = await Promise.all(
        (data || []).map(async (msg) => {
          if (msg.member_id) {
            const { data: memberData } = await supabase
              .from("project_members")
              .select("display_name, student_id_last4")
              .eq("id", msg.member_id)
              .single();
            return { ...msg, member: memberData };
          }
          return { ...msg, member: null };
        })
      );

      setMessages(messagesWithMembers);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`project_messages_${projectGroupId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "project_messages",
          filter: `project_group_id=eq.${projectGroupId}`,
        },
        async (payload) => {
          const newMsg = payload.new as any;
          let member = null;
          if (newMsg.member_id) {
            const { data: memberData } = await supabase
              .from("project_members")
              .select("display_name, student_id_last4")
              .eq("id", newMsg.member_id)
              .single();
            member = memberData;
          }
          setMessages((prev) => [...prev, { ...newMsg, member }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectGroupId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [isTeacher, setIsTeacher] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const handleRegister = async () => {
    if (studentId.length !== 4 || !/^\d{4}$/.test(studentId)) {
      toast({
        title: "Invalid Student ID",
        description: "Please enter the last 4 digits of your student ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // First check for global teachers (project_group_id is null)
      const { data: globalMember } = await supabase
        .from("project_members")
        .select("id, display_name")
        .is("project_group_id", null)
        .eq("student_id_last4", studentId)
        .single();

      if (globalMember) {
        // This is a teacher - they can participate in any group
        setMemberId(globalMember.id);
        setDisplayName(globalMember.display_name);
        setIsTeacher(true);
        localStorage.setItem(`project_member_${topicSlug}`, globalMember.id);
        localStorage.setItem(`project_student_id_${topicSlug}`, studentId);
        localStorage.setItem(`project_is_teacher_${topicSlug}`, "true");
        localStorage.setItem(`project_display_name_${topicSlug}`, globalMember.display_name || "");
        setIsRegistered(true);
        toast({ title: `Welcome, ${globalMember.display_name}!`, description: "You're logged in as a teacher" });
        return;
      }

      // Check if already registered as student in this group
      const { data: existingMember } = await supabase
        .from("project_members")
        .select("id, display_name")
        .eq("project_group_id", projectGroupId)
        .eq("student_id_last4", studentId)
        .single();

      if (existingMember) {
        setMemberId(existingMember.id);
        setDisplayName(existingMember.display_name);
        localStorage.setItem(`project_member_${topicSlug}`, existingMember.id);
        localStorage.setItem(`project_student_id_${topicSlug}`, studentId);
        localStorage.setItem(`project_display_name_${topicSlug}`, existingMember.display_name || "");
        setIsRegistered(true);
        toast({ title: "Welcome back!", description: "You're now connected to the group chat" });
      } else {
        // Create new member
        const { data: newMember, error } = await supabase
          .from("project_members")
          .insert({
            project_group_id: projectGroupId,
            student_id_last4: studentId,
          })
          .select("id")
          .single();

        if (error) throw error;

        setMemberId(newMember.id);
        localStorage.setItem(`project_member_${topicSlug}`, newMember.id);
        localStorage.setItem(`project_student_id_${topicSlug}`, studentId);
        setIsRegistered(true);
        toast({ title: "Registered!", description: "You can now participate in the group chat" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (triggerAI: boolean = true) => {
    if (!newMessage.trim() || !memberId) return;

    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      const { error } = await supabase.from("project_messages").insert({
        project_group_id: projectGroupId,
        member_id: memberId,
        content: messageContent,
        is_ai: false,
        is_teacher: isTeacher,
      });

      if (error) throw error;

      // Trigger AI response (previously disabled for teachers)
      if (triggerAI) {
        setIsSendingAI(true);

        let aiResponse = "";
        try {
          const recentMessages = messages.slice(-10).map((m): { role: "assistant" | "user"; content: string } => ({
            role: m.is_ai ? "assistant" : "user",
            content: m.content,
          }));

          await streamChat({
            messages: [...recentMessages, { role: "user" as const, content: messageContent }],
            systemPrompt: `You are a helpful AI assistant for a university group project about public policy in Hong Kong. The current project topic is: ${topicSlug.replace(
              /-/g,
              " "
            )}. Help students with research questions, data analysis, report writing, and project planning. Be concise and educational.`,
            onDelta: (delta) => {
              aiResponse += delta;
            },
            onDone: () => {
              // handled below (we await insert after stream finishes)
            },
            onError: (err) => {
              throw new Error(err);
            },
          });

          if (aiResponse.trim()) {
            const { error: insertAiError } = await supabase.from("project_messages").insert({
              project_group_id: projectGroupId,
              member_id: null,
              content: aiResponse,
              is_ai: true,
              is_teacher: false,
            });

            if (insertAiError) throw insertAiError;
          }
        } catch (aiError: any) {
          console.error("AI error:", aiError);
          toast({
            title: "AI Error",
            description: aiError?.message || "Failed to get AI response. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsSendingAI(false);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      setNewMessage(messageContent);
    }
  };

  if (!isRegistered) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Join Group Chat</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the last 4 digits of your student ID to join the discussion.
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., 1234"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value.replace(/\D/g, "").slice(0, 4))}
            maxLength={4}
            className="w-32"
          />
          <Button onClick={handleRegister} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Group Discussion</h3>
          <div className="flex items-center gap-2">
            {isTeacher && <Badge className="bg-amber-500">Teacher</Badge>}
            <Badge variant="outline">{displayName || `ID: ***${studentId}`}</Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.is_ai ? "bg-accent/50 -mx-4 px-4 py-3" : ""}`}>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.is_ai
                  ? "bg-primary text-primary-foreground"
                  : msg.is_teacher
                  ? "bg-amber-500 text-white"
                  : "bg-muted"
              }`}
            >
              {msg.is_ai ? (
                <Bot className="h-4 w-4" />
              ) : msg.is_teacher ? (
                <GraduationCap className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-medium text-sm">
                  {msg.is_ai
                    ? "AI Assistant"
                    : msg.is_teacher
                    ? msg.member?.display_name || "Teacher"
                    : msg.member?.display_name || `Student ***${msg.member?.student_id_last4}`}
                </span>
                <span className="text-xs text-muted-foreground">{format(new Date(msg.created_at), "MMM d, h:mm a")}</span>
              </div>
              {msg.is_ai ? (
                <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button onClick={() => handleSendMessage()} disabled={!newMessage.trim() || isSendingAI} className="flex-1">
            {isSendingAI ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Send (AI will respond)
          </Button>
          <Button onClick={() => handleSendMessage(false)} disabled={!newMessage.trim() || isSendingAI} variant="outline">
            Send Only
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectMessageBoard;

