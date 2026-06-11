import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, AlertTriangle, MapPin, FileSpreadsheet, Users, Calendar, Target, FolderOpen, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProjectMembership from "@/components/ProjectMembership";
import ProjectSessions from "@/components/ProjectSessions";
import ProjectMilestones from "@/components/ProjectMilestones";
import ProjectFileUpload from "@/components/ProjectFileUpload";
import { Fall2026Chat } from "@/components/Fall2026Chat";

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </h2>
      {children}
    </Card>
  );
}

const TOPIC_SLUG = "fall2026-road-safety";

const HOTSPOTS = [
  { name: "Chatham Rd S × Austin Rd × Cheong Wan Rd", district: "Yau Tsim Mong", count: 222, note: "Outside PolyU — Talia's suggested anchor case (combine with traffic volume)" },
  { name: "Tsuen Tsing Interchange × Tsuen Wan Rd", district: "Tsuen Wan", count: 209 },
  { name: "Waterloo Rd × Argyle St × Princess Margaret Rd", district: "Kowloon City", count: 161 },
  { name: "Nathan Rd × Mong Kok Rd", district: "Yau Tsim Mong", count: 144 },
  { name: "Kweilin St × Tai Nan St", district: "Sham Shui Po", count: null, note: "Worst pedestrian-involved hotspot — narrow one-way junction" },
];

const SUB_QUESTIONS = [
  "Extend the negative-binomial model from top 15 to full 21 junctions (Talia's open question).",
  "Chatham Rd South case study: add traffic-volume covariate.",
  "Pedestrian-injury sub-model around Kweilin × Tai Nan.",
  "Sensitivity analysis excluding 2020–2021 COVID years.",
  "Compare threshold-based imputation (Class A rule) vs current zero-fill.",
];

const DATA_SOURCES = [
  "Transport Department — quarterly accident blackspot lists (2015–2024, 40 files consolidated)",
  "Hong Kong Police Force — signal-controlled junction dataset (psi-hkpf-ts-sc.json)",
  "Google Maps — manual geometry observation for 8 IVs per junction",
  "2019 reference paper — Designs for Safer Signal-Controlled Intersections (PDF in Drive)",
];

export default function Fall2026RoadSafetyProject() {
  const [projectGroupId, setProjectGroupId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const m = localStorage.getItem(`project_member_${TOPIC_SLUG}`);
    const t = localStorage.getItem(`project_is_teacher_${TOPIC_SLUG}`);
    if (m) setMemberId(m);
    if (t === "true") setIsTeacher(true);
  }, []);

  useEffect(() => {
    supabase
      .from("project_groups")
      .select("id")
      .eq("topic_slug", TOPIC_SLUG)
      .single()
      .then(({ data }) => setProjectGroupId(data?.id || null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link to="/fall-2026/topics"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-xs sm:text-sm text-muted-foreground">Group Project 1 · Fall 2026</p>
              <Badge>From Talia</Badge>
              <Badge variant="outline">Handover from Spring 2026</Badge>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              Road Safety — Accident Blackspots
            </h1>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto gap-1 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Info className="h-3.5 w-3.5" /> <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Users className="h-3.5 w-3.5" /> <span>Team</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Calendar className="h-3.5 w-3.5" /> <span>Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Target className="h-3.5 w-3.5" /> <span>Milestones</span>
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Sparkles className="h-3.5 w-3.5" /> <span>AI Tutor</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <FolderOpen className="h-3.5 w-3.5" /> <span>Files</span>
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="p-4 sm:p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-primary mt-1" />
                <h2 className="font-semibold">Talia's note for next semester</h2>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Chatham Road South–Austin Road–Cheong Wan Road is Hong Kong's most severe
                accident hotspot from 2015 to 2024 — the junction right out of PolyU. It will be
                interesting to combine this information with traffic volume and explore the
                relationship. <strong className="text-foreground not-italic">I may leave this task to GCAP3226 students next semester.</strong>"
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Tian (Talia) WU, 10 Jun 2026</p>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-2">Project overview</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                A live research strand handed down from the Spring 2026 TA team (Yingxin HUANG &
                Zehua WANG, supervised by Dr Tian WU). The dataset is already cleaned to annual
                granularity; 21 junctions are pre-selected; 8 geometry independent variables are
                collected. Your team picks a sub-question, runs the analysis, and turns it into
                a policy-relevant deliverable mirroring the Spring 2026 final-report format.
              </p>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" /> What is already established
              </h2>
              <ul className="text-sm space-y-1.5 text-muted-foreground list-disc pl-5">
                <li>Quarterly TD figures are <strong>cumulative-to-date</strong> within the year (Q4 = full year), not single-quarter.</li>
                <li><strong>21 junctions</strong> selected (≥5 years as blackspot AND &gt;50 pre-imputation accidents).</li>
                <li><strong>Top 15 of those 21</strong> are in the latest regression sheet — <em>why 15 vs 21 is Talia's open question for you.</em></li>
                <li><strong>8 independent variables</strong> per junction (manual Google Maps observation).</li>
                <li>Missing values currently zero-filled; alternative is Class-A threshold (≥6 ped-injury / ≥9 injury per year).</li>
                <li>Site names standardised to UPPERCASE.</li>
                <li>Methods tried: negative binomial / Poisson regression. COVID dip (2020–2021) needs handling.</li>
              </ul>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Anchor hotspots (2015–2024)
              </h2>
              <div className="space-y-2">
                {HOTSPOTS.map((h) => (
                  <div key={h.name} className="flex items-start justify-between gap-3 text-sm border-b last:border-0 pb-2 last:pb-0">
                    <div>
                      <div className="font-medium">{h.name}</div>
                      <div className="text-xs text-muted-foreground">{h.district}{h.note ? ` · ${h.note}` : ""}</div>
                    </div>
                    {h.count !== null && <Badge variant="secondary" className="shrink-0">{h.count}</Badge>}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3">Key research questions (pick one)</h2>
              <ul className="space-y-2">
                {SUB_QUESTIONS.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span><span>{q}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3">Data sources</h2>
              <ul className="space-y-2">
                {DATA_SOURCES.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ExternalLink className="h-4 w-4 text-primary mt-1 flex-shrink-0" /><span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://drive.google.com/drive/folders/131o-54qu9lQc2R3HzxUyBqD4p07F_jg9" target="_blank" rel="noreferrer">
                    Open shared Drive folder <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-accent/30">
              <h2 className="font-semibold mb-2 text-sm">Relevant SDGs</h2>
              <p className="text-xs text-muted-foreground"><strong>SDG 3.6</strong> — halve global deaths/injuries from road traffic accidents by 2030. <strong>SDG 11.2</strong> — safe, accessible transport systems.</p>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            {projectGroupId ? (
              <ProjectMembership projectGroupId={projectGroupId} topicSlug={TOPIC_SLUG} topicTitle="Road Safety (Fall 2026)" />
            ) : <Card className="p-6 text-center text-muted-foreground">Loading…</Card>}
          </TabsContent>

          <TabsContent value="meetings">
            {projectGroupId ? (
              <ProjectSessions projectGroupId={projectGroupId} topicSlug={TOPIC_SLUG} memberId={memberId} isTeacher={isTeacher} />
            ) : <Card className="p-6 text-center text-muted-foreground">Loading…</Card>}
          </TabsContent>

          <TabsContent value="milestones">
            {projectGroupId ? (
              <ProjectMilestones projectGroupId={projectGroupId} isTeacher={isTeacher} />
            ) : <Card className="p-6 text-center text-muted-foreground">Loading…</Card>}
          </TabsContent>

          <TabsContent value="tutor">
            <Fall2026Chat
              scope="topic"
              topicSlug="road-safety"
              title="Road Safety — Project AI Tutor"
              description="Briefed on the full Spring 2026 handover: dataset structure, 21 junctions, 8 IVs, hotspots, and open questions. All messages (yours and the tutor's) are saved and visible to your classmates."
            />
          </TabsContent>

          <TabsContent value="files">
            {projectGroupId ? (
              <ProjectFileUpload projectGroupId={projectGroupId} topicSlug={TOPIC_SLUG} />
            ) : <Card className="p-6 text-center text-muted-foreground">Loading…</Card>}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
