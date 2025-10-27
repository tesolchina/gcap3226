import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MessageBoard } from "@/components/MessageBoard";
import { SubmissionForm } from "@/components/SubmissionForm";
import { Loader2 } from "lucide-react";

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
    { name: "Introduction", value: "introduction" },
    { name: "Methodology", value: "methodology" },
    { name: "Data Analysis", value: "data-analysis" },
    { name: "Results", value: "results" },
    { name: "Discussion", value: "discussion" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-6">
              {/* Tab Content */}
              <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
                <h2 className="text-2xl font-bold mb-4">{tab.name}</h2>
                <p className="text-muted-foreground">
                  This section contains information about the {tab.name.toLowerCase()} of the project.
                  Students and teachers can collaborate, share insights, and document their research findings here.
                </p>
              </Card>

              {/* Submission Form */}
              <SubmissionForm teamId={team.id} tabName={tab.value} />

              {/* Message Board */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Message Board</h3>
                <MessageBoard teamId={team.id} tabName={tab.value} />
              </div>

              {/* Government/Public Info Section */}
              <Card className="p-6 bg-gradient-to-br from-accent/20 to-card">
                <h3 className="text-xl font-semibold mb-4">Public Information & Government Data</h3>
                <p className="text-muted-foreground mb-4">
                  This section will display relevant government data and public information related to this project phase.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    Public information and government data will be displayed here when available.
                  </p>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TeamPage;