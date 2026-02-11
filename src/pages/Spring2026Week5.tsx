import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Calendar,
  Target,
  FileText,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  CheckSquare,
  BookOpen,
  Search,
  MessageSquare,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const GHLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-primary underline underline-offset-2 hover:text-primary/80"
  >
    {children}
    <ExternalLink className="h-3 w-3" />
  </a>
);

const StepCard = ({
  step,
  title,
  icon: Icon,
  color,
  children,
}: {
  step: number;
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(step <= 2);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className={`border-l-4 ${color}`}>
        <CollapsibleTrigger className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
              {step}
            </div>
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-5 pb-5 space-y-3 text-muted-foreground">
            {children}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const Spring2026Week5 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Week 5</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">
            Next Steps — Turning Your Topic into a Project
          </h1>
          <p className="text-lg text-muted-foreground">
            Your group has been assigned a topic. This week we focus on turning
            it into a focused project with research questions, hypotheses, and
            government enquiry letters.
          </p>
        </div>

        {/* Schedule Note */}
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800 dark:text-amber-200 font-semibold">
            Adjusted Schedule
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            We are running behind the original schedule. Some activities
            originally planned for Weeks 3–4 (group formation, topic selection,
            first outreach) are now being completed in Weeks 5–6. Please use this guide
            to catch up — focus on <strong>Steps 1–4 below</strong> and aim to
            have your draft enquiry letter ready by <strong>Week 6</strong>.
          </AlertDescription>
        </Alert>

        {/* Assessment Badge */}
        <Card className="p-4 bg-primary/10 border-primary/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">Assessment Due</p>
                <p className="text-foreground font-semibold">
                  Reflective Essay 1 (part of 20%) — due Feb 27, 11 PM
                </p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link to="/spring-2026/assessments/reflective-essay-1">
                View Details
              </Link>
            </Button>
          </div>
        </Card>

        {/* Week 5 Goals */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">By the End of Week 5</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Each group should have:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li>
              A <strong className="text-foreground">specific government decision</strong> (not a broad topic) as the focus of your project.
            </li>
            <li>
              A <strong className="text-foreground">research question</strong> and <strong className="text-foreground">hypotheses</strong> about data-driven decision-making.
            </li>
            <li>
              A <strong className="text-foreground">curated collection of public information</strong> (Legco, government websites, open data).
            </li>
            <li>
              A <strong className="text-foreground">draft government enquiry letter</strong> ready to send by Week 6.
            </li>
          </ol>
        </Card>

        {/* Step-by-Step Guidance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Step-by-Step Guidance
          </h2>
          <p className="text-muted-foreground text-sm">
            Full guide:{" "}
            <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/MetaProject/nextStepsWeek5.md">
              nextStepsWeek5.md
            </GHLink>
          </p>

          {/* Step 1 */}
          <StepCard step={1} title="Choose a Specific Government Decision" icon={MapPin} color="border-l-blue-500">
            <p>
              Your topic (flu shot, colorectal cancer screening, road safety, eMPF, CDCC, rodent control, bus stop merge) is a <strong>starting point</strong>, not a finished research focus.
            </p>
            <p>
              <strong>What to do:</strong> Identify <strong>one or two concrete decisions</strong> that government staff have made (or should have made) based on data. Examples:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 text-sm">
              <li><em>Flu shot:</em> Decision to target school-age children with in-school vaccination; allocation of vaccination sites by district.</li>
              <li><em>Bus stop merge:</em> Decision not to coordinate KMB 272A and Citybus 582 timetables despite 8 overlapping stops.</li>
              <li><em>Rodent control:</em> Decision to allocate resources by district complaint count vs. infestation survey data.</li>
            </ul>
            <p className="text-sm">
              <strong>Tip:</strong> A good decision focus is <strong>specific</strong> ("bus stop spacing on Route X in Sha Tin") rather than broad ("public transport policy in Hong Kong").
            </p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
              <p className="font-semibold text-foreground">📂 Past project examples:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>
                  Bus Route Coordination (Fall 2025):{" "}
                  <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/topics/bus-stop-merge/past-project-fall2025.md">
                    past-project-fall2025.md
                  </GHLink>
                </li>
                <li>
                  Flu Shot (Fall 2025):{" "}
                  <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/topics/flu-shot/past-project-fall2025.md">
                    past-project-fall2025.md
                  </GHLink>
                </li>
              </ul>
            </div>
          </StepCard>

          {/* Step 2 */}
          <StepCard step={2} title="Search for Public Information on Data Governance" icon={Search} color="border-l-emerald-500">
            <p>
              Before writing to the government, find out <strong>what information is already public</strong>.
            </p>
            <p><strong>What to search for:</strong></p>
            <ol className="list-decimal list-inside ml-2 space-y-1 text-sm">
              <li><strong>Government websites</strong> (gov.hk, department sites) — policy documents, press releases, annual reports, published data or statistics.</li>
              <li><strong>Legislative Council</strong> (legco.gov.hk) — panel meeting minutes, questions raised by lawmakers and government replies, official papers.</li>
              <li><strong>Open data portal</strong> (data.gov.hk) — search for datasets related to your topic. Note what exists and what is missing.</li>
              <li><strong>Media coverage</strong> — news articles that reveal government decisions or public debate about your topic.</li>
            </ol>
            <p className="text-sm">
              <strong>How to do this with AI:</strong> Use an AI agent (e.g. Cursor, ChatGPT, Perplexity) to search systematically. Organise findings in a shared folder (GitHub repo or Google Doc).
            </p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <p className="font-semibold text-foreground">🔑 Key questions to answer:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>What data does the government <strong>already publish</strong> about this decision?</li>
                <li>What data is <strong>missing</strong> or <strong>hard to find</strong>?</li>
                <li>Is there evidence that the decision was (or was not) informed by data?</li>
                <li>What have Legco members or the public already asked about this?</li>
              </ul>
            </div>
          </StepCard>

          {/* Step 3 */}
          <StepCard step={3} title="Formulate Your Research Question & Hypotheses" icon={MessageSquare} color="border-l-violet-500">
            <p>The core course question is:</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-foreground my-2">
              "To what extent did HK government staff make their decisions informed by data?"
            </blockquote>
            <p>Your research question <strong>applies this to your specific decision</strong>.</p>
            <p className="text-sm">
              <strong>Template:</strong> <em>To what extent does [department] use data-driven approaches in [specific decision], and what improvements in data collection, analysis, or transparency could lead to better outcomes?</em>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold text-foreground">Group</th>
                    <th className="text-left p-2 font-semibold text-foreground">Example research question</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-2">Flu Shot</td>
                    <td className="p-2">To what extent does the Department of Health use school-level vaccination data to allocate flu vaccination resources by district?</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Road Safety</td>
                    <td className="p-2">How does the Transport Department use traffic accident data to prioritise black-spot treatment and pedestrian facility improvements?</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">eMPF</td>
                    <td className="p-2">How transparent is the eMPF platform's reporting of fund performance data, and does it enable informed retirement planning?</td>
                  </tr>
                  <tr>
                    <td className="p-2">Bus Stop Merge</td>
                    <td className="p-2">To what extent does the Transport Department use real-time ridership data to evaluate bus stop placement and merging decisions?</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-2">
              <strong>Hypotheses:</strong> Propose 2–3 testable hypotheses, e.g.
              (1) The government collects relevant data but does not publish it systematically.
              (2) Decisions are made based on precedent or budget rather than data analysis.
              (3) Better data transparency would enable more effective policy outcomes.
            </p>
            <p className="text-sm">
              Your analysis will test these hypotheses — see{" "}
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/enhancedApproaches.md">
                Enhanced Approaches (7-step workflow)
              </GHLink>.
            </p>
          </StepCard>

          {/* Step 4 */}
          <StepCard step={4} title="Draft Your Government Enquiry Letter" icon={Mail} color="border-l-rose-500">
            <p>
              <strong>Goal:</strong> Send a clear, specific request to the relevant department under the <strong>Code on Access to Information</strong> by <strong>Week 6</strong>.
            </p>
            <p><strong>What to include:</strong></p>
            <ol className="list-decimal list-inside ml-2 space-y-1 text-sm">
              <li>State the decision or policy you are asking about.</li>
              <li>List specific data points you need (e.g. "School-level flu vaccination participation rates for 2022–2025").</li>
              <li>Explain why the data matters for understanding data-driven decision-making.</li>
              <li>Cite the Code on Access to Information as the basis for your request.</li>
            </ol>
            <p className="text-sm">
              <strong>Practical tips:</strong> Keep requests concise and specific (≤2 focused questions per group). Use the <strong>government telephone directory</strong> to identify the right department and contact (not just 1823). <strong>Send early</strong> — responses take ~3 weeks (up to 7 weeks).
            </p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
              <p className="font-semibold text-foreground">📝 Past project templates:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Flu Shot — DoH email drafts in{" "}
                  <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/topics/flu-shot/past-project-fall2025.md">flu-shot past project</GHLink>
                </li>
                <li>Bus routes — TD request in{" "}
                  <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/topics/bus-stop-merge/past-project-fall2025.md">bus-stop-merge past project</GHLink>
                </li>
                <li>General —{" "}
                  <Link to="/spring-2026/resources/government-info-requests" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    Government information requests guide
                  </Link>
                </li>
              </ul>
            </div>
          </StepCard>
        </div>

        {/* What's Next: Weeks 6–7 */}
        <Card className="p-6 bg-accent/10 border-accent/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Looking Ahead: Weeks 6–7</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            While waiting for the government response, work in parallel:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold text-foreground">Task</th>
                  <th className="text-left p-2 font-semibold text-foreground">Timeline</th>
                  <th className="text-left p-2 font-semibold text-foreground">Details</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-medium">Collect community data</td>
                  <td className="p-2">Weeks 6–7</td>
                  <td className="p-2">Survey, observations, interviews. Use fieldwork allowance (HK$300/student; submit by Week 6).</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Explore open data</td>
                  <td className="p-2">Weeks 5–6</td>
                  <td className="p-2">Search data.gov.hk; download and visualise relevant datasets in Jupyter.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Write Reflective Essay 1</td>
                  <td className="p-2">Due Week 5</td>
                  <td className="p-2">Reflect on regression & simulation models and their connection to your project.</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Curate Legco/gov docs</td>
                  <td className="p-2">Ongoing</td>
                  <td className="p-2">Organise in a shared place (GitHub, Google Doc) for group reference.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Resources */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📚 Resources at a Glance</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Guide</Badge>
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/MetaProject/nextStepsWeek5.md">
                Next Steps — Week 5 (full guide)
              </GHLink>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Workflow</Badge>
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/enhancedApproaches.md">
                Enhanced Approaches (7-step)
              </GHLink>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Topics</Badge>
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/projects/topics/README.md">
                Project Topics (Spring 2026)
              </GHLink>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Interactive</Badge>
              <GHLink href="https://tesolchina.github.io/genAI2026/courses/gcap3226/CourseInfo/projects/projectWorkflow.html">
                Interactive Project Workflow
              </GHLink>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Past</Badge>
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/MetaProject/past%20projects">
                Past Projects (Fall 2025)
              </GHLink>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5 shrink-0">Assessment</Badge>
              <GHLink href="https://github.com/tesolchina/genAI2026/blob/main/courses/gcap3226/CourseInfo/assessments.md">
                Assessments Overview
              </GHLink>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">🗺️ Interactive Topic Roadmaps</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              { name: "Flu Shot", slug: "flu-shot" },
              { name: "Colorectal Cancer Screening", slug: "colorectal-cancer-screening" },
              { name: "Road Safety", slug: "road-safety" },
              { name: "eMPF", slug: "empf" },
              { name: "CDCC Pilot Scheme", slug: "cdcc" },
              { name: "Rodent Control", slug: "rodent-control" },
              { name: "Bus Stop Merge", slug: "bus-stop-merge" },
            ].map((t) => (
              <a
                key={t.slug}
                href={`https://tesolchina.github.io/genAI2026/courses/gcap3226/CourseInfo/projects/topics/${t.slug}/roadmap.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-md border hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{t.name}</span>
              </a>
            ))}
          </div>
        </Card>

        {/* Week 5 Checklist */}
        <Card className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3 mb-4">
            <CheckSquare className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">
              Week 5 Checklist
            </h2>
          </div>
          <ul className="space-y-2 text-emerald-700 dark:text-emerald-300 text-sm">
            {[
              "Specific government decision(s) identified and agreed within the group.",
              "Web search completed: Legco minutes, government reports, open data, media coverage curated.",
              "Research question written (1–2 sentences).",
              "2–3 hypotheses about data-driven decision-making proposed.",
              "Draft government enquiry letter prepared (to send Week 6).",
              "Reflective Essay 1 submitted on Moodle.",
              "Technical setup confirmed (VS Code, GitHub, Jupyter, Python).",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Week5;
