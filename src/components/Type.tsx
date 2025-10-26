"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { rumahData } from "@/lib/rumahData";
import { useState } from "react";
import Link from "next/link";

const Type = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="type">
      <div className="bg-primary mx-auto px-20 py-30">
        <div className=" text-center mb-10 text-4xl font-bold text-secondary">
          <h1>Type</h1>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ${
            showAll ? "max-h-full" : "max-h-[1400px] overflow-hidden"
          }`}
        >
          {rumahData.map((rumah, index) => (
            <Card
              key={rumah.id}
              className={`overflow-hidden shadow-lg transition-all duration-500  ${
                !showAll && index >= 4 ? "hidden" : "block"
              }`}
            >
              <div className="relative w-full h-48">
                <Image
                  src={rumah.img}
                  alt={rumah.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{rumah.name}</CardTitle>
                <CardDescription>{rumah.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-primary">
                  Rp {rumah.price.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(rumah.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="mt-4 flex justify-between gap-8">
                  <Link
                    href={"#home"}
                    className="bg-teal-500 px-4 py-2 rounded-md text-white hover:bg-teal-600"
                  >
                    Detail
                  </Link>
                  <Link
                    href={"/:id"}
                    className="bg-yellow-400 px-4 py-2 rounded-md text-white hover:bg-yellow-600 text-sm"
                  >
                    Info Selengkapnya
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!showAll && rumahData.length > 4 && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => setShowAll(true)} variant="secondary">
              Munculkan lebih banyak
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Type;
