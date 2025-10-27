import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare, Send, ChevronDown, ChevronUp, Sparkles, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ReactMarkdown from "react-markdown";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  student_name: string;
  main_issue: string;
  created_at: string;
  is_visible: boolean;
}

interface SessionMessage {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface AIConsultationCornerProps {
  teamId: number;
  tabName: string;
  teamName: string;
}

export function AIConsultationCorner({ teamId, tabName, teamName }: AIConsultationCornerProps) {
  const [studentName, setStudentName] = useState("");
  const [mainIssue, setMainIssue] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [sessionMessages, setSessionMessages] = useState<Record<string, SessionMessage[]>>({});
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are an AI teaching assistant for GCAP 3056 - "Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong". 

Your role is to help students with their ${teamName} by:
1. Guiding them through data analysis and policy research
2. Providing feedback on their methodology and approach
3. Suggesting resources and relevant case studies
4. Helping them understand data governance concepts
5. Encouraging critical thinking about Hong Kong's public policy challenges

Be supportive, pedagogical, and ask probing questions to help students think deeply about their projects. Keep responses concise and focused on actionable guidance. Reference relevant UN SDGs and Hong Kong context when appropriate.`;

  useEffect(() => {
    fetchSessions();
    
    const channel = supabase
      .channel(`chat-sessions-${teamId}-${tabName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions',
          filter: `team_id=eq.${teamId}`,
        },
        () => fetchSessions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [teamId, tabName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("team_id", teamId)
      .eq("tab_name", tabName)
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSessions(data);
    }
  };

  const startNewConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName.trim() || !mainIssue.trim()) {
      toast.error("Please provide your name and main issue");
      return;
    }

    setIsLoading(true);

    const { data: session, error } = await supabase
      .from("chat_sessions")
      .insert({
        team_id: teamId,
        tab_name: tabName,
        student_name: studentName,
        main_issue: mainIssue,
        additional_details: additionalDetails,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to start consultation");
      setIsLoading(false);
      return;
    }

    setCurrentSessionId(session.id);
    
    const initialUserMessage = `Main Issue: ${mainIssue}${additionalDetails ? `\n\nAdditional Details: ${additionalDetails}` : ''}`;
    
    const { error: msgError } = await supabase
      .from("chat_messages")
      .insert({
        session_id: session.id,
        role: 'user',
        content: initialUserMessage,
      });

    if (msgError) {
      toast.error("Failed to save message");
      setIsLoading(false);
      return;
    }

    setMessages([{ role: 'user', content: initialUserMessage }]);
    setShowChat(true);
    
    await getAIResponse([{ role: 'user', content: initialUserMessage }], session.id);
    setIsLoading(false);
  };

  const getAIResponse = async (messageHistory: Message[], sessionId: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: messageHistory,
          sessionId,
          teamName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to get AI response');
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessage = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = aiMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              // Incomplete JSON, continue
            }
          }
        }
      }

      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: 'assistant',
        content: aiMessage,
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get AI response');
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !currentSessionId) return;

    const newMessage: Message = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage("");

    await supabase.from("chat_messages").insert({
      session_id: currentSessionId,
      role: 'user',
      content: inputMessage,
    });

    await getAIResponse(updatedMessages, currentSessionId);
  };

  const toggleSession = async (sessionId: string) => {
    const newExpandedSessions = new Set(expandedSessions);
    
    if (newExpandedSessions.has(sessionId)) {
      newExpandedSessions.delete(sessionId);
    } else {
      newExpandedSessions.add(sessionId);
      if (!sessionMessages[sessionId]) {
        await loadSessionMessages(sessionId);
      }
    }
    
    setExpandedSessions(newExpandedSessions);
  };

  const loadSessionMessages = async (sessionId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setSessionMessages(prev => ({ ...prev, [sessionId]: data }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">AI Consultation Corner</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSystemPrompt(!showSystemPrompt)}
            className="flex items-center gap-2"
          >
            <Info className="h-4 w-4" />
            {showSystemPrompt ? "Hide" : "Show"} System Prompt
          </Button>
        </div>

        {/* System Prompt Display */}
        {showSystemPrompt && (
          <Card className="p-4 mb-4 bg-muted/50">
            <h4 className="font-semibold mb-2 text-sm">AI System Prompt:</h4>
            <div className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
              {systemPrompt}
            </div>
          </Card>
        )}
        
        {!showChat ? (
          <form onSubmit={startNewConsultation} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Name</label>
              <Input
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Main Issue or Concern</label>
              <Input
                placeholder="What do you need help with?"
                value={mainIssue}
                onChange={(e) => setMainIssue(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Additional Details (Optional)</label>
              <Textarea
                placeholder="Provide more context..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={3}
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Starting..." : "Start AI Consultation"}
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-4 max-h-[400px] overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary/10 ml-8'
                      : 'bg-secondary/50 mr-8'
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 text-primary">
                    {msg.role === 'user' ? studentName : 'AI Assistant'}
                  </div>
                  <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <Button
              variant="outline"
              onClick={() => {
                setShowChat(false);
                setCurrentSessionId(null);
                setMessages([]);
                setStudentName("");
                setMainIssue("");
                setAdditionalDetails("");
              }}
              className="w-full"
            >
              Start New Consultation
            </Button>
          </div>
        )}
      </Card>

      {/* Previous Sessions with Full Chat History */}
      {sessions.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Previous Consultations</h4>
          <div className="space-y-2">
            {sessions.map((session) => (
              <Collapsible key={session.id}>
                <CollapsibleTrigger
                  onClick={() => toggleSession(session.id)}
                  className="w-full"
                >
                  <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition">
                    <div className="text-left">
                      <div className="font-medium">{session.student_name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {session.main_issue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.created_at).toLocaleString()}
                      </div>
                    </div>
                    {expandedSessions.has(session.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-2 p-3 bg-muted/30 rounded max-h-[400px] overflow-y-auto">
                    {sessionMessages[session.id]?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded ${
                          msg.role === 'user'
                            ? 'bg-primary/10 ml-4'
                            : 'bg-secondary/50 mr-4'
                        }`}
                      >
                        <div className="text-xs font-semibold mb-1 text-primary">
                          {msg.role === 'user' ? session.student_name : 'AI Assistant'}
                        </div>
                        <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}