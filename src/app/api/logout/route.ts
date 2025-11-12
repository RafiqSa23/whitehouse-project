import { NextResponse } from "next/server";

/**
 * API Logout
 * - Menghapus cookie auth_token agar sesi berakhir
 */
export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout berhasil" },
      { status: 200 }
    );

    // Hapus cookie auth_token
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0), // kadaluarsa langsung
    });

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan saat logout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
