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
  CheckCircle2,
  Calculator,
  Languages,
  Blend
} from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

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

      {/* Transdisciplinary Section */}
      <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Blend className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Transdisciplinary Learning</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Where Numbers Meet Narratives
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
            A unique collaboration synergizing <span className="text-primary font-semibold">quantitative reasoning</span> with <span className="text-primary font-semibold">qualitative analytical skills</span> to decode public policy
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Math Teacher */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Quantitative Reasoning</h3>
                  <p className="text-sm text-muted-foreground">Mathematics Expertise</p>
                </div>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Mathematical modeling of policy impacts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Data analysis & statistical reasoning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Evidence-based decision frameworks</span>
                </li>
              </ul>
            </Card>

            {/* Language Teacher */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-accent/30 hover:border-accent/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl">
                  <Languages className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Qualitative Analysis</h3>
                  <p className="text-sm text-muted-foreground">Language Expertise</p>
                </div>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Critical reading of policy documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Persuasive advocacy & communication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Stakeholder engagement strategies</span>
                </li>
              </ul>
            </Card>
          </div>

          <p className="text-center mt-10 text-lg font-medium text-primary">
            Two perspectives. One powerful approach to civic engagement.
          </p>
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <QRCodeCanvas 
                  value="https://gcap3226.hkbu.tech/teaser" 
                  size={160}
                  level="H"
                  marginSize={1}
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Scan to share this page
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                gcap3226.hkbu.tech/teaser
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            GCAP 3226: Participatory Policy Analysis • Spring 2026 • Hong Kong Baptist University
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseTeaser;
