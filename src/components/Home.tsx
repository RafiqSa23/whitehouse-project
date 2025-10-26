import React from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section
      id="home"
      className="relative h-screen bg-center bg-cover flex items-center justify-center bg-[url('/Home.jpg')]"
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>

      {/* Konten utama */}
      <div className="relative z-10 text-center text-gold px-4">
        <div className="flex justify-center">
          <Image
            src={"/logo.png"}
            alt="About Image"
            width={200}
            height={200}
            className="justify-center"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-yellow-500">
          White House Premier
        </h1>
        <p className="text-lg md:text-xl mb-6 text-yellow-500">
          Hunian modern dengan sentuhan klasik elegan di lokasi strategis
          Jakarta.
        </p>
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
