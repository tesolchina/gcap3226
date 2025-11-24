import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PresentationSlot {
  name: string;
  slug: string;
  time: string;
  endTime: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generate presentation order function called');
    
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
      { name: "Team 1: Flu Shot", slug: "flu-shot" },
      { name: "Team 2: Bus Routes", slug: "bus-route" },
      { name: "Team 3: Typhoon Signals", slug: "typhoon-signals" },
      { name: "Team 4: Food Waste", slug: "food-waste" },
      { name: "Team 5: Green Recycling", slug: "green-recycling" },
      { name: "Team 6: Bus Stop Merge", slug: "bus-stop-merge" }
    ];

    // Generate time slots
    const generateTime = (slotIndex: number) => {
      const startHour = 11;
      const slotDuration = 15;
      const startMinutes = slotIndex * slotDuration;
      
      const totalMinutes = startHour * 60 + startMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      const endTotalMinutes = totalMinutes + slotDuration;
      const endHours = Math.floor(endTotalMinutes / 60);
      const endMinutes = endTotalMinutes % 60;
      
      const formatTime = (h: number, m: number) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h > 12 ? h - 12 : h;
        return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
      };
      
      return {
        time: formatTime(hours, minutes),
        endTime: formatTime(endHours, endMinutes)
      };
    };

    // Shuffle teams and assign times
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const schedule: PresentationSlot[] = shuffled.map((team, index) => {
      const { time, endTime } = generateTime(index);
      return { name: team.name, slug: team.slug, time, endTime };
    });

    console.log('Generated schedule:', schedule);

    // Save to database
    for (const slot of schedule) {
      const { error } = await supabase
        .from('teams')
        .update({
          presentation_time: slot.time,
          presentation_end_time: slot.endTime,
          presentation_date: '2025-11-25'
        })
        .eq('slug', slot.slug);

      if (error) {
        console.error(`Error updating team ${slot.slug}:`, error);
        throw error;
      }
    }

    console.log('Schedule saved successfully');

    return new Response(
      JSON.stringify({ success: true, schedule }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-presentation-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
