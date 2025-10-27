import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface SubmissionFormProps {
  teamId: number;
  tabName: string;
}

export function SubmissionForm({ teamId, tabName }: SubmissionFormProps) {
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("student_submissions").insert({
      team_id: teamId,
      tab_name: tabName,
      first_name: firstName,
      submission_data: { submitted_at: new Date().toISOString() },
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to submit");
    } else {
      toast.success("Submission recorded successfully!");
      setFirstName("");
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
      <h3 className="text-lg font-semibold mb-4">Student Submission</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
        >
          <Send className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </form>
    </Card>
  );
}