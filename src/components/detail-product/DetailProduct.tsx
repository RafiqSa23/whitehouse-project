"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { TypeRumah } from "@/types/supabase";

interface DetailProductProps {
  rumah: TypeRumah;
}

const DetailProduct: React.FC<DetailProductProps> = ({ rumah }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTypeName = (typeName: string) => {
    return typeName.replace(/_/g, " ");
  };

  const images =
    rumah.images.length > 0
      ? rumah.images.map((img) => img.gambar)
      : ["/images/default-house.jpg"];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatDescription = (description: string) => {
    if (!description) return "";

    return description.split("\n").map((line, index) => {
      if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="text-white mt-1">•</span>
            <span className="text-white flex-1 mt-1">
              {line.replace(/^[-•]\s*/, "")}
            </span>
          </div>
        );
      }

      return (
        <div key={index} className="text-white">
          {line}
        </div>
      );
    });
  };

  // Generate WhatsApp message
  const whatsappMessage = `Halo, saya tertarik dengan type ${formatTypeName(
    rumah.namaType
  )} - ${formatCurrency(Number(rumah.harga))}`;

  // no Wa
  const whatsappUrl = `https://wa.me/6282246747133?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="w-full max-w-6xl mx-auto text-gray-900 mt-8 p-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8 rounded-3xl shadow-xl p-8">
        {/* Kiri - Image Gallery */}
        <div className="w-full lg:w-1/2">
          {/* Gambar utama dengan navigation */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImageIndex]}
              alt={formatTypeName(rumah.namaType)}
              fill
              className="object-cover"
              priority
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail gallery - gambar kecil-kecil yang bisa diklik */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kanan - Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          {/* Content Section */}
          <div className="space-y-4">
            {/* Type Rumah */}
            <div>
              <h1 className="text-3xl font-bold text-secondary">
                {formatTypeName(rumah.namaType).toUpperCase()}
              </h1>
            </div>

            {/* Harga dan Luas Bangunan rata kiri */}
            <div>
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                {formatCurrency(Number(rumah.harga))}
              </p>
              <p className="text-lg text-white font-bold">
                Luas Bangunan:{" "}
                <span className="font-semibold text-white">
                  {rumah.luasBangunan}
                </span>
              </p>
              <h3 className="font-bold text-lg mt-4 text-white">Deskripsi :</h3>
              <div className="text-white">
                {formatDescription(rumah.deskripsi)}
              </div>
            </div>
          </div>

          {/* Action Buttons sejajar kanan kiri */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-14 bg-zinc-400 hover:bg-zinc-300 text-white hover:text-gray-800 flex items-center justify-center gap-3 text-lg font-semibold transition-all rounded-xl"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Button>
            </Link>

            <Link href={whatsappUrl} target="_blank" className="flex-1">
              <Button className="w-full h-14 bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-3 text-lg font-semibold transition-all rounded-xl shadow-lg">
                <Icon icon="logos:whatsapp-icon" className="w-6 h-6" />
                Hubungi Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
