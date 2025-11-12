"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import Image from "next/image";
import {
  getHalamanBeranda,
  updateHalamanBeranda,
} from "@/lib/api-halamanberanda";
import { HalamanBeranda } from "@/types/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod Schema langsung di file
const halamanBerandaSchema = z.object({
  nama: z.string().min(1, "Nama section harus diisi"),
  gambar: z.any().refine((file) => {
    if (typeof file === "string") return true;
    if (file instanceof File) return true;
    return false;
  }, "Gambar harus diisi"),
});

type HalamanBerandaFormValues = z.infer<typeof halamanBerandaSchema>;

export default function EditHalamanBerandaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HalamanBeranda | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const form = useForm<HalamanBerandaFormValues>({
    resolver: zodResolver(halamanBerandaSchema),
    defaultValues: {
      nama: "",
      gambar: "",
    },
  });

  // Perbaikan: Gunakan useCallback untuk menghindari warning useEffect
  const fetchData = useCallback(async () => {
    try {
      const allData = await getHalamanBeranda();
      const item = allData.find((d) => d.id === parseInt(id));

      if (!item) {
        Swal.fire("Error", "Data tidak ditemukan", "error");
        router.push("/dashboard/halaman-beranda");
        return;
      }

      setData(item);
      form.reset({
        nama: item.nama,
        gambar: item.gambar,
      });
      setImagePreview(item.gambar);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  }, [id, router, form]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]); // Perbaikan: Tambahkan fetchData ke dependency array

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Set value to form
    form.setValue("gambar", file);
    form.clearErrors("gambar");
  };

  async function onSubmit(values: HalamanBerandaFormValues) {
    setLoading(true);
    try {
      let gambarUrl = values.gambar;

      // Jika gambar baru diupload
      if (values.gambar instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", values.gambar);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Gagal upload gambar");
        }

        const uploadData = await uploadResponse.json();
        gambarUrl = uploadData.url;
      }

      // Update halaman beranda
      await updateHalamanBeranda(parseInt(id), {
        nama: values.nama,
        gambar: gambarUrl as string,
      });

      await Swal.fire({
        title: "Berhasil!",
        text: "Section berhasil diupdate",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/dashboard/halaman-beranda");
    } catch (error) {
      console.error("Error updating section:", error);
      Swal.fire("Error", "Gagal mengupdate section", "error");
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
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
                  <BreadcrumbLink href="/dashboard/halaman-beranda">
                    Halaman Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Section</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Edit Section Beranda</h1>
              <p className="text-muted-foreground">Edit section {data.nama}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/halaman-beranda")}
            >
              Kembali
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Form Edit Section</CardTitle>
              <CardDescription>
                Edit detail section halaman beranda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Section *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: Hero Section, About Section, dll."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Perbaikan: Hapus value dan onChange yang tidak digunakan */}
                  <FormField
                    control={form.control}
                    name="gambar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gambar</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Kosongkan jika tidak ingin mengubah gambar
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Menyimpan..." : "Update Section"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard/halaman-beranda")}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
