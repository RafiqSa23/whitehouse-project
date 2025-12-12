"use client";

import { useState, useEffect, useRef } from "react";
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
import { getTypeRumahById, updateTypeRumah } from "@/lib/api-typerumah";
import { TypeRumah, UploadedImage, NamaType } from "@/types/supabase";
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
  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(255, "Deskripsi maksimal 255 karakter"),
});

export default function EditDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<TypeRumah | null>(null);
  const [newImages, setNewImages] = useState<UploadedImage[]>([]);
  const [existingImages, setExistingImages] = useState<
    { gambar: string; urutan: number; id?: number }[]
  >([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeRumah = await getTypeRumahById(id);
        setData(typeRumah);

        // Set existing images
        setExistingImages(
          typeRumah.images.map((img) => ({
            gambar: img.gambar,
            urutan: img.urutan,
            id: img.id,
          }))
        );

        form.reset({
          namaType: typeRumah.namaType,
          harga: typeRumah.harga.toString(),
          luasBangunan: typeRumah.luasBangunan,
          deskripsi: typeRumah.deskripsi,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Gagal mengambil data detail rumah", "error");
        router.push("/dashboard/detail");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, form, router]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedImages: UploadedImage[] = [];

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        uploadedImages.push({
          file,
          previewUrl,
          urutan: existingImages.length + newImages.length + index + 1,
        });
      }
    });

    setNewImages((prev) => [...prev, ...uploadedImages]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages.map((img, idx) => ({
        ...img,
        urutan: existingImages.length + idx + 1,
      }));
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages.map((img, idx) => ({ ...img, urutan: idx + 1 }));
    });
  };

  const uploadImages = async (): Promise<
    { gambar: string; urutan: number }[]
  > => {
    if (newImages.length === 0) return [];

    const uploadedImages = [];

    for (const image of newImages) {
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
    setLoading(true);
    try {
      // Upload new images first
      const uploadedNewImages = await uploadImages();

      // Combine existing images (yang tidak dihapus) dengan new images
      const allImages = [
        ...existingImages.map((img) => ({
          gambar: img.gambar,
          urutan: img.urutan,
        })),
        ...uploadedNewImages,
      ];

      await updateTypeRumah(id, {
        namaType: values.namaType as NamaType,
        harga: parseInt(values.harga),
        luasBangunan: values.luasBangunan,
        deskripsi: values.deskripsi,
        images: allImages,
      });

      await Swal.fire({
        title: "Berhasil!",
        text: "Detail rumah berhasil diupdate",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/dashboard/detail");
    } catch (error) {
      console.error("Error updating detail rumah:", error);
      Swal.fire(
        "Error",
        error instanceof Error
          ? error.message
          : "Gagal mengupdate detail rumah",
        "error"
      );
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
                  <BreadcrumbLink href="/dashboard/detail">
                    Detail Rumah
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Detail Rumah</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Edit Detail Rumah</h1>
              <p className="text-muted-foreground">Edit data detail rumah</p>
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
              <CardTitle>Form Edit Detail Rumah</CardTitle>
              <CardDescription>
                Edit detail rumah - Anda bisa menghapus gambar existing atau
                menambah gambar baru
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
                            value={field.value}
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

                  {/* Gambar Section */}
                  <div className="space-y-4">
                    <FormLabel>Gambar Rumah</FormLabel>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Gambar Existing:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {existingImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                <Image
                                  src={image.gambar}
                                  alt={`Existing image ${index + 1}`}
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
                                  onClick={() => removeExistingImage(index)}
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
                      </div>
                    )}

                    {/* File Upload untuk Gambar Baru */}
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
                            Tambah Gambar Baru
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

                    {/* Preview New Images */}
                    {newImages.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Gambar Baru:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {newImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                <Image
                                  src={image.previewUrl}
                                  alt={`New image ${index + 1}`}
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
                                  onClick={() => removeNewImage(index)}
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
                        <FormDescription>
                          {field.value?.length || 0}/255 karakter
                        </FormDescription>
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
                        : "Update Detail Rumah"}
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
