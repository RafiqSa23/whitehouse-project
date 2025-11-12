import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    console.log("📦 Available buckets:", buckets);

    return NextResponse.json({
      success: true,
      buckets: buckets,
      message: "Connected to Supabase Storage successfully",
    });
  } catch (error) {
    console.error("❌ Storage check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Supabase Storage",
      },
      { status: 500 }
    );
  }
}
