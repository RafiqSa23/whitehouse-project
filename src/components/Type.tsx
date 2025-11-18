"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import {
  getHouseTypesData,
  formatPriceIDR,
  type HouseType,
} from "@/lib/dataType";

const Type = () => {
  const [showAll, setShowAll] = useState(false);

  const typeRumah: HouseType[] = getHouseTypesData();

  const formatTypeName = (typeName: string) => {
    return typeName.replace(/_/g, " ");
  };

  const displayedTypes = showAll ? typeRumah : typeRumah.slice(0, 6);

  return (
    <section id="type" className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Judul */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary tracking-wide">
            Type Rumah
          </h1>
          <p className="text-secondary/80 mt-4 text-lg">
            Pilihan type rumah terbaik dengan kualitas premium
          </p>
        </div>

        {/* Grid Card */}
        <div
          className={`grid gap-6 sm:gap-8 transition-all duration-500 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 lg:px-0
          `}
        >
          {displayedTypes.map((rumah) => (
            <Card
              key={rumah.id}
              className="bg-secondary overflow-hidden rounded-2xl shadow-lg border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full" // TAMBAHKAN: flex flex-col h-full
            >
              {/* Title */}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-900 text-center capitalize">
                  {formatTypeName(rumah.name)}
                </CardTitle>
              </CardHeader>

              {/* Gambar */}
              <div className="relative w-full aspect-[4/3] px-4 py-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={rumah.images[0]?.url || "/images/default-house.jpg"}
                    alt={formatTypeName(rumah.name)}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/default-house.jpg";
                    }}
                  />
                </div>
              </div>

              {/* Isi Card */}
              <CardContent className="pt-4 flex flex-col flex-grow">
                {" "}
                {/* TAMBAHKAN: flex flex-col flex-grow */}
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  {formatPriceIDR(Number(rumah.price))}
                </p>
                <p className="text-sm text-gray-800 mb-4">
                  Luas Bangunan:{" "}
                  <span className="font-semibold">{rumah.luasBangunan}</span>
                </p>
                {/* Deskripsi dengan tinggi tetap */}
                <div className="min-h-[60px] mb-4 flex-grow">
                  {" "}
                  {/* TAMBAHKAN: min-h dan flex-grow */}
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {" "}
                    {/* UBAH: line-clamp-2 menjadi line-clamp-3 */}
                    {rumah.description}
                  </p>
                </div>
                {/* Tombol */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  {" "}
                  {/* TAMBAHKAN: mt-auto */}
                  <Link
                    href={`/type/${rumah.slug.toLowerCase}`}
                    className="flex-1 bg-[#0D1B4C] text-center py-2 rounded-md text-white hover:bg-[#1B2A6B] transition-colors text-sm"
                  >
                    Detail
                  </Link>
                  <Link
                    href={"#contactus"}
                    className="flex-1 bg-green-600 text-center py-2 rounded-md text-white hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    Info WhatsApp
                    <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {typeRumah.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">Belum ada data type rumah</p>
          </div>
        )}

        {/* Tombol "Munculkan lebih banyak" */}
        {!showAll && typeRumah.length > 6 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setShowAll(true)}
              variant="secondary"
              className="bg-secondary text-primary font-semibold hover:bg-secondary/90 px-8 py-3"
            >
              Lihat Semua Type ({typeRumah.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Type;
