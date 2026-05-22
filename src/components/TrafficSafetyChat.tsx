import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Sparkles, Trash2, User } from "lucide-react";
import { toast } from "sonner";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  author_name: string | null;
  created_at: string;
};

const NAME_KEY = "traffic_safety_author_name";

export function TrafficSafetyChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [authorName, setAuthorName] = useState<string>(
    () => localStorage.getItem(NAME_KEY) || "",
  );
  const [draftName, setDraftName] = useState(authorName);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Initial load + realtime
  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("traffic_safety_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(200);
      if (!active) return;
      if (error) {
        toast.error("Failed to load messages");
        return;
      }
      setMessages((data || []) as Msg[]);
    })();

    const channel = supabase
      .channel("traffic_safety_messages_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "traffic_safety_messages" },
        (payload) => {
          setMessages((prev) => {
            const m = payload.new as Msg;
            if (prev.some((x) => x.id === m.id)) return prev;
            return [...prev, m];
          });
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

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
    toast.success(`Hi ${trimmed} — you can now post.`);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (!authorName) {
      toast.error("Set your name first");
      return;
    }

    setSending(true);
    setStreamingText("");

    // Insert user message
    const { data: inserted, error: insErr } = await supabase
      .from("traffic_safety_messages")
      .insert({ role: "user", content: text, author_name: authorName })
      .select()
      .single();

    if (insErr) {
      toast.error("Failed to send message");
      setSending(false);
      return;
    }

    setInput("");

    // Build conversation context for AI (prefix author names)
    const baseMessages = [...messages, inserted as Msg];
    const apiMessages = baseMessages.map((m) => ({
      role: m.role,
      content:
        m.role === "user" && m.author_name
          ? `[${m.author_name}]: ${m.content}`
          : m.content,
    }));

    // Stream the AI reply
    let assistantSoFar = "";
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/traffic-safety-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit — try again shortly.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("AI request failed");
        setSending(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistantSoFar += delta;
              setStreamingText(assistantSoFar);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Persist assistant message
      if (assistantSoFar.trim()) {
        const { error: aErr } = await supabase
          .from("traffic_safety_messages")
          .insert({
            role: "assistant",
            content: assistantSoFar.slice(0, 10000),
            author_name: "AI",
          });
        if (aErr) toast.error("Could not save AI reply");
      }
    } catch (e) {
      console.error(e);
      toast.error("Streaming failed");
    } finally {
      setStreamingText("");
      setSending(false);
    }
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" /> Project Discussion
          <Badge variant="secondary" className="ml-1">
            shared · AI assisted
          </Badge>
        </CardTitle>
        <CardDescription>
          Threaded conversation between Simon, collaborators, and an AI research
          assistant. All posts persist and are visible to anyone with the page
          password.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Name picker */}
        {!authorName ? (
          <div className="flex flex-col sm:flex-row gap-2 p-3 rounded-md bg-muted/40">
            <Input
              placeholder="Your name (e.g. Simon)"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              className="flex-1"
            />
            <Button onClick={saveName}>Join discussion</Button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <span>
              Posting as <strong>{authorName}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => {
                localStorage.removeItem(NAME_KEY);
                setAuthorName("");
                setDraftName("");
              }}
            >
              Change name
            </Button>
          </div>
        )}

        {/* Messages */}
        <div className="border rounded-md bg-background max-h-[480px] overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && !streamingText && (
            <div className="text-sm text-muted-foreground text-center py-8">
              No messages yet. Start the discussion below — the AI assistant
              already knows the project context.
            </div>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}

          {streamingText && (
            <MessageBubble
              msg={{
                id: "streaming",
                role: "assistant",
                content: streamingText,
                author_name: "AI",
                created_at: new Date().toISOString(),
              }}
              streaming
            />
          )}

          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="space-y-2">
          <Textarea
            placeholder={
              authorName
                ? "Ask a question, propose an analysis, or reply to a colleague…"
                : "Set your name above to post."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                send();
              }
            }}
            disabled={!authorName || sending}
            rows={3}
            className="resize-y text-base sm:text-sm"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>⌘/Ctrl + Enter to send</span>
            <Button onClick={send} disabled={!authorName || sending || !input.trim()}>
              <Send className="h-4 w-4 mr-1" />
              {sending ? "Thinking…" : "Send"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MessageBubble({ msg, streaming }: { msg: Msg; streaming?: boolean }) {
  const isAI = msg.role === "assistant";
  return (
    <div className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
      <div
        className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
          isAI
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {isAI ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div
        className={`flex-1 min-w-0 max-w-[85%] ${isAI ? "" : "flex flex-col items-end"}`}
      >
        <div className="text-[11px] text-muted-foreground mb-0.5 px-1">
          {isAI ? "AI assistant" : msg.author_name || "Anonymous"} ·{" "}
          {new Date(msg.created_at).toLocaleString()}
        </div>
        <div
          className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
            isAI
              ? "bg-muted/60"
              : "bg-primary/10 text-foreground"
          }`}
        >
          {isAI ? (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2">
              <ReactMarkdown>{msg.content + (streaming ? " ▍" : "")}</ReactMarkdown>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{msg.content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
