export interface HouseFeature {
  point: string;
}

export interface HouseImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface HouseType {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: HouseImage[];
  description: string;
  features: HouseFeature[];
  type: string;
  luasBangunan: string;
}

export const houseTypesData: HouseType[] = [
  {
    id: 1,
    name: "Luxury",
    slug: "luxury",
    price: 2500000000,
    luasBangunan: "300-500 m²",
    images: [
      {
        url: "/type/luxury/luxury.jpg",
        alt: "Villa Mewah Tampak Depan",
        isPrimary: true,
      },
    ],
    description: "Type premium yang sangat bagus dan nyaman untuk keluarga",
    features: [
      { point: "2 lantai" },
      { point: "Kamar mandi 4" },
      { point: "Kamar utama 1" },
      { point: "Kamar tamu 3" },
      { point: "Carport 2" },
      { point: "Kolam renang pribadi" },
      { point: "Security 24 jam" },
    ],
    type: "luxury",
  },
  {
    id: 2,
    name: "Premiere",
    slug: "premiere",
    price: 850000000,
    luasBangunan: "150-200 m²",
    images: [
      {
        url: "/type/premiere/premier.jpg",
        alt: "Apartemen Modern Living Room",
        isPrimary: true,
      },
    ],
    description: "Type premium yang sangat bagus di lokasi strategis",
    features: [
      { point: "1 lantai" },
      { point: "Kamar mandi 2" },
      { point: "Kamar utama 1" },
      { point: "Kamar tamu 1" },
      { point: "Carport 1" },
      { point: "Fasilitas gedung lengkap" },
      { point: "View kota" },
      { point: "Smart system" },
    ],
    type: "premiere",
  },
  {
    id: 3,
    name: "Premiere A",
    slug: "premiere-a",
    price: 750000000,
    luasBangunan: "80-120 m²",
    images: [
      {
        url: "/type/premiereA/premierA.jpg",
        alt: "Townhouse Tampak Depan",
        isPrimary: true,
      },
    ],
    description: "Type premium yang sangat bagus untuk investasi",
    features: [
      { point: "2 lantai" },
      { point: "Kamar mandi 3" },
      { point: "Kamar utama 1" },
      { point: "Kamar tamu 2" },
      { point: "Carport 1" },
      { point: "Taman pribadi" },
      { point: "Dapur modern" },
      { point: "Ruang keluarga luas" },
    ],
    type: "premierea",
  },
  {
    id: 4,
    name: "Premiere B",
    slug: "premiere-b",
    price: 550000000,
    luasBangunan: "80-100 m²",
    images: [
      {
        url: "/type/premiereB/premierB.jpg",
        alt: "Rumah Minimalis Depan",
        isPrimary: true,
      },
    ],
    description: "Type premium yang sangat bagus dan hemat energi",
    features: [
      { point: "1 lantai" },
      { point: "Kamar mandi 2" },
      { point: "Kamar utama 1" },
      { point: "Kamar tamu 1" },
      { point: "Carport 1" },
      { point: "Desain minimalis" },
      { point: "Hemat energi" },
      { point: "Low maintenance" },
    ],
    type: "premiereb",
  },
];

export const getHouseTypesData = (): HouseType[] => {
  return houseTypesData;
};

export const getHouseTypeBySlug = (slug: string): HouseType | null => {
  console.log("🔍 [LIB] Searching for slug:", slug);

  const normalizedSlug = slug.toLowerCase().trim();

  const found = houseTypesData.find(
    (house) => house.slug.toLowerCase() === normalizedSlug
  );

  return found || null;
};

export const formatPriceIDR = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getPrimaryImage = (houseType: HouseType): string => {
  const primary = houseType.images.find((img) => img.isPrimary);
  return primary ? primary.url : houseType.images[0].url;
};

// detail
export const getTypeRumahByNamaType = (slug: string): HouseType | null => {
  console.log("=== DEBUG getTypeRumahByNamaType ===");
  console.log("🔍 Input slug:", slug, "type:", typeof slug);
  console.log("📋 Total data:", houseTypesData.length);

  // Debug setiap item
  houseTypesData.forEach((house, index) => {
    console.log(`🏠 [${index}] slug: "${house.slug}", name: "${house.name}"`);
    console.log(
      `   Comparison: "${house.slug}" === "${slug}" = ${house.slug === slug}`
    );
    console.log(
      `   Lowercase: "${house.slug.toLowerCase()}" === "${slug.toLowerCase()}" = ${
        house.slug.toLowerCase() === slug.toLowerCase()
      }`
    );
  });

  const found = houseTypesData.find((house) => {
    const exactMatch = house.slug === slug;
    const caseInsensitiveMatch =
      house.slug.toLowerCase() === slug.toLowerCase();
    console.log(
      `🔎 Checking "${house.slug}" vs "${slug}": exact=${exactMatch}, caseInsensitive=${caseInsensitiveMatch}`
    );
    return exactMatch || caseInsensitiveMatch;
  });

  console.log("✅ Final result:", found);
  console.log("=== END DEBUG ===");

  return found || null;
};
