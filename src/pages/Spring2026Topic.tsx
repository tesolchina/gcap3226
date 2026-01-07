import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Syringe, Activity, Car, Wallet, HeartPulse, Bug, ExternalLink, MessageSquare, FolderOpen, Info, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProjectMessageBoard from "@/components/ProjectMessageBoard";
import ProjectFileUpload from "@/components/ProjectFileUpload";
import ProjectMembership from "@/components/ProjectMembership";

const topicData: Record<string, {
  id: number;
  title: string;
  description: string;
  icon: typeof Syringe;
  color: string;
  overview: string;
  keyQuestions: string[];
  potentialDataSources: string[];
  relevantSDGs: string[];
}> = {
  "flu-shot": {
    id: 1,
    title: "Flu Shot",
    description: "Seasonal influenza vaccination program and public health campaigns in Hong Kong.",
    icon: Syringe,
    color: "bg-blue-500",
    overview: "This topic explores the government's seasonal influenza vaccination program, including public health campaigns, vaccine distribution, and uptake rates among different population groups in Hong Kong.",
    keyQuestions: [
      "What is the current vaccination coverage rate in Hong Kong?",
      "How effective are government campaigns in promoting flu vaccination?",
      "What barriers exist to vaccine uptake among different demographics?",
      "How does Hong Kong's approach compare to other cities?",
    ],
    potentialDataSources: [
      "Centre for Health Protection vaccination statistics",
      "Hospital Authority annual reports",
      "Department of Health press releases",
      "Census and Statistics Department health surveys",
    ],
    relevantSDGs: ["SDG 3: Good Health and Well-being"],
  },
  "colorectal-cancer-screening": {
    id: 2,
    title: "Colorectal Cancer Screening Programme",
    description: "Government-subsidized screening program for colorectal cancer prevention and early detection.",
    icon: Activity,
    color: "bg-purple-500",
    overview: "This topic examines the Colorectal Cancer Screening Programme, a government-subsidized initiative to encourage early detection of colorectal cancer among Hong Kong residents aged 50-75.",
    keyQuestions: [
      "What is the participation rate in the screening programme?",
      "How effective is the programme in early cancer detection?",
      "What factors influence participation in cancer screening?",
      "How can the programme be improved to increase uptake?",
    ],
    potentialDataSources: [
      "Colorectal Cancer Screening Programme official statistics",
      "Hong Kong Cancer Registry data",
      "Department of Health annual reports",
      "Academic studies on screening effectiveness",
    ],
    relevantSDGs: ["SDG 3: Good Health and Well-being"],
  },
  "road-safety": {
    id: 3,
    title: "Road Safety",
    description: "Road safety policies, traffic management, and accident prevention initiatives.",
    icon: Car,
    color: "bg-orange-500",
    overview: "This topic focuses on road safety policies in Hong Kong, including traffic accident statistics, pedestrian safety measures, and initiatives to reduce road fatalities and injuries.",
    keyQuestions: [
      "What are the trends in road traffic accidents in Hong Kong?",
      "Which road user groups are most vulnerable?",
      "How effective are current road safety campaigns?",
      "What policy interventions have been most successful?",
    ],
    potentialDataSources: [
      "Transport Department road traffic accident statistics",
      "Hong Kong Police Force accident reports",
      "Road Safety Council publications",
      "Legislative Council papers on transport policy",
    ],
    relevantSDGs: ["SDG 3: Good Health and Well-being", "SDG 11: Sustainable Cities and Communities"],
  },
  "empf": {
    id: 4,
    title: "eMPF",
    description: "Electronic Mandatory Provident Fund platform for streamlined pension fund management.",
    icon: Wallet,
    color: "bg-green-500",
    overview: "This topic explores the eMPF Platform, a centralized electronic system designed to streamline the administration of Mandatory Provident Fund schemes in Hong Kong.",
    keyQuestions: [
      "How does the eMPF platform improve MPF administration efficiency?",
      "What are the benefits for employers and employees?",
      "What data governance challenges exist in the platform?",
      "How does digital transformation affect retirement savings management?",
    ],
    potentialDataSources: [
      "Mandatory Provident Fund Schemes Authority reports",
      "eMPF Platform official announcements",
      "Legislative Council papers on MPF reform",
      "Industry reports on pension digitalization",
    ],
    relevantSDGs: ["SDG 8: Decent Work and Economic Growth", "SDG 10: Reduced Inequalities"],
  },
  "cdcc": {
    id: 5,
    title: "Chronic Disease Co-Care (CDCC) Pilot Scheme",
    description: "Primary healthcare pilot scheme for chronic disease management through public-private partnership.",
    icon: HeartPulse,
    color: "bg-red-500",
    overview: "This topic examines the Chronic Disease Co-Care Pilot Scheme, a government initiative that provides subsidized primary healthcare services for chronic disease management through public-private partnerships.",
    keyQuestions: [
      "How effective is the CDCC scheme in managing chronic diseases?",
      "What is the uptake rate and participant satisfaction?",
      "How does the public-private partnership model work?",
      "What are the implications for Hong Kong's primary healthcare reform?",
    ],
    potentialDataSources: [
      "Primary Healthcare Office publications",
      "Food and Health Bureau policy documents",
      "Hospital Authority chronic disease statistics",
      "Academic research on primary healthcare",
    ],
    relevantSDGs: ["SDG 3: Good Health and Well-being"],
  },
  "rodent-control": {
    id: 6,
    title: "Rodent Control",
    description: "Urban pest management and public hygiene initiatives for rodent prevention across Hong Kong districts.",
    icon: Bug,
    color: "bg-yellow-600",
    overview: "This topic explores Hong Kong's rodent control initiatives managed by the Food and Environmental Hygiene Department (FEHD). The government publishes monthly rat-free percentage data for all 18 districts, measuring the effectiveness of pest control efforts. Rodent infestation is a significant public health concern linked to disease transmission, food safety, and urban environmental hygiene.",
    keyQuestions: [
      "How does the rat-free percentage vary across Hong Kong's 18 districts?",
      "What factors contribute to higher rodent infestation rates in certain areas?",
      "How effective are current rodent control measures and public education campaigns?",
      "What is the correlation between urban density, sanitation practices, and rodent prevalence?",
      "How do seasonal patterns affect rodent activity and control effectiveness?",
    ],
    potentialDataSources: [
      "FEHD Rat-Free Percentage Statistics (monthly updates by district)",
      "FEHD Pest Control Advisory Section reports",
      "District Council meeting minutes on environmental hygiene",
      "Legislative Council papers on pest control policy",
      "Hong Kong Observatory weather data (for seasonal analysis)",
      "Census data on population density by district",
    ],
    relevantSDGs: ["SDG 3: Good Health and Well-being", "SDG 11: Sustainable Cities and Communities"],
  },
};

const Spring2026Topic = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const [projectGroupId, setProjectGroupId] = useState<string | null>(null);
  const topic = topicSlug ? topicData[topicSlug] : null;

  useEffect(() => {
    const fetchProjectGroup = async () => {
      if (!topicSlug) return;
      
      const { data, error } = await supabase
        .from("project_groups")
        .select("id")
        .eq("topic_slug", topicSlug)
        .single();

      if (error) {
        console.error("Error fetching project group:", error);
        return;
      }

      setProjectGroupId(data?.id || null);
    };

    fetchProjectGroup();
  }, [topicSlug]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Button asChild>
            <Link to="/spring-2026/topics">Back to Group Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = topic.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026/topics">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className={`p-3 ${topic.color} rounded-full`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Group Project {topic.id}</p>
              <h1 className="text-3xl font-bold text-primary">{topic.title}</h1>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue={topicSlug === "flu-shot" ? "membership" : "discussion"} className="space-y-6">
          <TabsList className={`grid w-full ${topicSlug === "flu-shot" ? "grid-cols-4" : "grid-cols-3"}`}>
            {topicSlug === "flu-shot" && (
              <TabsTrigger value="membership" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Membership
              </TabsTrigger>
            )}
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Project Info
            </TabsTrigger>
          </TabsList>

          {topicSlug === "flu-shot" && (
            <TabsContent value="membership" className="space-y-4">
              {projectGroupId ? (
                <ProjectMembership projectGroupId={projectGroupId} topicSlug={topicSlug} topicTitle={topic.title} />
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  Loading membership...
                </Card>
              )}
            </TabsContent>
          )}

          <TabsContent value="discussion" className="space-y-4">
            {projectGroupId ? (
              <ProjectMessageBoard projectGroupId={projectGroupId} topicSlug={topicSlug!} />
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                Loading discussion...
              </Card>
            )}
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            {projectGroupId ? (
              <ProjectFileUpload projectGroupId={projectGroupId} topicSlug={topicSlug!} />
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                Loading files...
              </Card>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            {/* Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">{topic.overview}</p>
            </Card>

            {/* Key Research Questions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Research Questions</h2>
              <ul className="space-y-2">
                {topic.keyQuestions.map((question, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Potential Data Sources */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Potential Data Sources</h2>
              <ul className="space-y-2">
                {topic.potentialDataSources.map((source, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <ExternalLink className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Relevant SDGs */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Relevant Sustainable Development Goals</h2>
              <div className="flex flex-wrap gap-2">
                {topic.relevantSDGs.map((sdg, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {sdg}
                  </span>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Spring2026Topic;
