import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { nama, gambar } = body;
    const { id } = await params;
    const numericId = parseInt(id);

    const halamanBeranda = await prisma.halamanBeranda.update({
      where: { id: numericId },
      data: {
        nama,
        gambar,
      },
      include: {
        user: {
          select: {
            nama: true,
          },
        },
      },
    });

    return NextResponse.json(halamanBeranda);
  } catch (error) {
    console.error("Error updating halaman beranda:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate halaman beranda" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);

    await prisma.halamanBeranda.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting halaman beranda:", error);
    return NextResponse.json(
      { error: "Gagal menghapus halaman beranda" },
      { status: 500 }
    );
  }
}
