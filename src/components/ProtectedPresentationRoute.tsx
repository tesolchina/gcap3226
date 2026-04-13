import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";

const STORAGE_KEY = "spring2026_presentation_unlocked";

function usePresentationAccess() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const unlock = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  };

  return { unlocked, unlock };
}

interface ProtectedPresentationRouteProps {
  children: React.ReactNode;
}

export function ProtectedPresentationRoute({ children }: ProtectedPresentationRouteProps) {
  const { unlocked, unlock } = usePresentationAccess();

  if (!unlocked) {
    return (
      <PasswordGate
        onUnlock={unlock}
        message="Enter the course password to view team presentations."
        type="presentation"
      />
    );
  }

  return <>{children}</>;
}
