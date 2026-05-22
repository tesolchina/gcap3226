import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  ExternalLink,
  Target,
  ListChecks,
  MessageSquare,
  Sparkles,
  EyeOff,
  Mail,
} from "lucide-react";

const DOC_URL =
  "https://docs.google.com/document/d/1uSXKHkR-z-Z9xSkw12_bcVaWQr0GHmagts6mSmqPUxY/edit";
const FOLDER_URL =
  "https://drive.google.com/drive/folders/131o-54qu9lQc2R3HzxUyBqD4p07F_jg9";

const driveFiles = [
  {
    name: "Junction Blacksite list (2004–2024)",
    type: "Folder — yearly subfolders",
  },
  {
    name: "2014-2024 交通黑点数据统计.xlsx",
    type: "Spreadsheet — blacksite statistics",
  },
  {
    name: "psi-hkpf-ts-sc.json",
    type: "HKPF traffic / signal-controlled junction data",
  },
  { name: "existing visualization.txt", type: "Notes" },
  {
    name: "2019 — Designs for Safer Signal-Controlled Intersections (paper)",
    type: "Reference paper to replicate",
  },
];

const openQuestions = [
  "Summary of data-collection progress from government units, plus a timeline",
  "How to incorporate this project into GCAP 3226",
  "Can we pursue a research project leading to practical insights and publishable papers?",
  "How to leverage an AI agent in the workflow",
];

const Spring2026TrafficSafetyResearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
              <Link to="/spring-2026">
                <ArrowLeft className="mr-1 h-4 w-4" /> Course Home
              </Link>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Traffic Safety Research — Junction Blacksites
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Collaboration with Tian Wu · signal-controlled intersection safety
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <EyeOff className="h-3 w-3" /> Unlisted page
          </Badge>
        </div>

        {/* Privacy note */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4 text-sm flex gap-3">
            <EyeOff className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
            <div>
              This page is intentionally <strong>not linked</strong> from the homepage
              or sidebar. Share the URL directly with collaborators only.
            </div>
          </CardContent>
        </Card>

        {/* Project target */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Project Target
            </CardTitle>
            <CardDescription>From the shared Google Doc</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              Replicate the study on the relationship between{" "}
              <strong>accident counts and intersection layout geometries</strong> at a
              range of signal-controlled intersections, with the aim of improving safety
              at these sites.
            </p>
            <div>
              <h3 className="font-semibold mb-2">Final deliverables</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>
                  Slide deck — background, research question(s), methodology, results,
                  conclusion
                </li>
                <li>Jupyter Notebook implementing the methodology</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Open questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Open Questions (Simon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              {openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Source materials */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" /> Project Doc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={DOC_URL} target="_blank" rel="noopener noreferrer">
                  Open Google Doc <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FolderOpen className="h-4 w-4 text-primary" /> Drive Folder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={FOLDER_URL} target="_blank" rel="noopener noreferrer">
                  Open Drive Folder <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Data inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" /> Data Inventory
            </CardTitle>
            <CardDescription>Snapshot of shared Drive materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {driveFiles.map((f) => (
                <li
                  key={f.name}
                  className="flex items-start gap-3 p-3 rounded-md bg-muted/40"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.type}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Email correspondence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> Recent Email with Tian Wu
            </CardTitle>
            <CardDescription>
              taliawu17@hkbu.edu.hk · synthesised from Simon's Gmail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="p-3 rounded-md bg-muted/40">
                <div className="font-medium">
                  14 May 2026 — Drive folder shared: <em>GCAP3226_2526S2_RoadSafety</em>
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  Working folder for the road-safety strand; junction blacksite
                  materials live here.
                </div>
              </li>
              <li className="p-3 rounded-md bg-muted/40">
                <div className="font-medium">
                  15 May 2026 — "GCAP 3226 catch up" meeting (10:00–11:00 HKT)
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  Sync to align on next steps for the collaboration.
                </div>
              </li>
              <li className="p-3 rounded-md bg-muted/40">
                <div className="font-medium">
                  13–14 Feb 2026 — Student helpers &amp; VTL funding report
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  Helper job scope explicitly lists <strong>road safety</strong> as a
                  task area. VTL funding report due in May — keep deliverables
                  aligned with what can be cited there.
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>


        {/* Next steps */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Proposed Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Draft a data-collection timeline summarising what has been received from
                Transport Department / HKPF and what is still outstanding.
              </li>
              <li>
                Decide where this fits in GCAP 3226 — candidate hooks: Week&nbsp;1 case
                study, an optional advanced track, or a dedicated capstone for interested
                students.
              </li>
              <li>
                Scope a replication study of the 2019 paper using the 2014–2024
                blacksite dataset, with a publishable comparative analysis as a stretch
                goal.
              </li>
              <li>
                Prototype an AI-agent workflow that ingests the Drive folder, extracts
                intersection geometry, and proposes candidate blacksites for review.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026TrafficSafetyResearch;
