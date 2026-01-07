import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio } = await req.json();
    
    if (!audio) {
      throw new Error("No audio data provided");
    }

    const GPT_BEST_API_KEY = Deno.env.get("GPT_BEST_API_KEY");
    if (!GPT_BEST_API_KEY) {
      throw new Error("GPT_BEST_API_KEY is not configured");
    }

    // Call the GPT-best API for transcription (using Whisper-compatible endpoint)
    const response = await fetch("https://gpt-best.apifox.cn/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GPT_BEST_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "whisper-1",
        audio: audio,
        language: "en",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Transcription API error:", response.status, errorText);
      throw new Error(`Transcription failed: ${response.status}`);
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ text: result.text || result.transcription || "" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Voice transcribe error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
