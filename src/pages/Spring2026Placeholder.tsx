import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, MessageSquare, ArrowLeft, ExternalLink } from "lucide-react";

const pageInfo: Record<string, { title: string; icon: typeof FileText; description: string }> = {
  "/spring-2026/syllabus": {
    title: "Course Syllabus",
    icon: FileText,
    description: "Course objectives, materials, grading policies, and academic integrity guidelines.",
  },
  "/spring-2026/resources": {
    title: "Resources",
    icon: BookOpen,
    description: "Helpful links, tutorials, datasets, and tools for your research projects.",
  },
  "/spring-2026/feedback": {
    title: "Course Feedback",
    icon: MessageSquare,
    description: "Share your thoughts and suggestions to help improve the course.",
  },
};

const Spring2026Placeholder = () => {
  const location = useLocation();
  const info = pageInfo[location.pathname] || {
    title: "Coming Soon",
    icon: FileText,
    description: "This page is under construction.",
  };
  const Icon = info.icon;

  // Special handling for syllabus page
  if (location.pathname === "/spring-2026/syllabus") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/spring-2026">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Spring 2026</p>
              <h1 className="text-4xl font-bold text-primary">Course Syllabus</h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Official Course Syllabus</h2>
              <Button variant="outline" asChild>
                <a
                  href="https://buelearning.hkbu.edu.hk/mod/resource/view.php?id=1886480"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Moodle
                </a>
              </Button>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> The actual schedule is subject to revision based on actual teaching progress and student feedback.
              </p>
            </div>
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <object
                data="/assets/GCAP3226_syllabus.pdf"
                type="application/pdf"
                className="w-full h-full"
              >
                <p className="p-4 text-muted-foreground">
                  Your browser does not support PDF viewing. 
                  <a href="/assets/GCAP3226_syllabus.pdf" className="text-primary underline ml-1" download>
                    Download the PDF directly
                  </a>.
                </p>
              </object>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-12 text-center">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{info.title}</h1>
          <p className="text-muted-foreground mb-8">{info.description}</p>
          <div className="p-6 bg-muted/50 rounded-lg mb-8">
            <p className="text-muted-foreground">
              📅 Content will be available when the Spring 2026 semester begins.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/spring-2026">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course Home
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026Placeholder;
