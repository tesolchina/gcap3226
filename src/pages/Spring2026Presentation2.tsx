import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, FileText, CheckCircle2, AlertTriangle, Presentation, BarChart3, Bot, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Spring2026Presentation2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 13 • Final Presentation • Stakeholder Audience</p>
            <h1 className="text-4xl font-bold text-primary">Presentation 2: Final Summary & Stakeholder Engagement</h1>
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
              This final presentation showcases your completed research findings, data governance analysis, and evidence-based recommendations. Your project report should be ready to share with lawmakers, District Council members, and other stakeholders.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">8 Minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">Stakeholder Audience</span>
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
              <p className="text-muted-foreground">Week 13 • Check course schedule for exact date</p>
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
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold">Introduction & Research Context</h4>
                  <p className="text-sm text-muted-foreground">Concise background, research question, and policy relevance for stakeholders</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">1.5</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold">Methodology & Information Gathering</h4>
                  <p className="text-sm text-muted-foreground">Summary of data collection (primary/secondary), analytical approach, addressing data gaps</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">3-3.5</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold">Key Findings & Complete Analysis</h4>
                  <p className="text-sm text-muted-foreground">Complete data analysis results with visualizations, critical review, evidence-based conclusions</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">1.5</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    Data Governance Insights
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">NEW</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">Develop argument about data governance: transparency, accountability, effectiveness in policy decision-making</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations & Policy Implications</h4>
                  <p className="text-sm text-muted-foreground">2-3 specific, actionable recommendations for stakeholders; alignment with SDGs</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-2xl font-bold text-primary">0.5</span>
                  <p className="text-xs text-muted-foreground">min</p>
                </div>
                <div>
                  <h4 className="font-semibold">Conclusion & Stakeholder Engagement</h4>
                  <p className="text-sm text-muted-foreground">Summary and questions for lawmakers/stakeholders</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Elements */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <BarChart3 className="h-5 w-5" />
                Data Visualization (MANDATORY)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Include clear, professional charts, graphs, and infographics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Visualize key findings and patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Use data visualizations to support your data governance arguments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Ensure visualizations are accessible for stakeholder audience</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Bot className="h-5 w-5" />
                AI Assistance Acknowledgement (REQUIRED)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Include a dedicated slide acknowledging AI assistance:</p>
              <ul className="space-y-2 text-sm">
                <li>• AI tools used in data analysis</li>
                <li>• AI assistance in visualization creation</li>
                <li>• AI support in literature review</li>
                <li>• Confirm critical analysis remains your team's original work</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Data Governance Focus */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Focus: Data Governance Arguments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your presentation must develop clear arguments about data governance:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary">Transparency</h4>
                <p className="text-sm text-muted-foreground">How accessible is relevant data for policy decision-making?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary">Accountability</h4>
                <p className="text-sm text-muted-foreground">Are data collection and analysis practices accountable to citizens?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary">Effectiveness</h4>
                <p className="text-sm text-muted-foreground">How does data governance impact policy effectiveness?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary">Recommendations</h4>
                <p className="text-sm text-muted-foreground">What improvements in data governance would enhance policy outcomes?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update from Presentation 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Update from Presentation 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This presentation should demonstrate significant progress since Presentation 1:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Show how preliminary findings have been confirmed or refined through complete analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Present <strong>final</strong> data visualizations (not just work-in-progress)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Move from methodology description to substantive insights and recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Integrate data governance perspective that may have been less developed in Presentation 1</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Visualization Guidelines */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="viz-guidelines">
            <AccordionTrigger className="text-lg font-semibold">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Data Visualization Guidelines
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div>
                <h4 className="font-semibold mb-2">Best Practices for Stakeholder Presentations:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Clarity First:</strong> Use clear labels, legends, and titles. Avoid cluttered visualizations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Purpose-Driven:</strong> Each visualization should support a specific finding or argument.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Accessibility:</strong> Use colors distinguishable for colorblind viewers; ensure sufficient contrast.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Professional Quality:</strong> Use professional tools (Excel, Python/Matplotlib, Tableau, Canva).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Context:</strong> Provide brief interpretation of what each visualization shows.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Storytelling:</strong> Sequence visualizations to build your data governance argument.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suggested Visualization Types:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Comparison charts (bar, line, scatter)</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Trend analysis over time</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Geographic/spatial visualizations</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Infographics</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Before/after comparisons</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Data governance framework diagrams</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

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
                  <h4 className="font-semibold mb-2">Step 1: Prepare Your Final Slides</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Create your presentation using Google Slides or Canva</li>
                    <li>Ensure slides include complete data analysis, visualizations, and AI acknowledgement</li>
                    <li>Set sharing permissions to "Anyone with the link can view"</li>
                    <li>Ensure your project report is ready to share</li>
                  </ol>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 2: Submit via Moodle Forum</h4>
                  <p className="text-sm text-muted-foreground mb-2">In your reply, include:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Team Name/Number</li>
                    <li>Team Members (list all members who will present)</li>
                    <li>Presentation Link or iframe Embed Code</li>
                    <li>Brief Summary (final findings and key recommendations)</li>
                    <li>Project Report Status (confirm ready to share with stakeholders)</li>
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
                <span><strong>Missing Data Visualizations:</strong> Ensure you include clear, professional visualizations. This is a required element.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>No AI Acknowledgement:</strong> Failure to acknowledge AI assistance is a breach of academic integrity expectations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Incomplete Analysis:</strong> This is your final presentation - show complete findings, not preliminary results.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Weak Data Governance Arguments:</strong> Develop clear arguments about transparency, accountability, and effectiveness.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Project Report Not Ready:</strong> Ensure your 2,500-3,000 word report is completed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✕</span>
                <span><strong>Too Technical for Stakeholders:</strong> Remember your audience includes District Council/LegCo members - explain clearly.</span>
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
                  <li>• Complete information gathering</li>
                  <li>• Thorough data analysis</li>
                  <li>• Critical review</li>
                  <li>• Data governance insights</li>
                  <li>• Actionable recommendations</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Organization (30%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Framework adherence</li>
                  <li>• Professional slide design</li>
                  <li>• Data visualization quality</li>
                  <li>• Time management</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-bold text-primary mb-2">Delivery (30%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Clarity & communication</li>
                  <li>• Team coordination</li>
                  <li>• Stakeholder engagement</li>
                  <li>• Professional presentation</li>
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
              Final Submission Checklist
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
                <span>Data visualizations included and clearly presented</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>AI assistance acknowledgement slide included</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Data governance arguments clearly developed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Project report completed and ready to share</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 rounded border-green-500"></span>
                <span>Submit before deadline</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-primary bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="text-center py-8">
            <p className="text-lg font-medium mb-2">
              This is your opportunity to engage with stakeholders and demonstrate the impact of your research!
            </p>
            <p className="text-muted-foreground">
              We look forward to seeing your final presentations and hearing your data governance insights!
            </p>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button asChild variant="outline">
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

export default Spring2026Presentation2;
