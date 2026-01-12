import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, ExternalLink, Target, GraduationCap, Calendar, Book, CheckCircle2, Users, Lightbulb, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Spring2026Syllabus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Spring 2026</p>
            <h1 className="text-4xl font-bold text-primary">Course Syllabus</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/assets/GCAP3226_syllabus.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://buelearning.hkbu.edu.hk/mod/resource/view.php?id=1886480"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Moodle
              </a>
            </Button>
          </div>
        </div>

        {/* Course Overview Card */}
        <Card>
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              GCAP3226: Empowering Citizens Through Data
            </CardTitle>
            <p className="text-muted-foreground">Participatory Policy Analysis for Hong Kong</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-accent/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Credit Units</p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">13</p>
                <p className="text-sm text-muted-foreground">Teaching Weeks</p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">Nil</p>
                <p className="text-sm text-muted-foreground">Pre-Requisite</p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg text-center">
                <p className="text-sm font-medium text-primary">Dept. of Mathematics</p>
                <p className="text-sm text-muted-foreground">Faculty of Science, HKBU</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aims & Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Aims & Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This course focuses on enhancing students' understanding and application of data-informed public policymaking within the Hong Kong context.
            </p>
            <ul className="space-y-3">
              {[
                "Equipping students with analytical tools and interdisciplinary approaches to assess and influence policy decisions.",
                "Integrating quantitative analysis with qualitative insights to address complex social issues aligned with the United Nations' Sustainable Development Goals (SDGs).",
                "Evaluating the Hong Kong government's use of data in policymaking, emphasizing transparency, accountability, and effectiveness.",
                "Engaging students in practical projects and case studies in areas such as public transportation, health, and environmental management.",
                "Providing opportunities to request data from the Hong Kong government and interact with lawmakers (LegCo members) and district council members for experiential learning.",
                "Preparing students to become active agents of change, equipped with skills to navigate global sustainability challenges and advocate for policy changes contributing to SDGs."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CILOs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Course Intended Learning Outcomes (CILOs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                { cilo: 1, desc: "Apply case study methods to evaluate data governance practices in public policies and demonstrate how improved data collection and transparency can enhance decision-making in Hong Kong.", pilo: "2, 3" },
                { cilo: 2, desc: "Critically review Hong Kong government's data governance policies by identifying missing data that could enhance decision-making.", pilo: "3, 5" },
                { cilo: 3, desc: "Effectively communicate findings through visual presentations and narratives tailored for stakeholders (Hong Kong SAR government, NGOs, public).", pilo: "4, 5" },
                { cilo: 4, desc: "Utilize AI tools to support data analysis, model building, coding, and development of engaging narratives and presentations.", pilo: "5" }
              ].map((item) => (
                <div key={item.cilo} className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                    {item.cilo}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{item.desc}</p>
                    <Badge variant="secondary" className="mt-2">PILO: {item.pilo}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching & Learning Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Teaching & Learning Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {[
                { title: "Lectures on Public Policy Foundations", cilos: "1, 2, 3", desc: "Initial lectures cover Hong Kong government structure, policymaking procedures, and policy-legislation relationships. Co-taught sessions integrate data-driven governance (Mathematics teacher) and communication strategies (Language teacher)." },
                { title: "Policy Analysis Workshops", cilos: "1, 2, 3, 4", desc: "Practical examples of data-informed policymaking through case studies (e.g., public transportation, waste management, public health). Introduces data visualization and analysis techniques. Co-led by both teachers." },
                { title: "Experiential Learning Projects", cilos: "1, 2, 3, 4", desc: "Students select a policy topic, formulate research questions, and conduct field research. Use digital tools (Miro, Google Workspace) for collaboration. Includes interactions with LegCo members, district councilors, and community leaders." },
                { title: "Computer-Based Practice", cilos: "1, 2", desc: "Hands-on learning of data visualization and analytical models using software." },
                { title: "AI-Enhanced Storytelling Sessions", cilos: "1, 2, 3, 4", desc: "Workshops on using AI tools for data analysis, model building, and crafting narratives. Use platforms like Miro and Google Slides for collaborative storyboarding and presentations." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`tla-${i}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="font-medium">{item.title}</span>
                      <Badge variant="outline" className="ml-2">CILO: {item.cilos}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Assessment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              Assessment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead className="text-center">Weight</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Project Report</TableCell>
                  <TableCell className="text-center"><Badge>30%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="secondary">Group</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">3,000-word report and poster summarizing findings on a HK public policy issue.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">In-Class Presentations</TableCell>
                  <TableCell className="text-center"><Badge>20%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="secondary">Group</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">Two 8-minute presentations per semester to peers, instructors, and stakeholders.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reflective Essays</TableCell>
                  <TableCell className="text-center"><Badge>20%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="outline">Individual</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">Three 200-word AI-led essays with chatbot-guided reflection on policy analysis.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Human-AI Collaboration Report</TableCell>
                  <TableCell className="text-center"><Badge>20%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="outline">Individual</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">2,000-word portfolio on using AI tools, including ethical considerations.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">In-Class Exercise</TableCell>
                  <TableCell className="text-center"><Badge>10%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="outline">Individual</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">Two data analysis exercises for hands-on experience with visualization tools.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Course Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Course Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Note:</strong> The schedule is tentative and may be revised based on student needs and availability of flipped classroom materials.
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Week(s)</TableHead>
                  <TableHead>Topic/Activity</TableHead>
                  <TableHead className="text-center w-24">Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { week: "1", topic: "Foundations of Data-Driven Public Policy and Governance", hours: 3 },
                  { week: "2", topic: "Applied Mathematical Models and Project-Based Learning", hours: 3 },
                  { week: "3", topic: "Data Governance and Its Impact on Public Policy Effectiveness", hours: 3 },
                  { week: "4", topic: "Need Analysis – Project Topic Selection", hours: 3 },
                  { week: "5-6", topic: "Case Study 1: Data Analysis for Sustainable Public Environmental Management", hours: 6 },
                  { week: "7", topic: "Field Studies – Project Data Collection", hours: 3 },
                  { week: "8-9", topic: "Case Study 2: Data Analysis for Efficient Public Transportation Management", hours: 6 },
                  { week: "10-12", topic: "Storytelling Sessions (Consultation & Rehearsal for Experiential Learning Projects)", hours: 9 },
                  { week: "13", topic: "Engaging with Policy Makers and Community Leaders: Presentations", hours: 3 }
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">Week {item.week}</TableCell>
                    <TableCell>{item.topic}</TableCell>
                    <TableCell className="text-center">{item.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Textbooks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-orange-500" />
              Textbooks & Recommended Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Required Textbooks</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-muted-foreground">1.</span> Winston, W. L. (1987). <em>Operations Research: Applications and Algorithms (Vol. 1)</em>. Duxbury Resource Center.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">2.</span> Meadows, D. H. (2008). <em>Thinking in Systems: A Primer</em>. Chelsea Green Publishing.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">3.</span> Cropf, R. A. (2016). <em>Ethical Issues and Citizen Rights in the Era of Digital Government Surveillance</em>. IGI Global.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">4.</span> Huff, D. (2023). <em>How to Lie with Statistics</em>. Penguin UK.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">5.</span> Hubbard, D. W. (2014). <em>How to Measure Anything: Finding the Value of Intangibles in Business</em>. John Wiley & Sons.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">6.</span> Mollick, E. (2024). <em>Co-Intelligence: Living and Working with AI</em>. Portfolio.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">7.</span> Baker, N. (2020). <em>Baseless: My Search for Secrets in the Ruins of the Freedom of Information Act</em>. Penguin Books.</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3">References</h4>
                <ol className="space-y-2 text-sm" start={8}>
                  <li className="flex gap-2"><span className="text-muted-foreground">8.</span> Head, B. W. (2007). Community Engagement: Participation on Whose Terms? <em>Australian Journal of Political Science</em>, 42(3), 441–454.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">9.</span> Gal, I., & Ograjenšek, I. (2017). Official Statistics and Statistics Education: Bridging the Gap. <em>Journal of Official Statistics</em>, 33(1), 79-100.</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">10.</span> Sachs, J.D., et al. (2024). <em>The SDGs and the UN Summit of the Future. Sustainable Development Report 2024</em>. Paris: SDSN.</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026Syllabus;
