import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Chunk text into smaller segments for embedding
function chunkText(text: string, maxTokens: number = 500): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const chunks: string[] = [];
  let currentChunk = "";
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    // Rough token estimate: ~4 chars per token
    const estimatedTokens = (currentChunk.length + trimmedSentence.length) / 4;
    
    if (estimatedTokens > maxTokens && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmedSentence;
    } else {
      currentChunk += (currentChunk ? ". " : "") + trimmedSentence;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.length > 0 ? chunks : [text];
}

// Generate embedding using Lovable AI Gateway
async function generateEmbedding(text: string): Promise<number[]> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  // Use OpenAI-compatible embedding endpoint through the gateway
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
    const { action, content, pageData, projectKnowledgeId } = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === "embed_course_content") {
      // Embed a single course page
      if (!pageData) {
        return new Response(
          JSON.stringify({ error: "pageData required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const chunks = chunkText(pageData.content);
      const results = [];

      for (let i = 0; i < chunks.length; i++) {
        const embedding = await generateEmbedding(chunks[i]);
        
        // Upsert into course_knowledge
        const { data, error } = await supabase
          .from("course_knowledge")
          .upsert({
            page_path: pageData.path,
            page_title: pageData.title,
            content_type: pageData.type,
            content: chunks[i],
            metadata: pageData.metadata || {},
            embedding: embedding,
            chunk_index: i,
            last_updated: new Date().toISOString(),
          }, {
            onConflict: "page_path,chunk_index",
          })
          .select();

        if (error) {
          console.error("Error upserting course knowledge:", error);
          throw error;
        }
        results.push(data);
      }

      return new Response(
        JSON.stringify({ success: true, chunks: chunks.length, results }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "embed_project_knowledge") {
      // Embed project-specific knowledge
      if (!projectKnowledgeId || !content) {
        return new Response(
          JSON.stringify({ error: "projectKnowledgeId and content required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const embedding = await generateEmbedding(content);
      
      const { data, error } = await supabase
        .from("project_knowledge")
        .update({ embedding: JSON.stringify(embedding) })
        .eq("id", projectKnowledgeId)
        .select();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "embed_all_course_content") {
      // Bulk embed all course content from the JSON file
      // This is called during deployment or manual refresh
      const courseContentUrl = `${Deno.env.get("SUPABASE_URL")?.replace('/rest/v1', '')}/storage/v1/object/public/course-content/course-content.json`;
      
      // For now, accept the content directly in the request
      const { pages } = await req.json();
      
      if (!pages || !Array.isArray(pages)) {
        return new Response(
          JSON.stringify({ error: "pages array required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      let totalChunks = 0;
      for (const page of pages) {
        const chunks = chunkText(page.content);
        
        for (let i = 0; i < chunks.length; i++) {
          try {
            const embedding = await generateEmbedding(chunks[i]);
            
            await supabase
              .from("course_knowledge")
              .upsert({
                page_path: page.path,
                page_title: page.title,
                content_type: page.type,
                content: chunks[i],
                metadata: page.metadata || {},
                embedding: embedding,
                chunk_index: i,
                last_updated: new Date().toISOString(),
              }, {
                onConflict: "page_path,chunk_index",
              });
            
            totalChunks++;
          } catch (e) {
            console.error(`Error embedding chunk ${i} of ${page.path}:`, e);
          }
        }
      }

      return new Response(
        JSON.stringify({ success: true, totalChunks, pagesProcessed: pages.length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "generate_query_embedding") {
      // Generate embedding for a search query
      if (!content) {
        return new Response(
          JSON.stringify({ error: "content required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const embedding = await generateEmbedding(content);
      
      return new Response(
        JSON.stringify({ success: true, embedding }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use: embed_course_content, embed_project_knowledge, embed_all_course_content, generate_query_embedding" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Generate embeddings error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
