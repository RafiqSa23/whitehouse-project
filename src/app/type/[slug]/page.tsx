"use client";

import DetailProduct from "@/components/detail-product/DetailProduct";
import NavbarDetail from "@/components/navbar-detail/NavbarDetail";
import { getTypeRumahByNamaType } from "@/lib/api-typerumah";
import { TypeRumah } from "@/types/supabase";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const [rumah, setRumah] = useState<TypeRumah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("🔄 Fetching data for ID:", slug);
        const data = await getTypeRumahByNamaType(slug);
        console.log("✅ Data received:", data);
        setRumah(data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!rumah || !slug) {
    notFound();
  }

  return (
    <div className="bg-primary min-h-screen">
      <NavbarDetail />
      <DetailProduct rumah={rumah} />
    </div>
  );
}
