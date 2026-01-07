import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Users, CheckCircle, XCircle, Clock, GraduationCap, Loader2 } from "lucide-react";

interface Member {
  id: string;
  student_id_last4: string;
  display_name: string | null;
  status: string;
  created_at: string;
}

interface ProjectMembershipProps {
  projectGroupId: string;
  topicSlug: string;
  topicTitle: string;
}

const ProjectMembership = ({ projectGroupId, topicSlug, topicTitle }: ProjectMembershipProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [studentId, setStudentId] = useState("");
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    const storedStudentId = localStorage.getItem(`project_student_id_${topicSlug}`);
    const storedIsTeacher = localStorage.getItem(`project_is_teacher_${topicSlug}`);
    if (storedStudentId) {
      setStudentId(storedStudentId);
      setIsTeacher(storedIsTeacher === "true");
      checkMembership(storedStudentId);
    }
  }, [topicSlug]);

  // Fetch all members for this group
  useEffect(() => {
    if (!projectGroupId) return;

    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("project_members")
        .select("id, student_id_last4, display_name, status, created_at")
        .eq("project_group_id", projectGroupId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMembers(data as Member[]);
      }
    };

    fetchMembers();

    // Subscribe to changes
    const channel = supabase
      .channel(`project_members_${projectGroupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_members",
          filter: `project_group_id=eq.${projectGroupId}`,
        },
        () => fetchMembers()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectGroupId]);

  const checkMembership = async (id: string) => {
    // Check if teacher
    const { data: globalMember } = await supabase
      .from("project_members")
      .select("id, student_id_last4, display_name, status")
      .is("project_group_id", null)
      .eq("student_id_last4", id)
      .single();

    if (globalMember) {
      setIsTeacher(true);
      setCurrentMember(globalMember as Member);
      localStorage.setItem(`project_is_teacher_${topicSlug}`, "true");
      return;
    }

    // Check if already a member of this group
    const { data: existingMember } = await supabase
      .from("project_members")
      .select("id, student_id_last4, display_name, status")
      .eq("project_group_id", projectGroupId)
      .eq("student_id_last4", id)
      .single();

    if (existingMember) {
      setCurrentMember(existingMember as Member);
    }
  };

  const handleCheckId = async () => {
    if (studentId.length !== 4 || !/^\d{4}$/.test(studentId)) {
      toast({
        title: "Invalid Student ID",
        description: "Please enter the last 4 digits of your student ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    localStorage.setItem(`project_student_id_${topicSlug}`, studentId);
    await checkMembership(studentId);
    setIsLoading(false);
  };

  const handleRequestToJoin = async () => {
    if (!studentId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("project_members")
        .insert({
          project_group_id: projectGroupId,
          student_id_last4: studentId,
          status: "pending",
        })
        .select("id, student_id_last4, display_name, status")
        .single();

      if (error) throw error;

      setCurrentMember(data as Member);
      toast({
        title: "Request Submitted",
        description: "Your request to join this group has been sent for teacher approval.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from("project_members")
        .update({ status: "approved" })
        .eq("id", memberId);

      if (error) throw error;

      toast({ title: "Member Approved", description: "The student has been added to the group." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleReject = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from("project_members")
        .update({ status: "rejected" })
        .eq("id", memberId);

      if (error) throw error;

      toast({ title: "Request Rejected", description: "The membership request has been rejected." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const pendingMembers = members.filter((m) => m.status === "pending");
  const approvedMembers = members.filter((m) => m.status === "approved");

  return (
    <div className="space-y-6">
      {/* Student ID Entry */}
      {!localStorage.getItem(`project_student_id_${topicSlug}`) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Join This Project Group
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter the last 4 digits of your student ID to check your membership or request to join.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 1234"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              className="w-32"
            />
            <Button onClick={handleCheckId} disabled={isLoading || studentId.length !== 4}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
            </Button>
          </div>
        </Card>
      )}

      {/* Current User Status */}
      {localStorage.getItem(`project_student_id_${topicSlug}`) && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Membership Status
            </h3>
            {isTeacher && <Badge className="bg-amber-500"><GraduationCap className="h-3 w-3 mr-1" />Teacher</Badge>}
          </div>

          {isTeacher ? (
            <p className="text-muted-foreground">You have teacher access to all project groups.</p>
          ) : currentMember ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Student ID: ***{studentId}</span>
              {currentMember.status === "pending" && (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending Approval
                </Badge>
              )}
              {currentMember.status === "approved" && (
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved Member
                </Badge>
              )}
              {currentMember.status === "rejected" && (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Request Rejected
                </Badge>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You haven't requested to join the <strong>{topicTitle}</strong> group yet.
              </p>
              <Button onClick={handleRequestToJoin} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
                Request to Join This Group
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* Teacher: Pending Approvals */}
      {isTeacher && pendingMembers.length > 0 && (
        <Card className="p-6 border-amber-200 bg-amber-50 dark:bg-amber-950/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Clock className="h-5 w-5" />
            Pending Approval ({pendingMembers.length})
          </h3>
          <div className="space-y-3">
            {pendingMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg">
                <div>
                  <span className="font-medium">Student ***{member.student_id_last4}</span>
                  {member.display_name && (
                    <span className="text-muted-foreground ml-2">({member.display_name})</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(member.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(member.id)}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Approved Members List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Group Members ({approvedMembers.length})
        </h3>
        {approvedMembers.length === 0 ? (
          <p className="text-muted-foreground text-sm">No approved members yet. Be the first to join!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {approvedMembers.map((member) => (
              <Badge key={member.id} variant="secondary" className="px-3 py-1">
                {member.display_name || `Student ***${member.student_id_last4}`}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProjectMembership;
