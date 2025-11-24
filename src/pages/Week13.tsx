import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { supabase } from "@/integrations/supabase/client";

interface PresentationSlot {
  team: string;
  time: string;
  endTime: string;
}

const Week13 = () => {
  const [presentationOrder, setPresentationOrder] = useState<PresentationSlot[]>([]);

  useEffect(() => {
    // Load existing schedule on mount
    const loadSchedule = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('name, presentation_time, presentation_end_time')
        .not('presentation_time', 'is', null)
        .order('presentation_time', { ascending: true });
      
      if (!error && data && data.length > 0) {
        const schedule = data.map(team => ({
          team: team.name,
          time: team.presentation_time || '',
          endTime: team.presentation_end_time || ''
        }));
        setPresentationOrder(schedule);
      }
    };
    
    loadSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              Week 13 Rundown
            </CardTitle>
            <CardDescription className="text-base">
              Final presentations - November 25, 2025
            </CardDescription>
          </CardHeader>
        </Card>

        <CountdownTimer />

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Course Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This week marks the conclusion of GCAP 3226. We've covered data governance, 
              policy analysis, and practical applications throughout the semester.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Key Highlights:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>6 team projects on Hong Kong government data policies</li>
                <li>Data collection and analysis methodologies</li>
                <li>Policy recommendations and impact assessment</li>
                <li>Collaborative learning and peer feedback</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {presentationOrder.length > 0 && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Presentation Schedule
              </CardTitle>
              <CardDescription>
                Each team has 15 minutes maximum - November 25, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {presentationOrder.map((slot, index) => (
                  <div 
                    key={index}
                    className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{slot.team}</p>
                          <p className="text-sm text-muted-foreground">15 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{slot.time}</p>
                        <p className="text-sm text-muted-foreground">to {slot.endTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Week13;
