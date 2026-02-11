import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, ExternalLink, Lightbulb, GitBranch, Mail, Clock } from "lucide-react";

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
            <span>Due: February 27, 2026 at 11:00 PM</span>
          </div>
        </Card>

        {/* Assignment Overview */}
        <Card className="p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">🎯</span> Assignment Overview
          </h3>
          <div className="grid gap-2 text-sm">
            <p><strong>📝 Length:</strong> Approximately 200 words</p>
            <p><strong>📍 Format:</strong> Plain text or link to GitHub file</p>
            <p><strong>🎓 Focus:</strong> Regression & Simulation models + group project</p>
            <p><strong>📅 Deadline:</strong> February 27, 11:00 PM</p>
          </div>
        </Card>

        {/* Where to Work */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <GitBranch className="h-6 w-6" />
            📂 Where to Work on Your Essay
          </h3>
          <p className="mb-4 opacity-90">Clone the course repository and work on the task in the designated folder:</p>
          <div className="bg-white/20 p-4 rounded-lg font-mono text-sm space-y-2 mb-3">
            <p>1. Clone: <a href="https://github.com/tesolchina/genAI2026" target="_blank" rel="noopener noreferrer" className="underline">https://github.com/tesolchina/genAI2026</a></p>
            <p>2. Work in: <code className="bg-black/20 px-1.5 py-0.5 rounded">courses/gcap3226/week5/task1-essay-moodle</code></p>
          </div>
          <p className="text-sm opacity-80">Use the materials and templates in that folder to draft your reflective essay.</p>
        </Card>

        {/* What to Include */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> What You Need to Do
          </h3>
          <p className="text-muted-foreground mb-4 font-medium">Your Reflection Should Include:</p>
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 border-l-4 border-muted-foreground">
              <strong>📈 Regression & Simulation Models:</strong>
              <p className="text-sm text-muted-foreground mt-1">Reflect on your learning experience with both regression analysis and simulation modeling techniques from our GCAP3226 course.</p>
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

        {/* Submission */}
        <Card className="p-6 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
            <span>📤</span> How to Submit
          </h3>
          <div className="space-y-3 text-sm text-yellow-800 dark:text-yellow-300">
            <p>
              <strong>✍️ Submit via Moodle</strong> —{" "}
              <a href="https://buelearning.hkbu.edu.hk/mod/assign/view.php?id=1922859" target="_blank" rel="noopener noreferrer" className="underline">Reflective Essay 1 assignment</a>
              {" "}with either:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>Plain text essay</strong> — paste your ~200-word reflection directly in the forum reply</li>
              <li><strong>Link to GitHub repo file</strong> — if you work in your fork and push your essay file, submit the URL to the file (e.g. raw GitHub link or file path in your repo)</li>
            </ul>
            <p><strong>📅 Deadline:</strong> Friday, February 27, 2026 at 11:00 PM</p>
            <p><strong>📏 Length:</strong> Approximately 200 words (180-220 words is acceptable)</p>
            <p><strong>⏰ Late Policy:</strong> 10% deduction per day late</p>
          </div>
        </Card>

        {/* Need Help? */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>💬</span> Need Help?
          </h3>
          <div className="grid gap-3">
            <div className="p-4 bg-background border rounded">
              <strong className="flex items-center gap-2"><GitBranch className="h-4 w-4" /> Repository Access</strong>
              <p className="text-sm text-muted-foreground mt-1">
                <a href="https://github.com/tesolchina/genAI2026" target="_blank" rel="noopener noreferrer" className="text-primary underline">github.com/tesolchina/genAI2026</a> — clone and work in <code className="bg-muted px-1 rounded">courses/gcap3226/week5/task1-essay-moodle</code>
              </p>
            </div>
            <div className="p-4 bg-background border rounded">
              <strong className="flex items-center gap-2"><Mail className="h-4 w-4" /> Assignment Questions</strong>
              <p className="text-sm text-muted-foreground mt-1">Email Dr. Talia Wu or Dr. Simon Wang</p>
            </div>
            <div className="p-4 bg-background border rounded">
              <strong className="flex items-center gap-2"><Clock className="h-4 w-4" /> Office Hours</strong>
              <p className="text-sm text-muted-foreground mt-1">Available for writing support and guidance</p>
            </div>
          </div>
        </Card>

        {/* Model Focus */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">📊 Focus: Regression & Simulation Models</h3>
          <p className="text-sm text-muted-foreground mb-4">Your reflection should focus on <strong>both</strong> of these modeling approaches that have been central to our course:</p>
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

        {/* Ready CTA */}
        <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center">
          <h3 className="text-xl font-bold mb-3">Ready to Start Your Reflection?</h3>
          <p className="mb-4 opacity-90">Clone the repo, work in the task folder, then submit your essay as plain text or a GitHub file link via Moodle.</p>
          <p className="text-sm"><strong>Remember:</strong> This is your opportunity to demonstrate learning growth and contribute to our class community!</p>
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
