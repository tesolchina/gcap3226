import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, ExternalLink, Bot, Lightbulb } from "lucide-react";

const Spring2026ReflectiveEssay3 = () => {
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
            <p className="text-sm text-muted-foreground">Week 9 Assessment</p>
            <h1 className="text-3xl font-bold text-primary">Reflective Essay 3</h1>
          </div>
        </div>

        {/* Hero Banner */}
        <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">GCAP 3226: Empowering Citizens through Data</h2>
              <p className="text-sm opacity-90">Individual Assignment • Week 9</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Due: End of Week 9 at 11:00 PM</span>
          </div>
        </Card>

        {/* Assignment Overview */}
        <Card className="p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">🎯</span> Assignment Overview
          </h3>
          <div className="grid gap-2 text-sm">
            <p><strong>📝 Length:</strong> Approximately 200 words</p>
            <p><strong>📍 Format:</strong> Plain text with clearly labeled question numbers</p>
            <p><strong>🎓 Focus:</strong> Government administration, mathematical models, and data governance</p>
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

        {/* Questions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> Essay Questions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Please address the following questions in your essay. Clearly label your answers with question numbers.</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 border-l-4 border-blue-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-medium mb-2">Government Administration Perceptions</h4>
                  <p className="text-sm text-muted-foreground">
                    In what ways have your perceptions about government administration and decision-making processes of the HK government staff changed while taking this course? Please comment on how the math reasoning and data governance principles taught in this course influenced how you think about these issues.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 border-l-4 border-green-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-medium mb-2">Application of Mathematical Models</h4>
                  <p className="text-sm text-muted-foreground">
                    Considering the two math models taught in this course, i.e. regression and simulation, to what extent could these tools be applied to problems and issues in your own disciplines? Please focus on a specific problem or issue from your own discipline to elaborate your thoughts.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 border-l-4 border-purple-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-medium mb-2">Future Policy Interests</h4>
                  <p className="text-sm text-muted-foreground">
                    Given this course's focus on critical review of the government's data governance practices, what public policy issues would you consider interesting and relevant to pursue should you be given such an opportunity?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reflection Tips */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Writing Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific - cite examples from the course or your group project</li>
            <li>• For Question 2, choose a concrete problem from your major/discipline</li>
            <li>• Connect your answers to concepts like data transparency, accountability, and citizen engagement</li>
            <li>• Consider both strengths and limitations of the mathematical approaches</li>
            <li>• For Question 3, think about issues where data governance could make a real difference</li>
          </ul>
        </Card>

        {/* Rubric Summary */}
        <Card className="p-6 border-2 border-green-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📊</span> Assessment Criteria (100 Points Total)
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">💭 Content Quality (70 pts)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Depth of reflection on each question</li>
                <li>• Understanding of course concepts</li>
                <li>• Quality of examples and applications</li>
                <li>• Critical thinking demonstrated</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-600 mb-2">✨ Presentation (30 pts)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clear and coherent writing</li>
                <li>• Logical organization</li>
                <li>• Proper formatting and labeling</li>
                <li>• Grammar and presentation</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded text-center text-sm">
            <strong>Grade Scale:</strong>
            <span className="mx-2 text-green-600">A: 90-100</span>
            <span className="mx-2 text-yellow-600">B: 80-89</span>
            <span className="mx-2 text-orange-600">C: 70-79</span>
            <span className="mx-2 text-red-600">F: Below 70</span>
          </div>
        </Card>

        {/* Academic Integrity */}
        <Card className="p-4 bg-muted/30 border-l-4 border-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <strong>📋 Academic Integrity:</strong> This is an individual reflection. While you may discuss concepts with classmates, your essay must be your own authentic reflection. AI tools may be used for brainstorming and feedback, but the final submission must represent your genuine insights and learning.
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

export default Spring2026ReflectiveEssay3;
