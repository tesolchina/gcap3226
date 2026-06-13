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
  "road-safety": `Topic context: ROAD SAFETY — Hong Kong accident blackspots project.

This project is HANDED DOWN from the Spring 2026 TA team (Yingxin HUANG, Zehua WANG) supervised by Dr Tian (Talia) WU. The dataset is already cleaned. Fall 2026 students push the analysis further.

Datasets (in shared Drive folder "GCAP3226_2526S2_RoadSafety"):
- Data (0604).xlsx — three sheets:
  • total_X&Y: annual data for top 15 blackspots × 8 independent variables (regression-ready)
  • Data Statistics: annual stats for all blackspots
  • Original data: 40 consolidated Transport Department files 2015–2024, names UPPERCASED
- Accident Blackspots Visualization & Key Findings (0605).ipynb — full EDA, runs standalone
- Junction Blackspot list 2004–2024 (yearly source files)
- psi-hkpf-ts-sc.json (HKPF signal-controlled junction data)
- 2019 reference paper PDF to replicate methodology

Key established facts students MUST know:
1. Quarterly Transport Dept figures are CUMULATIVE-TO-DATE within the year (Q4 = full-year total), NOT single-quarter. Yingxin's "Rolling Window Explanation" sheet documents this.
2. 21 junctions were selected (≥5 years as blackspot AND >50 pre-imputation accidents). Talia approved exploring relationships for these 21.
3. Top 15 of those 21 were used in the latest regression sheet — Talia explicitly asked WHY top 15 instead of 21; this is an OPEN QUESTION for students to investigate.
4. 8 independent variables were collected manually via Google Maps observation per junction (geometry attributes).
5. Missing values currently zero-filled. Alternative: threshold-based imputation per HK Class A blackspot rule (≥6 pedestrian-injury or ≥9 injury accidents per year).
6. Site names standardised to UPPERCASE to prevent duplicate matches.
7. Models tried: negative binomial / Poisson regression on accident counts.
8. 2021 shows a COVID dip — handle via indicator variable or sensitivity check.

Anchor hotspots (2015–2024 cumulative):
- Chatham Rd S × Austin Rd × Cheong Wan Rd (Yau Tsim Mong) — 222 accidents, RIGHT OUTSIDE PolyU. Talia specifically suggested this as a Fall 2026 sub-project: combine with traffic volume data.
- Tsuen Tsing Interchange × Tsuen Wan Rd — 209
- Waterloo Rd × Argyle St × Princess Margaret Rd — 161
- Nathan Rd × Mong Kok Rd — 144
- Kweilin St × Tai Nan St (Sham Shui Po) — worst PEDESTRIAN-involved hotspot, narrow one-way junction
Regional: Yau Tsim Mong (69 blackspots), Sham Shui Po (47), Kowloon City (27) dominate.

Suggested student sub-questions:
(a) Extend negative-binomial model from top 15 to full 21 junctions — answer Talia's open question.
(b) Chatham Rd South case study: add traffic-volume covariate. (Talia explicitly hand-flagged this as a Fall 2026 student task.)
(c) Pedestrian-injury sub-model around Kweilin × Tai Nan.
(d) Re-run sensitivity excluding 2020–2021 COVID years.
(e) Test threshold-based imputation vs zero-fill.

Email-thread timeline (May–Jun 2026, "Update on 2004–2024 Traffic Accident Blackspot Data from Transport Department, HKSAR"):
- 8 May: Yingxin confirms TD released 2004–2024 data (district × intersection × severity × all-accidents vs pedestrian-involved). Team commits to NB regression per Wong (2019). Talia asks for Jupyter/R-Markdown writeup.
- 13 May: Zehua flags TD only provides accident counts for years a junction was on the blacklist → continuity gap. Talia notes TD data comes as PDFs (2004–2009) and Excel (2010+), and that each calendar year has 4 rolling-window documents (Apr–Mar, Jul–Jun, Oct–Sep, Jan–Dec). Asks which window will be used and how time/region enter the model.
- 14 May: Drive folder GCAP3226_2526S2_RoadSafety shared with Simon.
- 22 May meeting: Talia's action list = (EDA: data-availability viz, 9-line chart, district frequency of blackspots) + (Core: replicate Wong 2019 with 10-yr total as y, NB regression) + (Further enquiry to TD for historical accidents).
- 31 May: Zehua reports 10-year-total NB regression did NOT converge; used statsmodels GLM NegativeBinomial fallback.
- 1 Jun: Talia diagnoses — only 9 data points when using 10-yr totals → pivot to ANNUAL data, more junctions, add region+year columns. Calls Wong (2019) "very unclear and thus suspicious" because it never states its sample size.
- 2 Jun: Yingxin establishes the canonical interpretation — TD quarterly numbers are CUMULATIVE-TO-DATE within the year (Q4 = full annual total), not single-quarter; sees "Rolling Window Explanation" sheet. Selects 21 junctions (≥5 yrs blackspot, >50 accidents). Sets imputation + UPPERCASE normalisation rules.
- 5–10 Jun: Talia approves the 21-junction scope; asks why regression sheet narrowed to top 15 (OPEN QUESTION). Hands modelling to Zehua. Explicitly hands Chatham Rd S × Austin Rd × Cheong Wan Rd (PolyU junction) + traffic-volume integration to "GCAP3226 students next semester".

When students ask, be SPECIFIC about what data exists, which file it's in, which decision was already made, and which earlier finding to build on. Cite Talia, Yingxin (Kelly) and Zehua by name; remind students of the cumulative-quarter rule and the rolling-window caveat whenever they touch raw TD files.`,
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
