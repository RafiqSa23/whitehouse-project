"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HalamanBeranda {
  id: number;
  nama: string;
  gambar: string;
  userId: number;
  user: {
    id: number;
    nama: string;
    username: string;
  };
}

const Home = () => {
  const [slides, setSlides] = useState<HalamanBeranda[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log("🔄 Fetching slides from API...");
        const response = await fetch("/api/halamanBeranda", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setSlides(data);
      } catch (error) {
        console.error("❌ Error fetching slides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;

        return next;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);
  if (isLoading) {
    return (
      <section
        id="home"
        className="relative h-screen bg-center bg-cover flex items-center justify-center bg-[url('/Home.jpg')]"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex justify-center">
            <Image
              src={"/logohome.png"}
              alt="About Image"
              width={400}
              height={400}
              className="justify-center"
            />
          </div>
          <Link
            href={"#type"}
            className="bg-secondary hover:bg-amber-400 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            See Detail
          </Link>
        </div>
      </section>
    );
  }

  if (slides.length > 0) {
    console.log("🎬 Showing slideshow with", slides.length, "slides");

    return (
      <section
        id="home"
        className="relative h-screen bg-center bg-cover flex items-center justify-center overflow-hidden"
      >
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.gambar}
                alt={slide.nama}
                fill
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  console.error("❌ Error loading image:", slide.gambar);

                  e.currentTarget.src = "/Home.jpg";
                }}
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex justify-center mb-6">
            <Image
              src={"/logohome.png"}
              alt="Logo"
              width={400}
              height={400}
              className="justify-center"
            />
          </div>
          <Link
            href={"#type"}
            className="bg-secondary hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold transition text-lg"
          >
            See Detail
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative h-screen bg-center bg-cover flex items-center justify-center bg-[url('/Home.jpg')]"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
      <div className="relative z-10 text-center text-white px-4">
        <div className="flex justify-center">
          <Image
            src={"/logohome.png"}
            alt="About Image"
            width={400}
            height={400}
            className="justify-center"
          />
        </div>
        <Link
          href={"#type"}
          className="bg-secondary hover:bg-amber-400 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          See Detail
        </Link>
      </div>
    </section>
  );
};

export default Home;
