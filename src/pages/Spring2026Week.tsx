import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, BookOpen, Target, FileText } from "lucide-react";

const weekContent: Record<string, { title: string; description: string; objectives: string[]; activities: string[]; assessment?: string; assessmentLink?: string }> = {
  "2": {
    title: "Policy Analysis Foundations",
    description: "Introduction to policy analysis frameworks and understanding governance challenges in Hong Kong.",
    objectives: [
      "Understand key policy analysis frameworks",
      "Explore Hong Kong's governance structure",
      "Identify potential research topics",
    ],
    activities: [
      "Lecture on policy analysis methods",
      "Discussion of Hong Kong policy challenges",
      "Initial topic brainstorming",
    ],
  },
  "3": {
    title: "Case Studies & Group Formation",
    description: "Participate in case study demonstrations and form project groups.",
    objectives: [
      "Analyze real-world policy case studies",
      "Form effective research teams",
      "Select a group research topic",
    ],
    activities: [
      "Case study presentations and analysis",
      "Team formation activities",
      "Topic selection workshop",
    ],
    assessment: "In-class Exercise 1 (5%)",
    assessmentLink: "/spring-2026/weeks/3/in-class-exercise-1",
  },
  "4": {
    title: "Data Governance Introduction",
    description: "Introduction to data governance concepts and their application to policy analysis.",
    objectives: [
      "Understand data governance principles",
      "Learn about open data initiatives in Hong Kong",
      "Explore data ethics considerations",
    ],
    activities: [
      "Data governance lecture",
      "Open data portal exploration",
      "Group project planning",
    ],
    assessment: "In-class Exercise 2 (5%)",
    assessmentLink: "/spring-2026/weeks/4/in-class-exercise-2",
  },
  "5": {
    title: "Data Requests & Collection",
    description: "Explore public datasets and draft data request emails to government departments.",
    objectives: [
      "Identify relevant public data sources",
      "Learn to draft effective data requests",
      "Understand FOIA and access to information",
    ],
    activities: [
      "Data source exploration workshop",
      "Drafting data request emails",
      "Peer review of requests",
    ],
    assessment: "Reflective Essay 1 (part of 20%)",
    assessmentLink: "/spring-2026/weeks/5/reflective-essay-1",
  },
  "6": {
    title: "Fieldwork Preparation",
    description: "Design fieldwork plans and prepare for primary data collection. Note: This week includes a public holiday.",
    objectives: [
      "Design effective fieldwork strategies",
      "Prepare interview and survey instruments",
      "Understand research ethics",
    ],
    activities: [
      "Fieldwork planning workshop",
      "Instrument design practice",
      "Ethics discussion",
    ],
  },
  "7": {
    title: "Fieldwork",
    description: "Conduct fieldwork to collect primary data for your group project.",
    objectives: [
      "Execute fieldwork plans",
      "Collect primary data effectively",
      "Document fieldwork experiences",
    ],
    activities: [
      "Fieldwork execution",
      "Data collection and documentation",
      "Progress check-ins",
    ],
    assessment: "Reflective Essay 2 (part of 20%)",
    assessmentLink: "/spring-2026/weeks/7/reflective-essay-2",
  },
  "8": {
    title: "Data Integration & Analysis",
    description: "Complete data governance checkpoint. Integrate collected data and begin analysis using AI tools.",
    objectives: [
      "Integrate primary and secondary data",
      "Apply AI tools for data analysis",
      "Identify key patterns and insights",
    ],
    activities: [
      "Data integration workshop",
      "AI-assisted analysis demonstration",
      "Group consultation sessions",
    ],
    assessment: "Reflective Essay 3 (part of 20%)",
    assessmentLink: "/spring-2026/weeks/8/reflective-essay-3",
  },
  "9": {
    title: "Visualization & Storytelling",
    description: "Use AI tools for data visualization and develop compelling narratives for your findings.",
    objectives: [
      "Create effective data visualizations",
      "Develop policy narratives",
      "Refine analysis with AI assistance",
    ],
    activities: [
      "Visualization workshop",
      "Storytelling techniques",
      "Peer feedback sessions",
    ],
  },
  "10": {
    title: "Draft Report Outline",
    description: "Submit draft outline of group project report, including data analysis and governance critique.",
    objectives: [
      "Complete draft report outline",
      "Receive peer and instructor feedback",
      "Refine research direction",
    ],
    activities: [
      "Draft submission",
      "Peer review sessions",
      "One-on-one consultations",
    ],
  },
  "11": {
    title: "In-Class Presentation 1",
    description: "Deliver 8-minute presentations on project progress and data governance findings.",
    objectives: [
      "Present research findings clearly",
      "Receive constructive feedback",
      "Practice presentation skills",
    ],
    activities: [
      "Team presentations (8 minutes each)",
      "Q&A sessions",
      "Feedback collection",
    ],
    assessment: "In-Class Presentation 1 (10%)",
    assessmentLink: "/spring-2026/weeks/11/presentation-1",
  },
  "12": {
    title: "Finalize Deliverables",
    description: "Refine models, visualizations, and advocacy products based on feedback.",
    objectives: [
      "Finalize research deliverables",
      "Polish visualizations and reports",
      "Prepare advocacy materials",
    ],
    activities: [
      "Report refinement",
      "Visualization workshops",
      "Final consultations",
    ],
    assessment: "Human-AI Collaboration Report (20%)",
    assessmentLink: "/spring-2026/weeks/12/human-ai-report",
  },
  "13": {
    title: "Final Presentation & Report",
    description: "Deliver final presentations to peers and stakeholders, along with comprehensive group report.",
    objectives: [
      "Present final research findings",
      "Submit comprehensive group report",
      "Demonstrate policy recommendations",
    ],
    activities: [
      "Final team presentations",
      "Stakeholder Q&A",
      "Course wrap-up",
    ],
    assessment: "Final Presentation (10%) + Group Report (30%)",
    assessmentLink: "/spring-2026/weeks/13/final-presentation-report",
  },
};

const Spring2026Week = () => {
  const { weekId } = useParams<{ weekId: string }>();
  const content = weekId ? weekContent[weekId] : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Week not found</h1>
          <Button asChild>
            <Link to="/spring-2026">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Week {weekId}</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">{content.title}</h1>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </div>

        {/* Assessment Badge */}
        {content.assessment && (
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">Assessment Due</p>
                  <p className="text-foreground font-semibold">{content.assessment}</p>
                </div>
              </div>
              {content.assessmentLink && (
                <Button asChild size="sm">
                  <Link to={content.assessmentLink}>View Details</Link>
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Objectives */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Learning Objectives</h2>
          </div>
          <ul className="space-y-2">
            {content.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Activities */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Activities</h2>
          </div>
          <ul className="space-y-2">
            {content.activities.map((act, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="p-6 bg-muted/50 text-center">
          <p className="text-muted-foreground">
            📚 Detailed materials and resources will be available when the semester begins.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026Week;
