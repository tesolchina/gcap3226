import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";

const STORAGE_KEY = "spring2026_archive_unlocked";

function useSpringArchiveAccess() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );
  const unlock = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  };
  return { unlocked, unlock };
}

export function ProtectedSpringArchiveRoute({ children }: { children: React.ReactNode }) {
  const { unlocked, unlock } = useSpringArchiveAccess();
  if (!unlocked) {
    return (
      <PasswordGate
        onUnlock={unlock}
        message="Spring 2026 is now archived. Enter the archive password to view."
        type="archive"
      />
    );
  }
  return <>{children}</>;
}
