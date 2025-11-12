import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { UpdateUserRequest } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// GET user by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    console.log("🔍 Fetching user with ID:", id);

    const { data: user, error } = await supabase
      .from("user")
      .select("id, nama, username, role, is_active, created_at, updated_at")
      .eq("id", parseInt(id))
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal mengambil data user: " + error.message },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// PUT update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body: UpdateUserRequest = await request.json();
    const { nama, username, password, role, is_active } = body;

    console.log("📝 Updating user ID:", id, "with data:", body);

    // Validasi required fields
    if (!nama || !username || !role) {
      return NextResponse.json(
        { error: "Nama, username, dan role harus diisi" },
        { status: 400 }
      );
    }

    // Prepare update data dengan type yang tepat
    const updateData: {
      nama: string;
      username: string;
      role: string;
      is_active: boolean;
      updated_at: string;
      password?: string;
    } = {
      nama: nama!,
      username: username!,
      role: role!,
      is_active: is_active !== undefined ? is_active : true,
      updated_at: new Date().toISOString(),
    };

    // Jika password diisi, hash password baru
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const { data: user, error } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", parseInt(id))
      .select("id, nama, username, role, is_active, updated_at");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal update user: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User berhasil diupdate", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    console.log("🗑️ Deleting user ID:", id);

    const { error } = await supabase
      .from("user")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal menghapus user: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
