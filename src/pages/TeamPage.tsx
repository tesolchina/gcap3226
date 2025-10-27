import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MessageBoard } from "@/components/MessageBoard";
import { Loader2, FileText, Database, Calculator, Lightbulb, Target } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Team {
  id: number;
  name: string;
  slug: string;
  description: string;
}

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            {team.name}
          </h1>
          <p className="text-lg text-muted-foreground">{team.description}</p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="introduction" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
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
                  
                  {/* Overview Section */}
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

              {/* Message Board - Bottom Section (Smaller) */}
              <div className="mt-8">
                <Card className="p-6 bg-gradient-to-br from-card to-accent/10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    💬 Team Message Board
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Collaborate with your team members and teachers
                  </p>
                  <MessageBoard teamId={team.id} tabName={tab.value} />
                </Card>
              </div>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TeamPage;