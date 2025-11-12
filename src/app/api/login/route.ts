import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function untuk record login activity
async function recordLoginActivity(
  userId: number | null,
  status: "Success" | "Failed"
): Promise<boolean> {
  try {
    const { error } = await supabase.from("login_activity").insert({
      userId: userId,
      status: status,
    });

    if (error) {
      console.error("Error recording login activity:", error);
      return false;
    }

    console.log(`Login activity recorded: ${status} for user ID ${userId}`);
    return true;
  } catch (error) {
    console.error("Error recording login activity:", error);
    return false;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, password } = await req.json();

    // Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        nama: true,
        password: true,
        role: true,
        is_active: true,
      },
    });

    if (!user) {
      await recordLoginActivity(null, "Failed");
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Cek status user aktif
    if (!user.is_active) {
      await recordLoginActivity(user.id, "Failed");
      return NextResponse.json(
        { error: "Akun tidak aktif. Hubungi administrator." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await recordLoginActivity(user.id, "Failed");
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // 🔐 Buat JWT token (30 menit = 1800 detik)
    const token = await new SignJWT({
      id: user.id,
      username: user.username,
      nama: user.nama,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30m")
      .sign(new TextEncoder().encode(process.env.SECRET_KEY!));

    // Record login Success
    await recordLoginActivity(user.id, "Success");

    console.log("✅ LOGIN SUCCESS - Token created for user:", user.username);

    // ✅ PERBAIKAN: Buat response JSON dulu
    const responseData = {
      message: "Login Berhasil",
      user: {
        id: user.id,
        username: user.username,
        nama: user.nama,
        role: user.role,
      },
      token: token,
    };

    // ✅ PERBAIKAN: Buat response dengan data
    const response = NextResponse.json(responseData, { status: 200 });

    // ✅ PERBAIKAN: Set cookie setelah response dibuat
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 60, // 30 menit
      sameSite: "lax",
    });

    console.log("✅ Cookie set successfully for path:", "/");

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
