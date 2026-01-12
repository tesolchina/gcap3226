import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, BookOpen, Target, FileText, Laptop, Users, CheckCircle2, AlertCircle, Code } from "lucide-react";
import { weekContent } from "@/data/week-content";

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

        {/* Tech Setup Section */}
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
          <Card className="p-6 bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-violet-600" />
              <h2 className="text-xl font-semibold text-violet-800 dark:text-violet-200">{content.inClassExercise.title}</h2>
            </div>
            <p className="text-violet-700 dark:text-violet-300 mb-4">{content.inClassExercise.description}</p>
            <div className="bg-violet-100 dark:bg-violet-900/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-violet-800 dark:text-violet-200">Dataset:</p>
              <p className="text-violet-700 dark:text-violet-300">{content.inClassExercise.dataset}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-violet-800 dark:text-violet-200 mb-2">Skills Practiced:</p>
              <ul className="space-y-1">
                {content.inClassExercise.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-violet-700 dark:text-violet-300">
                    <CheckCircle2 className="h-4 w-4 text-violet-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Week;
