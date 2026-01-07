import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, FileText, CheckCircle2, AlertTriangle, Presentation, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Spring2026Presentation1 = () => {
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
            <p className="text-sm text-muted-foreground">Week 11 • Group Presentation</p>
            <h1 className="text-4xl font-bold text-primary">Presentation 1: Progress Report</h1>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-primary" />
              Presentation Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This presentation provides a mid-semester update on your research progress, demonstrating your methodology, preliminary findings, and planned next steps.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">8 Minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">Group Assignment</span>
              </div>
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
              <p className="font-bold text-lg">Submission Due</p>
              <p className="text-muted-foreground">Week 11 • Check course schedule for exact date</p>
            </div>
          </CardContent>
        </Card>

        {/* Content Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Content Structure (8 minutes total)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className="text-2xl font-bold text-primary">1-1.5</span>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>
                <div>
                  <h4 className="font-semibold">Introduction & Research Question</h4>
                  <p className="text-sm text-muted-foreground">Brief background and clear research question</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className="text-2xl font-bold text-primary">2-2.5</span>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>
                <div>
                  <h4 className="font-semibold">Methodology & Data Collection</h4>
                  <p className="text-sm text-muted-foreground">Information gathering methods, primary/secondary sources, challenges addressed</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className="text-2xl font-bold text-primary">3-3.5</span>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preliminary Analysis & Findings</h4>
                  <p className="text-sm text-muted-foreground">Initial data analysis, patterns, work-in-progress visualizations</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className="text-2xl font-bold text-primary">1-1.5</span>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>
                <div>
                  <h4 className="font-semibold">Insights & Next Steps</h4>
                  <p className="text-sm text-muted-foreground">Key preliminary insights and planned activities for remaining weeks</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slide Preparation */}
        <Card>
          <CardHeader>
            <CardTitle>Slide Preparation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Platform Options:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Google Slides</strong> - Share with public access (Anyone with the link can view)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Canva</strong> - Make presentation publicly accessible</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm">
                <strong>Important:</strong> Your slides must be publicly accessible. Ensure sharing settings allow "Anyone with the link" to view.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Participation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">All team members must participate equitably in the 8-minute presentation:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <span>Distribute speaking time evenly (approximately 1.5-2 minutes per member for 5-6 person teams)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <span>Use smooth transitions between speakers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <span>Ensure cohesive presentation flow</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* How to Submit */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="submit">
            <AccordionTrigger className="text-lg font-semibold">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                How to Submit
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 1: Prepare Your Slides</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Create your presentation using Google Slides or Canva</li>
                    <li>Ensure all slides are complete and well-designed</li>
                    <li>Set sharing permissions to "Anyone with the link can view"</li>
                    <li>Test that your slides are accessible from an incognito/private browser window</li>
                  </ol>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 2: Get Your Embed Code or Link</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Option A: Google Slides</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Click "File" → "Publish to the web"</li>
                        <li>Select "Embed" tab</li>
                        <li>Copy the iframe embed code (or the public sharing link)</li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Option B: Canva</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Click "Share" button</li>
                        <li>Select "Embed" to get iframe code</li>
                        <li>Or copy the public link</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 3: Submit via Moodle Forum</h4>
                  <p className="text-sm text-muted-foreground mb-2">In your reply, include:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Team Name/Number (e.g., Team 1)</li>
                    <li>Team Members (list all members who will present)</li>
                    <li>Presentation Link or iframe Embed Code</li>
                    <li>Brief Summary (1-2 sentences about your presentation focus)</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Common Issues */}
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Common Issues to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Private Links:</strong> Ensure your slides are set to public/shared access. Test the link in an incognito window before submitting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Missing Information:</strong> Include team name, all members, and presentation focus in your reply.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Late Submissions:</strong> Submit before the deadline. Late submissions will be penalized.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Incomplete Slides:</strong> Make sure all slides are complete and ready for review.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>No Team Participation Plan:</strong> Be prepared to indicate which sections each team member will present.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Assessment Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Content (40%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Information gathering</li>
                  <li>• Data analysis</li>
                  <li>• Critical review</li>
                  <li>• Insights & implications</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Organization (30%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Framework adherence</li>
                  <li>• Slide design</li>
                  <li>• Time management</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Delivery (30%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Clarity & communication</li>
                  <li>• Team coordination</li>
                  <li>• Engagement</li>
                  <li>• Technical execution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Checklist */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Submission Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Slides are publicly accessible (Google Slides or Canva)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Include team name and all team members</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Provide presentation link or iframe embed code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Add brief summary of presentation focus</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Submit before deadline</span>
              </li>
            </ul>
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

export default Spring2026Presentation1;
