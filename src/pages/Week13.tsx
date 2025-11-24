import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Gift } from "lucide-react";

const Week13 = () => {
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const participants = [
    "Team 1: Flu Shot",
    "Team 2: Bus Routes",
    "Team 3: Typhoon Signals",
    "Team 4: Food Waste",
    "Team 5: Green Recycling",
    "Team 6: Bus Stop Merge"
  ];

  const handleLuckyDraw = () => {
    setIsSpinning(true);
    setWinner(null);
    
    // Simulate spinning animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setWinner(participants[randomIndex]);
      setIsSpinning(false);
    }, 2000);
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
              Course wrap-up and lucky draw ceremony
            </CardDescription>
          </CardHeader>
        </Card>

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
              <Gift className="h-5 w-5 text-primary" />
              Lucky Draw
            </CardTitle>
            <CardDescription>
              Click below to participate in the lucky draw!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setShowLuckyDraw(!showLuckyDraw)}
              variant="outline"
              className="w-full"
            >
              {showLuckyDraw ? "Hide Lucky Draw" : "Show Lucky Draw"}
            </Button>

            {showLuckyDraw && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold">Participating Teams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {participants.map((team, index) => (
                      <div 
                        key={index}
                        className="bg-card p-3 rounded-md border border-border/50"
                      >
                        {team}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleLuckyDraw}
                    disabled={isSpinning}
                    size="lg"
                    className="mt-4"
                  >
                    {isSpinning ? "Drawing..." : "Start Lucky Draw"}
                  </Button>

                  {winner && (
                    <div className="mt-6 p-6 bg-primary/10 border-2 border-primary rounded-lg animate-in zoom-in duration-500">
                      <p className="text-sm text-muted-foreground mb-2">🎉 Winner 🎉</p>
                      <p className="text-2xl font-bold text-primary">{winner}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week13;
