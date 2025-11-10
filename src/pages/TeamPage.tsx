import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AIConsultationCorner } from "@/components/AIConsultationCorner";
import { Loader2, FileText, Database, Calculator, Lightbulb, Target, Presentation, ExternalLink, Clock, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Team {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface PresentationData {
  link: string;
  iframeCode?: string;
  teamMembers?: string[];
  focus?: string;
}

// Presentation slides data for each team
const presentationData: Record<string, PresentationData> = {
  'flu-shot': {
    link: 'https://docs.google.com/presentation/d/e/2PACX-1vSsReEFYsr5YNy3x8LaGsH_83H36-ZkyVwTWNuRM3gUEIh475qCHqsLhFJykA9MgdY87Lb5XzPfLE9C/pub?start=false&loop=false&delayms=3000',
    iframeCode: '<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSsReEFYsr5YNy3x8LaGsH_83H36-ZkyVwTWNuRM3gUEIh475qCHqsLhFJykA9MgdY87Lb5XzPfLE9C/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>',
    teamMembers: ['Yeung Wing Yu (23238283)', 'SU Jialu (22256946)', 'Tsoi Yik Hon (22232192)', 'LYU Junhan (23213078)', 'Kwok Tsz Yau (22234020)'],
    focus: 'Analysis of the collected data on flu shot participation, the identified issues and some suggestions'
  },
  'bus-route': {
    link: 'https://www.canva.com/design/DAG35hPWmNQ/IlGCZkCiuludgaapq59b7g/edit?utm_content=DAG35hPWmNQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
    teamMembers: ['23229101 Tsoi Tsz Yan', '23229543 Yip Tsz Ying', '23232099 Chan Hei Tung', '23234997 Ko Man Wai', '23233168 Wong Ling Yan Cassy'],
    focus: 'Latest results on overlap analysis of KMB 272A and Citybus 582, including primary data collection results and simulation approach.'
  },
  'green-recycling': {
    link: 'https://www.canva.com/design/DAG3DVo0bFM/ccCZTkLPMLNSCDOxcBHo4w/view?embed',
    iframeCode: '<iframe src="https://www.canva.com/design/DAG3DVo0bFM/ccCZTkLPMLNSCDOxcBHo4w/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>',
    teamMembers: ['CHAN Chi Ki (23233885)', 'CHEUNG Kwun Ho (24219169)', 'MAN Wai Yin (24202509)', 'TAG Tsz Tung (23230371)', 'HO Chun Chit (24202495)', 'XU Jingyi (24205397)'],
    focus: 'Progress update on Green@Community Recycling Network Overall Effectiveness Analysis, including data collection results, methodological approach, and preliminary insights & recommendations.'
  },
  'typhoon-signals': {
    link: 'https://www.canva.com/design/DAG3tPGBRlA/_ZZJcGDtrC7pstoyNz_vhA/view?utm_content=DAG3tPGBRlA&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    iframeCode: '<div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;"><iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;" src="https://www.canva.com/design/DAG3tPGBRlA/_ZZJcGDtrC7pstoyNz_vhA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe></div>'
  },
  'bus-stop-merge': {
    link: 'https://docs.google.com/presentation/d/e/2PACX-1vQmRIpY6GAN3SywbCq35-49P39GstccyUWkZbrT8xsNqFj896EbaL9FGgUxbg3Mp4gVtkgZ2lT-MjXR/pub?start=false&loop=false&delayms=3000',
    iframeCode: '<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQmRIpY6GAN3SywbCq35-49P39GstccyUWkZbrT8xsNqFj896EbaL9FGgUxbg3Mp4gVtkgZ2lT-MjXR/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="629" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>'
  },
  'food-waste': {
    link: 'https://docs.google.com/presentation/d/e/2PACX-1vSwB9lnsmSifF43eAYRf4_qRte4rkQb-z5HfI7zqIC366nLvZGi2DniSUhAE4iZx0eMleQVyVWeUX93/pub?start=false&loop=false&delayms=3000',
    iframeCode: '<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSwB9lnsmSifF43eAYRf4_qRte4rkQb-z5HfI7zqIC366nLvZGi2DniSUhAE4iZx0eMleQVyVWeUX93/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>',
    focus: 'Municipal Solid Waste Charging Scheme Analysis'
  }
};

const TeamPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, [slug]);

  const fetchTeam = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      setTeam(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8">
          <h2 className="text-2xl font-bold">Team not found</h2>
        </Card>
      </div>
    );
  }

  const tabs = [
    { name: "Presentation", value: "presentation", icon: Presentation },
    { name: "Introduction & Data Governance", value: "introduction", icon: FileText },
    { name: "Data Collection", value: "data-collection", icon: Database },
    { name: "Quantitative Reasoning", value: "quantitative", icon: Calculator },
    { name: "Main Arguments", value: "arguments", icon: Lightbulb },
    { name: "Call for Action", value: "action", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Team Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            {team.name}
          </h1>
          <p className="text-lg text-muted-foreground">{team.description}</p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="presentation" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{tab.name}</span>
                <span className="lg:hidden">{tab.name.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-6">
              
              {/* Main Content Area */}
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Left Column - Primary Content */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {tab.value === "presentation" ? (
                    <>
                      {/* Presentation Schedule Card */}
                      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/20 border-2 border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="h-6 w-6 text-primary" />
                          <h2 className="text-2xl font-bold">Presentation Schedule</h2>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-background/80 p-4 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Tentative Time:</p>
                            <p className="text-lg font-semibold text-primary">To be announced</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Please check with your instructor for the exact presentation date and time.
                            </p>
                          </div>
                        </div>
                      </Card>

                      {/* Recording Reminder for Teachers */}
                      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200 dark:border-orange-800">
                        <div className="flex items-start gap-3">
                          <Video className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-3">
                              📹 Recording Reminder for Teachers
                            </h3>
                            <div className="space-y-3 text-orange-950 dark:text-orange-50">
                              <p className="font-medium">
                                Please remember to start recording before the presentation begins:
                              </p>
                              <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                  <span className="text-orange-600 dark:text-orange-400 mt-1">✓</span>
                                  <span>Turn on <strong>Zoom recording</strong> to capture the presentation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-orange-600 dark:text-orange-400 mt-1">✓</span>
                                  <span>Enable <strong>shared screen recording</strong> to capture slides</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-orange-600 dark:text-orange-400 mt-1">✓</span>
                                  <span>Ensure <strong>audio recording</strong> is active for voice capture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-orange-600 dark:text-orange-400 mt-1">✓</span>
                                  <span>Test recording settings <strong>5 minutes before</strong> the session</span>
                                </li>
                              </ul>
                              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg mt-4">
                                <p className="text-sm font-medium">
                                  💡 Tip: Click "Record" in Zoom and select "Record to this Computer" or "Record to the Cloud"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Presentation Slides */}
                      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Presentation className="h-5 w-5 text-primary" />
                            Team Presentation Slides
                          </h3>
                          {presentationData[team.slug]?.link && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              asChild
                            >
                              <a href={presentationData[team.slug].link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Open in new tab
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        {presentationData[team.slug]?.focus && (
                          <div className="mb-4 p-3 bg-accent/30 rounded-lg">
                            <p className="text-sm font-medium text-primary mb-1">Presentation Focus:</p>
                            <p className="text-sm text-muted-foreground">{presentationData[team.slug].focus}</p>
                          </div>
                        )}
                        
                        {presentationData[team.slug]?.teamMembers && (
                          <div className="mb-4 p-3 bg-accent/20 rounded-lg">
                            <p className="text-sm font-medium text-primary mb-2">Team Members:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {presentationData[team.slug].teamMembers.map((member, idx) => (
                                <li key={idx}>• {member}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <p className="text-muted-foreground mb-4 text-sm">
                          View the team's presentation slides below or open in a separate tab for a better experience.
                        </p>
                        
                        {/* Dynamic iframe or placeholder */}
                        {presentationData[team.slug]?.iframeCode ? (
                          <div 
                            className="rounded-lg overflow-hidden aspect-video"
                            dangerouslySetInnerHTML={{ __html: presentationData[team.slug].iframeCode || '' }}
                          />
                        ) : presentationData[team.slug]?.link ? (
                          <div className="rounded-lg overflow-hidden aspect-video border-2 border-muted">
                            <iframe
                              src={presentationData[team.slug].link}
                              className="w-full h-full border-0"
                              allowFullScreen
                              title={`${team.name} Presentation`}
                            />
                          </div>
                        ) : (
                          <div className="bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 aspect-video flex items-center justify-center">
                            <div className="text-center space-y-2 p-8">
                              <Presentation className="h-12 w-12 mx-auto text-muted-foreground/50" />
                              <p className="text-muted-foreground font-medium">
                                Presentation slides will be embedded here
                              </p>
                              <p className="text-sm text-muted-foreground/70">
                                Team: {team.name}
                              </p>
                              <p className="text-xs text-muted-foreground/50">
                                Awaiting iframe code or link
                              </p>
                            </div>
                          </div>
                        )}
                      </Card>
                    </>
                  ) : tab.value === "introduction" ? (
                    <>
                      {/* Government Decisions to Review */}
                      <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="h-6 w-6 text-primary" />
                          <h2 className="text-2xl font-bold">Government Decisions to Review</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          This project examines critical government decisions and policies in Hong Kong that impact citizens' daily lives. 
                          We analyze the rationale, implementation, and outcomes of these decisions through data-driven approaches.
                        </p>
                        <div className="space-y-3">
                          <div className="bg-accent/30 p-4 rounded-lg">
                            <p className="font-medium mb-2">Key Policy Areas Under Review:</p>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li>• Recent policy changes and their immediate impacts</li>
                              <li>• Resource allocation decisions</li>
                              <li>• Public service delivery and efficiency</li>
                              <li>• Community welfare and development initiatives</li>
                            </ul>
                          </div>
                        </div>
                      </Card>

                      {/* Issue Framework */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Issue Framework
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-primary mb-2">1. Problem Definition</h4>
                            <p className="text-sm text-muted-foreground ml-4">
                              Clear articulation of the policy challenge and its scope
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-2">2. Stakeholder Analysis</h4>
                            <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                              <p>• Affected communities and populations</p>
                              <p>• Government agencies involved</p>
                              <p>• Private sector interests</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-2">3. Current State Assessment</h4>
                            <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                              <p>• Existing conditions and metrics</p>
                              <p>• Historical context and trends</p>
                              <p>• Data availability and quality</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-2">4. Policy Alternatives</h4>
                            <p className="text-sm text-muted-foreground ml-4">
                              Exploration of different approaches and interventions
                            </p>
                          </div>
                        </div>
                      </Card>

                      {/* Expected Outcomes & Significance */}
                      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/20">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          Expected Outcomes & Significance
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Project Deliverables</h4>
                            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                              <li>• Comprehensive data analysis and visualization</li>
                              <li>• Evidence-based policy recommendations</li>
                              <li>• Quantitative models for impact assessment</li>
                              <li>• Public-facing advocacy materials</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Significance</h4>
                            <p className="text-sm text-muted-foreground">
                              This research contributes to participatory governance by empowering citizens with data literacy 
                              and analytical tools. By examining government decisions through mathematical and empirical lenses, 
                              we promote transparency, accountability, and evidence-based policymaking in Hong Kong.
                            </p>
                          </div>
                          <div className="bg-accent/40 p-4 rounded-lg">
                            <p className="text-sm font-medium mb-2">Impact Goals:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Inform public discourse with data-driven insights</li>
                              <li>• Support community advocacy efforts</li>
                              <li>• Contribute to policy improvement processes</li>
                            </ul>
                          </div>
                        </div>
                      </Card>

                      {/* Background Resources */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Database className="h-5 w-5 text-primary" />
                          Background Information & Resources
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Essential resources for understanding the policy context and data landscape:
                        </p>
                        <div className="space-y-3">
                          <a 
                            href="https://data.gov.hk" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <p className="font-medium text-primary">Hong Kong Open Data Portal</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Central repository for government datasets and public information
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">🔗 data.gov.hk</p>
                          </a>
                          
                          <a 
                            href="https://www.censtatd.gov.hk" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <p className="font-medium text-primary">Census and Statistics Department</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Official statistics on Hong Kong's economy, population, and social indicators
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">🔗 censtatd.gov.hk</p>
                          </a>
                          
                          <a 
                            href="https://www.legco.gov.hk" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <p className="font-medium text-primary">Legislative Council</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Policy documents, debates, and legislative materials
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">🔗 legco.gov.hk</p>
                          </a>
                        </div>
                      </Card>
                    </>
                  ) : (
                    <>
                      {/* Generic content for other tabs */}
                      <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
                        <div className="flex items-center gap-3 mb-4">
                          <tab.icon className="h-6 w-6 text-primary" />
                          <h2 className="text-2xl font-bold">{tab.name}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          This section focuses on the {tab.name.toLowerCase()} aspect of the project. 
                          Students and teachers can collaborate, share insights, and document their research findings here.
                        </p>
                      </Card>

                      {/* Research Context */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Research Context
                        </h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>Background information and context for this research phase.</p>
                          <div className="bg-accent/30 p-4 rounded-lg">
                            <p className="text-sm italic">
                              Content will be added here as the research progresses.
                            </p>
                          </div>
                        </div>
                      </Card>

                      {/* Key Findings */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          Key Findings & Insights
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-gradient-to-r from-primary/10 to-accent/20 p-4 rounded-lg border-l-4 border-primary">
                            <p className="font-medium mb-2">Important Discovery</p>
                            <p className="text-sm text-muted-foreground">
                              Document your key findings and insights here.
                            </p>
                          </div>
                        </div>
                      </Card>

                      {/* Analysis & Discussion */}
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-primary" />
                          Analysis & Discussion
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground">
                            Detailed analysis and discussion points will be documented here.
                            Include mathematical models, data visualizations, and analytical frameworks.
                          </p>
                        </div>
                      </Card>

                      {/* Public Information & Government Data */}
                      <Card className="p-6 bg-gradient-to-br from-accent/20 to-card">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Database className="h-5 w-5 text-primary" />
                          Public Information & Government Data
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Relevant government data and public information for this research phase.
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <p className="text-sm font-medium">Data Sources:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Government open data portals</li>
                            <li>• Public policy documents</li>
                            <li>• Statistical databases</li>
                          </ul>
                        </div>
                      </Card>
                    </>
                  )}
                </div>

                {/* Right Column - Collaboration Tools */}
                <div className="space-y-6">
                  
                  {/* Quick Actions */}
                  <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/20">
                    <h3 className="font-semibold mb-3">Quick Actions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-background rounded hover:bg-accent/50 cursor-pointer transition">
                        📊 View Data
                      </div>
                      <div className="p-2 bg-background rounded hover:bg-accent/50 cursor-pointer transition">
                        📝 Add Notes
                      </div>
                      <div className="p-2 bg-background rounded hover:bg-accent/50 cursor-pointer transition">
                        🔗 Share Resources
                      </div>
                    </div>
                  </Card>

                  {/* Resources */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Project guidelines</p>
                      <p>• Reference materials</p>
                      <p>• Sample analyses</p>
                      <p>• Data templates</p>
                    </div>
                  </Card>

                  {/* Team Progress */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Team Progress</h3>
                    <div className="space-y-3">
                      {tabs.map((t, idx) => (
                        <div key={t.value} className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${idx <= tabs.findIndex(tab => tab.value === tab.value) ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-xs text-muted-foreground">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              <Separator className="my-8" />

              {/* AI Consultation Corner - Bottom Section */}
              <div className="mt-8">
                <AIConsultationCorner 
                  teamId={team.id} 
                  tabName={tab.value}
                  teamName={team.name}
                />
              </div>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TeamPage;