import {
  TypeRumah,
  CreateTypeRumahRequest,
  UpdateTypeRumahRequest,
} from "../types/supabase";

const API_BASE = "/api/typerumah";

export async function getTypeRumahById(id: number): Promise<TypeRumah> {
  const apiUrl = `${API_BASE}/${id}`;

  console.log(`🔄 Fetching from: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API Error: ${response.status} - ${errorText}`);
    throw new Error("Gagal mengambil data type rumah");
  }

  return response.json();
}

export async function getTypeRumah(): Promise<TypeRumah[]> {
  const response = await fetch(API_BASE, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Gagal mengambil data type rumah");
  return response.json();
}

export async function createTypeRumah(
  data: CreateTypeRumahRequest
): Promise<TypeRumah> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal membuat type rumah");
  }
  return response.json();
}

export async function updateTypeRumah(
  id: number,
  data: UpdateTypeRumahRequest
): Promise<TypeRumah> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal mengupdate type rumah");
  }
  return response.json();
}

export async function deleteTypeRumah(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Gagal menghapus type rumah");
  }
}

export async function getTypeRumahByNamaType(
  namaType: string
): Promise<TypeRumah | null> {
  try {
    const response = await fetch(
      `/api/typerumah?namaType=${encodeURIComponent(namaType)}`
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching type rumah by namaType:", error);
    return null;
  }
}
