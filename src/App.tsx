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
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import Spring2026Home from "./pages/Spring2026Home";
import Spring2026Week from "./pages/Spring2026Week";
import Spring2026Week1 from "./pages/Spring2026Week1";
import Spring2026Placeholder from "./pages/Spring2026Placeholder";
import Spring2026AssessmentInClass1 from "./pages/Spring2026AssessmentInClass1";
import Spring2026AssessmentInClass2 from "./pages/Spring2026AssessmentInClass2";
import Spring2026ReflectiveEssay1 from "./pages/Spring2026ReflectiveEssay1";
import Spring2026ReflectiveEssay2 from "./pages/Spring2026ReflectiveEssay2";
import Spring2026ReflectiveEssay3 from "./pages/Spring2026ReflectiveEssay3";
import Spring2026Presentation1 from "./pages/Spring2026Presentation1";
import Spring2026Presentation2 from "./pages/Spring2026Presentation2";
import Spring2026HumanAICollaborationReport from "./pages/Spring2026HumanAICollaborationReport";
import Spring2026FinalPresentationReport from "./pages/Spring2026FinalPresentationReport";
import Spring2026TopicSelection from "./pages/Spring2026TopicSelection";
import Spring2026Topic from "./pages/Spring2026Topic";
import Spring2026Assessments from "./pages/Spring2026Assessments";
import Spring2026GovInfoRequests from "./pages/Spring2026GovInfoRequests";
import Spring2026CuratingPublicData from "./pages/Spring2026CuratingPublicData";
import CourseTeaser from "./pages/CourseTeaser";

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
              <Route path="/spring-2026/assessments" element={<Spring2026Assessments />} />
              <Route path="/spring-2026/assessments/in-class-exercise-1" element={<Spring2026AssessmentInClass1 />} />
              <Route path="/spring-2026/assessments/in-class-exercise-2" element={<Spring2026AssessmentInClass2 />} />
              <Route path="/spring-2026/assessments/reflective-essay-1" element={<Spring2026ReflectiveEssay1 />} />
              <Route path="/spring-2026/assessments/reflective-essay-2" element={<Spring2026ReflectiveEssay2 />} />
              <Route path="/spring-2026/assessments/reflective-essay-3" element={<Spring2026ReflectiveEssay3 />} />
              <Route path="/spring-2026/assessments/presentation-1" element={<Spring2026Presentation1 />} />
              <Route path="/spring-2026/assessments/presentation-2" element={<Spring2026Presentation2 />} />
              <Route path="/spring-2026/assessments/final-report" element={<Spring2026FinalPresentationReport />} />
              <Route path="/spring-2026/assessments/human-ai-collaboration" element={<Spring2026HumanAICollaborationReport />} />
              <Route path="/spring-2026/weeks/1" element={<Spring2026Week1 />} />
              <Route path="/spring-2026/weeks/:weekId" element={<Spring2026Week />} />
              <Route path="/spring-2026/topics" element={<Spring2026TopicSelection />} />
              <Route path="/spring-2026/topics/:topicSlug" element={<Spring2026Topic />} />
              <Route path="/spring-2026/syllabus" element={<Spring2026Placeholder />} />
              <Route path="/spring-2026/resources/government-info-requests" element={<Spring2026GovInfoRequests />} />
              <Route path="/spring-2026/resources/curating-public-data" element={<Spring2026CuratingPublicData />} />
              <Route path="/spring-2026/resources" element={<Spring2026Placeholder />} />
              <Route path="/spring-2026/feedback" element={<Spring2026Placeholder />} />
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
        <Route path="/teaser" element={<CourseTeaser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
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
