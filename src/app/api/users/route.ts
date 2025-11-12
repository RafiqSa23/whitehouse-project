import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface CreateUserRequest {
  nama: string;
  username: string;
  password: string;
  role: "admin" | "user";
  is_active?: boolean;
}

// GET semua users dari tabel 'user'
export async function GET(): Promise<NextResponse> {
  try {
    const { data: users, error } = await supabase
      .from("user")
      .select(
        "id, nama, username, password, role, is_active, created_at, updated_at"
      ) // ← Tambah password
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal mengambil data users: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// POST tambah user baru dengan password hashed
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateUserRequest = await request.json();
    const { nama, username, password, role, is_active } = body;

    // Validasi required fields
    if (!nama || !username || !password || !role) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 12);

    const currentTime = new Date().toISOString();

    const { data: user, error } = await supabase
      .from("user")
      .insert([
        {
          nama,
          username,
          password: hashedPassword,
          role,
          is_active: is_active !== undefined ? is_active : true,
          created_at: currentTime, // ← Tambahkan ini
          updated_at: currentTime, // ← Tambahkan ini
        },
      ])
      .select("id, nama, username, role, is_active, created_at, updated_at");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal menambah user: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User berhasil ditambah",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
