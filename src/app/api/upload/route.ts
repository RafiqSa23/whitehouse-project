import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diupload" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `typerumah_${timestamp}_${randomString}.${fileExtension}`;

    console.log("🔄 Uploading file to Supabase Storage...");
    console.log("📁 Bucket: rumah-images");
    console.log("📄 Filename:", filename);
    console.log("📊 File size:", (file.size / 1024 / 1024).toFixed(2), "MB");

    const { error } = await supabase.storage
      .from("rumah-images") // ✅ PERBAIKAN DI SINI
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase upload error:", error);
      return NextResponse.json(
        {
          error: `Gagal upload ke storage: ${error.message}`,
        },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("rumah-images").getPublicUrl(filename);

    console.log("✅ File uploaded successfully:", publicUrl);

    return NextResponse.json({
      success: true,
      filename: filename,
      url: publicUrl,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat upload file" },
      { status: 500 }
    );
  }
}
