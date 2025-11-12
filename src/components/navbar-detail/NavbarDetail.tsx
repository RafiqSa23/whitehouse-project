"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Icon } from "@iconify/react";

const NavbarDetail = () => {
  const [, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="top-0 w-full bg-secondary shadow-sm z-50 py-2 sticky ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-3">
          <Link href={"/"} className="flex items-center space-x-2">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg sm:text-xl md:text-lg text-black">
                White House Premiere 6
              </span>
              <span className="text-sm text-black/80 font-medium">
                Hunian Nyaman & Strategis
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDetail;
