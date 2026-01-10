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

    if (!query) {
      return new Response(
        JSON.stringify({ error: "query required" }),
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
          match_threshold: threshold,
          match_count: limit,
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
            match_threshold: threshold,
            match_count: limit,
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
    ].sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, limit);

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
