import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "fall2025_archive_unlocked";

export function useArchiveAccess() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const unlock = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  };

  return { unlocked, unlock };
}

export function PasswordGate({ onUnlock, message }: { onUnlock: () => void; message?: string }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("validate-secret-code", {
        body: { code: password.trim() },
      });

      if (error) throw error;

      if (data?.valid) {
        onUnlock();
        toast.success("Access granted");
      } else {
        toast.error("Incorrect password");
      }
    } catch {
      toast.error("Failed to verify password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <Card className="p-8 max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Protected Content</h2>
          <p className="text-sm text-muted-foreground">
            {message || "Enter the password to access protected content."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "…" : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
