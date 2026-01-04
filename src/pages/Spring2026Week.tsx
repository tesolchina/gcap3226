import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, BookOpen, Target, FileText } from "lucide-react";

const weekContent: Record<string, { title: string; description: string; objectives: string[]; activities: string[]; assessment?: string }> = {
  "1": {
    title: "Course Introduction",
    description: "Introduction to public policy analysis, the Hong Kong context, and Sustainable Development Goals (SDGs).",
    objectives: [
      "Understand the course structure and expectations",
      "Learn about participatory policy analysis",
      "Explore Hong Kong's policy landscape",
    ],
    activities: [
      "Introductory lecture on public policy",
      "Overview of AI tools for research",
      "Team formation discussion",
    ],
  },
  "2-4": {
    title: "Group Formation & Case Studies",
    description: "Form project groups and participate in case study demonstrations.",
    objectives: [
      "Form effective research teams",
      "Analyze existing policy case studies",
      "Develop research questions",
    ],
    activities: [
      "Case study presentations",
      "Group formation activities",
      "Initial topic selection",
    ],
    assessment: "In-class Exercise 1 & 2 (10%)",
  },
  "5-6": {
    title: "Data Collection & Preparation",
    description: "Explore public datasets and draft data request emails to government departments.",
    objectives: [
      "Identify relevant data sources",
      "Learn to request government data",
      "Prepare data collection strategy",
    ],
    activities: [
      "Data source exploration",
      "Drafting FOIA requests",
      "Data quality assessment",
    ],
    assessment: "Reflective Essay 1",
  },
  "7-9": {
    title: "Data Analysis & Modeling",
    description: "Complete data governance checkpoint and use AI tools for analysis.",
    objectives: [
      "Apply data analysis techniques",
      "Use AI-assisted tools for modeling",
      "Interpret research findings",
    ],
    activities: [
      "Data analysis workshops",
      "AI tool demonstrations",
      "Group consultations",
    ],
    assessment: "Reflective Essays 2 & 3",
  },
  "10": {
    title: "Draft Report Review",
    description: "Submit and receive feedback on draft outline of group project report.",
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
    description: "Deliver 8-minute presentations on research progress.",
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
  },
  "12": {
    title: "Final Preparation",
    description: "Refine models, visualizations, and advocacy products.",
    objectives: [
      "Finalize research deliverables",
      "Polish visualizations",
      "Prepare advocacy materials",
    ],
    activities: [
      "Report refinement",
      "Visualization workshops",
      "Final consultations",
    ],
    assessment: "Human-AI Collaboration Report (20%)",
  },
  "13": {
    title: "Final Presentation & Report",
    description: "Deliver final presentations to peers and stakeholders.",
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
    assessment: "Presentation 2 (10%) + Group Report (30%)",
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
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">Assessment Due</p>
                <p className="text-foreground font-semibold">{content.assessment}</p>
              </div>
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
