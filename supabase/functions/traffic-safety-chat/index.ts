import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_MESSAGES = 60;
const MAX_MESSAGE_LENGTH = 10000;

const SYSTEM_PROMPT = `You are a research collaborator for the GCAP 3226 traffic-safety project at Hong Kong Baptist University, led by Simon and Tian Wu (HKBU).

Project context:
- Goal: replicate and extend a study on the relationship between accident counts and intersection layout geometries at signal-controlled junctions in Hong Kong, with the aim of improving safety at blacksite intersections.
- Source paper: "Designs for Safer Signal-Controlled Intersections" (2019).
- Data: Junction blacksite list 2004–2024 (yearly subfolders), "2014-2024 交通黑点数据统计.xlsx" statistics spreadsheet, HKPF signal-controlled junction JSON (psi-hkpf-ts-sc.json), notes on existing visualisations. Shared via Google Drive folder GCAP3226_2526S2_RoadSafety.
- Final deliverables: a slide deck (background, RQs, methodology, results, conclusion) and a Jupyter notebook implementing the methodology.
- Open questions Simon has raised: (1) status & timeline of data from Transport Department / HKPF; (2) how to integrate this into GCAP 3226; (3) whether it can become a publishable research project; (4) how to leverage an AI agent in the workflow.
- VTL funding report is due in May; student-helper job scope includes road safety.

You are talking to Simon and trusted colleagues in a shared thread — multiple humans may post. Each user message may be prefixed with the author's name in the form "[Name]: ...". Treat the prefix as metadata, not as content to repeat back.

Style:
- Be concise, concrete and academically rigorous.
- Prefer bullet points and short paragraphs.
- When you suggest analyses, specify variables, methods (e.g. negative binomial regression, SPF, EB), and which dataset columns they would draw on.
- If something is unknown, say so and propose how to find out.
- Use markdown.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `Too many messages (max ${MAX_MESSAGES})` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    for (const m of messages) {
      if (!m?.role || typeof m.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Each message needs role + content" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (m.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH})` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted — top up Lovable AI usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (err) {
    console.error("traffic-safety-chat error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
