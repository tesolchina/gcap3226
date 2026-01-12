import { Home, ArrowLeft, Presentation, FileText, Calendar, Users, ClipboardList, FlaskConical, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SubItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WeeklyItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}

const weeklyItems: WeeklyItem[] = [
  { title: "Course Home", url: "/spring-2026", icon: Home },
  { title: "Week 1", url: "/spring-2026/weeks/1", icon: Calendar },
  { 
    title: "Week 2", 
    url: "/spring-2026/weeks/2", 
    icon: Calendar,
    subItems: [
      { title: "Vibe Coding Lab", url: "/spring-2026/weeks/2/lab", icon: FlaskConical }
    ]
  },
  { title: "Week 3", url: "/spring-2026/weeks/3", icon: Calendar },
  { title: "Week 4", url: "/spring-2026/weeks/4", icon: Calendar },
  { title: "Week 5", url: "/spring-2026/weeks/5", icon: Calendar },
  { title: "Week 6", url: "/spring-2026/weeks/6", icon: Calendar },
  { title: "Week 7", url: "/spring-2026/weeks/7", icon: Calendar },
  { title: "Week 8", url: "/spring-2026/weeks/8", icon: Calendar },
  { title: "Week 9", url: "/spring-2026/weeks/9", icon: Calendar },
  { title: "Week 10", url: "/spring-2026/weeks/10", icon: Calendar },
  { title: "Week 11", url: "/spring-2026/weeks/11", icon: Presentation },
  { title: "Week 12", url: "/spring-2026/weeks/12", icon: FileText },
  { title: "Week 13", url: "/spring-2026/weeks/13", icon: Presentation },
];

const resourceItems = [
  { title: "Assessments", url: "/spring-2026/assessments", icon: ClipboardList },
  { title: "Group Projects", url: "/spring-2026/topics", icon: Users },
];

const learningModuleItems = [
  { title: "Curating Public Data", url: "/spring-2026/resources/curating-public-data", icon: FileText },
  { title: "Gov Info Requests", url: "/spring-2026/resources/government-info-requests", icon: FileText },
  { title: "Submit to LegCo", url: "/spring-2026/resources/legco-submission", icon: FileText },
];

export function Spring2026Sidebar() {
  const location = useLocation();
  
  const isSubItemActive = (subItems?: SubItem[]) => {
    if (!subItems) return false;
    return subItems.some(sub => location.pathname === sub.url);
  };

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
                item.subItems ? (
                  <Collapsible 
                    key={item.title} 
                    asChild 
                    defaultOpen={isSubItemActive(item.subItems) || location.pathname === item.url}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            end
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-lg px-3 py-2 font-medium text-sm"
                                : "flex items-center gap-3 w-full text-foreground/80 hover:bg-accent/50 hover:text-foreground rounded-lg px-3 py-2 text-sm transition-colors"
                            }
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="flex-1">{item.title}</span>
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </NavLink>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "flex items-center gap-2 w-full bg-primary/10 text-primary rounded-md px-2 py-1.5 font-medium text-sm"
                                      : "flex items-center gap-2 w-full text-foreground/70 hover:bg-accent/50 hover:text-foreground rounded-md px-2 py-1.5 text-sm transition-colors"
                                  }
                                >
                                  <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
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
                )
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

        <SidebarSeparator className="my-3" />

        {/* Learning Modules */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2 px-2">
            Learning Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {learningModuleItems.map((item) => (
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
