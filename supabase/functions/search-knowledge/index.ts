import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_QUERY_LENGTH = 5000;
const MAX_LIMIT = 20;

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
      input: text.substring(0, 8000),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Embedding API error:", response.status, error);
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, projectGroupId, contentType, limit = 5, threshold = 0.7 } = await req.json();

    // Validate query
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "query string required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (query.length > MAX_QUERY_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Query too long (max ${MAX_QUERY_LENGTH} chars)` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate optional params
    const safeLimit = Math.min(Math.max(1, Number(limit) || 5), MAX_LIMIT);
    const safeThreshold = Math.min(Math.max(0, Number(threshold) || 0.7), 1);

    if (projectGroupId && typeof projectGroupId !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid projectGroupId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate embedding for the query
    console.log("Generating embedding for query:", query.substring(0, 50));
    const queryEmbedding = await generateEmbedding(query);

    // Search course knowledge
    let courseResults: any[] = [];
    try {
      const { data: courseData, error: courseError } = await supabase.rpc(
        "search_course_knowledge",
        {
          query_embedding: queryEmbedding,
          match_threshold: safeThreshold,
          match_count: safeLimit,
          filter_content_type: contentType || null,
        }
      );

      if (courseError) {
        console.error("Course search error:", courseError);
      } else {
        courseResults = courseData || [];
      }
    } catch (e) {
      console.error("Course search exception:", e);
    }

    // Search project knowledge if projectGroupId provided
    let projectResults: any[] = [];
    if (projectGroupId) {
      try {
        const { data: projectData, error: projectError } = await supabase.rpc(
          "search_project_knowledge",
          {
            query_embedding: queryEmbedding,
            p_project_group_id: projectGroupId,
            match_threshold: safeThreshold,
            match_count: safeLimit,
          }
        );

        if (projectError) {
          console.error("Project search error:", projectError);
        } else {
          projectResults = projectData || [];
        }
      } catch (e) {
        console.error("Project search exception:", e);
      }
    }

    // Combine and sort by similarity
    const allResults = [
      ...courseResults.map(r => ({ ...r, source: "course" })),
      ...projectResults.map(r => ({ ...r, source: "project" })),
    ].sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, safeLimit);

    return new Response(
      JSON.stringify({
        success: true,
        results: allResults,
        courseCount: courseResults.length,
        projectCount: projectResults.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Search knowledge error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
