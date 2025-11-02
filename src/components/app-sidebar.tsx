"use client"

import Image from "next/image"
import * as React from "react"
import {
  House,
  Pen,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "whiteHouse",
    email: "Wh001@gmail.com",
    avatar: "/logo.png",
  },
  navMain: [
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
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={80}
                  height={80}
                  className=" " />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">White House Premiere</span>
                  <span className="truncate text-xs">Hunian nyaman & Strategis</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
