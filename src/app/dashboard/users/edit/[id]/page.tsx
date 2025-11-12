"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { UpdateUserRequest } from "@/types/supabase";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [formData, setFormData] = useState<UpdateUserRequest>({
    nama: "",
    username: "",
    password: "",
    role: "marketing",
    is_active: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("🔄 Fetching user data for ID:", userId);

        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        console.log("API Response:", result);

        if (response.ok && result.data) {
          setFormData({
            nama: result.data.nama || "",
            username: result.data.username || "",
            role: result.data.role || "marketing",
            is_active:
              result.data.is_active !== undefined
                ? result.data.is_active
                : true,
            password: "", // Kosongkan password, biar user isi manual
          });
        } else {
          throw new Error(result.error || "Gagal mengambil data user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Swal.fire({
          title: "❌ Error",
          text:
            error instanceof Error
              ? error.message
              : "Gagal mengambil data user",
          icon: "error",
          confirmButtonText: "Kembali ke Daftar User",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          router.push("/dashboard/users");
        });
      } finally {
        setFetchLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setFetchLoading(false);
      Swal.fire({
        title: "Error",
        text: "User ID tidak valid",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/dashboard/users");
      });
    }
  }, [userId, router]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Submitting form data:", formData);

      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Update response:", result);

      if (response.ok) {
        Swal.fire({
          title: "✅ Berhasil!",
          text: "Data user berhasil diupdate",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          router.push("/dashboard/users");
        });
      } else {
        throw new Error(result.error || "Gagal update user");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "❌ Gagal",
        text:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
        icon: "error",
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

  if (fetchLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center items-center gap-2">
                <Icon
                  icon="solar:refresh-circle-bold"
                  className="animate-spin"
                  width={20}
                />
                <p>Loading data user...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Edit User</CardTitle>
            <CardDescription className="text-gray-600">
              Update data user yang sudah ada
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Lengkap */}
              <div className="space-y-2">
                <Label
                  htmlFor="nama"
                  className="text-sm font-medium text-gray-700"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap user"
                  className="w-full border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan username untuk login"
                  className="w-full border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password Baru
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                    className="w-full border-gray-300 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                <p className="text-xs text-gray-500">
                  Biarkan kosong jika tidak ingin mengubah password
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role */}
                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700"
                  >
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="marketing">Marketing</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Status User
                  </Label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-white">
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
                        className="text-sm cursor-pointer text-gray-700"
                      >
                        Aktifkan User
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  {loading ? (
                    <>
                      <Icon
                        icon="solar:refresh-circle-bold"
                        className="animate-spin mr-2"
                        width={16}
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="solar:diskette-bold"
                        className="mr-2"
                        width={16}
                      />
                      Update User
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/users")}
                  className="flex-1 border-gray-300 hover:bg-gray-50"
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
