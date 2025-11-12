import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const typeRumah = await prisma.typeRumah.findUnique({
      where: { id: parseInt(id) },
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
    });

    console.log(`🔍 Query result:`, typeRumah);

    if (!typeRumah) {
      console.log(`❌ Type rumah dengan ID ${id} tidak ditemukan`);
      return NextResponse.json(
        { error: "Type rumah tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(typeRumah);
  } catch (error) {
    console.error("Error fetching type rumah:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data type rumah" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { namaType, harga, luasBangunan, deskripsi, images } =
      await req.json();

    await prisma.typeRumahGambar.deleteMany({
      where: { typeId: parseInt(id) },
    });

    const typeRumah = await prisma.typeRumah.update({
      where: { id: parseInt(id) },
      data: {
        namaType,
        harga: parseFloat(harga),
        luasBangunan,
        deskripsi,
        images: {
          create:
            images?.map((img: { gambar: string; urutan: number }) => ({
              gambar: img.gambar,
              urutan: img.urutan,
            })) || [],
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(typeRumah);
  } catch (error) {
    console.error("Error updating type rumah:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate type rumah" },
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
    await prisma.typeRumah.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Type rumah berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting type rumah:", error);
    return NextResponse.json(
      { error: "Gagal menghapus type rumah" },
      { status: 500 }
    );
  }
}
