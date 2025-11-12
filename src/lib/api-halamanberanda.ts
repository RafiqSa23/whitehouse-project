import { HalamanBeranda } from "@/types/supabase";

export async function getHalamanBeranda(): Promise<HalamanBeranda[]> {
  const response = await fetch("/api/halamanBeranda");

  if (!response.ok) {
    throw new Error("Gagal mengambil data halaman beranda");
  }

  return response.json();
}

export async function createHalamanBeranda(data: {
  nama: string;
  gambar: string;
  userId: number;
}) {
  const response = await fetch("/api/halamanBeranda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal membuat halaman beranda");
  }

  return response.json();
}

export async function updateHalamanBeranda(
  id: number,
  data: {
    nama: string;
    gambar: string;
  }
) {
  const response = await fetch(`/api/halamanBeranda/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal mengupdate halaman beranda");
  }

  return response.json();
}

export async function deleteHalamanBeranda(id: number) {
  const response = await fetch(`/api/halamanBeranda/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal menghapus halaman beranda");
  }

  return response.json();
}
