import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Loader2, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ProjectFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  description: string | null;
  created_at: string;
  member?: {
    student_id_last4: string;
  } | null;
}

interface ProjectFileUploadProps {
  projectGroupId: string;
  topicSlug: string;
}

const ProjectFileUpload = ({ projectGroupId, topicSlug }: ProjectFileUploadProps) => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const memberId = localStorage.getItem(`project_member_${topicSlug}`);

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_files")
      .select(`
        id,
        file_name,
        file_path,
        file_size,
        mime_type,
        description,
        created_at,
        member_id
      `)
      .eq("project_group_id", projectGroupId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
      return;
    }

    // Fetch member info
    const filesWithMembers = await Promise.all(
      (data || []).map(async (file) => {
        if (file.member_id) {
          const { data: memberData } = await supabase
            .from("project_members")
            .select("student_id_last4")
            .eq("id", file.member_id)
            .single();
          return { ...file, member: memberData };
        }
        return { ...file, member: null };
      })
    );

    setFiles(filesWithMembers);
  }, [projectGroupId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!memberId) {
      toast({
        title: "Not registered",
        description: "Please join the group chat first to upload files",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${projectGroupId}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save metadata
      const { error: metaError } = await supabase.from("project_files").insert({
        project_group_id: projectGroupId,
        member_id: memberId,
        file_name: file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type,
        description: description || null,
      });

      if (metaError) throw metaError;

      toast({ title: "Success", description: "File uploaded successfully" });
      setDescription("");
      fetchFiles();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (file: ProjectFile) => {
    const { data } = supabase.storage
      .from("project-files")
      .getPublicUrl(file.file_path);

    window.open(data.publicUrl, "_blank");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Project Files</h3>
      
      {memberId ? (
        <div className="space-y-4 mb-6">
          <Input
            placeholder="File description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="flex-1"
            />
            {isUploading && <Loader2 className="h-5 w-5 animate-spin self-center" />}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          Join the group chat to upload files.
        </p>
      )}

      <div className="space-y-3">
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No files uploaded yet.
          </p>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{file.file_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file_size)} • Uploaded by ***{file.member?.student_id_last4 || "Unknown"} • {format(new Date(file.created_at), "MMM d, yyyy")}
                </p>
                {file.description && (
                  <p className="text-xs text-muted-foreground mt-1">{file.description}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(file)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default ProjectFileUpload;
