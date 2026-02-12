import { PasswordGate, useArchiveAccess } from "@/components/PasswordGate";

interface ProtectedArchiveRouteProps {
  children: React.ReactNode;
}

export function ProtectedArchiveRoute({ children }: ProtectedArchiveRouteProps) {
  const { unlocked, unlock } = useArchiveAccess();

  if (!unlocked) {
    return <PasswordGate onUnlock={unlock} />;
  }

  return <>{children}</>;
}
