import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // data user awal
  const users = [
    {
      nama: "Administrator",
      username: "admin",
      password: await bcrypt.hash("admin001", 10),
      role: Role.admin,
      is_active: true,
    },
    {
      nama: "Marketing One",
      username: "marketing1",
      password: await bcrypt.hash("marketing001", 10),
      role: Role.marketing,
      is_active: true,
    },
  ];

  for (const user of users) {
    // upsert = create jika belum ada, biarkan kalau sudah ada
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  }

  console.log("✅ Data user awal berhasil di-seed!");
}

main()
  .catch((err) => {
    console.error("❌ Error saat seeding:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
