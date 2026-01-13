import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Code, ChevronDown, ChevronUp, FileText, Calculator, LineChart, Bot, Cpu, TrendingUp, ExternalLink, Mail, Clock, CheckCircle2, Maximize, ExternalLinkIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MermaidDiagram from "@/components/MermaidDiagram";
import busAppScreenshot from "@/assets/bus-app-duplicate-stops.png";
import busAppFixed from "@/assets/bus-app-fixed-stops.jpeg";

const Spring2026Week1 = () => {
  const [currentPart, setCurrentPart] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/spring-2026">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Week 1</p>
              <h1 className="text-4xl font-bold text-primary">Course Introduction & Overview</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Welcome to GCAP3226! This week provides a gentle introduction to the course themes and the final project that will guide your learning journey.
          </p>
        </div>

        {/* Part Navigation */}
        <div className="flex gap-4">
          <Button
            variant={currentPart === 1 ? "default" : "outline"}
            onClick={() => setCurrentPart(1)}
            className="flex-1"
          >
            <Database className="h-4 w-4 mr-2" />
            Part 1: Data Governance (Simon)
          </Button>
          <Button
            variant={currentPart === 2 ? "default" : "outline"}
            onClick={() => setCurrentPart(2)}
            className="flex-1"
          >
            <Code className="h-4 w-4 mr-2" />
            Part 2: Technology & Math (Talia)
          </Button>
        </div>

        {/* Part Content */}
        {currentPart === 1 ? <Part1DataGovernance /> : <Part2TechnologyMath />}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPart(1)}
            disabled={currentPart === 1}
          >
            ← Part 1
          </Button>
          <Button
            onClick={() => setCurrentPart(2)}
            disabled={currentPart === 2}
          >
            Part 2 →
          </Button>
        </div>
      </div>
    </div>
  );
};

const Part1DataGovernance = () => {
  const [showBusExample, setShowBusExample] = useState(false);
  const [showFluShotLetter, setShowFluShotLetter] = useState(false);
  const [showFluLetterContent, setShowFluLetterContent] = useState(false);
  const [showFluDiagram, setShowFluDiagram] = useState(false);
  const [showEmailCorrespondence, setShowEmailCorrespondence] = useState(false);

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Part 1: Critical Review of Data Governance
          </CardTitle>
          <p className="text-sm text-muted-foreground">Presented by Simon</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Message */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-lg mb-2">Key Questions for This Course</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• How does the Hong Kong government make decisions?</li>
              <li>• To what extent are these decisions informed by data?</li>
              <li>• How can citizens engage constructively to improve data governance?</li>
            </ul>
          </div>

          {/* Final Project Preview */}
          <div className="p-4 bg-accent/50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Your Final Project</h3>
            <p className="text-muted-foreground mb-3">
              Throughout this course, you'll work in teams to investigate a real policy issue in Hong Kong. Your journey will involve:
            </p>
            <ol className="space-y-2 text-muted-foreground">
              <li><strong>1. Identify</strong> – Choose a policy area and identify specific government decisions</li>
              <li><strong>2. Investigate</strong> – Curate public data and request information from government</li>
              <li><strong>3. Analyze</strong> – Apply mathematical modeling to explore how data governance could improve</li>
              <li><strong>4. Advocate</strong> – Submit a report and poster to the Legislative Council</li>
            </ol>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/spring-2026/assessments/final-report">
                  <FileText className="h-4 w-4 mr-2" />
                  View Final Project Details
                </Link>
              </Button>
            </div>
          </div>

          {/* Appetizer Example: St Martin Bus Stop */}
          <Collapsible open={showBusExample} onOpenChange={setShowBusExample}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🚌 Appetizer: The St Martin Bus Stop Problem
                </span>
                {showBusExample ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Here's a simple example of citizen engagement with government. When Simon noticed duplicate bus stop names causing passenger confusion, he wrote to the Transport Department. This small example shows how constructive engagement can lead to change – though it took <strong>4 years</strong> of persistent follow-up!
              </p>
              {/* Before and After Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-1 text-sm">❌ Before: The Problem</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Two stops with the same name "St MARTIN"</li>
                      <li>• No way to distinguish between them</li>
                      <li>• Passengers confused about arrival times</li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <img 
                      src={busAppScreenshot} 
                      alt="KMB Bus App showing duplicate St Martin stops without codes"
                      className="rounded-lg shadow-lg border max-h-[280px] object-contain"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Before: Both stops named "St MARTIN" with no identifier
                    </p>
                  </div>
                </div>
                {/* After */}
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1 text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      ✓ After: The Win (May 2025)
                    </h4>
                    <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                      <li>• Bus stop codes added: PA125 and PA206</li>
                      <li>• Each stop now uniquely identifiable</li>
                      <li>• 4 years of persistence paid off!</li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <img 
                      src={busAppFixed} 
                      alt="KMB Bus App now showing St Martin stops with unique codes PA125 and PA206"
                      className="rounded-lg shadow-lg border max-h-[280px] object-contain"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      After: "St MARTIN (PA125)" and "St MARTIN (PA206)"
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  4-Year Timeline: From Complaint to Resolution
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-mono w-24 shrink-0">Mar 2021</span>
                    <span className="text-muted-foreground">Initial complaint filed via 1823</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-mono w-24 shrink-0">Jul 2021</span>
                    <span className="text-muted-foreground">Escalation to Commissioner for Transport; Code on Access to Information request filed</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-mono w-24 shrink-0">Nov 2023</span>
                    <span className="text-muted-foreground">Requested revisit of the case</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-mono w-24 shrink-0">Mar 2024</span>
                    <span className="text-muted-foreground">Escalation to Assistant Director; Tai Po District Council also contacted</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-600 dark:text-green-400 font-mono w-24 shrink-0">May 2025</span>
                    <span className="text-muted-foreground font-medium">✓ Issue resolved – bus stop codes added</span>
                  </div>
                </div>
              </div>

              {/* Key Learning: Finding Contacts */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Skill: Finding Government Contacts</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  One key question is: how do you find the Assistant Director's contact? The Hong Kong Government provides a directory of all government officials:
                </p>
                <Button variant="outline" size="sm" asChild className="bg-white dark:bg-transparent">
                  <a href="https://tel.directory.gov.hk/index_ENG.html?accept_disclaimer=yes" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Government Telephone Directory
                  </a>
                </Button>
              </div>

              {/* Email Correspondence */}
              <Collapsible open={showEmailCorrespondence} onOpenChange={setShowEmailCorrespondence}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between bg-muted/50">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      View Full Email Correspondence (2021-2025)
                    </span>
                    {showEmailCorrespondence ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="border rounded-lg overflow-hidden">
                    <Accordion type="single" collapsible className="w-full">
                      {/* Final Resolution */}
                      <AccordionItem value="resolution">
                        <AccordionTrigger className="px-4 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="font-medium">May 2025: Issue Resolved</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">From: YUEN Ching-wun (for Commissioner for Transport)</p>
                            <p>Dear Mr. WANG,</p>
                            <p>KMB has added new bus stop codes to the bus stops of KMB Route No. 272A on both KMB's website and mobile application. Thank you for your comments on KMB Route No. 272A.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Follow-up May 2025 */}
                      <AccordionItem value="may2025-followup">
                        <AccordionTrigger className="px-4 hover:bg-muted/50">
                          <span className="text-sm">May 2025: Follow-up inquiry about bus stop codes</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">From: Simon Wang → TD</p>
                            <p>Could you explain why the bus stop codes are gone?</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Reply from YUEN Ching-wun (23 May 2025):</p>
                            <p>I acknowledge receipt of your email dated 13 May 2025 regarding the bus stop naming of KMB Route No. 272A. We are following up the case and will provide a reply to you.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* March 2024 Escalation */}
                      <AccordionItem value="mar2024">
                        <AccordionTrigger className="px-4 hover:bg-muted/50">
                          <span className="text-sm">March 2024: Escalation to Assistant Director & District Council</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">From: Simon Wang → Patrick Ho (Assistant Director) | 15 March 2024</p>
                            <p>Dear Mr Ho,</p>
                            <p>I hope this email finds you well even though you are unlikely to find the time to write back. Referring to the captioned matter I am currently waiting for 272A and have the time to revisit this issue because, regrettably, the confusion over same bus name made me spend more time waiting at the bus stop.</p>
                            <p>For senior government officials like you it may be difficult to understand my concern. Do you have KMB app on your phone? Yet your colleagues' failure to convince KMB to take action to solve this little problem says a lot about the lack of oversight of your department over franchised bus services.</p>
                            <p>I write regularly for SCMP and meet with Legco members from time to time. I still hope matters like this can be resolved without troubling more senior people outside TD.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Reply from YUEN Ching-wun (later):</p>
                            <p>We have once again referred your comments on the bus stop names of Route No. 272A to KMB for reconsideration. KMB has added bus stop codes to the en-route stops along Chong San Road and Science Park Road on both KMB's website and mobile application to further differentiate the bus stops.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Tai Po District Council (16 March 2024):</p>
                            <p>Thank you for your email. Regarding your concern on public transportation in Pak Shek Kok, we understand that the Transport Department is currently looking into the matter and will reply when information becomes available.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* November 2023 */}
                      <AccordionItem value="nov2023">
                        <AccordionTrigger className="px-4 hover:bg-muted/50">
                          <span className="text-sm">November 2023: Third request for reconsideration</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">Reply from YUEN Ching-wun | 3 November 2023</p>
                            <p>The naming of a bus stop is generally determined by the relevant franchised bus company after taking into account factors such as its geographical environment, nearby landmarks and usual naming by passengers.</p>
                            <p>While we have provided our reply on the issue, in view of your comment, we have referred your comment on the bus stop names to KMB for reconsideration. <strong>KMB has reviewed the existing arrangement and considered that there would not be confusion caused to passengers.</strong> While KMB has no plan to change the bus stop names for the time being, it has taken note of your opinion.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Original request from Simon Wang | 29 July 2023:</p>
                            <p>Dear Sir/Madam, I'm writing to request a revisit of this issue and believe that KMB should change the bus stop names. It's fairly straightforward and can help improve user experience. I really don't want to bring this matter to Ombudsman but please do something so I don't have to.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* July 2021 Escalation */}
                      <AccordionItem value="jul2021">
                        <AccordionTrigger className="px-4 hover:bg-muted/50">
                          <span className="text-sm">July 2021: Escalation to Commissioner for Transport</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">From: Simon Wang → Commissioner for Transport | 7 July 2021</p>
                            <p>Attn: Miss LAW Shuk Pui, Rosanna, JP, Commissioner for Transport</p>
                            <p>Dear Miss Law,</p>
                            <p>I hope this email finds you well. I am writing to bring your attention to the fact that the bus stop names are the same for different stops for KMB 272A. I have communicated with your colleagues about this matter but we cannot reach an agreement. Please kindly review and follow up.</p>
                            <p>As regular contributor to SCMP I have established working relationships with the Legco. I urge your office to review this case taking into account the user experience of the real bus passengers and the IT experts. I'll further pursue this case with all the tools and resources at my disposal.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Previous email from Simon Wang | 8 July 2021:</p>
                            <p>Yesterday morning I left home when the app indicated the 272A will arrive in 5 minutes. When I walked downstairs and checked the app again I found the bus will arrive in 12 minutes; I thought I must have missed the bus but found later I was looking at the info for the bus stop across the street. This is the consequence of having two bus stops with the same name.</p>
                            <p className="mt-2">Any reasonable person should acknowledge that this is not an ideal situation and it is better to have different names for different bus stops.</p>
                            <p className="mt-2">Thinking in the long term and considering my argument on data integrity for smart bus management system, I think KMB should be asked to change all the duplicate bus stop names and learn a lesson so no such farce will happen again.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Note: Simon also filed a Code on Access to Information request (12 July 2021):</p>
                            <p className="italic">"I've made a Code on Access to Information request about this issue. Let's find out the scale of the problem and see if it can be addressed at the city level."</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Initial Response */}
                      <AccordionItem value="initial">
                        <AccordionTrigger className="px-4 hover:bg-muted/50">
                          <span className="text-sm">May-June 2021: Initial complaint and response</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3">
                            <p className="text-xs text-muted-foreground">From: Simon Wang → Transport Department | 1 May 2021</p>
                            <p>Dear Miss So,</p>
                            <p>I am writing to discuss this case with you. According to the TD staff, if the name of a bus stop causes confusion to passengers, we will request the relevant franchised bus company to review the name of the bus stop. Yet, you decided that passengers should have no confusion with reference to the two bus stops despite my complaint as a passenger.</p>
                            <p>As a passenger, I often use the KMB app to check when a bus will arrive; having two different bus stops with the same name made it inconvenient for me to be informed about the bus arrival time.</p>
                            <p className="font-medium mt-2">I will refer the case to the Commissioner of Transport on 15 May if it is not resolved.</p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Reply from SO Pui-man | 4 June 2021:</p>
                            <p>Upon entering the route number and selecting the route concerned in the "Search" page in KMB mobile app, users will be directed to a page showing the routeing and the list of stops. To check the ETA of the route selected at a particular stop, users would be required to select the stop concerned either from the map or from the list of stops.</p>
                            <p className="mt-2"><strong>In consideration of the above, KMB mobile app users should have no confusion of which stop is being referred to.</strong></p>
                            <hr className="my-3" />
                            <p className="text-xs text-muted-foreground">Initial TD Response | 1 May 2021:</p>
                            <p>"The naming of a bus stop is determined by the relevant franchised bus company taking into account factors such as its geographical environment, nearby landmarks and usual naming by passengers. If the name of a bus stop causes confusion to passengers, we will request the relevant franchised bus company to review the name of the bus stop."</p>
                            <p className="mt-2">"Given the current routeing of KMB Route No. 272A in Pak Shek Kok, <strong>passengers should have no confusion</strong> with reference to the two bus stops on Chong San Road both bounds near St. Martin despite being named the same as 'St. Martin'."</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <p className="text-sm text-muted-foreground italic">
                This is just an appetizer – a simple case to illustrate the concept. Your projects will tackle more sophisticated policy issues with real data analysis.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* Main Example: Flu Shot Program */}
          <Collapsible open={showFluShotLetter} onOpenChange={setShowFluShotLetter}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-primary/5">
                <span className="flex items-center gap-2">
                  💉 Featured Example: Influenza Vaccination Program
                </span>
                {showFluShotLetter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The Policy Issue</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  The Hong Kong government runs influenza vaccination programs for the elderly and school children, but participation rates remain low. This raises important questions:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• What data does the government collect on vaccination coverage?</li>
                  <li>• How do they decide where to allocate resources?</li>
                  <li>• Could better data governance improve participation rates?</li>
                </ul>
              </div>
              {/* Letter Toggle */}
              <Collapsible open={showFluLetterContent} onOpenChange={setShowFluLetterContent}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between bg-muted/50">
                    <span className="flex items-center gap-2">
                      📰 Read the SCMP Letter to the Editor (Nov 2017)
                    </span>
                    {showFluLetterContent ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">Hong Kong's seasonal flu vaccine programmes need better marketing</h4>
                        <p className="text-xs text-muted-foreground">South China Morning Post – Letters | 9 November 2017</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="https://www.scmp.com/comment/letters/article/2119177/hong-kongs-seasonal-flu-vaccine-programmes-need-better-marketing" target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-sm space-y-3">
                      <p>During the 2016/17 flu season, more than 700,000 individuals in Hong Kong have received free or subsidised vaccinations for seasonal influenza.</p>
                      <p>The number of vaccines administered under the government vaccination programme and vaccination subsidy scheme have increased by 4.7 per cent and 46.4 per cent compared to 2015/16. Nevertheless, the number of seasonal influenza virus infections by October 21 had reached 26,605, already exceeding the total number of 21,218 cases in 2016.</p>
                      <p><strong>To better protect the city against seasonal flu, the government should promote the vaccination programmes more aggressively, and further reduce the vaccination cost through the centralised ordering of vaccines.</strong></p>
                      <p>In response to my inquiry, the Department of Health said 1.5 million Hong Kong residents were eligible for free vaccination under the vaccination programme and 1.9 million for subsidised vaccination under the subsidy scheme. These numbers include about a million senior citizens who are covered by both plans. Taking out a million to avoid double counting, it is estimated that 2.4 million people are eligible for free or subsidised flu shots.</p>
                      <p>Considering the low participation rate of the GVP and VSS combined (about 29 per cent), the department should devote more resources to marketing its vaccination programmes.</p>
                      <p>Mobile vaccination vehicles should be used to make the vaccines more accessible around the city. Vaccination teams should be sent to kindergartens, primary and secondary schools to inoculate children.</p>
                      <p>In 2016/17, the government purchased 430,000 doses of vaccines, and only 10,000 doses were discarded at the end.</p>
                      <p>Given the government's impressive accuracy in predicting the number of vaccines required, the department should also help private doctors under the VSS to purchase the vaccines.</p>
                      <p>According to a flu vaccine manufacturer in the US, it is always challenging to estimate the demand for vaccines, forcing consumers to share the cost of discarded doses. Therefore, the cost of the flu shots could be further reduced if the government centralised the annual purchase of flu vaccines in Hong Kong.</p>
                      <p>In 2000, a universal influenza immunisation programme was introduced in Ontario, Canada, to provide free shots to everyone older than six months. Research suggested that this programme was economically attractive, as it halved influenza-related health care costs and brought more years of health to the citizens.</p>
                      <p>To battle influenza in the city, the government should consider experimenting with a similar universal vaccination programme.</p>
                      <p className="text-muted-foreground italic">— Simon Wang, Kowloon Tong</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mermaid Diagram Toggle */}
              <Collapsible open={showFluDiagram} onOpenChange={setShowFluDiagram}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                    <span className="flex items-center gap-2">
                      📊 View Argument Structure Diagram
                    </span>
                    {showFluDiagram ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="p-4 bg-white dark:bg-muted/20 rounded-lg border overflow-x-auto">
                    <h4 className="font-semibold mb-3 text-center">Letter Argument Flow</h4>
                    <MermaidDiagram 
                      chart={`graph TD
    subgraph Problem["🔴 Problem Statement"]
        A["700K+ vaccinations in 2016/17<br/>but infections reached 26,605"]
        B["Only 29% participation rate<br/>among 2.4M eligible"]
    end
    
    subgraph Data["📊 Key Data Points"]
        C["1.5M eligible for free GVP"]
        D["1.9M eligible for subsidised VSS"]
        E["430K doses purchased<br/>only 10K discarded"]
    end
    
    subgraph Solutions["💡 Proposed Solutions"]
        F["Better Marketing<br/>Mobile vaccination vehicles"]
        G["Centralised Ordering<br/>Reduce vaccine costs"]
        H["School Programs<br/>Vaccination teams to schools"]
    end
    
    subgraph Evidence["🌍 International Evidence"]
        I["Ontario, Canada (2000)<br/>Universal immunisation"]
        J["Halved healthcare costs<br/>More healthy years"]
    end
    
    subgraph Conclusion["✅ Policy Recommendation"]
        K["Consider universal<br/>vaccination programme"]
    end
    
    A --> B
    C --> B
    D --> B
    B --> F
    B --> G
    B --> H
    E --> G
    I --> J
    J --> K
    F --> K
    G --> K
    H --> K
    
    style Problem fill:#fee2e2,stroke:#dc2626
    style Data fill:#dbeafe,stroke:#2563eb
    style Solutions fill:#fef3c7,stroke:#d97706
    style Evidence fill:#d1fae5,stroke:#059669
    style Conclusion fill:#e0e7ff,stroke:#4f46e5`}
                      className="flex justify-center"
                    />
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      This diagram shows how the letter builds its argument from data to policy recommendation
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>💡 Course Connection:</strong> This letter demonstrates citizen advocacy through data-informed argument. Notice how data (participation rates, doses purchased) is used to support policy recommendations.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Connecting to the Course */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What's Coming in the Next Few Weeks</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Weeks 1-3:</strong> Identify your policy issue, learn about data availability, start government requests</li>
              <li>• <strong>Weeks 4-6:</strong> Data collection and fieldwork</li>
              <li>• <strong>Weeks 7-9:</strong> Mathematical modeling and analysis</li>
              <li>• <strong>Weeks 10-12:</strong> Report writing and LegCo submission</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Part2TechnologyMath = () => {
  const [showSlides, setShowSlides] = useState(false);
  const [showPython, setShowPython] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const slidesContainerRef = React.useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (slidesContainerRef.current) {
      if (slidesContainerRef.current.requestFullscreen) {
        slidesContainerRef.current.requestFullscreen();
      }
    }
  };

  const slidesUrl = "https://docs.google.com/presentation/d/e/2PACX-1vQUKhZM1QcZuSFopfIbJ09PEkRnFAMaRzuUWtoUvtMIfD26Htmwe5KuZUQMKA8Q1U4KsyNg0-ktqrUo/pub?start=false&loop=false&delayms=60000";
  const embedUrl = "https://docs.google.com/presentation/d/e/2PACX-1vQUKhZM1QcZuSFopfIbJ09PEkRnFAMaRzuUWtoUvtMIfD26Htmwe5KuZUQMKA8Q1U4KsyNg0-ktqrUo/embed?start=false&loop=false&delayms=60000";

  return (
    <div className="space-y-6">
      {/* Presentation Slides */}
      <Collapsible open={showSlides} onOpenChange={setShowSlides}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-primary/5 border-primary/20 hover:bg-primary/10">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              📊 View Presentation Slides
            </span>
            {showSlides ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleFullscreen}>
              <Maximize className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={slidesUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4 mr-2" />
                Open in New Tab
              </a>
            </Button>
          </div>
          <div ref={slidesContainerRef} className="rounded-lg overflow-hidden border bg-black [&:fullscreen]:border-0 [&:fullscreen]:rounded-none">
            <iframe
              src={embedUrl}
              width="100%"
              height="480"
              allowFullScreen
              className="border-0 [div:fullscreen_&]:h-screen [div:fullscreen_&]:w-screen"
              title="Week 1 Part 2 Slides"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Use arrow keys or click to navigate slides
          </p>
        </CollapsibleContent>
      </Collapsible>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-500" />
            Part 2: Technology & Math Overview
          </CardTitle>
          <p className="text-sm text-muted-foreground">Presented by Talia</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <h3 className="font-semibold mb-2">Tools for Your Project</h3>
            <p className="text-sm text-muted-foreground">
              Throughout this course, you'll learn to use technology and mathematical tools to analyze policy issues. Don't worry if you're new to these – we'll guide you step by step!
            </p>
          </div>

          {/* Python & Programming */}
          <Collapsible open={showPython} onOpenChange={setShowPython}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  Programming with Python
                </span>
                {showPython ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Python is widely used for data analysis. We'll use simple scripts to collect and analyze public data.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono">
                <pre>{`# Example: Fetching public data
import requests

response = requests.get("https://api.data.gov.hk/...")
data = response.json()

# Analyze the results
print(f"Found {len(data)} records")`}</pre>
              </div>
              <p className="text-xs text-muted-foreground">
                No prior programming experience needed – you'll learn as you go, with AI assistance.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Tools */}
          <Collapsible open={showAI} onOpenChange={setShowAI}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-purple-500" />
                  AI-Assisted Analysis
                </span>
                {showAI ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                AI tools like GitHub Copilot and ChatGPT can help you write code, analyze data, and draft reports. In this course, you'll learn to use AI as a collaborative partner.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-sm">What AI Can Help With</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Writing and debugging code</li>
                    <li>• Analyzing patterns in data</li>
                    <li>• Drafting sections of your report</li>
                  </ul>
                </div>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-sm">Your Responsibility</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Verify AI outputs for accuracy</li>
                    <li>• Understand the logic behind analyses</li>
                    <li>• Take ownership of final work</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mathematical Modeling */}
          <Collapsible open={showMath} onOpenChange={setShowMath}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-green-500" />
                  Mathematical Modeling
                </span>
                {showMath ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll explore how mathematical models can help understand and predict policy outcomes.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium text-sm">Simulation Modeling</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Model "what if" scenarios – e.g., what happens if vaccination rates increase by 10%?
                  </p>
                </div>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium text-sm">Regression Analysis</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Find relationships in data – e.g., factors affecting service usage patterns.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Looking Ahead */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What You'll Learn</h3>
            <p className="text-sm text-muted-foreground">
              By the end of this course, you'll be able to collect data, apply mathematical models, use AI tools responsibly, and present evidence-based policy recommendations. We'll build these skills progressively throughout the semester.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spring2026Week1;
