import { Home, ArrowLeft, Users, Sparkles, Calendar, ClipboardList } from "lucide-react";
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
import { FALL_2026_TOPICS } from "@/data/fall2026-topics";

const mainItems = [
  { title: "Course Home", url: "/fall-2026", icon: Home },
  { title: "AI Tutor", url: "/fall-2026/tutor", icon: Sparkles },
  { title: "Project Topics", url: "/fall-2026/topics", icon: Users },
  { title: "Syllabus", url: "/fall-2026/syllabus", icon: ClipboardList },
  { title: "Weekly Schedule", url: "/fall-2026/weeks", icon: Calendar },
];

export function Fall2026Sidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border/50">
      <SidebarContent className="py-4">
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

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2 px-2">
            Course
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/fall-2026"}
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

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2 px-2">
            Topics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {FALL_2026_TOPICS.map((t) => (
                <SidebarMenuItem key={t.slug}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={`/fall-2026/topics/${t.slug}`}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-lg px-3 py-2 font-medium text-sm"
                          : "flex items-center gap-3 w-full text-foreground/80 hover:bg-accent/50 hover:text-foreground rounded-lg px-3 py-2 text-sm transition-colors"
                      }
                    >
                      <span className="text-xs opacity-60 w-5">{t.id}.</span>
                      <span className="truncate">{t.title}</span>
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
