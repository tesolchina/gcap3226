// Fall 2026 AI tutor — streaming chat via Lovable AI Gateway.
// Used by both the global course tutor and per-topic discussions.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_MESSAGES = 60;
const MAX_LENGTH = 8000;

const BASE_PROMPT = `You are the AI tutor for GCAP 3226 (Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong), Fall 2026 cohort.

Your role:
- Help students learn participatory policy analysis through data.
- Encourage critical thinking about Hong Kong public-policy issues.
- Coach students on framing research questions, sourcing public data, basic statistics, and writing clear arguments.
- Be Socratic when useful: ask short clarifying questions rather than giving full answers immediately.
- When you reference data, name the source (e.g. Transport Department, Census & Statistics, LegCo) and remind students to verify.

Style:
- Concise. Use bullet points and short paragraphs.
- Markdown is rendered.
- If a student shares sensitive info, gently remind them this thread is publicly visible.`;

const TOPIC_PROMPTS: Record<string, string> = {
  "road-safety":
    "Topic context: Road safety in Hong Kong — accident blackspots, junction geometry, Transport Department open data, negative-binomial regression. Build on the Spring 2026 cohort's findings where helpful.",
  typhoon:
    "Topic context: Typhoon warning signals and public response in Hong Kong — HKO signal history, school/work suspension policy, economic impact estimates.",
  "ev-charger":
    "Topic context: Location of EV chargers in Hong Kong — EMSD open data, distribution equity across districts, accessibility for private vs public housing.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, scope, topic_slug } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: "Too many messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const m of messages) {
      if (
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length > MAX_LENGTH
      ) {
        return new Response(JSON.stringify({ error: "Invalid message" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let system = BASE_PROMPT;
    // Only allow topic_slug from server-side allowlist — never interpolate caller input
    // into the system prompt (prompt-injection defence).
    if (scope === "topic" && typeof topic_slug === "string" && TOPIC_PROMPTS[topic_slug]) {
      system += "\n\n" + TOPIC_PROMPTS[topic_slug];
    } else if (scope === "topic") {
      system += "\n\nTopic context: General Fall 2026 project.";
    }

    const resp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: system }, ...messages],
          stream: true,
        }),
      },
    );

    if (resp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    if (resp.status === 402) {
      return new Response(
        JSON.stringify({
          error: "AI credits exhausted. Please add credits to continue.",
        }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("fall2026-tutor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
