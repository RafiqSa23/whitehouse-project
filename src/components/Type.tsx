"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { rumahData } from "@/lib/rumahData";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Type = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="type" className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Judul */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary tracking-wide">
            Type
          </h1>
        </div>

        {/* Grid Card */}
        <div
          className={`grid gap-6 sm:gap-8 transition-all duration-500 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 lg:px-0
          `}
        >
          {rumahData.map((rumah, index) => (
            <Card
              key={rumah.id}
              className={`bg-secondary overflow-hidden rounded-2xl shadow-lg border-0 hover:shadow-2xl transition-all duration-300 ${
                !showAll && index >= 6 ? "hidden" : "block"
              }`}
            >
              {/* Title */}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-900 text-center">
                  {rumah.name}
                </CardTitle>
              </CardHeader>
              {/* Gambar */}
              <div className="relative w-full aspect-[4/3] px-4 py-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden ">
                  {/* aspect-[4/3] biar tinggi proporsional dan responsif */}
                  <Image
                    src={rumah.img}
                    alt={rumah.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              

              {/* Isi Card */}
              <CardContent>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  IDR {rumah.price.toLocaleString("id-ID", { minimumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-gray-800 mb-4">
                  Luas Rumah : <span className="font-semibold">{rumah.luas}</span>
                </p>

                {/* Tombol */}
                <div className="flex justify-center sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href={'/type/' + rumah.id}
                    className="flex-1 bg-[#0D1B4C] text-center py-2 rounded-md text-white hover:bg-[#1B2A6B] transition-colors"
                  >
                    Detail
                  </Link>
                  <Link
                    href={"#contactus"}
                    className="w-1/2 flex-1 bg-[#0D1B4C] text-center py-2 rounded-md text-white hover:bg-[#1B2A6B] transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    Info Selengkapnya
                    <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tombol "Munculkan lebih banyak" */}
        {!showAll && rumahData.length > 3 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setShowAll(true)}
              variant="secondary"
              className="bg-secondary text-primary font-semibold hover:bg-secondary/90"
            >
              Munculkan lebih banyak
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Type;
