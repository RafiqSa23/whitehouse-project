"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { User } from "@/types/supabase";
import Swal from "sweetalert2";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data users
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (response.ok) {
        setUsers(result.data);
      } else {
        console.error("Error fetching users:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user dengan SweetAlert
  const handleDelete = async (user: User): Promise<void> => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      html: `Anda akan menghapus user:<br><strong>${user.nama}</strong><br><em>(${user.username})</em>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            title: "✅ Terhapus!",
            text: `User ${user.nama} berhasil dihapus`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
            timer: 2000,
            showConfirmButton: false,
          });
          // Refresh data setelah delete
          fetchUsers();
        } else {
          const result = await response.json();
          Swal.fire({
            title: "❌ Gagal",
            text: `Gagal menghapus user: ${result.error}`,
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "❌ Error",
          text: "Terjadi kesalahan server",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Memuat data...</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manajemen User</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manajemen User</h1>
            <Link href="/dashboard/users/create">
              <Button className="flex items-center gap-2">
                <Icon icon="solar:user-plus-bold" width={16} />
                Tambah User
              </Button>
            </Link>
          </div>

          <Table>
            <TableCaption>Daftar semua user yang terdaftar.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center w-[250px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Tidak ada data user
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: User, index: number) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{user.nama}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Marketing"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {/* Edit Button */}
                        <Link href={`/dashboard/users/edit/${user.id}`}>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Icon icon="solar:pen-bold" width={14} />
                            Edit
                          </Button>
                        </Link>

                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex items-center gap-1"
                          onClick={() => handleDelete(user)}
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width={14} />
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
