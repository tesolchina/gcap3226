import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, ExternalLink, Bot, Lightbulb, Github } from "lucide-react";

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
            <p><strong>📝 Length:</strong> Approximately 200 words (180-220 acceptable)</p>
            <p><strong>📍 Format:</strong> Moodle forum post with GitHub links</p>
            <p><strong>🎓 Focus:</strong> Government data transparency & AI collaboration</p>
            <p><strong>📂 Submit:</strong> Essay + Jupyter notebook on GitHub</p>
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
            <span>📋</span> Key Reflection Points
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Your essay should address at least <strong>2-3</strong> of the following points:</p>
          
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 border-l-4 border-blue-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <strong>📊 Data Governance & Transparency</strong>
                  <p className="text-sm text-muted-foreground mt-1">What did you learn about Hong Kong government's data transparency and open data practices? How does the Code on Access to Information work?</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 border-l-4 border-green-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <strong>✉️ Enquiry Drafting Experience</strong>
                  <p className="text-sm text-muted-foreground mt-1">What challenges did you face in identifying the data you needed and crafting professional formal communications to government departments?</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 border-l-4 border-purple-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <strong>🤖 AI Collaboration</strong>
                  <p className="text-sm text-muted-foreground mt-1">How did the AI agent assist you in the enquiry process? What skills did you develop through this human-AI partnership?</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 border-l-4 border-orange-500 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <div>
                  <strong>📈 Project Impact</strong>
                  <p className="text-sm text-muted-foreground mt-1">How will the requested data strengthen your group's analysis? What are your backup plans if the request is denied or delayed?</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Essay Structure */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📝</span> Recommended Structure
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-background border rounded text-center">
              <h4 className="font-medium text-primary mb-2">Introduction</h4>
              <p className="text-2xl font-bold text-muted-foreground mb-1">30-40</p>
              <p className="text-xs text-muted-foreground">words</p>
            </div>
            <div className="p-4 bg-background border rounded text-center">
              <h4 className="font-medium text-primary mb-2">Main Body</h4>
              <p className="text-2xl font-bold text-muted-foreground mb-1">120-140</p>
              <p className="text-xs text-muted-foreground">words</p>
            </div>
            <div className="p-4 bg-background border rounded text-center">
              <h4 className="font-medium text-primary mb-2">Conclusion</h4>
              <p className="text-2xl font-bold text-muted-foreground mb-1">30-40</p>
              <p className="text-xs text-muted-foreground">words</p>
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
                <p className="text-sm text-muted-foreground">Shows genuine learning insights about the enquiry experience</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">📊 Data Governance Understanding (20 pts)</strong>
                <p className="text-sm text-muted-foreground">Demonstrates understanding of HK data transparency practices</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">🔗 Project Integration (15 pts)</strong>
                <p className="text-sm text-muted-foreground">Connects the enquiry experience to group project goals</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                <strong className="text-green-700 dark:text-green-400">🧠 Critical Analysis (15 pts)</strong>
                <p className="text-sm text-muted-foreground">Demonstrates thoughtful evaluation of the process</p>
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
                <strong className="text-blue-700 dark:text-blue-400">✅ Formatting & Length (8 pts)</strong>
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

        {/* Submission Instructions */}
        <Card className="p-6 border-2 border-primary">
          <h3 className="text-lg font-semibold mb-4">📤 How to Submit</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-muted/50 rounded">
              <strong>Step 1:</strong> Write your reflective essay (200 words)
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Step 2:</strong> Upload your essay and Jupyter notebook to GitHub
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Step 3:</strong> Post to the Moodle forum with links to your GitHub files
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=332661" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Moodle Forum
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="https://github.com/tesolchina/GCAP3226AIagents/tree/main/vibeCoding101/Part4GovEnquiryReflectEssay" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Assignment GitHub
              </a>
            </Button>
          </div>
        </Card>

        {/* Reflection Tips */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Writing Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific about which government department you contacted</li>
            <li>• Describe your experience with the Code on Access to Information</li>
            <li>• Reflect on how AI helped you draft professional communications</li>
            <li>• Consider both successes and challenges in the process</li>
            <li>• Think about what you would do differently next time</li>
          </ul>
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

export default Spring2026ReflectiveEssay2;
