"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { createTypeRumah } from "@/lib/api-typerumah";
import { useAuth } from "@/contexts/AuthContexts";
import { UploadedImage, NamaType } from "@/types/supabase";
import { Icon } from "@iconify/react";
import Image from "next/image";

const formSchema = z.object({
  namaType: z.string().min(1, "Nama type harus diisi"),
  harga: z
    .string()
    .min(1, "Harga harus diisi")
    .regex(/^\d+$/, "Harga harus angka"),
  luasBangunan: z
    .string()
    .min(1, "Luas bangunan harus diisi")
    .max(50, "Luas bangunan maksimal 50 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

export default function CreateDetailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaType: "",
      harga: "",
      luasBangunan: "",
      deskripsi: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        newImages.push({
          file,
          previewUrl,
          urutan: images.length + index + 1,
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages.map((img, idx) => ({ ...img, urutan: idx + 1 }));
    });
  };

  const uploadImages = async (): Promise<
    { gambar: string; urutan: number }[]
  > => {
    if (images.length === 0) return [];

    const uploadedImages = [];

    for (const image of images) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", image.file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        uploadedImages.push({
          gambar: data.url,
          urutan: image.urutan,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(
          `Gagal upload gambar: ${image.file.name} - ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setUploading(false);
      }
    }

    return uploadedImages;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      Swal.fire("Error", "User tidak ditemukan", "error");
      return;
    }

    // Validasi tambahan client-side
    if (values.luasBangunan.length > 50) {
      Swal.fire("Error", "Luas bangunan maksimal 50 karakter", "error");
      return;
    }

    setLoading(true);
    try {
      const uploadedImages = await uploadImages();

      await createTypeRumah({
        namaType: values.namaType as NamaType,
        harga: parseInt(values.harga),
        luasBangunan: values.luasBangunan,
        deskripsi: values.deskripsi,
        userId: user.id,
        images: uploadedImages,
      });

      await Swal.fire({
        title: "Berhasil!",
        text: "Detail rumah berhasil dibuat",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/dashboard/detail");
    } catch (error) {
      console.error("Error creating detail rumah:", error);
      Swal.fire(
        "Error",
        error instanceof Error ? error.message : "Gagal membuat detail rumah",
        "error"
      );
    } finally {
      setLoading(false);
    }
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
                  <BreadcrumbLink href="/dashboard/detail">
                    Detail Rumah
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tambah Detail Rumah</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tambah Detail Rumah</h1>
              <p className="text-muted-foreground">Buat detail rumah baru</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/detail")}
            >
              Kembali
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Form Detail Rumah</CardTitle>
              <CardDescription>
                Isi detail rumah yang akan ditambahkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="namaType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih nama type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Type_Luxury">
                                Type Luxury
                              </SelectItem>
                              <SelectItem value="Type_Premium">
                                Type Premium
                              </SelectItem>
                              <SelectItem value="Type_Premium_A">
                                Type Premium A
                              </SelectItem>
                              <SelectItem value="Type_Premium_B">
                                Type Premium B
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="harga"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Harga</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: 100000000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Masukkan harga tanpa titik atau koma
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="luasBangunan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Luas Bangunan</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: 10x15 m" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <FormLabel>Gambar Rumah</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Icon
                          icon="solar:upload-linear"
                          className="h-8 w-8 text-gray-400"
                        />
                        <div className="text-sm text-gray-600">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Pilih Gambar
                          </Button>
                          <p className="mt-2">
                            atau drag and drop file di sini
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (max. 5MB per file)
                        </p>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border">
                              <Image
                                src={image.previewUrl}
                                alt={`Preview ${index + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute top-2 right-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <Icon
                                  icon="solar:trash-bin-trash-bold"
                                  width={12}
                                />
                              </Button>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                              {image.urutan}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deskripsi lengkap detail rumah..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading || uploading}>
                      {loading
                        ? "Menyimpan..."
                        : uploading
                        ? "Mengupload gambar..."
                        : "Simpan Detail Rumah"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard/detail")}
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
