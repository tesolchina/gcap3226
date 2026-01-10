import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate embedding using Lovable AI Gateway
async function generateEmbedding(text: string): Promise<number[]> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Search for relevant context
async function searchKnowledge(
  supabase: any,
  query: string,
  projectGroupId?: string
): Promise<string> {
  try {
    const queryEmbedding = await generateEmbedding(query);

    // Search course knowledge
    const { data: courseResults } = await supabase.rpc("search_course_knowledge", {
      query_embedding: queryEmbedding,
      match_threshold: 0.6,
      match_count: 3,
      filter_content_type: null,
    });

    // Search project knowledge if available
    let projectResults: any[] = [];
    if (projectGroupId) {
      const { data } = await supabase.rpc("search_project_knowledge", {
        query_embedding: queryEmbedding,
        p_project_group_id: projectGroupId,
        match_threshold: 0.6,
        match_count: 3,
      });
      projectResults = data || [];
    }

    // Format context
    let context = "";
    
    if (courseResults && courseResults.length > 0) {
      context += "## Relevant Course Information:\n\n";
      for (const result of courseResults) {
        context += `### ${result.page_title}\n${result.content}\n\n`;
      }
    }

    if (projectResults.length > 0) {
      context += "## Relevant Project Information:\n\n";
      for (const result of projectResults) {
        context += `### ${result.title}\n${result.content}\n\n`;
      }
    }

    return context;
  } catch (e) {
    console.error("Knowledge search error:", e);
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, projectGroupId, topicTitle, enableRAG = true } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the latest user message for context search
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    
    // Fetch relevant context using RAG
    let ragContext = "";
    if (enableRAG && lastUserMessage) {
      console.log("Searching for relevant context...");
      ragContext = await searchKnowledge(supabase, lastUserMessage.content, projectGroupId);
      console.log("Found context length:", ragContext.length);
    }

    // Build system prompt with RAG context
    const systemPrompt = `You are a helpful AI assistant for GCAP 3226: Empowering Citizens Through Data, a course at Hong Kong Baptist University. You help students with their group projects on Hong Kong public policy topics.

${topicTitle ? `The student is working on the "${topicTitle}" group project.` : ""}

Your role:
- Answer questions about the course, assessments, and requirements
- Help with data analysis and research methodology
- Provide guidance on Hong Kong government data sources
- Support students in their policy analysis projects
- Explain concepts clearly and encourage critical thinking

${ragContext ? `## Context from Course Knowledge Base:
${ragContext}

Use the above context to inform your responses when relevant. If the context contains specific information about assessments, deadlines, or requirements, reference it accurately.
` : ""}

Guidelines:
- Be encouraging and supportive
- Provide specific, actionable advice
- When discussing data sources, mention relevant Hong Kong government departments
- For assessments, refer to specific requirements when you have that information
- If you're not sure about something, say so and suggest where students might find the information`;

    // Call Lovable AI Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Project AI chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
