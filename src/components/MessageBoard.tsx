import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  author_name: string;
  content: string;
  is_teacher: boolean;
  created_at: string;
}

interface MessageBoardProps {
  teamId: number;
  tabName: string;
}

export function MessageBoard({ teamId, tabName }: MessageBoardProps) {
  const { user, isTeacher, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMessages();
    
    const channel = supabase
      .channel(`messages-${teamId}-${tabName}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `team_id=eq.${teamId}`,
        },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [teamId, tabName]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("team_id", teamId)
      .eq("tab_name", tabName)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load messages");
    } else {
      setMessages(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to post messages");
      return;
    }
    
    if (!authorName.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const { error } = await supabase.from("messages").insert({
      team_id: teamId,
      tab_name: tabName,
      author_name: authorName,
      content,
      is_teacher: isTeacher,
      user_id: user.id,
    });

    if (error) {
      toast.error("Failed to post message");
    } else {
      toast.success("Message posted successfully");
      setContent("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
        {!user ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">View-only mode. Teachers can log in at /login to post.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="flex-1"
              />
              {isTeacher && (
                <span className="text-xs bg-primary text-white px-3 py-1.5 rounded-full">
                  Teacher
                </span>
              )}
            </div>
            <Textarea
              placeholder="Write your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Post Message
            </Button>
          </form>
        )}
      </Card>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`p-4 transition-all hover:shadow-lg ${
              message.is_teacher ? "border-primary bg-accent/30" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${message.is_teacher ? "bg-primary" : "bg-secondary"}`}>
                <User className={`h-4 w-4 ${message.is_teacher ? "text-white" : "text-primary"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{message.author_name}</span>
                  {message.is_teacher && (
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                      Teacher
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}