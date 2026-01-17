/**
 * Spring 2026 Week 2 - Development Environment Setup
 * 
 * This page guides students through:
 * 1. Installing VS Code
 * 2. Creating a GitHub account with HKBU email
 * 3. Applying for GitHub Education benefits
 * 4. Setting up for Vibe Coding
 */

import { Link } from "react-router-dom";
import { 
  ArrowLeft, Download, ExternalLink, CheckCircle2, 
  Github, Code2, GraduationCap, Sparkles, ChevronRight,
  Monitor, Mail, Gift, Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Setup steps data
const SETUP_STEPS = [
  {
    id: 1,
    title: "Install Visual Studio Code",
    icon: Code2,
    color: "blue",
    description: "VS Code is a free, powerful code editor that works great with AI coding assistants.",
    time: "5-10 min",
    instructions: [
      "Go to https://code.visualstudio.com/",
      "Click the download button for your operating system (Windows, macOS, or Linux)",
      "Run the installer and follow the prompts",
      "Launch VS Code to confirm it works"
    ],
    links: [
      { label: "Download VS Code", url: "https://code.visualstudio.com/download", primary: true },
      { label: "Installation Guide", url: "https://code.visualstudio.com/docs/setup/setup-overview" }
    ],
    tips: [
      "On Windows, check 'Add to PATH' during installation for easier terminal access",
      "On macOS, drag VS Code to your Applications folder"
    ]
  },
  {
    id: 2,
    title: "Create a GitHub Account",
    icon: Github,
    color: "purple",
    description: "GitHub is where developers store and share code. Use your HKBU email for education benefits!",
    time: "5 min",
    instructions: [
      "Go to https://github.com/signup",
      "Enter your HKBU email address (e.g., yourname@life.hkbu.edu.hk)",
      "Create a strong password and choose a username",
      "Complete the verification process",
      "Verify your email address by clicking the link GitHub sends you"
    ],
    links: [
      { label: "Create GitHub Account", url: "https://github.com/signup", primary: true }
    ],
    tips: [
      "Use your HKBU email - this is required for GitHub Education benefits",
      "Choose a professional username - this may appear on your future projects",
      "Enable two-factor authentication for better security"
    ]
  },
  {
    id: 3,
    title: "Apply for GitHub Education",
    icon: GraduationCap,
    color: "green",
    description: "Get free access to GitHub Copilot and other developer tools worth $200+/year!",
    time: "5-10 min",
    instructions: [
      "Go to https://education.github.com/students",
      "Click 'Sign up for Global Campus'",
      "Sign in with your GitHub account",
      "Select your school (Hong Kong Baptist University)",
      "Verify your student status (may require student ID photo or HKBU email verification)",
      "Wait for approval (usually within a few hours to a few days)"
    ],
    links: [
      { label: "GitHub Education", url: "https://education.github.com/students", primary: true },
      { label: "Student Developer Pack", url: "https://education.github.com/pack" }
    ],
    tips: [
      "Use your HKBU student ID if email verification doesn't work",
      "Make sure your GitHub profile shows your real name",
      "Benefits include free GitHub Copilot, domain names, cloud credits, and more!"
    ]
  },
  {
    id: 4,
    title: "Install GitHub Copilot Extension",
    icon: Sparkles,
    color: "amber",
    description: "GitHub Copilot is an AI coding assistant that helps you write code by understanding natural language.",
    time: "5 min",
    instructions: [
      "Open VS Code",
      "Click the Extensions icon in the left sidebar (or press Ctrl+Shift+X / Cmd+Shift+X)",
      "Search for 'GitHub Copilot'",
      "Click Install on 'GitHub Copilot' (by GitHub)",
      "Also install 'GitHub Copilot Chat' for conversational AI assistance",
      "Sign in with your GitHub account when prompted"
    ],
    links: [
      { label: "Copilot Extension", url: "https://marketplace.visualstudio.com/items?itemName=GitHub.copilot", primary: true },
      { label: "Copilot Documentation", url: "https://docs.github.com/en/copilot" }
    ],
    tips: [
      "You need GitHub Education approval before Copilot will work for free",
      "Copilot Chat lets you ask coding questions in plain English",
      "Start with simple prompts and gradually get more specific"
    ]
  }
];

const Spring2026Week2Setup = () => {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
      purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400", icon: "text-purple-500" },
      green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600 dark:text-green-400", icon: "text-green-500" },
      amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", icon: "text-amber-500" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/spring-2026/weeks/2">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Week 2
              </Button>
            </Link>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">
            <Laptop className="w-3 h-3 mr-1" />
            Setup Guide
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
            <Monitor className="w-4 h-4" />
            Development Environment Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Get Ready for Vibe Coding</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set up your development environment with VS Code, GitHub, and AI-powered coding tools. 
            This one-time setup will prepare you for AI-assisted programming throughout the course.
          </p>
        </section>

        {/* Time Estimate */}
        <Alert className="border-primary/30 bg-primary/5">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertTitle>Estimated Time: 20-30 minutes</AlertTitle>
          <AlertDescription>
            Complete all 4 steps below. You only need to do this once - your setup will be ready for all future labs.
          </AlertDescription>
        </Alert>

        {/* What You'll Get */}
        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Code2 className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <p className="font-medium text-sm">VS Code</p>
              <p className="text-xs text-muted-foreground">Code Editor</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Github className="w-8 h-8 mx-auto text-purple-500 mb-2" />
              <p className="font-medium text-sm">GitHub</p>
              <p className="text-xs text-muted-foreground">Code Hosting</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Gift className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <p className="font-medium text-sm">Education Pack</p>
              <p className="text-xs text-muted-foreground">$200+ Free Tools</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Sparkles className="w-8 h-8 mx-auto text-amber-500 mb-2" />
              <p className="font-medium text-sm">GitHub Copilot</p>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </CardContent>
          </Card>
        </section>

        {/* Setup Steps */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Setup Steps</h2>
          
          <div className="space-y-4">
            {SETUP_STEPS.map((step) => {
              const colorClasses = getColorClasses(step.color);
              const IconComponent = step.icon;
              
              return (
                <Card key={step.id} className={`${colorClasses.border}`}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`step-${step.id}`} className="border-0">
                      <AccordionTrigger className="px-4 sm:px-6 hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <div className={`w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center shrink-0`}>
                            <IconComponent className={`w-5 h-5 ${colorClasses.icon}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">Step {step.id}: {step.title}</span>
                              <Badge variant="secondary" className="text-xs">{step.time}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground hidden sm:block">{step.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-6 pb-6">
                        <div className="space-y-4 pt-2">
                          {/* Mobile description */}
                          <p className="text-sm text-muted-foreground sm:hidden">{step.description}</p>
                          
                          {/* Instructions */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Instructions:</h4>
                            <ol className="space-y-2">
                              {step.instructions.map((instruction, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-medium shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="text-muted-foreground">{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Links */}
                          <div className="flex flex-wrap gap-2">
                            {step.links.map((link, idx) => (
                              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                                <Button variant={link.primary ? "default" : "outline"} size="sm">
                                  {link.primary ? <Download className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                                  {link.label}
                                </Button>
                              </a>
                            ))}
                          </div>

                          {/* Tips */}
                          {step.tips && step.tips.length > 0 && (
                            <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                              <h4 className={`font-medium text-sm mb-2 ${colorClasses.text}`}>💡 Tips:</h4>
                              <ul className="space-y-1">
                                {step.tips.map((tip, idx) => (
                                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <span>•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Next Steps */}
        <section className="text-center space-y-4 py-8">
          <h2 className="text-xl font-semibold">Ready to Start Vibe Coding?</h2>
          <p className="text-muted-foreground">
            Once you've completed the setup, try our interactive Vibe Coding simulator to practice!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/spring-2026/weeks/2/lab">
              <Button size="lg" className="w-full sm:w-auto">
                <Sparkles className="w-4 h-4 mr-2" />
                Try Vibe Coding Simulator
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/spring-2026/weeks/2">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Back to Week 2
              </Button>
            </Link>
          </div>
        </section>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Need Help?
            </CardTitle>
            <CardDescription>
              If you encounter any issues during setup, don't hesitate to reach out:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Ask during class or office hours</p>
            <p>• Post in the course message board</p>
            <p>• Check the official documentation linked above</p>
            <p>• Search for solutions on YouTube - there are many helpful tutorials!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026Week2Setup;
