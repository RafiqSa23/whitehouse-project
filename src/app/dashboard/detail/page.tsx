"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icon } from "@iconify/react"
import Swal from "sweetalert2"

export default function Page() {
  // hande delete
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    })
    if (result.isConfirmed) {
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success")
    }
  }

  // Alert view
  const handleView = () => {
    Swal.fire({
      title: "Detail Type Luxury",
      html: `
        <div style="text-align:left">
          <p><b>Nama:</b> Type Luxury</p>
          <p><b>Harga:</b> Rp 100.000.000</p>
          <p><b>Luas:</b> 100 x 100 m</p>
          <p><b>Deskripsi:</b> Rumah dengan desain mewah dan modern.</p>
        </div>
      `,
      imageUrl: "/images/rumah1.jpg",
      imageWidth: 300,
      imageAlt: "Type Luxury",
    })
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
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between">
            <h1>Kelola Halaman Beranda</h1>
            <Link href="/dasboard/create">
            <Button>
              Tambah
            </Button>
            </Link>
          </div>

          <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama Type Rumah</TableHead>
              <TableHead>Gambar</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Luas Bangunan</TableHead>
              <TableHead>Deskripsi Lengkap</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Type Luxury</TableCell>
              <TableCell>gambar 1</TableCell>
              <TableCell>RP 100.000</TableCell>
              <TableCell>100 x 100 M</TableCell>
              <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, obcaecati!</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleView}>
                  <Icon icon="solar:eye-bold" width={16} />
                        View
                </Button>
                <Button size="sm" variant="secondary" className="flex items-center gap-1">
                  <Icon icon="solar:pen-bold" width={16} />
                        Edit
                </Button>
                <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={handleDelete}>
                  <Icon icon="solar:trash-bin-trash-bold" width={16} />
                        Hapus
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          </Table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
