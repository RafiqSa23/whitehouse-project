"use client";

import Image from "next/image";
import { Activity, House, Pen, User } from "lucide-react";
import { useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface UserData {
  nama: string;
  role: string;
  avatar?: string;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Baca user data dari localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        nama: parsedUser.nama,
        role: parsedUser.role,
        avatar: parsedUser.avatar,
      });
    } else {
      // Fallback ke data default jika tidak ada
      setUser({
        nama: "User",
        role: "User",
        avatar: "/avatars/default.png",
      });
    }
  }, []);

  // navigation bar
  const getNavMain = () => {
    const baseNav = [
      {
        title: "Halaman Beranda",
        url: "/dashboard",
        icon: House,
        isActive: true,
      },
      {
        title: "Detail Rumah",
        url: "/dashboard/detail",
        icon: Pen,
      },
    ];
    if (user?.role === "admin") {
      return [
        ...baseNav,
        {
          title: "Management User",
          url: "/dashboard/users",
          icon: User,
        },
        {
          title: "Login Activity",
          url: "/dashboard/login-activity",
          icon: Activity,
        },
      ];
    }
    return baseNav;
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">
                    White House Premiere
                  </span>
                  <span className="truncate text-xs">
                    Hunian nyaman & Strategis
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavMain()} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <div className="p-2 text-center text-sm text-muted-foreground">
            Loading user...
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
