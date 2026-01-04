import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserMenu } from "@/components/UserMenu";
import Home from "./pages/Home";
import Fall2025Archive from "./pages/Fall2025Archive";
import Week13 from "./pages/Week13";
import TeamPage from "./pages/TeamPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isArchiveRoute = location.pathname.startsWith('/fall-2025');
  const isHomePage = location.pathname === '/';

  // Show sidebar only for archive routes
  if (isArchiveRoute) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <ArchiveSidebar />
          <main className="flex-1">
            <header className="h-14 flex items-center justify-between border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-4">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 font-semibold text-muted-foreground">GCAP 3226 - Fall 2025 Archive</span>
              </div>
              <UserMenu />
            </header>
            <Routes>
              <Route path="/fall-2025" element={<Fall2025Archive />} />
              <Route path="/fall-2025/week-13" element={<Week13 />} />
              <Route path="/fall-2025/team/:slug" element={<TeamPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // Home page and other routes without sidebar
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
