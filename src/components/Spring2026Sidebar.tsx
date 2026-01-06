import { Home, ArrowLeft, BookOpen, Presentation, FileText, MessageSquare, Calendar } from "lucide-react";
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
  { title: "Course Home", url: "/spring-2026", icon: Home },
  { title: "Week 1", url: "/spring-2026/weeks/1", icon: Calendar },
  { title: "Weeks 2-4", url: "/spring-2026/weeks/2-4", icon: Calendar },
  { title: "Weeks 5-6", url: "/spring-2026/weeks/5-6", icon: Calendar },
  { title: "Weeks 7-9", url: "/spring-2026/weeks/7-9", icon: Calendar },
  { title: "Week 10", url: "/spring-2026/weeks/10", icon: Calendar },
  { title: "Week 11", url: "/spring-2026/weeks/11", icon: Presentation },
  { title: "Week 12", url: "/spring-2026/weeks/12", icon: FileText },
  { title: "Week 13", url: "/spring-2026/weeks/13", icon: Presentation },
];

const resourceItems = [
  { title: "Syllabus", url: "/spring-2026/syllabus", icon: FileText },
  { title: "Resources", url: "/spring-2026/resources", icon: BookOpen },
  { title: "Feedback", url: "/spring-2026/feedback", icon: MessageSquare },
];

export function Spring2026Sidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border/50">
      <SidebarContent className="py-4">
        {/* Back to Home */}
        <SidebarGroup className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/"
                  className="flex items-center gap-3 w-full text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">Back to Home</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Weekly Schedule */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2 px-2">
            Schedule
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {weeklyItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/spring-2026"}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-lg px-3 py-2 font-medium text-sm"
                          : "flex items-center gap-3 w-full text-foreground/80 hover:bg-accent/50 hover:text-foreground rounded-lg px-3 py-2 text-sm transition-colors"
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Resources */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2 px-2">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-lg px-3 py-2 font-medium text-sm"
                          : "flex items-center gap-3 w-full text-foreground/80 hover:bg-accent/50 hover:text-foreground rounded-lg px-3 py-2 text-sm transition-colors"
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
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
