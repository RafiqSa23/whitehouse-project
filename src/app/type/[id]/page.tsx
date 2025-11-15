"use client";

import DetailProduct from "@/components/detail-product/DetailProduct";
import NavbarDetail from "@/components/navbar-detail/NavbarDetail";
import { getTypeRumahById } from "@/lib/api-typerumah";
import { TypeRumah } from "@/types/supabase";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const [rumah, setRumah] = useState<TypeRumah | null>(null);
  const [loading, setLoading] = useState(true);

  const parsedId = parseInt(id);

  useEffect(() => {
    if (isNaN(parsedId)) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("🔄 Fetching data for ID:", parsedId);
        const data = await getTypeRumahById(parsedId);
        console.log("✅ Data received:", data);
        setRumah(data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parsedId]);

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!rumah || isNaN(parsedId)) {
    notFound();
  }

  return (
    <div className="bg-primary min-h-screen">
      <NavbarDetail />
      <DetailProduct rumah={rumah} />
    </div>
  );
}
