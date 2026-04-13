import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize, Play, Pause, RotateCcw, Timer } from "lucide-react";

interface FullscreenPresentationProps {
  embedUrl: string;
  title: string;
}

export const FullscreenPresentation = ({ embedUrl, title }: FullscreenPresentationProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-red-500";
    if (timeLeft <= 180) return "text-orange-400";
    if (timeLeft <= 300) return "text-yellow-400";
    return "text-white";
  };

  const getTimerBg = () => {
    if (timeLeft <= 60) return "bg-red-900/80";
    if (timeLeft <= 180) return "bg-orange-900/80";
    if (timeLeft <= 300) return "bg-yellow-900/80";
    return "bg-black/60";
  };

  return (
    <div ref={containerRef} className={isFullscreen ? "relative w-full h-full bg-black" : "relative"}>
      {/* Fullscreen toggle button (shown in normal mode) */}
      {!isFullscreen && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          className="mb-3 gap-2"
        >
          <Maximize className="h-4 w-4" />
          Present Fullscreen with Timer
        </Button>
      )}

      {/* Iframe */}
      <div className={isFullscreen ? "w-full h-full" : "relative w-full"} style={!isFullscreen ? { paddingBottom: "56.25%" } : undefined}>
        <iframe
          src={embedUrl}
          className={isFullscreen ? "w-full h-full border-0" : "absolute inset-0 w-full h-full border-0"}
          loading="lazy"
          allowFullScreen
          allow="fullscreen"
          title={title}
        />
      </div>

      {/* Overlay timer (only in fullscreen) */}
      {isFullscreen && (
        <div className={`absolute top-4 right-4 ${getTimerBg()} backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-4 shadow-2xl z-50`}>
          <Timer className={`h-5 w-5 ${getTimerColor()}`} />
          <span className={`text-3xl font-mono font-bold ${getTimerColor()} tabular-nums`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1 ml-2">
            {!isRunning ? (
              <Button
                onClick={() => setIsRunning(true)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                disabled={timeLeft === 0}
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setIsRunning(false)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={() => { setIsRunning(false); setTimeLeft(8 * 60); }}
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={toggleFullscreen}
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-white hover:bg-white/20 ml-1"
          >
            <Minimize className="h-4 w-4" />
          </Button>

          {timeLeft === 0 && (
            <span className="text-red-400 font-semibold animate-pulse text-sm">Time's up!</span>
          )}
          {timeLeft > 0 && timeLeft <= 60 && isRunning && (
            <span className="text-red-400 text-xs font-medium">⚠️ Final minute!</span>
          )}
        </div>
      )}
    </div>
  );
};
