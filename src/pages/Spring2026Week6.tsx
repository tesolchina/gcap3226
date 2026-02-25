import WeekLayout from "@/components/WeekLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, ExternalLink, Maximize2, ChevronDown, AlertCircle, Bot, Github } from "lucide-react";
import { useState } from "react";

const teamDocs = [
  {
    team: "Team 1",
    title: "GCAP 3226 — Team 1: European Office of HK Government",
    url: "https://docs.google.com/document/d/1glqzdwSgr7GLwOJxn5pP5DM64Raf7C8LfHlGKch_b48/edit?usp=drive_link",
    embedUrl: "https://docs.google.com/document/d/1glqzdwSgr7GLwOJxn5pP5DM64Raf7C8LfHlGKch_b48/preview",
  },
  {
    team: "Team 2",
    title: "GCAP 3226 — Team 2: HK Government AI Enhancement",
    url: "https://docs.google.com/document/d/12Ps9vLmcTKaerSxTJdSYbSvPqtxaUEP4YprnOt6JeeQ/edit?usp=drive_link",
    embedUrl: "https://docs.google.com/document/d/12Ps9vLmcTKaerSxTJdSYbSvPqtxaUEP4YprnOt6JeeQ/preview",
  },
];

const GITHUB_REPO_URL = "https://github.com/tesolchina/genAI2026/tree/main/courses/gcap3226";

const TeamDocEmbed = ({ doc }: { doc: typeof teamDocs[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-sm">{doc.team}</p>
                <p className="text-xs text-muted-foreground">{doc.title}</p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t">
            <div className="flex items-center justify-end gap-2 px-4 py-2 bg-muted/30">
              <Button variant="ghost" size="sm" asChild>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in New Tab
                </a>
              </Button>
            </div>
            <iframe
              src={doc.embedUrl}
              className="w-full h-[600px] border-0"
              title={doc.title}
              allow="autoplay"
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const Spring2026Week6 = () => (
  <WeekLayout
    weekNumber={6}
    title="Field Work"
    description="Conduct fieldwork to collect empirical data according to your Week 5 plan. This is experiential learning in action. Note: 18 Feb is a public holiday."
    objectives={[
      "Execute your empirical data collection plan in real-world settings",
      "Collect primary data through interviews, observations, or surveys",
      "Send finalized data request letters to government departments",
      "Document fieldwork experiences for reflection",
      "Apply ethical research practices in data collection",
    ]}
    activities={[
      "Conduct fieldwork according to your approved plan",
      "Collect primary empirical data (interviews, observations, surveys)",
      "Send data request emails to government departments",
      "Document experiences and preliminary findings",
      "Team coordination and safety protocols",
    ]}
    techSetup={{
      tools: [
        "Data collection forms/templates",
        "Recording equipment (with consent)",
        "Field notes template",
        "Government email contacts for data requests",
      ],
      support: [
        "Work in teams for safety during fieldwork",
        "Follow ethical guidelines for human subjects research",
        "Document everything for Reflective Essay 2",
        "Contact teacher if encountering difficulties",
      ],
    }}
    customContent={
      <div className="space-y-6">
        {/* Request Edit Access Alert */}
        <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 dark:text-amber-200">Request Edit Access</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            Please open your team's Google Doc below and <strong>request edit access</strong> so you can collaborate on the fieldwork documentation. Click "Open in New Tab" and then request access from the document.
          </AlertDescription>
        </Alert>

        {/* Team Google Docs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Team Fieldwork Documents
          </h2>
          {teamDocs.map((doc) => (
            <TeamDocEmbed key={doc.team} doc={doc} />
          ))}
        </div>

        {/* Agentic AI + GitHub Repo */}
        <Card className="p-6 bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-5 w-5 text-violet-600" />
            <h2 className="text-xl font-semibold text-violet-800 dark:text-violet-200">Using Agentic AI for Course Materials</h2>
          </div>
          <p className="text-violet-700 dark:text-violet-300 mb-4">
            Use agentic AI tools (e.g. ChatGPT, Gemini, Claude) to help you access and work with the course materials in the GitHub repository below. You can ask your AI assistant to read, summarize, and analyze materials directly from this repo.
          </p>
          <Button variant="outline" asChild className="border-violet-300 text-violet-700 hover:bg-violet-100 dark:border-violet-600 dark:text-violet-300 dark:hover:bg-violet-900/50">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Course Materials on GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </Card>
      </div>
    }
  />
);

export default Spring2026Week6;
