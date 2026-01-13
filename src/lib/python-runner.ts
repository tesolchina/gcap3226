// Pyodide Python Runner Service
// Singleton to manage Pyodide lifecycle

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackagesFromImports: (code: string) => Promise<void>;
  FS: {
    writeFile: (path: string, data: string | Uint8Array) => void;
    readFile: (path: string, options?: { encoding: string }) => string | Uint8Array;
    mkdir: (path: string) => void;
  };
  globals: {
    get: (name: string) => unknown;
    set: (name: string, value: unknown) => void;
  };
}

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

export interface PythonResult {
  output: string;
  images: string[];
  error?: string;
}

class PythonRunner {
  private pyodide: PyodideInterface | null = null;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;
  private onProgressCallback: ((msg: string) => void) | null = null;

  async initialize(onProgress?: (message: string) => void): Promise<void> {
    if (this.pyodide) return;
    if (this.loadPromise) return this.loadPromise;

    this.onProgressCallback = onProgress || null;
    this.isLoading = true;

    this.loadPromise = this._doInitialize();
    return this.loadPromise;
  }

  private async _doInitialize(): Promise<void> {
    try {
      this.onProgressCallback?.("Loading Python runtime...");

      // Load Pyodide script from CDN
      if (!window.loadPyodide) {
        await this.loadScript("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");
      }

      this.onProgressCallback?.("Initializing Python...");
      this.pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      this.onProgressCallback?.("Installing pandas...");
      await (this.pyodide as unknown as { loadPackage: (pkg: string | string[]) => Promise<void> }).loadPackage("pandas");

      this.onProgressCallback?.("Installing matplotlib...");
      await (this.pyodide as unknown as { loadPackage: (pkg: string | string[]) => Promise<void> }).loadPackage("matplotlib");

      this.onProgressCallback?.("Installing seaborn...");
      await (this.pyodide as unknown as { loadPackage: (pkg: string | string[]) => Promise<void> }).loadPackage("seaborn");

      // Configure matplotlib for non-interactive backend
      this.onProgressCallback?.("Configuring visualization...");
      await this.pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import io
import base64

def _capture_figures():
    """Capture all matplotlib figures as base64 images"""
    images = []
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        buf = io.BytesIO()
        fig.savefig(buf, format='png', bbox_inches='tight', dpi=100)
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        images.append(img_base64)
        plt.close(fig)
    return images
`);

      this.onProgressCallback?.("Python ready!");
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.loadPromise = null;
      throw err;
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  async loadDataFile(filename: string, content: string): Promise<void> {
    if (!this.pyodide) throw new Error("Python not initialized");
    this.pyodide.FS.writeFile(filename, content);
  }

  async execute(code: string): Promise<PythonResult> {
    if (!this.pyodide) {
      return { output: "", images: [], error: "Python not initialized. Please wait for loading to complete." };
    }

    try {
      // Capture stdout
      await this.pyodide.runPythonAsync(`
import sys
from io import StringIO
_stdout_capture = StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout_capture
`);

      // Run user code
      let result: unknown;
      try {
        result = await this.pyodide.runPythonAsync(code);
      } catch (err) {
        // Restore stdout before returning error
        await this.pyodide.runPythonAsync(`sys.stdout = _old_stdout`);
        const errorMessage = err instanceof Error ? err.message : String(err);
        return { output: "", images: [], error: errorMessage };
      }

      // Get captured stdout and restore
      const stdout = await this.pyodide.runPythonAsync(`
sys.stdout = _old_stdout
_stdout_capture.getvalue()
`) as string;

      // Capture matplotlib figures
      const images = await this.pyodide.runPythonAsync("_capture_figures()") as string[];

      // Build output
      let output = stdout || "";
      if (result !== undefined && result !== null && String(result) !== "None") {
        if (output) output += "\n";
        output += String(result);
      }

      return {
        output: output.trim(),
        images: images || [],
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return { output: "", images: [], error: errorMessage };
    }
  }

  isReady(): boolean {
    return this.pyodide !== null && !this.isLoading;
  }

  isInitializing(): boolean {
    return this.isLoading;
  }
}

// Singleton instance
export const pythonRunner = new PythonRunner();
