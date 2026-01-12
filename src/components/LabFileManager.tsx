import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Folder,
  FolderPlus,
  FileText,
  Upload,
  Download,
  Trash2,
  ChevronRight,
  ChevronDown,
  Loader2,
  FolderOpen,
  Home,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  path: string;
  isFolder: boolean;
  size?: number;
  lastModified?: string;
}

interface LabFileManagerProps {
  bucketName?: string;
  basePath?: string;
}

const LabFileManager = ({
  bucketName = "project-files",
  basePath = "lab-files",
}: LabFileManagerProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState(basePath);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([basePath]));
  const [newFolderName, setNewFolderName] = useState("");
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const { toast } = useToast();

  // Generate a unique user ID for this session (stored in localStorage)
  const getUserId = () => {
    let userId = localStorage.getItem("lab_file_manager_user_id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("lab_file_manager_user_id", userId);
    }
    return userId;
  };

  const fetchFiles = useCallback(async (path: string = currentPath) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(path, {
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Error fetching files:", error);
        toast({
          title: "Error",
          description: "Failed to fetch files",
          variant: "destructive",
        });
        return;
      }

      const items: FileItem[] = (data || [])
        .filter((item) => item.name !== ".emptyFolderPlaceholder")
        .map((item) => ({
          name: item.name,
          path: `${path}/${item.name}`,
          isFolder: item.id === null,
          size: item.metadata?.size,
          lastModified: item.updated_at,
        }));

      setFiles(items);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [bucketName, currentPath, toast]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const navigateToFolder = (path: string) => {
    setCurrentPath(path);
    setExpandedFolders((prev) => new Set([...prev, path]));
    fetchFiles(path);
  };

  const navigateUp = () => {
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || basePath;
    if (parentPath.length >= basePath.length) {
      navigateToFolder(parentPath);
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split("/");
    const breadcrumbs = [];
    let accPath = "";
    for (const part of parts) {
      accPath = accPath ? `${accPath}/${part}` : part;
      breadcrumbs.push({ name: part, path: accPath });
    }
    return breadcrumbs;
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a folder name",
        variant: "destructive",
      });
      return;
    }

    const folderPath = `${currentPath}/${newFolderName.trim()}/.emptyFolderPlaceholder`;
    
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(folderPath, new Blob([""]), {
          contentType: "text/plain",
        });

      if (error) throw error;

      toast({ title: "Success", description: "Folder created successfully" });
      setNewFolderName("");
      setIsNewFolderDialogOpen(false);
      fetchFiles();
    } catch (error: any) {
      console.error("Create folder error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create folder",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(uploadedFiles)) {
        const filePath = `${currentPath}/${file.name}`;
        
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            upsert: true,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `${uploadedFiles.length} file(s) uploaded successfully`,
      });
      fetchFiles();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file(s)",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = "";
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(file.path);

      window.open(data.publicUrl, "_blank");
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (file: FileItem) => {
    try {
      if (file.isFolder) {
        // For folders, we need to delete all contents first
        const { data: folderContents } = await supabase.storage
          .from(bucketName)
          .list(file.path);

        if (folderContents && folderContents.length > 0) {
          const filesToDelete = folderContents.map((f) => `${file.path}/${f.name}`);
          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove(filesToDelete);
          if (deleteError) throw deleteError;
        }

        // Delete the placeholder
        await supabase.storage
          .from(bucketName)
          .remove([`${file.path}/.emptyFolderPlaceholder`]);
      } else {
        const { error } = await supabase.storage
          .from(bucketName)
          .remove([file.path]);
        if (error) throw error;
      }

      toast({ title: "Success", description: `${file.isFolder ? "Folder" : "File"} deleted` });
      fetchFiles();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="h-full flex flex-col bg-card border-l">
      {/* Header */}
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Files
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => fetchFiles()}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-3 py-2 border-b flex items-center gap-1 flex-wrap">
        <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <FolderPlus className="w-3.5 h-3.5 mr-1" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for the new folder in "{currentPath.split("/").pop()}"
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Input
            type="file"
            multiple
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled={isUploading}>
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5 mr-1" />
            )}
            Upload
          </Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-3 py-1.5 border-b flex items-center gap-1 text-xs overflow-x-auto">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-1.5 text-xs"
          onClick={() => navigateToFolder(basePath)}
        >
          <Home className="w-3 h-3" />
        </Button>
        {getBreadcrumbs().slice(1).map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 text-xs"
              onClick={() => navigateToFolder(crumb.path)}
            >
              {crumb.name}
            </Button>
          </div>
        ))}
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {currentPath !== basePath && (
            <button
              onClick={navigateUp}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-sm text-left"
            >
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">..</span>
            </button>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              <Folder className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Empty folder</p>
              <p className="mt-1">Upload files or create a subfolder</p>
            </div>
          ) : (
            files.map((file) => (
              <ContextMenu key={file.path}>
                <ContextMenuTrigger>
                  <button
                    onClick={() => {
                      if (file.isFolder) {
                        navigateToFolder(file.path);
                      } else {
                        setSelectedFile(file);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-sm text-left group",
                      selectedFile?.path === file.path && "bg-muted"
                    )}
                  >
                    {file.isFolder ? (
                      <Folder className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                    <span className="flex-1 truncate">{file.name}</span>
                    {!file.isFolder && file.size && (
                      <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                        {formatFileSize(file.size)}
                      </span>
                    )}
                  </button>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {!file.isFolder && (
                    <ContextMenuItem onClick={() => handleDownload(file)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </ContextMenuItem>
                  )}
                  <ContextMenuItem
                    onClick={() => handleDelete(file)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Selected File Actions */}
      {selectedFile && !selectedFile.isFolder && (
        <div className="px-3 py-2 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleDownload(selectedFile)}
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => {
                  handleDelete(selectedFile);
                  setSelectedFile(null);
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabFileManager;
