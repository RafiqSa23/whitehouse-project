import { NextResponse } from "next/server";
import { PrismaClient, TypeRumahEnum } from "@prisma/client";
import { CreateTypeRumahRequest } from "@/types/supabase";

const prisma = new PrismaClient();

function validateData(namaType: string, luasBangunan: string): string[] {
  const errors: string[] = [];

  const validTypes = Object.values(TypeRumahEnum);
  if (!validTypes.includes(namaType as TypeRumahEnum)) {
    errors.push("Nama type tidak valid");
  }

  if (luasBangunan.length > 50) {
    errors.push("Luas bangunan maksimal 50 karakter");
  }

  return errors;
}

export async function GET() {
  try {
    const typeRumah = await prisma.typeRumah.findMany({
      include: {
        images: {
          orderBy: { urutan: "asc" },
        },
        user: {
          select: {
            id: true,
            nama: true,
            username: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(typeRumah);
  } catch (error) {
    console.error("Error fetching type rumah:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data type rumah" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: CreateTypeRumahRequest = await req.json();

    const { namaType, harga, luasBangunan, deskripsi, userId, images } = body;

    console.log("Received data:", {
      namaType,
      harga,
      luasBangunan: luasBangunan?.length,
      deskripsi: deskripsi?.length,
      userId,
      imagesCount: images?.length,
    });

    // Validasi input
    const validationErrors = validateData(namaType, luasBangunan);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(", ") },
        { status: 400 }
      );
    }

    // Validasi harga
    const hargaNumber = parseFloat(harga.toString());
    if (isNaN(hargaNumber) || hargaNumber <= 0) {
      return NextResponse.json(
        { error: "Harga harus angka yang valid" },
        { status: 400 }
      );
    }

    // Validasi userId
    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { error: "User ID harus valid" },
        { status: 400 }
      );
    }

    const typeRumah = await prisma.typeRumah.create({
      data: {
        namaType: namaType as TypeRumahEnum,
        harga: hargaNumber,
        luasBangunan: luasBangunan.substring(0, 50),
        deskripsi: deskripsi,
        userId,
        images: {
          create:
            images?.map((img) => ({
              gambar: img.gambar,
              urutan: img.urutan || 1,
            })) || [],
        },
      },
      include: {
        images: true,
      },
    });

    console.log("Type rumah created successfully:", typeRumah.id);

    return NextResponse.json(typeRumah, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating type rumah:", error);

    // Handle specific Prisma errors
    if (error instanceof Error && "code" in error) {
      const prismaError = error as { code: string };

      if (prismaError.code === "P2000") {
        return NextResponse.json(
          { error: "Data terlalu panjang untuk disimpan" },
          { status: 400 }
        );
      }

      if (prismaError.code === "P2003") {
        return NextResponse.json(
          { error: "User tidak ditemukan" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Gagal membuat type rumah" },
      { status: 500 }
    );
  }
}
