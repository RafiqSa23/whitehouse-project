"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/api-login"
import Swal from "sweetalert2"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const router= useRouter()

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);

    const { status ,data } = await loginUser(username,password);
    if (status === 201) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil 🎉",
        text: "Selamat datang kembali!",
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => router.push("/dashboard"), 1000);

    } else if (status === 401) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: data.error || "Username atau password salah",
      });

    } else if (status === 400) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: data.error || "Isi semua kolom dengan benar",
      });

    } else if (status === 500) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Terjadi kesalahan pada server, coba lagi nanti.",
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Error Tidak Diketahui",
        text: "Terjadi kesalahan yang tidak terduga.",
      });
    }

    setLoading(false);
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
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>{loading?"Loading...":"Login"}</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-white relative hidden md:flex flex-col items-center justify-center text-center gap-2">
            <Image
              width= {200}
              height= {200}
              src="/logo.png"
              alt="Logo"
              className=""
            />
            <h1 className="text-2xl font-semibold text-center">White House Premiere</h1>
            <span className="text-sm text-center">Hunian Nyaman & Strategis</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
