import { Home, Droplet, Bus, Cloud, Recycle, MapPin, Award, ArrowLeft } from "lucide-react";
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
} from "@/components/ui/sidebar";

const teams = [
  { title: "Back to Home", url: "/", icon: ArrowLeft },
  { title: "Fall 2025 Overview", url: "/fall-2025", icon: Home },
  { title: "Week 13 Rundown", url: "/fall-2025/week-13", icon: Award },
  { title: "Team 1: Flu Shot", url: "/fall-2025/team/flu-shot", icon: Droplet },
  { title: "Team 2: Bus Routes", url: "/fall-2025/team/bus-route", icon: Bus },
  { title: "Team 3: Typhoon Signals", url: "/fall-2025/team/typhoon-signals", icon: Cloud },
  { title: "Team 4: Food Waste", url: "/fall-2025/team/food-waste", icon: Recycle },
  { title: "Team 5: Green Recycling", url: "/fall-2025/team/green-recycling", icon: Recycle },
  { title: "Team 6: Bus Stop Merge", url: "/fall-2025/team/bus-stop-merge", icon: MapPin },
];

export function ArchiveSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold text-lg px-4">
            Fall 2025 Archive
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        item.url === "/" 
                          ? "flex items-center gap-3 w-full text-primary hover:bg-accent hover:text-accent-foreground"
                          : isActive
                          ? "flex items-center gap-3 w-full bg-muted text-foreground font-medium"
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
