import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, ExternalLink, CheckCircle2, Lightbulb, Bot, AlertTriangle } from "lucide-react";

const Spring2026ReflectiveEssay1 = () => {
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
            <p className="text-sm text-muted-foreground">Week 5 Assessment</p>
            <h1 className="text-3xl font-bold text-primary">Reflective Essay 1</h1>
          </div>
        </div>

        {/* Hero Banner */}
        <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">GCAP 3226: Empowering Citizens through Data</h2>
              <p className="text-sm opacity-90">Individual Assignment • Week 5</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Due: End of Week 5 at 11:00 PM</span>
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
            <p><strong>🎓 Focus:</strong> Regression & Simulation models + group project</p>
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
            <p className="mt-4 text-xs opacity-80">
              1. Get HKBU API key from genai.hkbu.edu.hk → 2. Click "AI Writing Tutor" tab → 3. Enter API key → 4. Type "ok" to start
            </p>
          </div>
        </Card>

        {/* API Key Setup */}
        <Card className="p-6 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            Required: HKBU API Key Setup
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Visit:</strong> <a href="https://genai.hkbu.edu.hk/settings/api-docs" target="_blank" rel="noopener noreferrer" className="text-primary underline">genai.hkbu.edu.hk/settings/api-docs</a></li>
            <li><strong>Login</strong> with your HKBU student credentials</li>
            <li><strong>Click</strong> the blue "GENERATE API KEY" button</li>
            <li><strong>Copy and save</strong> your API key securely</li>
            <li><strong>Keep it private</strong> - do not share with others</li>
            <li><strong>Enter the key</strong> in the AI chatbot to start your writing session</li>
          </ol>
        </Card>

        {/* What to Include */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> What You Need to Do
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>📈 Regression & Simulation Models:</strong>
              <p className="text-sm text-muted-foreground mt-1">Reflect on your learning experience with both regression analysis and simulation modeling techniques from our course.</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>🔗 Project Connection:</strong>
              <p className="text-sm text-muted-foreground mt-1">Explain how regression and simulation modeling connect to or could be applied in your group project work.</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>💡 Personal Insights:</strong>
              <p className="text-sm text-muted-foreground mt-1">Share genuine learning moments, challenges, or "aha!" moments you've experienced.</p>
            </div>
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>🎯 Critical Thinking:</strong>
              <p className="text-sm text-muted-foreground mt-1">Demonstrate how your understanding has evolved and what you plan to do with this knowledge.</p>
            </div>
          </div>
        </Card>

        {/* Rubric */}
        <Card className="p-6 border-2 border-green-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📊</span> How You'll Be Assessed (100 Points Total)
          </h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-green-600 mb-3 border-b-2 border-green-500 pb-1">💭 Content Quality (70 points)</h4>
            <div className="grid gap-2">
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">✅ Reflection Depth (20 pts)</strong>
                <p className="text-sm text-muted-foreground">Shows genuine learning insights about regression and simulation</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">📊 Model Understanding (20 pts)</strong>
                <p className="text-sm text-muted-foreground">Demonstrates clear understanding of both modeling approaches</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">🔗 Project Integration (15 pts)</strong>
                <p className="text-sm text-muted-foreground">Connects regression/simulation meaningfully to group project</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">🧠 Critical Analysis (15 pts)</strong>
                <p className="text-sm text-muted-foreground">Demonstrates thoughtful evaluation and application</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-600 mb-3 border-b-2 border-blue-500 pb-1">✨ Presentation Quality (30 points)</h4>
            <div className="grid gap-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded">
                <strong className="text-blue-700 dark:text-blue-400">📝 Writing Clarity (12 pts)</strong>
                <p className="text-sm text-muted-foreground">Clear, engaging, and well-structured writing</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded">
                <strong className="text-blue-700 dark:text-blue-400">🎯 Organization (10 pts)</strong>
                <p className="text-sm text-muted-foreground">Logical flow and coherent structure</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded">
                <strong className="text-blue-700 dark:text-blue-400">✅ Formatting (8 pts)</strong>
                <p className="text-sm text-muted-foreground">Proper length, grammar, and presentation</p>
              </div>
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

        {/* Model Focus */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">📐 Focus: Regression & Simulation Models</h3>
          <p className="text-sm text-muted-foreground mb-4">Your reflection should focus on <strong>both</strong> of these modeling approaches:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background border-2 border-blue-500 rounded">
              <h4 className="font-medium text-blue-600 mb-2">📈 Regression Analysis</h4>
              <p className="text-sm text-muted-foreground">Statistical modeling for understanding relationships between variables and making predictions</p>
            </div>
            <div className="p-4 bg-background border-2 border-green-500 rounded">
              <h4 className="font-medium text-green-600 mb-2">🎯 Simulation Modeling</h4>
              <p className="text-sm text-muted-foreground">Creating virtual models to test scenarios and understand complex system behaviors</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted/50 border-l-4 border-muted-foreground">
            <strong className="flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Reflection Tips:</strong>
            <p className="text-sm text-muted-foreground mt-1">Consider how these models differ, when you might use each approach, challenges you faced in learning them, and how they apply to real-world data analysis in your group project context.</p>
          </div>
        </Card>

        {/* Submission */}
        <Card className="p-6 border-2 border-primary">
          <h3 className="text-lg font-semibold mb-4">📤 How to Submit</h3>
          <div className="space-y-2 text-sm">
            <p><strong>✍️ Format:</strong> Reply directly to the forum post with your 200-word reflection</p>
            <p><strong>📅 Deadline:</strong> End of Week 5 at 11:00 PM</p>
            <p><strong>📏 Length:</strong> Approximately 200 words (180-220 words is acceptable)</p>
            <p><strong>⏰ Late Policy:</strong> 10% deduction per day late</p>
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

export default Spring2026ReflectiveEssay1;
