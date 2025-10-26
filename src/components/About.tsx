import React from "react";
import Image from "next/image";
import { MapPin, MapPinned, Dumbbell, Bike, Waves } from "lucide-react";

const About = () => {
  return (
    <section id="about">
      <div className="bg-primary text-white mx-auto py-30 px-10">
        <div className="text-4xl font-bold justify-center items-center text-center text-secondary">
          <h1>About</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 p-10 mt-10 md:grid-cols-2">
          <div>
            <Image
              src={"/Home.jpg"}
              alt="About Image"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <p className="text-justify">
            White House Premiere 6 adalah hunian modern persembahan PT. Akhtar
            Farzan Wijaya, developer terpercaya yang telah sukses membangun
            hingga tahap ke-6. Kami berkomitmen menghadirkan rumah berkualitas
            tinggi dengan desain elegan, lingkungan nyaman, dan nilai investasi
            yang terus meningkat.
          </p>
        </div>

        {/* Location */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 mt-20 md:grid-cols-2">
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-400 w-8 h-8" />
              <p>5 menit ke LRT Harjamukti</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-400 w-8 h-8" />
              <p>5 menit ke Gate Tol Cibubur</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-400 w-8 h-8" />
              <p>7 menit ke Halte TransJakarta</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-400 w-8 h-8" />
              <p>20 menit ke Stasiun Pondok Cina & Depok Baru</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-10 md:mt-0 ml-50">
            <MapPinned className="text-yellow-400 w-15 h-15" />
            <h2 className="text-yellow-400 text-4xl font-semibold">Location</h2>
          </div>
        </div>

        {/* FACILITATION */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-yellow-400 text-3xl font-semibold mb-8">
            Facilitation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <p className="font-semibold">Masjid</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <p className="font-semibold">Mini Golf</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <p className="font-semibold text-center">Basketball Court</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <p className="font-semibold text-center">Soccer Field</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <p className="font-semibold">Tennis Field</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Dumbbell className="w-10 h-10" />
              <p className="font-semibold">Gym Area</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Bike className="w-10 h-10" />
              <p className="font-semibold">Jogging Track</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Waves className="w-10 h-10" />
              <p className="font-semibold">Danau</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3 col-span-2 md:col-span-1">
              <p className="font-semibold">PlayGround</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
