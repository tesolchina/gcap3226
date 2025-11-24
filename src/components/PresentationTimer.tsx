import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export const PresentationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(15 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Determine color based on time remaining
  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-red-600 dark:text-red-400"; // Last minute
    if (timeLeft <= 180) return "text-orange-600 dark:text-orange-400"; // Last 3 minutes
    if (timeLeft <= 300) return "text-yellow-600 dark:text-yellow-500"; // Last 5 minutes
    return "text-primary";
  };

  const getBackgroundColor = () => {
    if (timeLeft <= 60) return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
    if (timeLeft <= 180) return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800";
    if (timeLeft <= 300) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
    return "bg-primary/5 border-primary/20";
  };

  return (
    <Card className={`p-6 border-2 transition-colors duration-300 ${getBackgroundColor()}`}>
      <div className="flex items-center gap-3 mb-6">
        <Timer className={`h-6 w-6 ${getTimerColor()}`} />
        <h3 className="text-xl font-bold">Presentation Timer</h3>
      </div>

      <div className="text-center space-y-6">
        {/* Timer Display */}
        <div className={`text-7xl font-mono font-bold ${getTimerColor()} transition-colors duration-300`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Status Messages */}
        <div className="space-y-2">
          {timeLeft === 0 && (
            <p className="text-lg font-semibold text-red-600 dark:text-red-400 animate-pulse">
              Time's up! 🔔
            </p>
          )}
          {timeLeft > 0 && timeLeft <= 60 && isRunning && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              ⚠️ Final minute!
            </p>
          )}
          {timeLeft > 60 && timeLeft <= 180 && isRunning && (
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              ⏰ Less than 3 minutes remaining
            </p>
          )}
          {timeLeft > 720 && (
            <p className="text-sm text-muted-foreground">
              Recommended: Finish in 10-12 minutes
            </p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-3">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="gap-2"
              disabled={timeLeft === 0}
            >
              <Play className="h-5 w-5" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Pause className="h-5 w-5" />
              Pause
            </Button>
          )}
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
        </div>

        {/* Info */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Total time: 15 minutes | Click Start to begin countdown
          </p>
        </div>
      </div>
    </Card>
  );
};
