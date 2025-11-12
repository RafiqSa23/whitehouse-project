import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function untuk cek role user dari JWT token
async function getUserRole(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.log("❌ No auth token found");
      return null;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
      role?: string;
    };
    return decoded.role || null;
  } catch (error) {
    console.error("❌ Error decoding token:", error);
    return null;
  }
}

// Function untuk fetch user data by ID
async function getUserById(userId: number) {
  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("id, nama, username, role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(`❌ Error fetching user ${userId}:`, error.message);
      return null;
    }

    return user;
  } catch (error) {
    console.error(`❌ Error fetching user ${userId}:`, error);
    return null;
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    // Cek apakah user adalah admin
    const userRole = await getUserRole();

    if (userRole !== "admin") {
      return NextResponse.json(
        {
          error: "Akses ditolak. Hanya admin yang bisa melihat login activity.",
        },
        { status: 403 }
      );
    }

    console.log("🔍 Fetching login activities as admin...");

    const { data: loginActivities, error } = await supabase
      .from("login_activity")
      .select(
        `
        id,
        userId,
        tanggal,
        status
      `
      )
      .order("tanggal", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal mengambil data login activity: " + error.message },
        { status: 500 }
      );
    }

    console.log("✅ Login activities found:", loginActivities?.length);

    // Fetch user data untuk setiap activity yang punya userId
    const activitiesWithUsers = await Promise.all(
      (loginActivities || []).map(async (activity) => {
        let user = null;

        if (activity.userId) {
          user = await getUserById(activity.userId);
        }

        return {
          id: activity.id,
          userId: activity.userId,
          tanggal: activity.tanggal,
          status: activity.status,
          user: user,
        };
      })
    );

    return NextResponse.json({
      data: activitiesWithUsers,
      count: activitiesWithUsers.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
