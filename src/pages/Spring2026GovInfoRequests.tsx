import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Building2, Mail, Clock, AlertTriangle, CheckCircle2, ExternalLink, BookOpen } from "lucide-react";

const Spring2026GovInfoRequests = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/spring-2026" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Course Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-full">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Self-Access Learning Module</p>
              <h1 className="text-3xl font-bold text-primary">How to Request Information from the Government</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Learn how to effectively request data and information from Hong Kong government departments for your research projects.
          </p>
        </div>

        {/* Introduction */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Introduction
          </h2>
          <p className="text-muted-foreground mb-4">
            Hong Kong's <strong>Code on Access to Information</strong> provides a framework for requesting government-held information. 
            While not legally binding like Freedom of Information laws in other jurisdictions, it establishes guidelines that 
            government departments are expected to follow.
          </p>
          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-sm">
              <strong>Key Principle:</strong> The government recognizes that access to information is essential for 
              transparency and accountability. Most requests for factual information are fulfilled within 10 working days.
            </p>
          </div>
        </Card>

        {/* Step 1: Identify Departments */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Step 1: Identify Relevant Government Departments
          </h2>
          <p className="text-muted-foreground mb-4">
            Before making a request, identify which department holds the information you need:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Health-Related Data</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Department of Health</li>
                <li>• Centre for Health Protection</li>
                <li>• Hospital Authority</li>
                <li>• Food and Environmental Hygiene Department</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Transport & Infrastructure</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transport Department</li>
                <li>• Highways Department</li>
                <li>• Hong Kong Police Force (traffic data)</li>
                <li>• Environmental Protection Department</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Social & Economic Data</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Census and Statistics Department</li>
                <li>• Labour Department</li>
                <li>• Social Welfare Department</li>
                <li>• Education Bureau</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Financial & Regulatory</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mandatory Provident Fund Authority</li>
                <li>• Financial Services and Treasury Bureau</li>
                <li>• Inland Revenue Department</li>
                <li>• Companies Registry</li>
              </ul>
            </div>
          </div>
          <Button variant="outline" asChild>
            <a href="https://www.gov.hk/en/about/govdirectory/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Browse Government Directory
            </a>
          </Button>
        </Card>

        {/* Step 2: Draft Request */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-green-500" />
            Step 2: Draft Your Request Email
          </h2>
          <p className="text-muted-foreground mb-4">
            A well-structured request increases your chances of receiving useful data:
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-4 font-mono text-sm">
            <p className="mb-2"><strong>Subject:</strong> Information Request - [Your Topic] Data for Academic Research</p>
            <div className="border-t border-border pt-2 mt-2">
              <p>Dear Sir/Madam,</p>
              <br />
              <p>I am a student at City University of Hong Kong, conducting research on [topic] as part of the course GCAP3226: Data-Driven Policy Analysis.</p>
              <br />
              <p>I am writing to request the following information:</p>
              <p className="ml-4">1. [Specific data point 1]</p>
              <p className="ml-4">2. [Specific data point 2]</p>
              <p className="ml-4">3. [Time period: e.g., 2020-2024]</p>
              <br />
              <p>This information will be used solely for academic purposes and will be properly cited in our research report.</p>
              <br />
              <p>I understand that some information may not be available, and I am happy to discuss alternative data that might serve similar research purposes.</p>
              <br />
              <p>Thank you for your assistance.</p>
              <br />
              <p>Sincerely,<br />[Your Name]<br />[Student ID]<br />[Email Address]</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Key Elements of a Good Request:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Be specific</strong> about exactly what data you need</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Specify time periods</strong> to help narrow the scope</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>State your purpose</strong> clearly (academic research)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Be polite and professional</strong> in tone</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Show flexibility</strong> - offer to accept alternative formats or partial data</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Step 3: Timeline */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Step 3: Understand Timeline Expectations
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                10
              </div>
              <div>
                <h3 className="font-medium">Standard Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  Government departments aim to respond within <strong>10 working days</strong> for straightforward requests.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                21
              </div>
              <div>
                <h3 className="font-medium">Extended Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  Complex requests may take up to <strong>21 working days</strong>. Departments should notify you if this applies.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                51
              </div>
              <div>
                <h3 className="font-medium">Maximum Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  In exceptional cases, responses may take up to <strong>51 working days</strong>, but this requires explanation.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm">
              <strong>📅 Course Timeline:</strong> Submit your requests by <strong>Week 6 (25 Feb)</strong> to ensure 
              you receive responses before your analysis phase in Weeks 8-9.
            </p>
          </div>
        </Card>

        {/* Step 4: If Denied */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Step 4: What If Your Request Is Denied?
          </h2>
          <p className="text-muted-foreground mb-4">
            Not all requests will be granted. Common reasons for refusal include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-red-500">•</span>
              <span>Personal data protection concerns</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-red-500">•</span>
              <span>Information provided in confidence by third parties</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-red-500">•</span>
              <span>Law enforcement or security considerations</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-red-500">•</span>
              <span>Information that would require excessive resources to compile</span>
            </li>
          </ul>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">What You Can Do:</h3>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Ask if aggregated or anonymized data is available instead</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Request a more limited scope of information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Ask for publicly available reports or summaries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Document the refusal for your data governance analysis</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Code on Access to Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📜 The Code on Access to Information</h2>
          <p className="text-muted-foreground mb-4">
            The Code establishes the government's commitment to making information available unless there are specific reasons not to.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Information Covered</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Published reports and statistics</li>
                <li>• Internal guidelines and procedures</li>
                <li>• Meeting records (with exceptions)</li>
                <li>• Research and survey data</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Exemptions</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Defense and security</li>
                <li>• Personal privacy</li>
                <li>• Commercial confidentiality</li>
                <li>• Legal privilege</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild>
              <a href="https://www.access.gov.hk/en/code.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Read the Full Code on Access to Information
              </a>
            </Button>
          </div>
        </Card>

        {/* Tips for Success */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h2 className="text-xl font-semibold mb-4">💡 Tips for Success</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Before Requesting:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Check DATA.GOV.HK first - it may already be available</li>
                <li>✅ Review department websites for published reports</li>
                <li>✅ Search LegCo papers for relevant statistics</li>
                <li>✅ Discuss with your teacher in Week 5 consultation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">After Requesting:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Keep copies of all correspondence</li>
                <li>✅ Follow up politely if no response after 15 days</li>
                <li>✅ Thank the department when you receive data</li>
                <li>✅ Cite the source properly in your report</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="ghost" asChild>
            <Link to="/spring-2026/resources/curating-public-data" className="flex items-center gap-2">
              Next: Curating Public Data →
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/spring-2026/topics">Go to Your Project Group</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026GovInfoRequests;
