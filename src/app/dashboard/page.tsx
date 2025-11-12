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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { HalamanBeranda } from "@/types/supabase";
import {
  getHalamanBeranda,
  deleteHalamanBeranda,
} from "@/lib/api-halamanberanda";
import { useAuth } from "@/contexts/AuthContexts";
import Image from "next/image";

//interface type user
interface Authuser {
  id?: number;
  nama?: string;
  username?: string;
  role?: string;
}
//interface for User Permissions
interface UserPermissions {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  roleName: string;
}

// Functuion Admin
const getUserPermissions = (user: Authuser | null): UserPermissions => {
  const role = user?.role;

  return {
    canView: role === "admin",
    canEdit: role === "admin" || role === "marketing",
    canDelete: role === "admin" || role === "marketing",
    roleName: user?.role || " ",
  };
};

export default function HalamanBerandaPage() {
  const [halamanBeranda, setHalamanBeranda] = useState<HalamanBeranda[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const permissions: UserPermissions = getUserPermissions(user);

  const fetchData = async () => {
    try {
      const data = await getHalamanBeranda();
      setHalamanBeranda(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Gagal mengambil data halaman beranda", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number, nama: string) => {
    // 🔹 CEK PERMISSION DELETE
    if (!permissions.canDelete) {
      Swal.fire(
        "Error",
        "Anda tidak memiliki akses untuk menghapus data",
        "error"
      );
      return;
    }

    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Section "${nama}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await deleteHalamanBeranda(id);
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        fetchData();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Gagal menghapus data.", "error");
      }
    }
  };

  const handleView = (item: HalamanBeranda) => {
    // 🔹 CEK PERMISSION VIEW
    if (!permissions.canView) {
      Swal.fire("Error", "Hanya admin yang dapat melihat detail", "error");
      return;
    }

    Swal.fire({
      title: `Detail ${item.nama}`,
      html: `
        <div style="text-align:left">
          <p><b>Nama Section:</b> ${item.nama}</p>
          <p><b>Dibuat oleh:</b> ${item.user?.nama || "Unknown"}</p>
        </div>
      `,
      imageUrl: item.gambar,
      imageWidth: 300,
      imageAlt: item.nama,
    });
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
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Halaman Beranda</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Kelola Halaman Beranda</h1>
              <p className="text-muted-foreground">
                Manajemen pada halaman beranda
              </p>
            </div>
            <Link href="/dashboard/create">
              <Button className="flex items-center gap-2">
                <Icon icon="solar:add-circle-bold" width={16} />
                Tambah
              </Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Gambar</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {halamanBeranda.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        icon="solar:document-bold"
                        width={32}
                        className="text-gray-400"
                      />
                      <p>Belum ada data</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                halamanBeranda.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{item.nama}</TableCell>
                    <TableCell>
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden border">
                        <Image
                          src={item.gambar}
                          alt={item.nama}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/images/default-image.jpg";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {/* 🔹 BUTTON VIEW - HANYA UNTUK ADMIN (HILANG UNTUK MARKETING) */}
                        {permissions.canView && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => handleView(item)}
                          >
                            <Icon icon="solar:eye-bold" width={16} />
                            View
                          </Button>
                        )}

                        {/* 🔹 BUTTON EDIT - UNTUK ADMIN & MARKETING */}
                        {permissions.canEdit && (
                          <Link href={`/dashboard/edit/${item.id}`}>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Icon icon="solar:pen-bold" width={16} />
                              Edit
                            </Button>
                          </Link>
                        )}

                        {/* 🔹 BUTTON DELETE - UNTUK ADMIN & MARKETING */}
                        {permissions.canDelete && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex items-center gap-1"
                            onClick={() => handleDelete(item.id, item.nama)}
                          >
                            <Icon
                              icon="solar:trash-bin-trash-bold"
                              width={16}
                            />
                            Hapus
                          </Button>
                        )}
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
