"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateUserRequest } from "@/types/supabase";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateUserRequest>({
    nama: "",
    username: "",
    password: "",
    role: "marketing",
    is_active: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        // SweetAlert Success
        Swal.fire({
          title: "✅ User Berhasil Dibuat!",
          html: `
            <div style="text-align: left;">
              <p><strong>Nama:</strong> ${result.data?.[0]?.nama}</p>
              <p><strong>Username:</strong> ${result.data?.[0]?.username}</p>
              <p><strong>Role:</strong> ${result.data?.[0]?.role}</p>
              <p><strong>Status:</strong> ${
                result.data?.[0]?.is_active ? "Aktif" : "Nonaktif"
              }</p>
              <div style="background: #fef3cd; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <p style="margin: 0; color: #856404;"><strong>Password:</strong> ${
                  formData.password
                }</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #856404;">⚠️ Catat password ini dan berikan ke user!</p>
              </div>
            </div>
          `,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          router.push("/dashboard/users");
        });
      } else {
        const result = await response.json();

        // SweetAlert Error
        Swal.fire({
          title: "❌ Gagal",
          text: result.error || "Gagal menambah user",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      // SweetAlert Error
      Swal.fire({
        title: "❌ Error",
        text: "Terjadi kesalahan server",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Tambah User Baru
            </CardTitle>
            <CardDescription>
              Buat akun user baru untuk mengakses sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Lengkap */}
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap user"
                  className="w-full"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan username untuk login"
                  className="w-full"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Masukkan password minimal 6 karakter"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "solar:eye-closed-bold"
                          : "solar:eye-bold"
                      }
                      width={18}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimal 6 karakter. Pastikan password mudah diingat user.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="marketing">marketing</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status User</Label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <Label
                        htmlFor="is_active"
                        className="text-sm cursor-pointer"
                      >
                        Aktifkan User
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    User nonaktif tidak bisa login ke sistem
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Icon
                        icon="solar:refresh-circle-bold"
                        className="animate-spin mr-2"
                        width={16}
                      />
                      Sedang Membuat...
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="solar:user-plus-bold"
                        className="mr-2"
                        width={16}
                      />
                      Tambah User
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/users")}
                  className="flex-1"
                >
                  <Icon
                    icon="solar:arrow-left-bold"
                    className="mr-2"
                    width={16}
                  />
                  Kembali
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
