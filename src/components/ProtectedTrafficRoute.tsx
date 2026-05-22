import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";

const STORAGE_KEY = "traffic_safety_unlocked";

export function ProtectedTrafficRoute({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  if (!unlocked) {
    return (
      <PasswordGate
        onUnlock={() => {
          localStorage.setItem(STORAGE_KEY, "true");
          setUnlocked(true);
        }}
        message="Enter the password to access the traffic safety research page."
        type="traffic"
      />
    );
  }

  return <>{children}</>;
}
