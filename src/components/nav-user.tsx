"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface NavUserProps {
  user: {
    nama: string;
    role: string;
    avatar?: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const { status, data } = await logoutUser();

      if (status === 200) {
        // ✅ HAPUS user data dari localStorage
        localStorage.removeItem("user");

        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Sampai jumpa lagi!",
          timer: 1000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/login");
          router.refresh(); // Refresh untuk clear state
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout Gagal",
          text: data.error || "Terjadi kesalahan saat logout",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Tetap hapus localStorage meski API error
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  // Get user initials - PINDAHKAN ke luar dari handleLogout
  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge styling - PINDAHKAN ke luar dari handleLogout
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: {
        label: "Admin",
        class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      },
      user: {
        label: "Marketing",
        class: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
    };

    const config =
      roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    return (
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${config.class}`}>
        {config.label}
      </span>
    );
  };

  // RETURN STATEMENT HARUS DI LEVEL KOMPONEN, bukan di dalam handleLogout
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.nama} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.nama)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.nama}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.nama} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.nama)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.nama}</span>
                  <div className="mt-1">{getRoleBadge(user.role)}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
