import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal, Laptop, Github, GraduationCap, Maximize2, ExternalLink } from "lucide-react";
import WeekLayout from "@/components/WeekLayout";
import { useRef } from "react";

const SLIDES_URL = "https://docs.google.com/presentation/d/1yJw1aKwZQT6f9edp5B8OBppCVlGQ2wo0xG4ZZ6rPsw0";

const Spring2026Week2 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleOpenNewWindow = () => {
    window.open(`${SLIDES_URL}/present`, "_blank");
  };

  return (
    <WeekLayout
      weekNumber={2}
      title="Development Environment & Vibe Coding"
      description="Set up your coding environment with VS Code and GitHub. Learn 'Vibe Coding' - an AI-assisted approach where you describe what you want and AI writes the code."
      objectives={[
        "Install VS Code and essential extensions",
        "Create a GitHub account using HKBU email",
        "Apply for GitHub Education and get free GitHub Copilot",
        "Understand the 'Vibe Coding' approach to programming",
        "Practice AI-assisted coding for data analysis",
      ]}
      activities={[
        "VS Code installation and configuration",
        "GitHub account creation and Education Pack application",
        "Vibe Coding simulation to understand the workflow",
        "Data visualization basics with AI assistance",
        "Hands-on practice with student partner support",
      ]}
      techSetup={{
        tools: [
          "VS Code (free download)",
          "GitHub account (use HKBU email)",
          "GitHub Copilot (free for students)",
          "Python 3.10+ (for later weeks)",
        ],
        support: [
          "Complete the setup guide before class",
          "Student partners available for assistance",
          "Bring your laptop fully charged",
          "IT support available for troubleshooting",
        ],
      }}
      customContent={
        <div className="mt-8 space-y-6">
          {/* Embedded Slides */}
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Week 2 Slides</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreen}
                  className="h-8 px-2"
                >
                  <Maximize2 className="w-4 h-4 mr-1" />
                  Fullscreen
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenNewWindow}
                  className="h-8 px-2"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open in New Tab
                </Button>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe
                ref={iframeRef}
                src={`${SLIDES_URL}/embed?start=false&loop=false&delayms=3000`}
                className="w-full h-full"
                allowFullScreen
                title="Week 2: Development Environment & Vibe Coding Slides"
              />
            </div>
          </div>

          {/* Setup Guide - Primary CTA */}
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Laptop className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Step 1: Set Up Your Development Environment</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Before class, install VS Code, create a GitHub account with your HKBU email, and apply for GitHub Education 
            to get free access to GitHub Copilot (AI coding assistant).
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Github className="w-4 h-4" />
              <span>GitHub Account</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span>Education Benefits</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>AI Coding Tools</span>
            </div>
          </div>
          <Link to="/spring-2026/weeks/2/setup">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Laptop className="w-4 h-4 mr-2" />
              View Setup Guide
            </Button>
          </Link>
        </div>

        {/* Vibe Coding Demo */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold">Step 2: Try the Vibe Coding Simulator</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Experience AI-assisted coding in a safe simulation. Learn the workflow of describing what you want 
            and having AI generate code - before using real tools in VS Code.
          </p>
          <Link to="/spring-2026/weeks/2/lab">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Launch Vibe Coding Simulator
            </Button>
          </Link>
        </div>

        {/* Real Python Notebook */}
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Bonus: Python Notebook (Real Execution)</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Run actual Python code in your browser using Pyodide. Great for quick experimentation with pandas and matplotlib.
            First load takes ~15 seconds.
          </p>
          <Link to="/spring-2026/weeks/2/notebook">
            <Button className="bg-green-600 hover:bg-green-700">
              <Terminal className="w-4 h-4 mr-2" />
              Launch Python Notebook
            </Button>
          </Link>
        </div>
      </div>
    }
  />
  );
};

export default Spring2026Week2;
