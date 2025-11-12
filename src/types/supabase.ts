export interface User {
  id: number;
  nama: string;
  username: string;
  role: "admin" | "marketing";
  is_active: boolean;
  created_at: string;
  updated_at: string;
  Gambar?: string;
}

export interface CreateUserRequest {
  nama: string;
  username: string;
  password: string;
  role: "admin" | "marketing";
  is_active?: boolean;
}

export interface UpdateUserRequest {
  nama?: string;
  username?: string;
  password?: string;
  role?: "admin" | "marketing";
  is_active?: boolean;
}

// Login Activity Interface
export interface LoginActivity {
  id: number;
  userId: number;
  tanggal: string;
  status: string;
  user: {
    id: number;
    nama: string;
    username: string;
    role: string;
  } | null;
}

export interface LoginActivityResponse {
  id: number;
  userId: number;
  username: string;
  tanggal: string;
  status: string;
  user: {
    id: number;
    nama: string;
    username: string;
    role: string;
  } | null;
}

export interface ActivityData {
  id: number;
  userId: number;
  tanggal: string;
  status: string;
  user: Array<{
    id: number;
    nama: string;
    username: string;
    role: string;
  }> | null;
}

// Type Rumah Interface
import { TypeRumahEnum } from "@prisma/client";

export type NamaType = TypeRumahEnum;

export interface TypeRumah {
  id: number;
  namaType: NamaType;
  harga: number;
  luasBangunan: string;
  deskripsi: string;
  userId: number;
  images: TypeRumahGambar[];
  user?: {
    id: number;
    nama: string;
    username: string;
  };
}

export interface TypeRumahGambar {
  id: number;
  typeId: number;
  gambar: string;
  urutan: number;
}

export interface CreateTypeRumahRequest {
  namaType: NamaType;
  harga: number;
  luasBangunan: string;
  deskripsi: string;
  userId: number;
  images: { gambar: string; urutan: number }[];
}

export interface UpdateTypeRumahRequest {
  namaType?: NamaType;
  harga?: number;
  luasBangunan?: string;
  deskripsi?: string;
  images?: { gambar: string; urutan: number }[];
}

// Untuk file upload
export interface UploadedImage {
  file: File;
  previewUrl: string;
  urutan: number;
}

// halaman beranda interface
export interface HalamanBeranda {
  id: number;
  nama: string;
  gambar: string;
  user_id: number;
  user?: {
    nama: string;
  };
}
