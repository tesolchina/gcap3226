import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, FileText, CheckCircle2, AlertTriangle, Image, Mail, Lightbulb, Bot } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Spring2026FinalPresentationReport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026/assessments">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Group Assignment • 30% of Course Grade</p>
            <h1 className="text-4xl font-bold text-primary">Group Project Report & Poster for LegCo Submission</h1>
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
              Produce a comprehensive policy analysis report (~3,000 words) and an accompanying visual poster for potential submission to the Legislative Council (LegCo).
            </p>
            <p className="text-muted-foreground">
              This assignment requires your team to conduct in-depth research on a Hong Kong public policy issue, analyze data governance practices, and develop actionable recommendations. The poster serves as a visual summary that should pique the interest of lawmakers and stakeholders to read your full report.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">~3,000 Words</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">Group Assignment</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <span className="font-medium">30% of Grade</span>
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
              <p className="font-bold text-lg">Submission Deadline</p>
              <p className="text-muted-foreground">Check course schedule for exact date • Submit via Moodle forum</p>
            </div>
          </CardContent>
        </Card>

        {/* Report Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Report Requirements (~3,000 words)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">1. Introduction</h4>
                <p className="text-muted-foreground">Clearly articulate the problem, your research questions, and the relevance to SDG 11 (Sustainable Cities and Communities). Explain why this policy issue matters for Hong Kong and what gap your research addresses.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">2. Background</h4>
                <p className="text-muted-foreground">Provide context about the policy issue, relevant existing policies and plans, and the current state of data governance related to this topic. Document what data is available and what data is missing.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">3. Data Analysis</h4>
                <p className="text-muted-foreground">Conduct quantitative analysis using appropriate mathematical models (simulation, regression, or other appropriate methods). Evaluate data governance issues, including data availability, transparency, and how improved data collection could enhance decision-making. Include visualizations and clear interpretation of results.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">4. Community Engagement</h4>
                <p className="text-muted-foreground">Describe your community engagement activities, including interactions with stakeholders, government staff, or community members. Document your use of AI tools throughout the project and explain how they supported your work.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">5. Recommendations</h4>
                <p className="text-muted-foreground">Provide 2-3 specific, actionable recommendations for policymakers. Explain how your recommendations address data governance gaps and align with SDG 11.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">6. Conclusion</h4>
                <p className="text-muted-foreground">Summarize key findings, acknowledge limitations of your study, and suggest directions for future work. Reflect on what you learned about data-driven policymaking and data governance.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Appendix */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Mail className="h-5 w-5" />
              Required Appendix: Draft Email to LegCo Panel Secretary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Include a draft email that your team would send to the relevant LegCo panel secretary to request circulation of your report among lawmakers. This should be professionally written and clearly explain the purpose and value of your report.
            </p>
          </CardContent>
        </Card>

        {/* Poster Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Poster Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg text-center">
                <h4 className="font-bold text-primary">Size</h4>
                <p className="text-lg font-semibold">A1</p>
                <p className="text-sm text-muted-foreground">594mm × 841mm</p>
                <p className="text-xs text-muted-foreground">(23.4" × 33.1")</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg text-center">
                <h4 className="font-bold text-primary">Orientation</h4>
                <p className="text-lg font-semibold">Portrait</p>
                <p className="text-sm text-muted-foreground">Vertical orientation recommended</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg text-center">
                <h4 className="font-bold text-primary">Aspect Ratio</h4>
                <p className="text-lg font-semibold">1:1.414</p>
                <p className="text-sm text-muted-foreground">A-series standard</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Poster Content Elements:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Visual summary of key findings from your data analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Clear presentation of your research questions and problem statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Concise recommendations for stakeholders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Key data visualizations and charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>SDG 11 relevance and policy context</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Contact information or QR code linking to full report (optional)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold mb-2">Design Standards:</h4>
              <p className="text-sm text-muted-foreground">
                Professional, clear, and engaging presentation with effective use of visuals, charts, and concise text. Use a readable font size (minimum 24pt for body text, larger for headings) and ensure sufficient white space for clarity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Credit Statement */}
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Users className="h-5 w-5" />
              Credit Statement (Required)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Both the report and poster must include a Credit Statement that clearly documents who did what for the report and poster. This should specify each team member's contributions to different sections of the report, data collection, analysis, poster design, and other project components. This promotes accountability and ensures fair recognition of individual contributions.
            </p>
          </CardContent>
        </Card>

        {/* AI-Assisted Drafting Option */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Bot className="h-5 w-5" />
              Option: AI-Assisted Report Drafting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Teams are strongly encouraged to share raw data, drafts, and outlines with the teachers, who will use AI agents to draft a report that your team can further revise and refine.
            </p>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-700 mb-2">⚠️ Important: 7-Day Advance Notice Required</h4>
              <p className="text-sm text-muted-foreground">
                If you wish to use this AI-assisted drafting option, you must approach the teacher at least 7 days in advance before the report deadline. This ensures adequate time for the AI agents to process your materials and generate a draft for your team to review and revise.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quality Assurance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Quality Assurance & LegCo Submission Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Our Goal:</strong> Submit high-quality reports to the relevant LegCo panels. However, this submission is subject to quality assurance by the teachers.
            </p>
            <div>
              <h4 className="font-semibold mb-2">What This Means for Your Team:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Your initial submission will be reviewed by teachers for quality and readiness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>If revisions are needed, your team will receive feedback and be asked to revise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Only reports that meet quality standards will be submitted to LegCo</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submission Formats */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="formats">
            <AccordionTrigger className="text-lg font-semibold">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Accepted Submission Formats
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">Reply to the Moodle forum thread to submit your final report. We accept submissions in multiple formats:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">Option 1: HTML Code</h4>
                  <p className="text-sm text-muted-foreground">Copy and paste your HTML-formatted report directly into your Moodle forum reply</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">Option 2: Plain Text</h4>
                  <p className="text-sm text-muted-foreground">Submit your report as plain text with clear section headings and formatting</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">Option 3: GitHub Link</h4>
                  <p className="text-sm text-muted-foreground">Share a link to your report file in a public GitHub repository</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">Option 4: Any Machine-Readable Format</h4>
                  <p className="text-sm text-muted-foreground">As long as we can programmatically access and read your submission</p>
                </div>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm">
                  <strong>Important:</strong> Submissions must be machine-accessible (no password-protected files, no private repositories). For poster submissions, include your Canva or Google Slides link with commenting enabled.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rubric-report">
            <AccordionTrigger className="text-lg font-semibold">
              Report Rubric (20% of total grade)
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Criteria</TableHead>
                      <TableHead>Excellent (90-100%)</TableHead>
                      <TableHead>Good (75-89%)</TableHead>
                      <TableHead>Satisfactory (60-74%)</TableHead>
                      <TableHead>Needs Improvement (&lt;60%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Content & Completeness (25%)</TableCell>
                      <TableCell className="text-sm">All 6 sections complete, comprehensive, and well-developed</TableCell>
                      <TableCell className="text-sm">All sections present with good coverage, minor gaps</TableCell>
                      <TableCell className="text-sm">Most sections present but some lack depth</TableCell>
                      <TableCell className="text-sm">Missing sections or significant gaps</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Analysis (25%)</TableCell>
                      <TableCell className="text-sm">Appropriate mathematical model, excellent implementation</TableCell>
                      <TableCell className="text-sm">Model appropriate and mostly correct</TableCell>
                      <TableCell className="text-sm">Model selection questionable or implementation flawed</TableCell>
                      <TableCell className="text-sm">Inappropriate model or major implementation issues</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Governance Evaluation (20%)</TableCell>
                      <TableCell className="text-sm">Comprehensive evaluation, deep insights, well-articulated proposals</TableCell>
                      <TableCell className="text-sm">Good evaluation, some insights, reasonable proposals</TableCell>
                      <TableCell className="text-sm">Basic evaluation, limited insights, vague suggestions</TableCell>
                      <TableCell className="text-sm">Minimal or missing evaluation, no clear insights</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SDG 11 Alignment (15%)</TableCell>
                      <TableCell className="text-sm">Strong, explicit connection to SDG 11, compelling policy impact</TableCell>
                      <TableCell className="text-sm">Clear connection, good Hong Kong relevance</TableCell>
                      <TableCell className="text-sm">Weak connection, limited relevance</TableCell>
                      <TableCell className="text-sm">No clear connection to SDG 11</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Writing Quality (10%)</TableCell>
                      <TableCell className="text-sm">Excellent clarity, professional writing, error-free</TableCell>
                      <TableCell className="text-sm">Good clarity and organization, minor errors</TableCell>
                      <TableCell className="text-sm">Some clarity issues, several errors</TableCell>
                      <TableCell className="text-sm">Poor clarity and organization, many errors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Appendix & Requirements (5%)</TableCell>
                      <TableCell className="text-sm">Professional draft email, complete credit statement</TableCell>
                      <TableCell className="text-sm">Good draft email, complete credit statement</TableCell>
                      <TableCell className="text-sm">Basic draft email, incomplete credit statement</TableCell>
                      <TableCell className="text-sm">Missing or poor draft email</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rubric-poster">
            <AccordionTrigger className="text-lg font-semibold">
              Poster Rubric (10% of total grade)
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Criteria</TableHead>
                      <TableHead>Excellent (90-100%)</TableHead>
                      <TableHead>Good (75-89%)</TableHead>
                      <TableHead>Satisfactory (60-74%)</TableHead>
                      <TableHead>Needs Improvement (&lt;60%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Visual Design & Layout (30%)</TableCell>
                      <TableCell className="text-sm">Professional, visually appealing, excellent use of color and typography</TableCell>
                      <TableCell className="text-sm">Good design with minor issues, appropriate use of elements</TableCell>
                      <TableCell className="text-sm">Basic design, some layout issues</TableCell>
                      <TableCell className="text-sm">Poor design, cluttered layout, inconsistent elements</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content & Clarity (25%)</TableCell>
                      <TableCell className="text-sm">Content mirrors report structure perfectly, key findings clear</TableCell>
                      <TableCell className="text-sm">Content aligns well with report, generally clear</TableCell>
                      <TableCell className="text-sm">Content partially mirrors report, text too dense or sparse</TableCell>
                      <TableCell className="text-sm">Content doesn't mirror report, key findings missing</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Visualizations (25%)</TableCell>
                      <TableCell className="text-sm">Excellent, clear visualizations, well-labeled, supports findings</TableCell>
                      <TableCell className="text-sm">Good visualizations, mostly appropriate, adequate labeling</TableCell>
                      <TableCell className="text-sm">Basic visualizations, some inappropriate types, missing labels</TableCell>
                      <TableCell className="text-sm">Poor or missing visualizations, cannot be interpreted</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Professional Presentation (10%)</TableCell>
                      <TableCell className="text-sm">Highly professional, suitable for LegCo, polished and error-free</TableCell>
                      <TableCell className="text-sm">Professional appearance, minor issues</TableCell>
                      <TableCell className="text-sm">Somewhat professional, may not be appropriate for audience</TableCell>
                      <TableCell className="text-sm">Unprofessional appearance, not appropriate for audience</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Alignment with Report (10%)</TableCell>
                      <TableCell className="text-sm">Perfectly mirrors report, all required elements, complete credit statement</TableCell>
                      <TableCell className="text-sm">Good alignment, most required elements present</TableCell>
                      <TableCell className="text-sm">Partial alignment, some elements missing</TableCell>
                      <TableCell className="text-sm">Poor alignment, many elements missing</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
                <span>Report is approximately 3,000 words with all required sections</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Poster created in Canva or Google Slides with commenting enabled</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Poster dimensions set to A1 (594mm × 841mm)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Credit statement included in both report and poster</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Draft email to LegCo panel secretary included as appendix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Submission is machine-accessible and readable</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Report and poster are ready for quality assurance review</span>
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
              Start working on your report and poster now - this is a substantial assignment that requires careful planning and collaboration!
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

export default Spring2026FinalPresentationReport;
