import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Sparkles, User, Wand2 } from "lucide-react";
import { toast } from "sonner";

type Msg = {
  id: string;
  scope: "global" | "topic";
  topic_slug: string | null;
  role: "user" | "assistant";
  content: string;
  author_name: string | null;
  created_at: string;
};

const NAME_KEY = "fall2026_tutor_author_name";
const MAX_LENGTH = 8000;

interface Props {
  scope: "global" | "topic";
  topicSlug?: string;
  title?: string;
  description?: string;
}

export function Fall2026Chat({ scope, topicSlug, title, description }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [authorName, setAuthorName] = useState<string>(
    () => localStorage.getItem(NAME_KEY) || "",
  );
  const [draftName, setDraftName] = useState(authorName);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      let q = supabase
        .from("fall2026_chat_messages")
        .select("*")
        .eq("scope", scope)
        .order("created_at", { ascending: true })
        .limit(200);
      if (scope === "topic" && topicSlug) q = q.eq("topic_slug", topicSlug);
      const { data, error } = await q;
      if (!active) return;
      if (error) {
        toast.error("Failed to load messages");
        return;
      }
      setMessages((data || []) as Msg[]);
    })();

    const channel = supabase
      .channel(`fall2026_chat_${scope}_${topicSlug || "global"}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "fall2026_chat_messages" },
        (payload) => {
          const m = payload.new as Msg;
          if (m.scope !== scope) return;
          if (scope === "topic" && m.topic_slug !== topicSlug) return;
          setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [scope, topicSlug]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  const saveName = () => {
    const trimmed = draftName.trim().slice(0, 40);
    if (!trimmed) {
      toast.error("Please enter a name");
      return;
    }
    localStorage.setItem(NAME_KEY, trimmed);
    setAuthorName(trimmed);
  };

  const postMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (text.length > MAX_LENGTH) {
      toast.error("Message too long");
      return;
    }
    if (!authorName) {
      toast.error("Please set a name first");
      return;
    }

    setSending(true);
    const { error: insertErr } = await supabase
      .from("fall2026_chat_messages")
      .insert({
        scope,
        topic_slug: scope === "topic" ? topicSlug ?? null : null,
        role: "user",
        author_name: authorName,
        content: text,
      });
    setSending(false);
    if (insertErr) {
      toast.error(insertErr.message);
      return;
    }
    setInput("");
  };

  const requestAI = async () => {
    if (sending) return;
    if (messages.length === 0) {
      toast.error("Post a message first");
      return;
    }
    setSending(true);
    const history = messages
      .slice(-20)
      .map((m) => ({
        role: m.role,
        content:
          m.role === "user" && m.author_name && !m.content.startsWith(m.author_name)
            ? `${m.author_name}: ${m.content}`
            : m.content,
      }));

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fall2026-tutor`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history, scope, topic_slug: topicSlug }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit hit — please wait a moment.");
        setSending(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted.");
        setSending(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        toast.error("AI request failed");
        setSending(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const j = line.slice(6).trim();
          if (j === "[DONE]") continue;
          try {
            const p = JSON.parse(j);
            const c = p.choices?.[0]?.delta?.content;
            if (c) {
              acc += c;
              setStreamingText(acc);
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }

      if (acc) {
        await supabase.from("fall2026_chat_messages").insert({
          scope,
          topic_slug: scope === "topic" ? topicSlug ?? null : null,
          role: "assistant",
          author_name: "AI Tutor",
          content: acc,
        });
      }
      setStreamingText("");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Sparkles className="h-4 w-4 text-primary" />
          {title || (scope === "global" ? "Course AI Tutor" : "Topic AI Tutor")}
        </CardTitle>
        <CardDescription>
          {description ||
            "Ask questions about the course material, methods, or your project. Conversations are public — use a nickname and avoid sensitive info."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!authorName ? (
          <div className="flex gap-2">
            <Input
              placeholder="Pick a display name (e.g. 'Jamie K.')"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              maxLength={40}
              className="text-base"
            />
            <Button onClick={saveName}>Save</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Posting as <Badge variant="secondary">{authorName}</Badge></span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem(NAME_KEY);
                setAuthorName("");
              }}
            >
              Change name
            </Button>
          </div>
        )}

        <div className="border rounded-lg p-3 max-h-[400px] overflow-y-auto space-y-3 bg-muted/30">
          {messages.length === 0 && !streamingText && (
            <p className="text-sm text-muted-foreground text-center py-8">
              <MessageSquare className="h-5 w-5 mx-auto mb-2 opacity-50" />
              No messages yet — start the conversation.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2 ${m.role === "assistant" ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${
                  m.role === "assistant" ? "bg-primary/15" : "bg-secondary"
                }`}
              >
                {m.role === "assistant" ? (
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "assistant" ? "bg-card border" : "bg-primary text-primary-foreground"
                }`}
              >
                {m.author_name && (
                  <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                    {m.author_name}
                  </div>
                )}
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {streamingText && (
            <div className="flex gap-2">
              <div className="shrink-0 h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-card border">
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1">
                  <ReactMarkdown>{streamingText}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder={
              authorName
                ? "Leave a message for the team…"
                : "Set a display name above to start."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                postMessage();
              }
            }}
            disabled={!authorName || sending}
            maxLength={MAX_LENGTH}
            className="text-base min-h-[60px]"
          />
          <div className="flex flex-wrap gap-2 justify-between">
            <p className="text-xs text-muted-foreground self-center">
              Posting won't trigger the AI. Click "Ask AI" when you want a response.
            </p>
            <div className="flex gap-2 ml-auto">
              <Button
                onClick={postMessage}
                disabled={!authorName || sending || !input.trim()}
                variant="secondary"
              >
                <Send className="h-4 w-4" />
                Post
              </Button>
              <Button
                onClick={requestAI}
                disabled={sending || messages.length === 0}
                title="Ask the AI tutor to respond to the conversation so far"
              >
                <Wand2 className="h-4 w-4" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
