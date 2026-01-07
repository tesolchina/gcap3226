import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Presentation, Users, Calendar, ChevronRight, ClipboardCheck } from "lucide-react";

const assessments = [
  {
    id: 1,
    title: "In-Class Exercise 1",
    type: "Individual",
    week: "Week 3",
    weight: "5%",
    description: "Regression analysis using Jupyter Notebook with Hong Kong Waste Charging Policy survey data.",
    link: "/spring-2026/weeks/3/in-class-exercise-1",
    icon: ClipboardCheck,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "In-Class Exercise 2",
    type: "Individual",
    week: "Week 4",
    weight: "5%",
    description: "Simulation modeling exercise using SimPy for bus transit analysis.",
    link: "/spring-2026/weeks/4/in-class-exercise-2",
    icon: ClipboardCheck,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Reflective Essay 1",
    type: "Individual",
    week: "Week 5",
    weight: "Part of 20%",
    description: "Reflect on regression & simulation models and their connection to your group project.",
    link: "/spring-2026/assessments/reflective-essay-1",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Reflective Essay 2",
    type: "Individual",
    week: "Week 7",
    weight: "Part of 20%",
    description: "Reflect on fieldwork experiences and data governance insights.",
    link: "/spring-2026/assessments/reflective-essay-2",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    id: 5,
    title: "Reflective Essay 3",
    type: "Individual",
    week: "Week 9",
    weight: "Part of 20%",
    description: "Reflect on government administration, mathematical models, and data governance practices.",
    link: "/spring-2026/assessments/reflective-essay-3",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    id: 6,
    title: "Presentation 1",
    type: "Group",
    week: "Week 11",
    weight: "10%",
    description: "8-minute presentation on project progress and data governance findings.",
    link: "/spring-2026/weeks/11/presentation-1",
    icon: Presentation,
    color: "bg-purple-500",
  },
  {
    id: 7,
    title: "Presentation 2",
    type: "Group",
    week: "Week 13",
    weight: "15%",
    description: "Final presentation with complete analysis and policy recommendations.",
    link: "/spring-2026/weeks/13/presentation-2",
    icon: Presentation,
    color: "bg-purple-500",
  },
  {
    id: 8,
    title: "Final Report",
    type: "Group",
    week: "Week 13",
    weight: "25%",
    description: "Comprehensive group project report with data analysis and governance critique.",
    link: "/spring-2026/assessments/final-report",
    icon: Users,
    color: "bg-red-500",
  },
  {
    id: 9,
    title: "Human-AI Collaboration Report",
    type: "Individual",
    week: "Week 13",
    weight: "20%",
    description: "Document your AI tool usage and collaboration throughout the course.",
    link: "/spring-2026/assessments/human-ai-collaboration",
    icon: FileText,
    color: "bg-orange-500",
  },
];

const Spring2026Assessments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Spring 2026</p>
            <h1 className="text-4xl font-bold text-primary">Assessments</h1>
          </div>
        </div>

        <p className="text-lg text-muted-foreground">
          Overview of all course assessments, including individual essays, group presentations, and the final report.
        </p>

        {/* Assessment Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">20%</div>
            <div className="text-sm text-muted-foreground">Reflective Essays (3)</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">25%</div>
            <div className="text-sm text-muted-foreground">Group Presentations (2)</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">55%</div>
            <div className="text-sm text-muted-foreground">Reports & Exercises</div>
          </Card>
        </div>

        {/* Assessment List */}
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <Link key={assessment.id} to={assessment.link}>
              <Card className="p-5 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${assessment.color} rounded-full`}>
                    <assessment.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {assessment.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                        {assessment.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{assessment.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      {assessment.week}
                    </div>
                    <div className="font-medium text-primary">{assessment.weight}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Note */}
        <Card className="p-6 bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            📌 Late submissions will incur a 10% deduction per day. Contact the instructors if you need an extension.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026Assessments;
