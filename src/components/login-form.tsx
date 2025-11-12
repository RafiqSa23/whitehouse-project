"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/contexts/AuthContexts";
import { loginUser } from "@/lib/api";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoading: isLoggingIn } = useAuth();
  const router = useRouter();

  // Redirect jika sudah login
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Silahkan lengkapi semua field",
      });
      setLoading(false);
      return;
    }

    try {
      const { status, data } = await loginUser(username, password);

      if (status === 200 || status === 201) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Selamat datang kembali!",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      } else if (status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.error || "Username atau password salah",
        });
      } else if (status === 400) {
        Swal.fire({
          icon: "error",
          title: "Form tidak lengkap",
          text: data.error || "Permintaan tidak valid",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Tidak Diketahui",
          text: data.error || "Terjadi kesalahan yang tidak terduga.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Tidak dapat terhubung ke server",
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>Sedang login...</p>
              </div>
            </div>
            <div className="bg-white relative hidden md:flex flex-col items-center justify-center text-center gap-2">
              <Image
                width={200}
                height={200}
                src="/logo.png"
                alt="Logo"
                className=""
              />
              <h1 className="text-2xl font-semibold text-center">
                White House Premiere
              </h1>
              <span className="text-sm text-center">
                Hunian Nyaman & Strategis
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-balance">
                  Silahkan Login disini
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoggingIn} className="w-full">
                  {isLoggingIn ? "Loading..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-white relative hidden md:flex flex-col items-center justify-center text-center gap-2">
            <Image
              width={200}
              height={200}
              src="/logo.png"
              alt="Logo"
              className=""
            />
            <h1 className="text-2xl font-semibold text-center">
              White House Premiere
            </h1>
            <span className="text-sm text-center">
              Hunian Nyaman & Strategis
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
