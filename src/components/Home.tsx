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
