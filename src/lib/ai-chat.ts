type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const PROJECT_AI_CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-ai-chat`;

export async function streamChat({
  messages,
  systemPrompt,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  systemPrompt?: string;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, systemPrompt }),
    });

    if (!resp.ok) {
      const error = await resp.json();
      if (resp.status === 429) {
        onError?.("Rate limit exceeded. Please wait a moment and try again.");
        return;
      }
      if (resp.status === 402) {
        onError?.("AI service temporarily unavailable.");
        return;
      }
      throw new Error(error.error || "Failed to start chat");
    }

    if (!resp.body) throw new Error("No response body");

    await processStream(resp.body, onDelta);
    onDone();
  } catch (error) {
    console.error("Chat error:", error);
    onError?.(error instanceof Error ? error.message : "Chat failed");
    onDone();
  }
}

/**
 * RAG-enabled chat for project discussions
 * Uses course knowledge + project-specific context
 */
export async function streamProjectChat({
  messages,
  projectGroupId,
  topicTitle,
  enableRAG = true,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  projectGroupId?: string;
  topicTitle?: string;
  enableRAG?: boolean;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    const resp = await fetch(PROJECT_AI_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ 
        messages, 
        projectGroupId,
        topicTitle,
        enableRAG 
      }),
    });

    if (!resp.ok) {
      const error = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        onError?.("Rate limit exceeded. Please wait a moment and try again.");
        return;
      }
      if (resp.status === 402) {
        onError?.("AI service temporarily unavailable. Please try again later.");
        return;
      }
      throw new Error(error.error || "Failed to start chat");
    }

    if (!resp.body) throw new Error("No response body");

    await processStream(resp.body, onDelta);
    onDone();
  } catch (error) {
    console.error("Project chat error:", error);
    onError?.(error instanceof Error ? error.message : "Chat failed");
    onDone();
  }
}

/**
 * Process SSE stream and extract content deltas
 */
async function processStream(
  body: ReadableStream<Uint8Array>,
  onDelta: (deltaText: string) => void
): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }
}
