"use clint";

import React from "react";
import Image from "next/image";
import { MapPin, MapPinned, Dumbbell, Bike, Waves } from "lucide-react";
import { locItems } from "@/lib/locItems";
import { Icon } from "@iconify/react";

const About = () => {
  return (
    <section id="about">
      <div className="bg-primary text-white mx-auto py-30 md:px-10 w-full">
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
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <p className="text-justify leading-relaxed max-w-md text-sm sm:text-base">
            <span className="font-semibold text-[#D4AF37]">
              White House Premiere 6
            </span>{" "}
            adalah hunian modern persembahan PT. Akhtar Farzan Wijaya, developer
            terpercaya yang telah sukses membangun hingga tahap ke-6. Kami
            berkomitmen menghadirkan rumah berkualitas tinggi dengan desain
            elegan, lingkungan nyaman, dan nilai investasi yang terus meningkat.
          </p>
        </div>

        {/* Location */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 items-start gap-x-16 px-8 ">
          <div className="space-y-5 text-lg">
            {locItems.map((item) => (
              <div key={item.name} className="flex items-start gap-3">
                <MapPin className="text-yellow-400 w-7 h-7 mt-1 flex-shrink-0" />
                <p className="leading-snug">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center md:justify-start mt-10 md:ml-20 gap-4">
            <MapPinned className="text-yellow-400 w-14 h-14" />
            <h2 className="text-yellow-400 text-4xl font-bold">Location</h2>
          </div>
        </div>

        {/* FACILITATION */}
        <div className="max-w-6xl mx-auto mt-20 px-5">
          <h2 className="text-yellow-400 text-3xl font-semibold mb-8">
            Facilitation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 ">
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="ph:mosque-fill" className="w-15 h-15" />
              <p className="font-semibold">Masjid</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="vaadin:golf" className="w-15 h-15" />
              <p className="font-semibold">Mini Golf</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="emojione-monotone:basketball" className="w-15 h-15" />
              <p className="font-semibold text-center">Basketball Court</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="ri:football-line" className="w-15 h-15" />
              <p className="font-semibold text-center">Soccer Field</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="cil:tennis" className="w-15 h-15" />
              <p className="font-semibold">Tennis Field</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="hugeicons:equipment-gym-03" className="w-15 h-15" />
              <p className="font-semibold">Gym Area</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="ri:run-fill" className="w-15 h-15" />
              <p className="font-semibold">Jogging Track</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3">
              <Icon icon="mdi:lake" className="w-15 h-15" />
              <p className="font-semibold">Danau</p>
            </div>
            <div className="bg-yellow-500 text-black rounded-xl flex flex-col items-center justify-center py-6 space-y-3 col-span-2 md:col-span-1">
              <Icon
                icon="material-symbols:playground-2-outline-rounded"
                className="w-15 h-15"
              />
              <p className="font-semibold">PlayGround</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
