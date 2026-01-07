import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Target, Plus, Calendar, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  is_completed: boolean;
  completed_at: string | null;
  is_custom: boolean;
  display_order: number;
}

interface ProjectMilestonesProps {
  projectGroupId: string;
  isTeacher: boolean;
}

const ProjectMilestones = ({ projectGroupId, isTeacher }: ProjectMilestonesProps) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMilestone, setNewMilestone] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectGroupId) return;

    const fetchMilestones = async () => {
      const { data, error } = await supabase
        .from("project_milestones" as any)
        .select("*")
        .eq("project_group_id", projectGroupId)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching milestones:", error);
        // If no milestones exist, create default ones
        if (!data || data.length === 0) {
          await createDefaultMilestones();
        }
      } else {
        if (data.length === 0) {
          await createDefaultMilestones();
        } else {
          setMilestones(data as unknown as Milestone[]);
        }
      }
      setIsLoading(false);
    };

    fetchMilestones();
  }, [projectGroupId]);

  const createDefaultMilestones = async () => {
    const defaults = [
      { title: "Topic Finalized", description: "Confirm research topic and scope with teacher approval", display_order: 1 },
      { title: "Data Collection Complete", description: "Gather all primary and secondary data sources", display_order: 2 },
      { title: "Analysis Framework Ready", description: "Complete data analysis using agreed methodology", display_order: 3 },
      { title: "Draft Report Submitted", description: "Submit draft report outline for feedback", display_order: 4 },
      { title: "Presentation Prepared", description: "Complete presentation slides and rehearse", display_order: 5 },
      { title: "Final Report Submitted", description: "Submit final group report", display_order: 6 },
    ];

    const { data, error } = await supabase
      .from("project_milestones" as any)
      .insert(defaults.map((m) => ({ ...m, project_group_id: projectGroupId, is_custom: false })))
      .select();

    if (!error && data) {
      setMilestones(data as unknown as Milestone[]);
    }
  };

  const toggleMilestone = async (milestone: Milestone) => {
    const newCompleted = !milestone.is_completed;
    
    try {
      const { error } = await supabase
        .from("project_milestones" as any)
        .update({
          is_completed: newCompleted,
          completed_at: newCompleted ? new Date().toISOString() : null,
        })
        .eq("id", milestone.id);

      if (error) throw error;

      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestone.id
            ? { ...m, is_completed: newCompleted, completed_at: newCompleted ? new Date().toISOString() : null }
            : m
        )
      );

      toast({
        title: newCompleted ? "Milestone Completed! 🎉" : "Milestone Reopened",
        description: milestone.title,
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const addCustomMilestone = async () => {
    if (!newMilestone.trim()) return;

    setIsAdding(true);
    try {
      const maxOrder = Math.max(...milestones.map((m) => m.display_order), 0);
      
      const { data, error } = await supabase
        .from("project_milestones" as any)
        .insert({
          project_group_id: projectGroupId,
          title: newMilestone.trim(),
          is_custom: true,
          display_order: maxOrder + 1,
        })
        .select()
        .single();

      if (error) throw error;

      setMilestones((prev) => [...prev, data as unknown as Milestone]);
      setNewMilestone("");
      toast({ title: "Milestone Added" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsAdding(false);
    }
  };

  const completedCount = milestones.filter((m) => m.is_completed).length;
  const progressPercent = milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0;

  if (isLoading) {
    return (
      <Card className="p-6 text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5" />
          Project Milestones
        </h3>
        <Badge variant="secondary">
          {completedCount}/{milestones.length} Complete
        </Badge>
      </div>

      <Progress value={progressPercent} className="h-2 mb-6" />

      <div className="space-y-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              milestone.is_completed ? "bg-green-50 dark:bg-green-950/30" : "bg-muted/50"
            }`}
          >
            <Checkbox
              checked={milestone.is_completed}
              onCheckedChange={() => toggleMilestone(milestone)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${milestone.is_completed ? "line-through text-muted-foreground" : ""}`}>
                  {milestone.title}
                </span>
                {milestone.is_custom && (
                  <Badge variant="outline" className="text-xs">Custom</Badge>
                )}
              </div>
              {milestone.description && (
                <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
              )}
              {milestone.completed_at && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed {format(new Date(milestone.completed_at), "MMM d, yyyy")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Milestone (Teachers only) */}
      {isTeacher && (
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Add custom milestone:</p>
          <div className="flex gap-2">
            <Input
              placeholder="New milestone title..."
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomMilestone()}
            />
            <Button onClick={addCustomMilestone} disabled={isAdding || !newMilestone.trim()}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProjectMilestones;
