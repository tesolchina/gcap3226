import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, MessageSquare, ArrowLeft } from "lucide-react";

const pageInfo: Record<string, { title: string; icon: typeof FileText; description: string }> = {
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
