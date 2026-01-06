import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Presentation, BookOpen, Users, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Spring2026Home = () => {
  const assessments = [
    {
      title: "In-class Exercises",
      timing: "Weeks 3-4",
      type: "In-class",
      weight: "10%",
      link: "/spring-2026/weeks/3-4",
    },
    {
      title: "Reflective Essays",
      timing: "Weeks 5-9",
      type: "Take-home",
      weight: "20%",
      link: "/spring-2026/weeks/5-6",
    },
    {
      title: "In-Class Presentation 1",
      timing: "Week 11",
      type: "In-class",
      weight: "10%",
      link: "/spring-2026/weeks/11",
    },
    {
      title: "Human-AI Collaboration Report",
      timing: "Week 12",
      type: "Take-home",
      weight: "20%",
      link: "/spring-2026/weeks/12",
    },
    {
      title: "Final Presentation & Report",
      timing: "Week 13",
      type: "In-class",
      weight: "40%",
      link: "/spring-2026/weeks/13",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            GCAP 3226
          </h1>
          <p className="text-2xl text-foreground font-medium">
            Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong
          </p>
          <p className="text-lg text-primary font-semibold">
            Spring 2026
          </p>
        </div>

        {/* Instructors Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-ordinator</h3>
                <p className="text-xl font-bold mt-1">Dr. Talia Wu</p>
                <p className="text-muted-foreground">Department of Mathematics, HKBU</p>
                <a 
                  href="https://www.math.hkbu.edu.hk/v1/people/profile/taliawu17/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-teacher</h3>
                <p className="text-xl font-bold mt-1">Dr. Simon Wang</p>
                <p className="text-muted-foreground">Language Centre, HKBU</p>
                <a 
                  href="https://lc.hkbu.edu.hk/main/simonwang/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Syllabus Card */}
        <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Syllabus</h3>
              <p className="text-xl font-bold mt-1">Course Outline</p>
              <p className="text-muted-foreground">Objectives, materials, and policies</p>
              <Link 
                to="/spring-2026/syllabus"
                className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
              >
                View Syllabus <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Assessment Components */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Assessment Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((item, idx) => (
              <Card key={idx} className="p-5 hover:shadow-lg transition-all hover:scale-[1.02] bg-card">
                <div className="flex items-start justify-between mb-3">
                  <Presentation className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold text-primary">{item.weight}</span>
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.timing} • {item.type}
                </p>
                <Link 
                  to={item.link}
                  className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Structure */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/10">
          <h2 className="text-2xl font-bold mb-6 text-center">Course Structure</h2>
          <p className="text-center text-muted-foreground mb-6">
            This 13-week course combines:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm">Lectures on policy analysis methods</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Users className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm">Team-based project work</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Target className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm">Data-driven research</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Presentation className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm">Oral presentations</span>
            </div>
          </div>
        </Card>

        {/* Course Objectives */}
        <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Course Objectives</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Equip students with analytical tools for data-informed policymaking in Hong Kong</li>
                <li>Integrate quantitative and qualitative insights to address social issues aligned with UN SDGs</li>
                <li>Evaluate government data use for transparency</li>
                <li>Engage students in practical projects for experiential learning</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/spring-2026/resources">Resources</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/spring-2026/feedback">Course Feedback</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Home;
