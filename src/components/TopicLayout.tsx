import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink, MessageSquare, FolderOpen, Info, Users, Calendar, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProjectMessageBoard from "@/components/ProjectMessageBoard";
import ProjectFileUpload from "@/components/ProjectFileUpload";
import ProjectMembership from "@/components/ProjectMembership";
import ProjectSessions from "@/components/ProjectSessions";
import ProjectMilestones from "@/components/ProjectMilestones";

export interface TopicData {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  overview: string;
  keyQuestions: string[];
  potentialDataSources: string[];
  relevantSDGs: { name: string; explanation: string }[];
}

interface TopicLayoutProps {
  topicSlug: string;
  topic: TopicData;
}

const TopicLayout = ({ topicSlug, topic }: TopicLayoutProps) => {
  const [projectGroupId, setProjectGroupId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  // Load member info from localStorage
  useEffect(() => {
    const storedMemberId = localStorage.getItem(`project_member_${topicSlug}`);
    const storedIsTeacher = localStorage.getItem(`project_is_teacher_${topicSlug}`);
    if (storedMemberId) {
      setMemberId(storedMemberId);
      setIsTeacher(storedIsTeacher === "true");
    }
  }, [topicSlug]);

  useEffect(() => {
    const fetchProjectGroup = async () => {
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

  const Icon = topic.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0 mt-1 sm:mt-0">
            <Link to="/spring-2026/topics">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className={`p-2 sm:p-3 ${topic.color} rounded-full shrink-0`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Group Project {topic.id}</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary truncate">{topic.title}</h1>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto gap-1 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="membership" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Milestones</span>
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
              <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Files</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Topic Overview */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Project Overview</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{topic.overview}</p>
            </Card>

            {/* Quick Navigation */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
              <Card className="p-3 sm:p-4 cursor-pointer hover:border-primary active:scale-95 transition-all" onClick={() => document.querySelector('[value="membership"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1.5 sm:mb-2" />
                <h3 className="font-medium text-xs sm:text-base">Team</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">View members</p>
              </Card>
              <Card className="p-3 sm:p-4 cursor-pointer hover:border-primary active:scale-95 transition-all" onClick={() => document.querySelector('[value="sessions"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1.5 sm:mb-2" />
                <h3 className="font-medium text-xs sm:text-base">Meetings</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Schedule sessions</p>
              </Card>
              <Card className="p-3 sm:p-4 cursor-pointer hover:border-primary active:scale-95 transition-all" onClick={() => document.querySelector('[value="milestones"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1.5 sm:mb-2" />
                <h3 className="font-medium text-xs sm:text-base">Milestones</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Track progress</p>
              </Card>
              <Card className="p-3 sm:p-4 cursor-pointer hover:border-primary active:scale-95 transition-all hidden sm:block" onClick={() => document.querySelector('[value="discussion"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1.5 sm:mb-2" />
                <h3 className="font-medium text-xs sm:text-base">Discussion</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">AI-powered chat</p>
              </Card>
              <Card className="p-3 sm:p-4 cursor-pointer hover:border-primary active:scale-95 transition-all hidden sm:block" onClick={() => document.querySelector('[value="files"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1.5 sm:mb-2" />
                <h3 className="font-medium text-xs sm:text-base">Files</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Upload documents</p>
              </Card>
            </div>

            {/* Research Context */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Research Questions</h2>
              <ul className="space-y-2">
                {topic.keyQuestions.map((question, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Potential Data Sources</h2>
              <ul className="space-y-2">
                {topic.potentialDataSources.map((source, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                    <ExternalLink className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Relevant SDGs</h2>
              <div className="space-y-3 sm:space-y-4">
                {topic.relevantSDGs.map((sdg, idx) => (
                  <div key={idx} className="bg-accent/50 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-primary mb-1.5 sm:mb-2 text-sm sm:text-base">{sdg.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{sdg.explanation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            {projectGroupId ? (
              <ProjectMembership
                projectGroupId={projectGroupId}
                topicSlug={topicSlug}
                topicTitle={topic.title}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Loading project group...</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions">
            {projectGroupId ? (
              <ProjectSessions
                projectGroupId={projectGroupId}
                topicSlug={topicSlug}
                memberId={memberId}
                isTeacher={isTeacher}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Loading sessions...</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="milestones">
            {projectGroupId ? (
              <ProjectMilestones
                projectGroupId={projectGroupId}
                isTeacher={isTeacher}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Loading milestones...</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="discussion">
            {projectGroupId ? (
              <ProjectMessageBoard
                projectGroupId={projectGroupId}
                topicSlug={topicSlug}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Loading discussion...</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="files">
            {projectGroupId ? (
              <ProjectFileUpload
                projectGroupId={projectGroupId}
                topicSlug={topicSlug}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Loading files...</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TopicLayout;
