import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, ExternalLink, Bot, AlertTriangle, Lightbulb } from "lucide-react";

const Spring2026ReflectiveEssay2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026/assessments">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 7 Assessment</p>
            <h1 className="text-3xl font-bold text-primary">Reflective Essay 2</h1>
          </div>
        </div>

        {/* Hero Banner */}
        <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">GCAP 3226: Empowering Citizens through Data</h2>
              <p className="text-sm opacity-90">Individual Assignment • Week 7</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Due: End of Week 7 at 11:00 PM</span>
          </div>
        </Card>

        {/* Assignment Overview */}
        <Card className="p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">🎯</span> Assignment Overview
          </h3>
          <div className="grid gap-2 text-sm">
            <p><strong>📝 Length:</strong> Approximately 200 words</p>
            <p><strong>📍 Format:</strong> Forum post reply</p>
            <p><strong>🎓 Focus:</strong> Fieldwork experiences & data governance insights</p>
            <p><strong>⏰ Late Policy:</strong> 10% deduction per day late</p>
          </div>
        </Card>

        {/* AI Writing Tutor */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <div className="text-center">
            <Bot className="h-10 w-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">🤖 AI Writing Tutor Available</h3>
            <p className="mb-4 text-sm opacity-90">
              Get personalized guidance for your reflective essay with our specialized AI tutor.
            </p>
            <Button asChild variant="secondary" size="lg">
              <a href="https://smartlessons.hkbu.tech/GCAP3226/reflective-essay-tutor.html" target="_blank" rel="noopener noreferrer">
                🚀 Launch Reflective Essay AI Tutor
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>

        {/* What to Include */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> What You Need to Do
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>🔍 Fieldwork Experience:</strong>
              <p className="text-sm text-muted-foreground mt-1">Reflect on your fieldwork activities in Week 6 - what went well, what challenges did you face, and what did you learn from being in the field?</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>📊 Data Collection Insights:</strong>
              <p className="text-sm text-muted-foreground mt-1">Discuss the data you collected - its quality, completeness, and how it compares to what you expected to find.</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>🔗 Data Governance Connections:</strong>
              <p className="text-sm text-muted-foreground mt-1">Connect your fieldwork experience to data governance principles discussed in class. How did real-world data collection highlight governance issues?</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>💡 Lessons Learned:</strong>
              <p className="text-sm text-muted-foreground mt-1">Share key takeaways that will inform the next stages of your group project.</p>
            </div>
          </div>
        </Card>

        {/* Reflection Tips */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Reflection Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Describe specific moments or observations from your fieldwork</li>
            <li>• Compare your expectations before fieldwork with the reality you encountered</li>
            <li>• Consider ethical dimensions of data collection you experienced</li>
            <li>• Think about how primary data differs from secondary data sources</li>
            <li>• Reflect on team dynamics and coordination during fieldwork</li>
          </ul>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-500">
          <div className="text-center">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-500 mb-2">Full Rubric Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Detailed assessment criteria will be updated before Week 7. The essay will follow a similar 100-point rubric as Essay 1.
            </p>
          </div>
        </Card>

        {/* Academic Integrity */}
        <Card className="p-4 bg-muted/30 border-l-4 border-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <strong>📋 Academic Integrity:</strong> This is an individual reflection. Your essay must be your own authentic reflection on the fieldwork experience. AI tools may be used for brainstorming and feedback, but the final submission must represent your genuine insights.
          </p>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link to="/spring-2026/assessments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assessments
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026ReflectiveEssay2;
