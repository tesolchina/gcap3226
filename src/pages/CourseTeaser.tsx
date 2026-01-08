import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Users, 
  Brain, 
  Target, 
  Globe, 
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const CourseTeaser = () => {
  const features = [
    {
      icon: Database,
      title: "Real Data, Real Impact",
      description: "Work with actual Hong Kong government datasets to uncover insights that matter"
    },
    {
      icon: Users,
      title: "Team-Based Projects",
      description: "Collaborate with peers on policy challenges affecting millions of citizens"
    },
    {
      icon: Brain,
      title: "AI-Powered Research",
      description: "Learn to leverage cutting-edge AI tools for policy analysis and advocacy"
    },
    {
      icon: Target,
      title: "Mathematical Modeling",
      description: "Apply quantitative methods to evaluate and propose policy solutions"
    },
    {
      icon: Globe,
      title: "UN SDG Alignment",
      description: "Connect local issues to global sustainable development goals"
    },
    {
      icon: Sparkles,
      title: "Citizen Empowerment",
      description: "Develop skills to engage effectively with government and drive change"
    }
  ];

  const highlights = [
    "No prior coding experience required",
    "Hands-on project with real policy impact",
    "Present to stakeholders and policymakers",
    "Build your data analysis portfolio",
    "Cross-disciplinary collaboration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/20 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12">
          {/* Course Code Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-semibold text-primary">GCAP 3226</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Spring 2026</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
            Empowering Citizens
            <br />
            Through Data
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto mb-10">
            Learn to analyze public policy, work with real government data, and make your voice heard in shaping Hong Kong's future.
          </p>

          {/* Schedule Card */}
          <Card className="max-w-md mx-auto p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day</p>
                  <p className="font-semibold text-lg">Every Wednesday</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold text-lg">10:30 AM – 1:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-semibold text-lg">In-Person + Interactive</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">What You'll Learn</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A unique blend of data science, policy analysis, and civic engagement
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] hover:border-primary/30 bg-card/50 backdrop-blur-sm"
            >
              <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Why Students Love This Course</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join us this Spring and learn how data can transform policy and empower communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/spring-2026">
                  Explore the Course
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/spring-2026/syllabus">
                  View Syllabus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            GCAP 3226: Participatory Policy Analysis • Spring 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseTeaser;
