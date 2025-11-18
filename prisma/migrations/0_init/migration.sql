-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'marketing');

-- CreateEnum
CREATE TYPE "LoginStatus" AS ENUM ('Success', 'Failed');

-- CreateEnum
CREATE TYPE "TypeRumahEnum" AS ENUM ('Luxury', 'Premiere', 'Premiere_A', 'Premium_B');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "username" VARCHAR(58) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "Gambar" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "LoginStatus" NOT NULL,

    CONSTRAINT "login_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "halaman_beranda" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "gambar" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "halaman_beranda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_rumah" (
    "id" SERIAL NOT NULL,
    "namaType" "TypeRumahEnum" NOT NULL,
    "harga" DECIMAL(15,2) NOT NULL,
    "luasBangunan" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "type_rumah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_rumah_gambar" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "gambar" VARCHAR(255) NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "type_rumah_gambar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "login_activity_userId_tanggal_idx" ON "login_activity"("userId", "tanggal");

-- CreateIndex
CREATE INDEX "login_activity_tanggal_idx" ON "login_activity"("tanggal");

-- CreateIndex
CREATE INDEX "login_activity_status_idx" ON "login_activity"("status");

-- CreateIndex
CREATE INDEX "type_rumah_namaType_idx" ON "type_rumah"("namaType");

-- CreateIndex
CREATE INDEX "type_rumah_harga_idx" ON "type_rumah"("harga");

-- AddForeignKey
ALTER TABLE "login_activity" ADD CONSTRAINT "login_activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "halaman_beranda" ADD CONSTRAINT "halaman_beranda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_rumah" ADD CONSTRAINT "type_rumah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_rumah_gambar" ADD CONSTRAINT "type_rumah_gambar_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type_rumah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

