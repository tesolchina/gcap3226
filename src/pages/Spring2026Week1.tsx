import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Code, ChevronDown, ChevronUp, FileText, Calculator, LineChart, Bot, Cpu, TrendingUp, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import busAppScreenshot from "@/assets/bus-app-duplicate-stops.png";

const Spring2026Week1 = () => {
  const [currentPart, setCurrentPart] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/spring-2026">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Week 1</p>
              <h1 className="text-4xl font-bold text-primary">Course Introduction & Overview</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Welcome to GCAP3226! This week provides a gentle introduction to the course themes and the final project that will guide your learning journey.
          </p>
        </div>

        {/* Part Navigation */}
        <div className="flex gap-4">
          <Button
            variant={currentPart === 1 ? "default" : "outline"}
            onClick={() => setCurrentPart(1)}
            className="flex-1"
          >
            <Database className="h-4 w-4 mr-2" />
            Part 1: Data Governance (Dr. Simon)
          </Button>
          <Button
            variant={currentPart === 2 ? "default" : "outline"}
            onClick={() => setCurrentPart(2)}
            className="flex-1"
          >
            <Code className="h-4 w-4 mr-2" />
            Part 2: Technology & Math (Dr. Talia)
          </Button>
        </div>

        {/* Part Content */}
        {currentPart === 1 ? <Part1DataGovernance /> : <Part2TechnologyMath />}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPart(1)}
            disabled={currentPart === 1}
          >
            ← Part 1
          </Button>
          <Button
            onClick={() => setCurrentPart(2)}
            disabled={currentPart === 2}
          >
            Part 2 →
          </Button>
        </div>
      </div>
    </div>
  );
};

const Part1DataGovernance = () => {
  const [showBusExample, setShowBusExample] = useState(false);
  const [showFluShotLetter, setShowFluShotLetter] = useState(false);

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Part 1: Critical Review of Data Governance
          </CardTitle>
          <p className="text-sm text-muted-foreground">Presented by Dr. Simon Wang</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Message */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-lg mb-2">Key Questions for This Course</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• How does the Hong Kong government make decisions?</li>
              <li>• To what extent are these decisions informed by data?</li>
              <li>• How can citizens engage constructively to improve data governance?</li>
            </ul>
          </div>

          {/* Final Project Preview */}
          <div className="p-4 bg-accent/50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Your Final Project</h3>
            <p className="text-muted-foreground mb-3">
              Throughout this course, you'll work in teams to investigate a real policy issue in Hong Kong. Your journey will involve:
            </p>
            <ol className="space-y-2 text-muted-foreground">
              <li><strong>1. Identify</strong> – Choose a policy area and identify specific government decisions</li>
              <li><strong>2. Investigate</strong> – Curate public data and request information from government</li>
              <li><strong>3. Analyze</strong> – Apply mathematical modeling to explore how data governance could improve</li>
              <li><strong>4. Advocate</strong> – Submit a report and poster to the Legislative Council</li>
            </ol>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/spring-2026/assessments/final-report">
                  <FileText className="h-4 w-4 mr-2" />
                  View Final Project Details
                </Link>
              </Button>
            </div>
          </div>

          {/* Appetizer Example: St Martin Bus Stop */}
          <Collapsible open={showBusExample} onOpenChange={setShowBusExample}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🚌 Appetizer: The St Martin Bus Stop Problem
                </span>
                {showBusExample ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Here's a simple example of citizen engagement with government. When Dr. Simon noticed duplicate bus stop names causing passenger confusion, he wrote to the Transport Department. This small example shows how constructive engagement can lead to change.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">The Problem</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Two stops with the same name "St MARTIN"</li>
                      <li>• Passengers confused about which stop they're at</li>
                      <li>• A data governance issue: lack of unique identifiers</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">The Outcome</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      After escalating to the Assistant Director with a clear explanation, the department coordinated with bus companies to fix the issue.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    src={busAppScreenshot} 
                    alt="KMB Bus App showing duplicate St Martin stops"
                    className="rounded-lg shadow-lg border max-h-[300px] object-contain"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    KMB app showing duplicate "St MARTIN" stops
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                This is just an appetizer – a simple case to illustrate the concept. Your projects will tackle more sophisticated policy issues with real data analysis.
              </p>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  📧 <strong>Letter to Transport Department Assistant Director</strong> – to be added
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Main Example: Flu Shot Program */}
          <Collapsible open={showFluShotLetter} onOpenChange={setShowFluShotLetter}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-primary/5">
                <span className="flex items-center gap-2">
                  💉 Featured Example: Influenza Vaccination Program
                </span>
                {showFluShotLetter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The Policy Issue</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  The Hong Kong government runs influenza vaccination programs for the elderly and school children, but participation rates remain low. This raises important questions:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• What data does the government collect on vaccination coverage?</li>
                  <li>• How do they decide where to allocate resources?</li>
                  <li>• Could better data governance improve participation rates?</li>
                </ul>
              </div>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  📰 <strong>Letter to the Editor on Flu Shots</strong> – to be added
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  This example will be used to introduce one of the potential project topics for this semester.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Connecting to the Course */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What's Coming in the Next Few Weeks</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Weeks 1-3:</strong> Identify your policy issue, learn about data availability, start government requests</li>
              <li>• <strong>Weeks 4-6:</strong> Data collection and fieldwork</li>
              <li>• <strong>Weeks 7-9:</strong> Mathematical modeling and analysis</li>
              <li>• <strong>Weeks 10-12:</strong> Report writing and LegCo submission</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Part2TechnologyMath = () => {
  const [showPython, setShowPython] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMath, setShowMath] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-500" />
            Part 2: Technology & Math Overview
          </CardTitle>
          <p className="text-sm text-muted-foreground">Presented by Dr. Talia Wu</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <h3 className="font-semibold mb-2">Tools for Your Project</h3>
            <p className="text-sm text-muted-foreground">
              Throughout this course, you'll learn to use technology and mathematical tools to analyze policy issues. Don't worry if you're new to these – we'll guide you step by step!
            </p>
          </div>

          {/* Python & Programming */}
          <Collapsible open={showPython} onOpenChange={setShowPython}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  Programming with Python
                </span>
                {showPython ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Python is widely used for data analysis. We'll use simple scripts to collect and analyze public data.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono">
                <pre>{`# Example: Fetching public data
import requests

response = requests.get("https://api.data.gov.hk/...")
data = response.json()

# Analyze the results
print(f"Found {len(data)} records")`}</pre>
              </div>
              <p className="text-xs text-muted-foreground">
                No prior programming experience needed – you'll learn as you go, with AI assistance.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Tools */}
          <Collapsible open={showAI} onOpenChange={setShowAI}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-purple-500" />
                  AI-Assisted Analysis
                </span>
                {showAI ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                AI tools like GitHub Copilot and ChatGPT can help you write code, analyze data, and draft reports. In this course, you'll learn to use AI as a collaborative partner.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-sm">What AI Can Help With</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Writing and debugging code</li>
                    <li>• Analyzing patterns in data</li>
                    <li>• Drafting sections of your report</li>
                  </ul>
                </div>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-sm">Your Responsibility</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Verify AI outputs for accuracy</li>
                    <li>• Understand the logic behind analyses</li>
                    <li>• Take ownership of final work</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mathematical Modeling */}
          <Collapsible open={showMath} onOpenChange={setShowMath}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-green-500" />
                  Mathematical Modeling
                </span>
                {showMath ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll explore how mathematical models can help understand and predict policy outcomes.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium text-sm">Simulation Modeling</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Model "what if" scenarios – e.g., what happens if vaccination rates increase by 10%?
                  </p>
                </div>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium text-sm">Regression Analysis</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Find relationships in data – e.g., factors affecting service usage patterns.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Looking Ahead */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What You'll Learn</h3>
            <p className="text-sm text-muted-foreground">
              By the end of this course, you'll be able to collect data, apply mathematical models, use AI tools responsibly, and present evidence-based policy recommendations. We'll build these skills progressively throughout the semester.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spring2026Week1;
