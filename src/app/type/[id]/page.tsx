import DetailProduct from "@/components/detail-product/DetailProduct";
import NavbarDetail from "@/components/navbar-detail/NavbarDetail";
import { notFound } from "next/navigation";
import { getTypeRumahById } from "@/lib/api-typerumah";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    console.log("❌ Invalid ID");
    notFound();
  }

  try {
    const rumah = await getTypeRumahById(parsedId);

    return (
      <div className="bg-primary min-h-screen">
        <NavbarDetail />
        <DetailProduct rumah={rumah} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const parsedId = parseInt(id);

  try {
    const rumah = await getTypeRumahById(parsedId);

    return {
      title: `${rumah.namaType.replace(/_/g, " ")} - White House Premiere`,
      description: rumah.deskripsi.substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Product Not Found - White House Premiere",
    };
  }
}
