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
import { TypeRumah } from "@/types/supabase";
import { getTypeRumah, deleteTypeRumah } from "@/lib/api-typerumah";
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

export default function DetailPage() {
  const [typeRumah, setTypeRumah] = useState<TypeRumah[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const permissions: UserPermissions = getUserPermissions(user);

  const fetchData = async () => {
    try {
      const data = await getTypeRumah();
      setTypeRumah(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Gagal mengambil data detail rumah", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number, namaType: string) => {
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
      text: `Detail rumah "${namaType}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await deleteTypeRumah(id);
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        fetchData(); // Refresh data
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Gagal menghapus data.", "error");
      }
    }
  };

  const handleView = (item: TypeRumah) => {
    if (!permissions.canView) {
      Swal.fire("Error", "Hanya admin yang dapat melihat detail", "error");
      return;
    }

    const mainImage = item.images[0]?.gambar || "/images/default-house.jpg";

    Swal.fire({
      title: `Detail ${item.namaType.replace(/_/g, " ")}`,
      html: `
        <div style="text-align:left">
          <p><b>Nama Type:</b> ${item.namaType.replace(/_/g, " ")}</p>
          <p><b>Harga:</b> Rp ${Number(item.harga).toLocaleString("id-ID")}</p>
          <p><b>Luas Bangunan:</b> ${item.luasBangunan}</p>
          <p><b>Deskripsi:</b> ${item.deskripsi}</p>
          <p><b>Dibuat oleh:</b> ${item.user?.nama || "Unknown"}</p>
        </div>
      `,
      imageUrl: mainImage,
      imageWidth: 300,
      imageAlt: item.namaType,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTypeName = (typeName: string) => {
    return typeName.replace(/_/g, " ");
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
                  <BreadcrumbPage>Detail Rumah</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Kelola Detail Rumah</h1>
              <p className="text-muted-foreground">
                Manajemen data detail rumah yang tersedia
              </p>
            </div>
            <Link href="/dashboard/detail/create">
              <Button className="flex items-center gap-2">
                <Icon icon="solar:add-circle-bold" width={16} />
                Tambah Detail Rumah
              </Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Nama Type Rumah</TableHead>
                <TableHead>Gambar</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Luas Bangunan</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeRumah.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Tidak ada data detail rumah
                  </TableCell>
                </TableRow>
              ) : (
                typeRumah.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold capitalize">
                      {formatTypeName(item.namaType)}
                    </TableCell>
                    <TableCell>
                      {item.images.length > 0 ? (
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={item.images[0].gambar}
                            alt={item.namaType}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback jika gambar error
                              e.currentTarget.src = "/images/default-house.jpg";
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No image
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(Number(item.harga))}</TableCell>
                    <TableCell>{item.luasBangunan}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {item.deskripsi}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
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

                        {permissions.canEdit && (
                          <Link href={`/dashboard/detail/edit/${item.id}`}>
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
                        {permissions.canDelete && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex items-center gap-1"
                            onClick={() => handleDelete(item.id, item.namaType)}
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
