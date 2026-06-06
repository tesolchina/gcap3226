import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Section = ({ title, children, tba = false }: { title: string; children: React.ReactNode; tba?: boolean }) => (
  <Card className="p-6 space-y-3">
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {tba && <Badge variant="outline" className="text-[10px]">TBA</Badge>}
    </div>
    <div className="text-sm text-muted-foreground space-y-2">{children}</div>
  </Card>
);

const Fall2026Syllabus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">Fall 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Syllabus</h1>
          <p className="text-muted-foreground">
            Structure mirrors Spring 2026. Specific dates, readings, and the final 10 project
            topics will be filled in over the summer.
          </p>
        </header>

        <Section title="Course title">
          GCAP 3226 — Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong
        </Section>

        <Section title="Teaching team">
          <p>Coordinator: Dr. Talia Wu (Department of Mathematics, HKBU)</p>
          <p>Co-teacher: Dr. Simon Wang (Language Centre, HKBU)</p>
        </Section>

        <Section title="Learning outcomes">
          <ul className="space-y-1 list-disc pl-5">
            <li>Use AI-assisted tools to analyze public data without a coding background.</li>
            <li>Critically evaluate Hong Kong government data governance.</li>
            <li>Run a small end-to-end participatory policy analysis project.</li>
            <li>Communicate findings to policymakers (LegCo submission).</li>
          </ul>
        </Section>

        <Section title="Assessment">
          <ul className="space-y-1 list-disc pl-5">
            <li>In-class Exercises 1 & 2 — 10%</li>
            <li>Reflective Essays 1–3 — 20%</li>
            <li>In-Class Presentation 1 — 10%</li>
            <li>Human-AI Collaboration Report — 20%</li>
            <li>Final Presentation — 10%</li>
            <li>Final Report (group) — 30%</li>
          </ul>
        </Section>

        <Section title="Weekly schedule" tba>
          See the Weekly Schedule page. Each week already lists Before / In class / After class
          activities and the Moodle forum prompt — the calendar dates are TBA.
        </Section>

        <Section title="Project topics" tba>
          10 topics will be confirmed before semester start, drawing from Talia's project list
          and from carry-forward work from Spring 2026 (road safety, EV chargers, typhoon
          response, etc.).
        </Section>

        <Section title="AI tutor & forum policy" tba>
          Course-wide AI tutor is available on the Fall 2026 home page. A per-topic tutor will
          live on each project topic page. Moodle forum is the official record for graded
          discussion posts; the AI tutor is for learning support only.
        </Section>
      </div>
    </div>
  );
};

export default Fall2026Syllabus;
