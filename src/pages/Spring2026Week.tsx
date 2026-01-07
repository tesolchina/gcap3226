import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, BookOpen, Target, FileText, Laptop, Users, CheckCircle2, AlertCircle, Download, Code } from "lucide-react";

const weekContent: Record<string, { title: string; description: string; objectives: string[]; activities: string[]; techSetup?: { tools: string[]; support: string[] }; inClassExercise?: { title: string; description: string; dataset: string; skills: string[]; downloadLink: string; downloadLabel: string }; assessment?: string; assessmentLink?: string }> = {
  "2": {
    title: "Development Environment & Python Foundations",
    description: "Set up your coding environment with IDE and Jupyter Notebook. Learn Python basics through 'vibe coding' - an intuitive, AI-assisted approach to programming.",
    objectives: [
      "Install and configure VS Code or preferred IDE",
      "Set up Jupyter Notebook for data visualization",
      "Understand Python basics through hands-on coding",
      "Use GitHub Copilot for AI-assisted programming",
      "Connect Python skills to policy data analysis",
    ],
    activities: [
      "IDE installation and configuration workshop",
      "Jupyter Notebook introduction and setup",
      "Python 'vibe coding' session with AI assistance",
      "Data visualization basics with matplotlib/pandas",
      "Hands-on practice with student partner support",
    ],
    techSetup: {
      tools: [
        "VS Code (recommended) or PyCharm",
        "Python 3.10+ installation",
        "Jupyter Notebook / JupyterLab",
        "GitHub Copilot (student license available)",
        "Required packages: pandas, matplotlib, numpy",
      ],
      support: [
        "Student partners available on-site for setup assistance",
        "Bring your laptop fully charged",
        "Pre-install VS Code before class if possible",
        "IT support available for troubleshooting",
      ],
    },
  },
  "3": {
    title: "Regression Analysis & Group Formation",
    description: "Apply regression analysis techniques to real policy data and form project groups for the semester.",
    objectives: [
      "Practice linear and logistic regression analysis",
      "Compare forward and backward variable selection methods",
      "Interpret regression results for policy insights",
      "Create exploratory data visualizations",
      "Form effective research teams and select topics",
    ],
    activities: [
      "In-class regression exercise using Jupyter Notebook",
      "Analysis of Hong Kong Waste Charging Policy survey data",
      "Team formation activities",
      "Topic selection workshop",
    ],
    inClassExercise: {
      title: "Regression Analysis In-Class Exercise",
      description: "Analyze Hong Kong Waste Charging Policy survey data using linear and logistic regression. Explore the relationship between support levels and various demographic/attitudinal factors.",
      dataset: "GCAP3226_week3.csv - Hong Kong Waste Charging Policy Survey Data",
      skills: [
        "Linear regression with statsmodels",
        "Logistic regression for binary outcomes",
        "Forward and backward variable selection",
        "Data visualization with matplotlib",
        "Interpreting regression coefficients and p-values",
      ],
      downloadLink: "/exercises/regression_exercise_student.ipynb",
      downloadLabel: "Download Jupyter Notebook",
    },
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

        {/* Tech Setup Section (for Week 2) */}
        {content.techSetup && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center gap-3 mb-4">
                <Laptop className="h-5 w-5 text-cyan-600" />
                <h2 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200">Required Tools</h2>
              </div>
              <ul className="space-y-2">
                {content.techSetup.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-cyan-700 dark:text-cyan-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200">Student Partner Support</h2>
              </div>
              <ul className="space-y-2">
                {content.techSetup.support.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* In-Class Exercise Section */}
        {content.inClassExercise && (
          <Card className="p-6 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">{content.inClassExercise.title}</h2>
            </div>
            <p className="text-indigo-700 dark:text-indigo-300 mb-4">{content.inClassExercise.description}</p>
            
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-2">Dataset:</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">{content.inClassExercise.dataset}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-2">Skills Practiced:</p>
              <ul className="space-y-1">
                {content.inClassExercise.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-indigo-700 dark:text-indigo-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <a href={content.inClassExercise.downloadLink} download>
                <Download className="h-4 w-4 mr-2" />
                {content.inClassExercise.downloadLabel}
              </a>
            </Button>
          </Card>
        )}

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
