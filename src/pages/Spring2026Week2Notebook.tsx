import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Plus, Trash2, Loader2, Check, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { usePyodide } from "@/hooks/usePyodide";

interface NotebookCell {
  id: string;
  code: string;
  output?: string;
  images?: string[];
  error?: string;
  isRunning?: boolean;
}

const Spring2026Week2Notebook = () => {
  const { toggleSidebar } = useSidebar();
  const { isLoading, isReady, loadProgress, error: pyError, runCode, loadDataFile } = usePyodide();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [cells, setCells] = useState<NotebookCell[]>([
    { id: "1", code: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nprint('Libraries loaded!')" },
  ]);

  const notebookRef = useRef<HTMLDivElement>(null);

  // Load CSV data when Pyodide is ready
  useEffect(() => {
    if (isReady && !dataLoaded) {
      fetch("/data/GCAP3226_week2.csv")
        .then((res) => res.text())
        .then((csvContent) => {
          loadDataFile("GCAP3226_week2.csv", csvContent);
          setDataLoaded(true);
        })
        .catch((err) => console.error("Failed to load CSV:", err));
    }
  }, [isReady, dataLoaded, loadDataFile]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addCell = () => {
    setCells((prev) => [...prev, { id: generateId(), code: "" }]);
    setTimeout(() => {
      notebookRef.current?.scrollTo({ top: notebookRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const updateCell = (id: string, code: string) => {
    setCells((prev) => prev.map((c) => (c.id === id ? { ...c, code } : c)));
  };

  const deleteCell = (id: string) => {
    setCells((prev) => prev.filter((c) => c.id !== id));
  };

  const executeCell = async (id: string) => {
    const cell = cells.find((c) => c.id === id);
    if (!cell || !isReady) return;

    setCells((prev) => prev.map((c) => (c.id === id ? { ...c, isRunning: true, output: undefined, images: undefined, error: undefined } : c)));

    const result = await runCode(cell.code);

    setCells((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, isRunning: false, output: result.output, images: result.images, error: result.error }
          : c
      )
    );
  };

  const runAllCells = async () => {
    for (const cell of cells) {
      await executeCell(cell.id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/spring-2026/weeks/2">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Python Notebook</h1>
            {isLoading ? (
              <Badge variant="outline" className="text-amber-600 border-amber-500/50 bg-amber-500/10">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                {loadProgress}
              </Badge>
            ) : isReady ? (
              <Badge variant="outline" className="text-green-600 border-green-500/50 bg-green-500/10">
                <Check className="w-3 h-3 mr-1" />
                Python Ready
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                Error
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={runAllCells} disabled={!isReady}>
              <Play className="w-4 h-4 mr-2" />
              Run All
            </Button>
            <a href="/data/GCAP3226_week2.csv" download>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Error State */}
      {pyError && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
            <strong>Failed to load Python:</strong> {pyError}
          </div>
        </div>
      )}

      {/* Notebook */}
      <ScrollArea className="h-[calc(100vh-57px)]" ref={notebookRef}>
        <div className="max-w-4xl mx-auto p-6 space-y-4">
          {/* Info when loading */}
          {isLoading && (
            <div className="p-4 bg-muted/50 rounded-lg text-center text-muted-foreground">
              <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
              <p className="font-medium">{loadProgress}</p>
              <p className="text-sm mt-1">First load may take 10-20 seconds to download Python + packages</p>
            </div>
          )}

          {/* Cells */}
          {cells.map((cell, index) => (
            <div key={cell.id} className="group border rounded-lg overflow-hidden bg-card">
              {/* Cell Header */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b">
                <span className="text-xs text-muted-foreground font-mono">In [{index + 1}]</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => deleteCell(cell.id)} disabled={cells.length === 1}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Code Input */}
              <div className="relative">
                <textarea
                  value={cell.code}
                  onChange={(e) => updateCell(cell.id, e.target.value)}
                  className="w-full p-3 font-mono text-sm bg-background resize-none focus:outline-none min-h-[80px]"
                  placeholder="# Enter Python code here..."
                  rows={Math.max(3, cell.code.split("\n").length)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      executeCell(cell.id);
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="absolute top-2 right-2 h-7"
                  onClick={() => executeCell(cell.id)}
                  disabled={!isReady || cell.isRunning}
                >
                  {cell.isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                </Button>
              </div>

              {/* Output */}
              {(cell.output || cell.error || cell.images?.length) && (
                <div className="border-t">
                  <div className="px-3 py-1 bg-muted/30 text-xs text-muted-foreground font-mono">
                    Out [{index + 1}]
                  </div>
                  <div className="p-3">
                    {cell.error ? (
                      <pre className="text-sm text-destructive whitespace-pre-wrap font-mono">{cell.error}</pre>
                    ) : (
                      <>
                        {cell.output && (
                          <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">{cell.output}</pre>
                        )}
                        {cell.images?.map((img, i) => (
                          <img key={i} src={`data:image/png;base64,${img}`} alt={`Plot ${i + 1}`} className="mt-2 max-w-full rounded" />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Cell Button */}
          <Button variant="outline" className="w-full" onClick={addCell}>
            <Plus className="w-4 h-4 mr-2" />
            Add Cell
          </Button>

          {/* Tips */}
          <div className="text-xs text-muted-foreground text-center pb-8">
            <p>Tip: Press <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl/Cmd + Enter</kbd> to run a cell</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Spring2026Week2Notebook;
