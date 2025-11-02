import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status: 500 });
}
}

export async function POST(req: Request) {
  try {
    const { nama, username, password, role } = await req.json();
    const newUser = await prisma.user.create({
      data: { nama, username, password, role },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    // Jika error unknown, bisa cast ke Error untuk ambil message
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

