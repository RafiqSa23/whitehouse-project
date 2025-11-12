"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/lib/navItems";

const Navlink = () => {
  const [open, setOpen] = useState(false);

  // Close menu when resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 🔹 Toggle Button (Mobile Only) */}
      <Button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-700 hover:bg-gray-100 transition-all duration-300"
        variant="ghost"
        size="icon"
        aria-label="Toggle Menu"
      >
        {open ? (
          <X
            size={24}
            className="transform rotate-90 transition-transform duration-300"
          />
        ) : (
          <Menu
            size={24}
            className="transform rotate-0 transition-transform duration-300"
          />
        )}
      </Button>

      {/* 🔹 SATU Menu untuk Desktop & Mobile */}
      <div
        className={`
          flex flex-col md:flex-row md:items-center md:space-x-8 
          absolute md:static left-0 w-full md:w-auto 
          bg-white md:bg-transparent shadow-lg md:shadow-none
          transition-all duration-500 ease-in-out overflow-hidden
          ${
            open
              ? "max-h-96 opacity-100 visible top-full"
              : "max-h-0 opacity-0 invisible md:max-h-none md:opacity-100 md:visible"
          }
          z-30
        `}
        style={{ top: "100%" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto space-y-3 md:space-y-0 md:space-x-8 px-4 py-3 md:p-0 bg-secondary md:bg-transparent">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-800 hover:text-black text-base font-semibold transition-all duration-300 transform hover:scale-105 md:hover:scale-100 border-b-2 border-transparent hover:border-yellow-500 md:hover:underline md:hover:underline-offset-4"
              style={{
                transitionDelay: open ? `${index * 100}ms` : "0ms",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navlink;
