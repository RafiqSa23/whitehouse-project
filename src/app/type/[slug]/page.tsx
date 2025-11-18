"use client";

import DetailProduct from "@/components/detail-product/DetailProduct";
import NavbarDetail from "@/components/navbar-detail/NavbarDetail";
import { useParams, notFound } from "next/navigation";
import { getHouseTypeBySlug } from "@/lib/dataType";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  // Langsung ambil data dari library
  const rumah = getHouseTypeBySlug(slug);

  if (!rumah) {
    notFound();
  }

  return (
    <div className="bg-primary min-h-screen">
      <NavbarDetail />
      <DetailProduct rumah={rumah} />
    </div>
  );
}
