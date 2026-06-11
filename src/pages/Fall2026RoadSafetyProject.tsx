import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileSpreadsheet, FileText, MapPin, AlertTriangle, ExternalLink } from "lucide-react";
import { Fall2026Chat } from "@/components/Fall2026Chat";

const HOTSPOTS = [
  { name: "Chatham Rd South × Austin Rd × Cheong Wan Rd", district: "Yau Tsim Mong", count: 222, note: "Right outside PolyU — Talia's suggested anchor case" },
  { name: "Tsuen Tsing Interchange × Tsuen Wan Rd", district: "Tsuen Wan", count: 209 },
  { name: "Waterloo Rd × Argyle St × Princess Margaret Rd", district: "Kowloon City", count: 161 },
  { name: "Nathan Rd × Mong Kok Rd", district: "Yau Tsim Mong", count: 144 },
  { name: "Kweilin St × Tai Nan St", district: "Sham Shui Po", count: null, note: "Worst pedestrian-involved hotspot (narrow one-way junction)" },
];

const WEEKLY_PLAN = [
  { week: "Weeks 1–2", title: "Onboarding & data orientation", items: [
    "Read the 2019 reference paper and the TA handover note.",
    "Reproduce Yingxin's EDA notebook locally (Data 0604.xlsx).",
    "Moodle forum: post one observation about the cleaned dataset.",
  ]},
  { week: "Weeks 3–4", title: "Pick your sub-question", items: [
    "Choose: (a) extend the negative-binomial model to the 21-junction sample, (b) add traffic-volume covariate for Chatham Rd South case, or (c) pedestrian-injury sub-model around Kweilin/Tai Nan.",
    "Draft 1-page research memo with question, data, method.",
  ]},
  { week: "Weeks 5–7", title: "Modelling & validation", items: [
    "Run regression with the 8 IVs collected via Google Maps.",
    "Cross-check imputation choice (zero vs threshold-based, Class A blackspot rule).",
    "Sensitivity analysis: drop 2020–2021 COVID years.",
  ]},
  { week: "Weeks 8–10", title: "Field verification & visualisation", items: [
    "Site visit to your assigned junction; capture geometry photos.",
    "Build interactive Folium map overlay for the report.",
    "Draft policy brief framing (LegCo / Transport Dept audience).",
  ]},
  { week: "Weeks 11–13", title: "Deliverables", items: [
    "Final notebook + slide deck (mirrors Spring 2026 deliverable structure).",
    "Optional: contribute back to the road-safety paper extension Talia is exploring.",
  ]},
];

export default function Fall2026RoadSafetyProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/fall-2026/topics"><ArrowLeft className="h-4 w-4 mr-1" /> All topics</Link>
        </Button>

        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded">Topic 1</span>
            <Badge>From Talia</Badge>
            <Badge variant="outline">Handover from Spring 2026 TA team</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Road Safety — Accident Blackspots</h1>
          <p className="text-muted-foreground max-w-3xl">
            A live research strand handed down from the Spring 2026 TA team (Yingxin HUANG &
            Zehua WANG, supervised by Talia WU). The dataset is already cleaned; your job is to
            push the analysis further and turn it into a policy-relevant deliverable.
          </p>
        </header>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" /> Talia's note for next semester
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            "Chatham Road South–Austin Road–Cheong Wan Road is Hong Kong's most severe accident
            hotspot from 2015 to 2024 — the junction right out of PolyU. It will be interesting
            to combine this information with traffic volume and explore the relationship.
            <strong className="text-foreground"> I may leave this task to GCAP3226 students next semester.</strong>"
            <div className="mt-2 text-xs">— Tian (Talia) WU, 10 Jun 2026</div>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Datasets ready to use</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <div><strong>Data (0604).xlsx</strong> — annual data for the top 15 blackspots × 8 independent variables (regression-ready), plus an Original-data sheet consolidating 40 Transport Department files 2015–2024.</div>
              <div><strong>Accident Blackspots Visualization & Key Findings (0605).ipynb</strong> — full EDA, runs standalone.</div>
              <div><strong>Junction Blackspot list 2004–2024</strong> — yearly source files.</div>
              <div className="text-xs text-muted-foreground">All in the shared Drive folder <code>GCAP3226_2526S2_RoadSafety</code>.</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> What was already established</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-1.5">
              <div>• Quarterly figures are <strong>cumulative-to-date</strong>, not single-quarter (Q4 = full year).</div>
              <div>• <strong>21 junctions</strong> selected (≥5 years on the list AND &gt;50 pre-imputation accidents).</div>
              <div>• <strong>8 IVs</strong> collected via Google Maps observation per junction.</div>
              <div>• Site names standardised to UPPERCASE.</div>
              <div>• Imputation: zero-fill currently; threshold-based (Class A: ≥6 ped-injury or ≥9 injury / year) still open.</div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Anchor hotspots (2015–2024)</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {HOTSPOTS.map((h) => (
                <div key={h.name} className="flex items-start justify-between gap-3 text-sm border-b last:border-0 pb-2 last:pb-0">
                  <div>
                    <div className="font-medium">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.district}{h.note ? ` · ${h.note}` : ""}</div>
                  </div>
                  {h.count !== null && <Badge variant="secondary">{h.count} accidents</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Suggested student roadmap (mapped to course weeks)</h2>
          <div className="grid gap-3">
            {WEEKLY_PLAN.map((p) => (
              <Card key={p.week}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{p.week}</Badge>
                    <CardTitle className="text-sm">{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {p.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader><CardTitle className="text-base">Reference materials (placeholders)</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1.5 text-muted-foreground">
            <div>• 2019 paper — <em>Designs for Safer Signal-Controlled Intersections by Statistical Analysis of Accident Data at Accident Blacksites</em> (in Drive folder).</div>
            <div>• Transport Department open data portal — quarterly accident blackspot lists.</div>
            <div>• HKPF signal-controlled junction dataset (<code>psi-hkpf-ts-sc.json</code>).</div>
            <div className="pt-2"><Button variant="outline" size="sm" asChild>
              <a href="https://drive.google.com/drive/folders/131o-54qu9lQc2R3HzxUyBqD4p07F_jg9" target="_blank" rel="noreferrer">
                Open shared Drive folder <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button></div>
          </CardContent>
        </Card>

        <Fall2026Chat
          scope="topic"
          topicSlug="road-safety"
          title="Road Safety — Project AI Tutor"
          description="Ask about the dataset, the 8 independent variables, the negative-binomial model, or how to scope your sub-question. The tutor has context about the Spring 2026 TA handover."
        />
      </div>
    </div>
  );
}
