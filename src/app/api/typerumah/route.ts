import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try{
        const houses = await prisma.typeRumah.findMany({ include: { user: true } });
        return NextResponse.json(houses);
    }catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status: 500 });
}
}

export async function POST(req: Request) {
  const { namaType, harga, luasBangunan, deskripsi, userId } = await req.json();
  try {
    const newHouse = await prisma.typeRumah.create({
      data: { namaType, harga, luasBangunan, deskripsi, userId },
    });
    return NextResponse.json(newHouse, { status: 201 });
  } catch (error: unknown) {
    // Jika error unknown, bisa cast ke Error untuk ambil message
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
