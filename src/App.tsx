import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { Spring2026Sidebar } from "@/components/Spring2026Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserMenu } from "@/components/UserMenu";
import Home from "./pages/Home";
import Fall2025Archive from "./pages/Fall2025Archive";
import Week13 from "./pages/Week13";
import TeamPage from "./pages/TeamPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Spring2026Home from "./pages/Spring2026Home";
import Spring2026Page from "./pages/Spring2026Page";
import Spring2026Placeholder from "./pages/Spring2026Placeholder";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isArchiveRoute = location.pathname.startsWith('/fall-2025');
  const isSpring2026Route = location.pathname.startsWith('/spring-2026');

  // Show sidebar for Fall 2025 archive routes
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

  // Show sidebar for Spring 2026 routes
  if (isSpring2026Route) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Spring2026Sidebar />
          <main className="flex-1">
            <header className="h-14 flex items-center justify-between border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-4">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 font-semibold text-primary">GCAP 3226 - Spring 2026</span>
              </div>
              <UserMenu />
            </header>
            <Routes>
              <Route path="/spring-2026" element={<Spring2026Home />} />
              <Route path="/spring-2026/weeks/1" element={<Spring2026Page pageTitle="Week 1: Introduction" />} />
              <Route path="/spring-2026/weeks/2" element={<Spring2026Page pageTitle="Week 2: Learning AI Tools" />} />
              <Route path="/spring-2026/weeks/3" element={<Spring2026Page pageTitle="Week 3: Case Studies & Groups" />} />
              <Route path="/spring-2026/weeks/3/in-class-exercise-1" element={<Spring2026Page pageTitle="In-class Exercise 1" />} />
              <Route path="/spring-2026/weeks/4" element={<Spring2026Page pageTitle="Week 4: Data & Policy" />} />
              <Route path="/spring-2026/weeks/4/in-class-exercise-2" element={<Spring2026Page pageTitle="In-class Exercise 2" />} />
              <Route path="/spring-2026/weeks/5" element={<Spring2026Page pageTitle="Week 5: Data Requests & Prep" />} />
              <Route path="/spring-2026/weeks/5/reflective-essay-1" element={<Spring2026Page pageTitle="Reflective Essay 1" />} />
              <Route path="/spring-2026/weeks/6" element={<Spring2026Page pageTitle="Week 6: Public Holiday" />} />
              <Route path="/spring-2026/weeks/7" element={<Spring2026Page pageTitle="Week 7: Fieldwork" />} />
              <Route path="/spring-2026/weeks/7/reflective-essay-2" element={<Spring2026Page pageTitle="Reflective Essay 2" />} />
              <Route path="/spring-2026/weeks/8" element={<Spring2026Page pageTitle="Week 8: Group Consultation" />} />
              <Route path="/spring-2026/weeks/8/reflective-essay-3" element={<Spring2026Page pageTitle="Reflective Essay 3" />} />
              <Route path="/spring-2026/weeks/9" element={<Spring2026Page pageTitle="Week 9: Data Governance" />} />
              <Route path="/spring-2026/weeks/10" element={<Spring2026Page pageTitle="Week 10: Draft Report Outline" />} />
              <Route path="/spring-2026/weeks/11" element={<Spring2026Page pageTitle="Week 11: Presentation 1" />} />
              <Route path="/spring-2026/weeks/11/presentation-1" element={<Spring2026Page pageTitle="In-Class Presentation 1" />} />
              <Route path="/spring-2026/weeks/12" element={<Spring2026Page pageTitle="Week 12: Human-AI Report" />} />
              <Route path="/spring-2026/weeks/12/human-ai-report" element={<Spring2026Page pageTitle="Human-AI Collaboration Report" />} />
              <Route path="/spring-2026/weeks/13" element={<Spring2026Page pageTitle="Week 13: Final Presentation" />} />
              <Route path="/spring-2026/weeks/13/final-presentation-report" element={<Spring2026Page pageTitle="Final Presentation & Report" />} />
              <Route path="/spring-2026/syllabus" element={<Spring2026Page pageTitle="Syllabus" />} />
              <Route path="/spring-2026/resources" element={<Spring2026Page pageTitle="Resources" />} />
              <Route path="/spring-2026/feedback" element={<Spring2026Page pageTitle="Course Feedback" />} />
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
