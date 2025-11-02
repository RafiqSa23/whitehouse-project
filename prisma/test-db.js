// prisma/test-db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
