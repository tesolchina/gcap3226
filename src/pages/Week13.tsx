import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Calendar } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";

interface PresentationSlot {
  team: string;
  time: string;
  endTime: string;
}

const Week13 = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [presentationOrder, setPresentationOrder] = useState<PresentationSlot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const teams = [
    "Team 1: Flu Shot",
    "Team 2: Bus Routes",
    "Team 3: Typhoon Signals",
    "Team 4: Food Waste",
    "Team 5: Green Recycling",
    "Team 6: Bus Stop Merge"
  ];

  const generateTime = (slotIndex: number) => {
    const startHour = 11;
    const startMinute = slotIndex * 15;
    const totalMinutes = startMinute;
    const hour = startHour + Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    
    const endMinute = (slotIndex + 1) * 15;
    const endHour = startHour + Math.floor(endMinute / 60);
    const endMin = endMinute % 60;
    
    const formatTime = (h: number, m: number) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h > 12 ? h - 12 : h;
      return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
    };
    
    return {
      time: formatTime(hour, minute),
      endTime: formatTime(endHour, endMin)
    };
  };

  const handleGenerateOrder = () => {
    setIsGenerating(true);
    
    // Simulate generation animation
    setTimeout(() => {
      const shuffled = [...teams].sort(() => Math.random() - 0.5);
      const schedule = shuffled.map((team, index) => {
        const { time, endTime } = generateTime(index);
        return { team, time, endTime };
      });
      
      setPresentationOrder(schedule);
      setIsGenerating(false);
    }, 1500);
  };

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

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Presentation Order Generator
            </CardTitle>
            <CardDescription>
              Generate random presentation order - Each team has 15 minutes maximum
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowSchedule(!showSchedule)}
                variant="outline"
                className="flex-1"
              >
                {showSchedule ? "Hide Schedule" : "Show Schedule"}
              </Button>
              
              {showSchedule && (
                <Button
                  onClick={handleGenerateOrder}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? "Generating..." : "Generate Order"}
                </Button>
              )}
            </div>

            {showSchedule && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                {presentationOrder.length === 0 ? (
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">
                      Click "Generate Order" to randomly assign presentation times
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-center">Presentation Schedule - November 25, 2025</h3>
                    <div className="space-y-2">
                      {presentationOrder.map((slot, index) => (
                        <div 
                          key={index}
                          className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors animate-in fade-in duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
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
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week13;
