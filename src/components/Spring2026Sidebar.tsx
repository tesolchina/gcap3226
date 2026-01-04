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
  { title: "Home", url: "/spring-2026", icon: Home },
  { title: "Week 1: Introduction", url: "/spring-2026/weeks/1", icon: BookOpen },
  { title: "Weeks 2-4: Group Formation", url: "/spring-2026/weeks/2-4", icon: Users },
  { title: "Weeks 5-6: Data Collection", url: "/spring-2026/weeks/5-6", icon: FileText },
  { title: "Weeks 7-9: Analysis", url: "/spring-2026/weeks/7-9", icon: BookOpen },
  { title: "Week 10: Draft Review", url: "/spring-2026/weeks/10", icon: FileText },
  { title: "Week 11: Presentation 1", url: "/spring-2026/weeks/11", icon: Presentation },
  { title: "Week 12: Final Prep", url: "/spring-2026/weeks/12", icon: FileText },
  { title: "Week 13: Final Presentation", url: "/spring-2026/weeks/13", icon: Presentation },
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
                <SidebarMenuItem key={item.title}>
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
