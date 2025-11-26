import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const presentationDate = new Date("2025-11-25T11:00:00");
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +presentationDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEventPassed = timeLeft.days === 0 && timeLeft.hours === 0 && 
                        timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {isEventPassed ? "Presentations Today! - Nov 25" : "Time Until Presentations (Nov 25)"}
            </span>
          </div>
          
          {!isEventPassed && (
            <div className="flex gap-2 text-center">
              <div className="bg-background rounded-md px-3 py-1">
                <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="bg-background rounded-md px-3 py-1">
                <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="bg-background rounded-md px-3 py-1">
                <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
              <div className="bg-background rounded-md px-3 py-1">
                <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">Sec</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
