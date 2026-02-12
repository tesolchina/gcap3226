import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { Spring2026Sidebar } from "@/components/Spring2026Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { StudentProvider } from "@/contexts/StudentContext";
import { UserMenu } from "@/components/UserMenu";
import Home from "./pages/Home";
import Fall2025Archive from "./pages/Fall2025Archive";
import Week13 from "./pages/Week13";
import TeamPage from "./pages/TeamPage";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import Spring2026Home from "./pages/Spring2026Home";
import Spring2026Week1 from "./pages/Spring2026Week1";
import Spring2026Week2 from "./pages/Spring2026Week2";
import Spring2026Week2Lab from "./pages/Spring2026Week2Lab";
import Spring2026Week2Setup from "./pages/Spring2026Week2Setup";
import Spring2026Week2Notebook from "./pages/Spring2026Week2Notebook";
import Spring2026Week3 from "./pages/Spring2026Week3";
import Spring2026Week4 from "./pages/Spring2026Week4";
import Spring2026Week5 from "./pages/Spring2026Week5";
import Spring2026Week6 from "./pages/Spring2026Week6";
import Spring2026Week7 from "./pages/Spring2026Week7";
import Spring2026Week8 from "./pages/Spring2026Week8";
import Spring2026Week9 from "./pages/Spring2026Week9";
import Spring2026Week10 from "./pages/Spring2026Week10";
import Spring2026Week11 from "./pages/Spring2026Week11";
import Spring2026Week12 from "./pages/Spring2026Week12";
import Spring2026Week13 from "./pages/Spring2026Week13";
import Spring2026Placeholder from "./pages/Spring2026Placeholder";
import Spring2026Syllabus from "./pages/Spring2026Syllabus";
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
import Spring2026TopicFluShot from "./pages/Spring2026TopicFluShot";
import Spring2026TopicColorectalCancer from "./pages/Spring2026TopicColorectalCancer";
import Spring2026TopicRoadSafety from "./pages/Spring2026TopicRoadSafety";
import Spring2026TopicEMPF from "./pages/Spring2026TopicEMPF";
import Spring2026TopicCDCC from "./pages/Spring2026TopicCDCC";
import Spring2026TopicRodentControl from "./pages/Spring2026TopicRodentControl";
import Spring2026TopicBusStopMerge from "./pages/Spring2026TopicBusStopMerge";
import Spring2026Assessments from "./pages/Spring2026Assessments";
import Spring2026GovInfoRequests from "./pages/Spring2026GovInfoRequests";
import Spring2026CuratingPublicData from "./pages/Spring2026CuratingPublicData";
import Spring2026LegCoSubmission from "./pages/Spring2026LegCoSubmission";
import CourseTeaser from "./pages/CourseTeaser";
import { ProtectedArchiveRoute } from "@/components/ProtectedArchiveRoute";

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
            <header className="h-12 sm:h-14 flex items-center justify-between border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-3 sm:px-4">
              <div className="flex items-center min-w-0">
                <SidebarTrigger className="shrink-0" />
                <span className="ml-2 sm:ml-4 font-semibold text-muted-foreground text-sm sm:text-base truncate">GCAP 3226 - Fall 2025</span>
              </div>
              <UserMenu />
            </header>
            <Routes>
              <Route path="/fall-2025" element={<Fall2025Archive />} />
              <Route path="/fall-2025/week-13" element={<Week13 />} />
              <Route path="/fall-2025/team/:slug" element={<ProtectedArchiveRoute><TeamPage /></ProtectedArchiveRoute>} />
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
            <header className="h-12 sm:h-14 flex items-center justify-between border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-3 sm:px-4">
              <div className="flex items-center min-w-0">
                <SidebarTrigger className="shrink-0" />
                <span className="ml-2 sm:ml-4 font-semibold text-primary text-sm sm:text-base truncate">GCAP 3226 - Spring 2026</span>
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
              <Route path="/spring-2026/weeks/2" element={<Spring2026Week2 />} />
              <Route path="/spring-2026/weeks/2/lab" element={<Spring2026Week2Lab />} />
              <Route path="/spring-2026/weeks/2/setup" element={<Spring2026Week2Setup />} />
              <Route path="/spring-2026/weeks/2/notebook" element={<Spring2026Week2Notebook />} />
              <Route path="/spring-2026/weeks/3" element={<Spring2026Week3 />} />
              <Route path="/spring-2026/weeks/4" element={<Spring2026Week4 />} />
              <Route path="/spring-2026/weeks/5" element={<Spring2026Week5 />} />
              <Route path="/spring-2026/weeks/6" element={<Spring2026Week6 />} />
              <Route path="/spring-2026/weeks/7" element={<Spring2026Week7 />} />
              <Route path="/spring-2026/weeks/8" element={<Spring2026Week8 />} />
              <Route path="/spring-2026/weeks/9" element={<Spring2026Week9 />} />
              <Route path="/spring-2026/weeks/10" element={<Spring2026Week10 />} />
              <Route path="/spring-2026/weeks/11" element={<Spring2026Week11 />} />
              <Route path="/spring-2026/weeks/12" element={<Spring2026Week12 />} />
              <Route path="/spring-2026/weeks/13" element={<Spring2026Week13 />} />
              <Route path="/spring-2026/topics" element={<Spring2026TopicSelection />} />
              <Route path="/spring-2026/topics/flu-shot" element={<Spring2026TopicFluShot />} />
              <Route path="/spring-2026/topics/colorectal-cancer-screening" element={<Spring2026TopicColorectalCancer />} />
              <Route path="/spring-2026/topics/road-safety" element={<Spring2026TopicRoadSafety />} />
              <Route path="/spring-2026/topics/empf" element={<Spring2026TopicEMPF />} />
              <Route path="/spring-2026/topics/cdcc" element={<Spring2026TopicCDCC />} />
              <Route path="/spring-2026/topics/rodent-control" element={<Spring2026TopicRodentControl />} />
              <Route path="/spring-2026/topics/bus-stop-merge" element={<Spring2026TopicBusStopMerge />} />
              <Route path="/spring-2026/syllabus" element={<Spring2026Syllabus />} />
              <Route path="/spring-2026/resources/government-info-requests" element={<Spring2026GovInfoRequests />} />
              <Route path="/spring-2026/resources/curating-public-data" element={<Spring2026CuratingPublicData />} />
              <Route path="/spring-2026/resources" element={<Spring2026Placeholder />} />
              <Route path="/spring-2026/legco-submission" element={<Spring2026LegCoSubmission />} />
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
        <Route path="/student-login" element={<StudentLogin />} />
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
        <StudentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </StudentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
