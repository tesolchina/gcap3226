import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, BookOpen, Archive } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            GCAP 3226
          </h1>
          <p className="text-2xl text-foreground font-medium">
            Participatory Policy Analysis
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering Citizens Through Data: Learn to analyze public policy using data-driven approaches for Hong Kong
          </p>
        </div>

        {/* Semester Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Spring 2026 - Active */}
          <Card className="p-8 hover:shadow-2xl transition-all hover:scale-[1.02] bg-gradient-to-br from-primary/10 via-card to-accent/20 border-primary/30 border-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary rounded-lg">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Current Semester</span>
                <h2 className="text-2xl font-bold">Spring 2026</h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              New semester starting soon! Access the course portal for the upcoming Spring 2026 cohort.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>New project teams forming</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Updated curriculum</span>
              </div>
            </div>
            <Button asChild className="w-full" size="lg">
              <Link to="/spring-2026">
                Enter Spring 2026 Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Card>

          {/* Fall 2025 - Archive */}
          <Card className="p-8 hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br from-muted/50 via-card to-accent/10 border-muted">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-muted-foreground/20 rounded-lg">
                <Archive className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Archive</span>
                <h2 className="text-2xl font-bold text-muted-foreground">Fall 2025</h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Browse the completed projects and presentations from the Fall 2025 cohort.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>6 completed team projects</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Final presentations (Nov 25, 2025)</span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link to="/fall-2025">
                View Fall 2025 Archive
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Course Info */}
        <Card className="p-8 bg-gradient-to-br from-card to-accent/10 text-center">
          <h3 className="text-xl font-semibold mb-4">About This Course</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GCAP 3226 teaches students to analyze public policy through data-driven approaches and mathematical models. 
            Students work in teams to research real Hong Kong policy challenges and develop evidence-based recommendations.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
