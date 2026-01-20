import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal, Laptop, Github, GraduationCap, Maximize2, ExternalLink, ChevronDown, BookOpen, Utensils, Recycle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRef, useState } from "react";

const SLIDES_URL = "https://docs.google.com/presentation/d/1yJw1aKwZQT6f9edp5B8OBppCVlGQ2wo0xG4ZZ6rPsw0";

const Spring2026Week2 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Week 2</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">Data Visualization with GitHub Copilot</h1>
          <p className="text-lg text-muted-foreground">
            Set up your local development environment and learn AI-assisted coding with a real policy case study.
          </p>
        </div>

        {/* Collapsible Overview Section */}
        <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Objectives & Activities
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOverviewOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Learning Objectives</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Set up VS Code with Python and Jupyter extensions</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Create a GitHub account and apply for GitHub Education benefits</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Install and use GitHub Copilot for AI-assisted coding</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Understand Python environments using the "restaurant" analogy</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Create data visualizations with pandas and matplotlib</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Class Activities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Environment setup verification with student partners</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Hands-on Jupyter Notebook practice</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>MSW data exploration and visualization exercise</li>
              </ul>
            </Card>
          </CollapsibleContent>
        </Collapsible>

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
              title="Week 2: Data Visualization with GitHub Copilot"
            />
          </div>
        </div>

        {/* Key Concepts from Slides */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Python Environment Analogy */}
          <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Utensils className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Python Environment = Restaurant</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Jupyter Notebook:</span> Dining area (frontend)</li>
              <li><span className="font-medium text-foreground">Python Kernel:</span> Restaurant manager</li>
              <li><span className="font-medium text-foreground">Interpreter:</span> Chef who cooks</li>
              <li><span className="font-medium text-foreground">Libraries:</span> Ingredients (pandas, matplotlib)</li>
            </ul>
          </Card>

          {/* MSW Charging Context */}
          <Card className="p-5 bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Recycle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Case Study: MSW Charging</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">2005:</span> Initial policy discussions</li>
              <li><span className="font-medium text-foreground">2012:</span> Public consultation launched</li>
              <li><span className="font-medium text-foreground">2024:</span> Implementation deferred</li>
              <li><span className="font-medium text-foreground">Today:</span> Analyzing the data story</li>
            </ul>
          </Card>
        </div>

        {/* Setup Guide - Primary CTA */}
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Laptop className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Step 1: Set Up Your Development Environment</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Install VS Code, create a GitHub account with your HKBU email, apply for GitHub Education, 
            and install GitHub Copilot for free AI-assisted coding.
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
              <span>GitHub Copilot</span>
            </div>
          </div>
          <Link to="/spring-2026/weeks/2/setup">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Laptop className="w-4 h-4 mr-2" />
              View Setup Guide
            </Button>
          </Link>
        </div>

        {/* Vibe Coding Simulator */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold">Step 2: Try the Vibe Coding Simulator</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Practice the AI-assisted coding workflow in a safe simulation before using GitHub Copilot in VS Code.
            Learn how to describe what you want and let AI generate the code.
          </p>
          <Link to="/spring-2026/weeks/2/lab">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Launch Vibe Coding Simulator
            </Button>
          </Link>
        </div>

        {/* Python Notebook */}
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Bonus: Browser-Based Python Notebook</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Run actual Python code in your browser using Pyodide. Practice pandas and matplotlib 
            without any local installation. First load takes ~15 seconds.
          </p>
          <Link to="/spring-2026/weeks/2/notebook">
            <Button className="bg-green-600 hover:bg-green-700">
              <Terminal className="w-4 h-4 mr-2" />
              Launch Python Notebook
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" asChild>
            <Link to="/spring-2026">
              ← Back to Course Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Week2;
