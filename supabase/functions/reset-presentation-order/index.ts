import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Reset presentation order function called');
    
    const { code } = await req.json();
    const storedSecret = Deno.env.get('secretCode');

    if (!storedSecret) {
      console.error('Secret code not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Secret code not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    if (code !== storedSecret) {
      console.log('Invalid secret code provided');
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid secret code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const teams = [
      'flu-shot',
      'bus-route',
      'typhoon-signals',
      'food-waste',
      'green-recycling',
      'bus-stop-merge'
    ];

    console.log('Clearing schedule from database');

    // Clear schedule from database
    for (const slug of teams) {
      const { error } = await supabase
        .from('teams')
        .update({
          presentation_time: null,
          presentation_end_time: null,
          presentation_date: null
        })
        .eq('slug', slug);

      if (error) {
        console.error(`Error resetting team ${slug}:`, error);
        throw error;
      }
    }

    console.log('Schedule reset successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in reset-presentation-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
