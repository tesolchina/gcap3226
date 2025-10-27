import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_MESSAGES_PER_SESSION = 50; // Maximum 50 messages (25 back-and-forth exchanges)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, teamName } = await req.json();
    
    // Input validation
    if (!sessionId || typeof sessionId !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid sessionId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Valid messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (messages.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Too many messages in request. Maximum 100 messages allowed.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate message content size
    for (const msg of messages) {
      if (msg.content && msg.content.length > 50000) {
        return new Response(
          JSON.stringify({ error: 'Message content too large. Maximum 50KB per message.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Validate that the session exists (ensures secret code was used)
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('id', sessionId)
      .single();
    
    if (sessionError || !session) {
      console.error('Invalid session:', sessionError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session. Please start a new consultation.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check message count limit for this session
    const { count, error: countError } = await supabase
      .from('chat_messages')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId);
    
    if (countError) {
      console.error('Error counting messages:', countError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify message limit' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (count !== null && count >= MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({ 
          error: `Message limit reached. Maximum ${MAX_MESSAGES_PER_SESSION} messages allowed per consultation session.`,
          limit_reached: true 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Session ${sessionId} has ${count} messages (limit: ${MAX_MESSAGES_PER_SESSION})`);
    
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    // System prompt tailored for course consultation
    const systemPrompt = `You are an AI teaching assistant for GCAP 3056 - "Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong". 

Your role is to help students with their ${teamName || 'project'} by:
1. Guiding them through data analysis and policy research
2. Providing feedback on their methodology and approach
3. Suggesting resources and relevant case studies
4. Helping them understand data governance concepts
5. Encouraging critical thinking about Hong Kong's public policy challenges

Be supportive, pedagogical, and ask probing questions to help students think deeply about their projects. Keep responses concise and focused on actionable guidance. Reference relevant UN SDGs and Hong Kong context when appropriate.`;

    console.log('Calling OpenRouter API with model: google/gemini-2.5-flash');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'GCAP 3056 Course Portal',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash', // Cost-effective and fast
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Insufficient credits. Please add funds to your OpenRouter account.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Error in ai-consultation function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});