import { Home, ArrowLeft, BookOpen, Users, Presentation, FileText, MessageSquare, Key } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const weeklyItems = [
  { title: "Home", url: "/spring-2026", icon: Home, type: "page" },
  { title: "Week 1: Introduction", url: "/spring-2026/weeks/1", icon: BookOpen, type: "page" },
  { title: "Week 2: Learning AI Tools", url: "/spring-2026/weeks/2", icon: BookOpen, type: "page" },
  {
    title: "Week 3: Case Studies & Groups",
    url: "/spring-2026/weeks/3",
    icon: Users,
    type: "page",
    subItems: [
      { title: "In-class Exercise 1", url: "/spring-2026/weeks/3/in-class-exercise-1", icon: Presentation, type: "assessment" },
    ],
  },
  {
    title: "Week 4: Data & Policy",
    url: "/spring-2026/weeks/4",
    icon: FileText,
    type: "page",
    subItems: [
      { title: "In-class Exercise 2", url: "/spring-2026/weeks/4/in-class-exercise-2", icon: Presentation, type: "assessment" },
    ],
  },
  {
    title: "Week 5: Data Requests & Prep",
    url: "/spring-2026/weeks/5",
    icon: FileText,
    type: "page",
    subItems: [
      { title: "Reflective Essay 1", url: "/spring-2026/weeks/5/reflective-essay-1", icon: FileText, type: "assessment" },
    ],
  },
  { title: "Week 6: Public Holiday", url: "/spring-2026/weeks/6", icon: BookOpen, type: "page" },
  {
    title: "Week 7: Fieldwork",
    url: "/spring-2026/weeks/7",
    icon: BookOpen,
    type: "page",
    subItems: [
      { title: "Reflective Essay 2", url: "/spring-2026/weeks/7/reflective-essay-2", icon: FileText, type: "assessment" },
    ],
  },
  {
    title: "Week 8: Group Consultation",
    url: "/spring-2026/weeks/8",
    icon: Users,
    type: "page",
    subItems: [
      { title: "Reflective Essay 3", url: "/spring-2026/weeks/8/reflective-essay-3", icon: FileText, type: "assessment" },
    ],
  },
  {
    title: "Week 9: Data Governance",
    url: "/spring-2026/weeks/9",
    icon: BookOpen,
    type: "page",
  },
  {
    title: "Week 10: Draft Report Outline",
    url: "/spring-2026/weeks/10",
    icon: FileText,
    type: "page",
  },
  {
    title: "Week 11: Presentation 1",
    url: "/spring-2026/weeks/11",
    icon: Presentation,
    type: "page",
    subItems: [
      { title: "In-Class Presentation 1", url: "/spring-2026/weeks/11/presentation-1", icon: Presentation, type: "assessment" },
    ],
  },
  {
    title: "Week 12: Human-AI Report",
    url: "/spring-2026/weeks/12",
    icon: FileText,
    type: "page",
    subItems: [
      { title: "Human-AI Collaboration Report", url: "/spring-2026/weeks/12/human-ai-report", icon: FileText, type: "assessment" },
    ],
  },
  {
    title: "Week 13: Final Presentation",
    url: "/spring-2026/weeks/13",
    icon: Presentation,
    type: "page",
    subItems: [
      { title: "Final Presentation & Report", url: "/spring-2026/weeks/13/final-presentation-report", icon: Presentation, type: "assessment" },
    ],
  },
];

const resourceItems = [
  { title: "Syllabus", url: "/spring-2026/syllabus", icon: FileText },
  { title: "Resources", url: "/spring-2026/resources", icon: BookOpen },
  { title: "Course Feedback", url: "/spring-2026/feedback", icon: MessageSquare },
];

export function Spring2026Sidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-lg px-4">
            Spring 2026
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    className="flex items-center gap-3 w-full text-primary hover:bg-accent hover:text-accent-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium px-4">
            Weekly Schedule
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {weeklyItems.map((item) => (
                <React.Fragment key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/spring-2026"}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                            : "flex items-center gap-3 w-full text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {item.subItems && (
                    <div className="ml-6 border-l border-gray-200 dark:border-gray-700">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={subItem.url}
                              className={({ isActive }) =>
                                isActive
                                  ? "flex items-center gap-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                                  : "flex items-center gap-3 w-full text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                              }
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium px-4">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                          : "flex items-center gap-3 w-full text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
