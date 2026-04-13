import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Max audio payload: 5MB base64 (~3.75MB raw audio)
const MAX_AUDIO_LENGTH = 5 * 1024 * 1024;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Reject oversized payloads (6MB limit for the whole body)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 6_000_000) {
      return new Response(JSON.stringify({ error: "Payload too large (max 6MB)" }), {
        status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { audio } = await req.json();
    
    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio data provided" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (typeof audio !== "string") {
      return new Response(JSON.stringify({ error: "Audio must be a base64 string" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (audio.length > MAX_AUDIO_LENGTH) {
      return new Response(JSON.stringify({ error: "Audio data too large (max 5MB)" }), {
        status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
