/*
  Warnings:

  - Added the required column `nama` to the `halaman_beranda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "halaman_beranda" ADD COLUMN     "nama" VARCHAR(100) NOT NULL;
