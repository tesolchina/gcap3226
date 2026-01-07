import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, User, FileText, CheckCircle2, AlertTriangle, MessageSquare, Lightbulb, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Spring2026HumanAICollaborationReport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026/assessments">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Individual Assignment • 20% of Course Grade</p>
            <h1 className="text-4xl font-bold text-primary">Human-AI Collaboration Report</h1>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Assignment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Document and reflect on your experience using AI tools throughout this course. This 1,000-word report should document your collaboration with AI tools, emphasizing your role as a human collaborator and the unique contributions you brought to the human-AI partnership.
            </p>
            <p className="text-muted-foreground">
              Think of it as a reflective essay that tells the story of your AI-assisted learning journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">1,000 Words</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">Individual Assignment</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <span className="font-medium">20% of Grade</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Formatting Requirement */}
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Critical Formatting Requirement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-bold text-lg">
              ⚠️ Your report must be written in NARRATIVE PARAGRAPHS, NOT BULLET POINTS
            </p>
            <p className="text-muted-foreground">
              This is a fundamental requirement that affects your grade. You must write:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Complete sentences that form coherent paragraphs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Continuous prose with proper paragraph structure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Narrative flow that tells the story of your AI collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Transitions between ideas and sections</span>
              </li>
            </ul>
            <div className="p-4 bg-red-500/20 rounded-lg">
              <p className="font-semibold">Do NOT use: bullet points, lists, outlines, or any format other than narrative paragraphs.</p>
            </div>
          </CardContent>
        </Card>

        {/* Deadline Alert */}
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="p-3 bg-amber-500/20 rounded-full">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-lg">Submission Deadline</p>
              <p className="text-muted-foreground">Week 12 • Check course schedule for exact date</p>
            </div>
          </CardContent>
        </Card>

        {/* Report Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Report Structure (1,000 words total)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">1. Executive Summary</h4>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded">100-150 words</span>
                </div>
                <p className="text-muted-foreground">Write as a continuous narrative paragraph (or 2-3 paragraphs). Include your overall experience with AI, the main tools you used (ChatGPT, Claude, GitHub Copilot, Cursor, etc.), your key insights about human-AI collaboration, and how AI affected your learning and project work.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">2. AI Usage Overview</h4>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded">200-250 words</span>
                </div>
                <p className="text-muted-foreground">Write as narrative paragraphs (NOT lists). Describe the AI tools you used, explain your use cases across different categories (code writing, data analysis, report writing, research, mathematical modeling), and discuss your usage patterns and how they evolved over the semester.</p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">3. Chat History Portfolio</h4>
                  <span className="text-sm text-blue-600 bg-blue-500/10 px-2 py-1 rounded">Not counted in word limit</span>
                </div>
                <p className="text-muted-foreground mb-2">Provide concrete evidence of your AI collaboration:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Organize chronologically by project phase or thematically by task type</li>
                  <li>• Include key chat excerpts with annotations explaining why you asked, how you used the info, what you modified</li>
                  <li>• Include examples of your best prompts</li>
                  <li>• Document failed attempts and how you adapted</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">4. Reflection on Human-AI Collaboration</h4>
                  <span className="text-sm text-primary bg-primary/20 px-2 py-1 rounded font-medium">400-500 words (CORE)</span>
                </div>
                <p className="text-muted-foreground mb-2">This is the core of your report. Write as narrative paragraphs addressing:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your unique contributions as a human collaborator (what you brought that AI couldn't provide)</li>
                  <li>• How you used AI as a reasoning engine rather than just an information source</li>
                  <li>• How you validated and critically evaluated AI outputs</li>
                  <li>• Your learning process and how AI affected your understanding</li>
                  <li>• Collaboration dynamics and task division</li>
                  <li>• Ethical considerations</li>
                  <li>• Technical skills you developed</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">5. Learning Outcomes and Transferable Skills</h4>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded">150-200 words</span>
                </div>
                <p className="text-muted-foreground">Write as narrative paragraphs discussing the skills you developed, how AI affected your learning speed and depth, and how you will apply these skills in future academic or professional contexts. Also acknowledge the limitations of AI that you discovered.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Questions */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Key Questions to Address: Experience
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <ul className="space-y-3">
                <li className="p-3 bg-muted/50 rounded-lg">
                  Before taking this course, did you use GenAI to help you write code? How did you feel about AI code generation?
                </li>
                <li className="p-3 bg-muted/50 rounded-lg">
                  How frequently did you use AI during the course? What tasks did you perform vs. what AI assisted with?
                </li>
                <li className="p-3 bg-muted/50 rounded-lg">
                  How did using AI affect your learning process? Did it enhance understanding or pose challenges?
                </li>
                <li className="p-3 bg-muted/50 rounded-lg">
                  What was most challenging and most rewarding about working with AI in this course?
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="collaboration">
            <AccordionTrigger className="text-lg font-semibold">
              <span className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Key Questions to Address: Collaboration
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <ul className="space-y-3">
                <li className="p-3 bg-muted/50 rounded-lg">
                  What did you bring to the table that AI couldn't? How did you provide project context and domain knowledge?
                </li>
                <li className="p-3 bg-muted/50 rounded-lg">
                  How did you use AI as a reasoning engine rather than just an information source?
                </li>
                <li className="p-3 bg-muted/50 rounded-lg">
                  How did you validate AI-generated responses? Can you show examples of effective prompts you used?
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Writing Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Writing Tips and Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Do's
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Write in narrative paragraph format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Be specific with concrete examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Show evidence from chat interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Be honest about successes and failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Demonstrate growth over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Use first person ("I used...", "I learned...")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Use transitions between paragraphs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Don'ts
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't use bullet points or lists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't be vague or generic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't over-praise AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't understate your role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't ignore challenges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't forget evidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Don't exceed 1,000 words</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Focus Areas */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Content & Evidence</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Completeness of all sections</li>
                  <li>• Chat history portfolio</li>
                  <li>• Specific examples</li>
                  <li>• Concrete evidence</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Reflection Quality</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Deep analysis</li>
                  <li>• Honest assessment</li>
                  <li>• Human agency demonstrated</li>
                  <li>• Critical thinking</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Writing Quality</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Narrative paragraph format</li>
                  <li>• Proper transitions</li>
                  <li>• Clear structure</li>
                  <li>• Professional tone</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Checklist */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Final Submission Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Report is written in narrative paragraphs (NOT bullet points)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Word count is approximately 1,000 words (chat history excluded)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>All five main sections are included</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Chat history portfolio is complete and well-organized</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Submit before deadline</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-primary bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="text-center py-8">
            <p className="text-lg font-medium mb-2">
              Questions? Contact Dr. Wang or Dr. Wu if you need assistance or clarification.
            </p>
            <p className="text-muted-foreground">
              Start working on your report now - don't wait until the last minute!
            </p>
          </CardContent>
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

export default Spring2026HumanAICollaborationReport;
