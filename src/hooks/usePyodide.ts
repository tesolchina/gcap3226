import { useState, useEffect, useCallback } from "react";
import { pythonRunner, PythonResult } from "@/lib/python-runner";

export function usePyodide() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await pythonRunner.initialize((msg) => {
          if (mounted) setLoadProgress(msg);
        });
        if (mounted) {
          setIsReady(true);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load Python");
          setIsLoading(false);
        }
      }
    };

    // Check if already ready
    if (pythonRunner.isReady()) {
      setIsReady(true);
      setIsLoading(false);
    } else {
      init();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const runCode = useCallback(async (code: string): Promise<PythonResult> => {
    if (!isReady) {
      return { output: "", images: [], error: "Python not ready yet" };
    }
    return pythonRunner.execute(code);
  }, [isReady]);

  const loadDataFile = useCallback(async (filename: string, content: string) => {
    if (!isReady) return;
    await pythonRunner.loadDataFile(filename, content);
  }, [isReady]);

  return {
    isLoading,
    isReady,
    loadProgress,
    error,
    runCode,
    loadDataFile,
  };
}
