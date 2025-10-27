import { Home, Droplet, Bus, Cloud, Recycle, MapPin } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";

const teams = [
  { title: "Home", url: "/", icon: Home },
  { title: "Team 1: Flu Shot", url: "/team/flu-shot", icon: Droplet },
  { title: "Team 2: Bus Routes", url: "/team/bus-route", icon: Bus },
  { title: "Team 3: Typhoon Signals", url: "/team/typhoon-signals", icon: Cloud },
  { title: "Team 4: Food Waste", url: "/team/food-waste", icon: Recycle },
  { title: "Team 5: Green Recycling", url: "/team/green-recycling", icon: Recycle },
  { title: "Team 6: Bus Stop Merge", url: "/team/bus-stop-merge", icon: MapPin },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-lg px-4">
            GCAP 3226
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