import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;
const MAX_SYSTEM_PROMPT_LENGTH = 5000;

// Helper function to search the web using Perplexity
async function searchWeb(query: string): Promise<string> {
  const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!apiKey) {
    return "Web search is not available.";
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a research assistant. Provide accurate, up-to-date information. Be concise." },
          { role: "user", content: query.substring(0, 2000) }
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Perplexity error:", data);
      return "Web search temporarily unavailable.";
    }

    const content = data.choices?.[0]?.message?.content || "";
    const citations = data.citations || [];
    
    if (citations.length > 0) {
      return `${content}\n\nSources:\n${citations.map((c: string, i: number) => `${i + 1}. ${c}`).join("\n")}`;
    }
    return content;
  } catch (error) {
    console.error("Search error:", error);
    return "Web search failed.";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Reject oversized payloads (100KB limit)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 100_000) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages, systemPrompt, enableWebSearch } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: `Too many messages (max ${MAX_MESSAGES})` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return new Response(JSON.stringify({ error: "Each message must have role and content strings" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} chars)` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (systemPrompt && (typeof systemPrompt !== "string" || systemPrompt.length > MAX_SYSTEM_PROMPT_LENGTH)) {
      return new Response(JSON.stringify({ error: "Invalid or too long system prompt" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Check if user is asking for web search
    const lastMessage = messages[messages.length - 1]?.content || "";
    const searchPatterns = [
      /search\s+(for|the\s+web|online|internet)/i,
      /look\s+up/i,
      /find\s+(information|info|out)\s+(about|on)/i,
      /what\s+(is|are)\s+the\s+latest/i,
      /current\s+(news|information|data)/i,
      /recent\s+(news|developments|updates)/i,
    ];
    
    const shouldSearch = enableWebSearch || searchPatterns.some(p => p.test(lastMessage));
    
    let enhancedSystemPrompt = systemPrompt || "You are a helpful AI assistant for an educational course. Keep answers clear and concise.";
    
    if (shouldSearch) {
      console.log("Web search triggered for:", lastMessage.substring(0, 100));
      const searchResult = await searchWeb(lastMessage);
      enhancedSystemPrompt += `\n\nHere is relevant information from a web search:\n${searchResult}\n\nUse this information to help answer the user's question. Cite sources when available.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: enhancedSystemPrompt
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
