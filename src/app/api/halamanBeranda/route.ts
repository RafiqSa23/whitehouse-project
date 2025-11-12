import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const halamanBeranda = await prisma.halamanBeranda.findMany({
      include: {
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

    return NextResponse.json(halamanBeranda);
  } catch (error) {
    console.error("Error fetching halaman beranda:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data halaman beranda" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, gambar, userId } = body;

    // Validasi
    if (!nama || !gambar || !userId) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    const halamanBeranda = await prisma.halamanBeranda.create({
      data: {
        nama,
        gambar,
        userId: parseInt(userId),
      },
      include: {
        user: {
          select: {
            nama: true,
          },
        },
      },
    });

    return NextResponse.json(halamanBeranda, { status: 201 });
  } catch (error) {
    console.error("Error creating halaman beranda:", error);
    return NextResponse.json(
      { error: "Gagal membuat halaman beranda" },
      { status: 500 }
    );
  }
}
