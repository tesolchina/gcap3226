import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { topicData } from "@/data/topic-data";

const Spring2026Topic = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const [projectGroupId, setProjectGroupId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const topic = topicSlug ? topicData[topicSlug] : null;

  // Load member info from localStorage
  useEffect(() => {
    if (topicSlug) {
      const storedMemberId = localStorage.getItem(`project_member_${topicSlug}`);
      const storedIsTeacher = localStorage.getItem(`project_is_teacher_${topicSlug}`);
      if (storedMemberId) {
        setMemberId(storedMemberId);
        setIsTeacher(storedIsTeacher === "true");
      }
    }
  }, [topicSlug]);

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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="membership" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Milestones</span>
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Discussion</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Files</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Topic Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
              <p className="text-muted-foreground">{topic.overview}</p>
            </Card>

            {/* Quick Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => document.querySelector('[value="membership"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Users className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Team</h3>
                <p className="text-xs text-muted-foreground">View members</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => document.querySelector('[value="sessions"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Calendar className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Meetings</h3>
                <p className="text-xs text-muted-foreground">Schedule sessions</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => document.querySelector('[value="milestones"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <Target className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Milestones</h3>
                <p className="text-xs text-muted-foreground">Track progress</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => document.querySelector('[value="discussion"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <MessageSquare className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Discussion</h3>
                <p className="text-xs text-muted-foreground">AI-powered chat</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => document.querySelector('[value="files"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                <FolderOpen className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Files</h3>
                <p className="text-xs text-muted-foreground">Upload documents</p>
              </Card>
            </div>

            {/* Research Context */}
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

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Relevant SDGs</h2>
              <div className="space-y-4">
                {topic.relevantSDGs.map((sdg, idx) => (
                  <div key={idx} className="bg-accent/50 rounded-lg p-4">
                    <h3 className="font-semibold text-primary mb-2">{sdg.name}</h3>
                    <p className="text-sm text-muted-foreground">{sdg.explanation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            {projectGroupId && topicSlug ? (
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
            {projectGroupId && topicSlug ? (
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
            {projectGroupId && topicSlug ? (
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
            {projectGroupId && topicSlug ? (
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

export default Spring2026Topic;
