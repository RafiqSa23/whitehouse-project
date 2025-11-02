"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Icon } from '@iconify/react'

const NavbarDetail = () => {
  const [ ,setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {window.removeEventListener("scroll", handleScroll);};
  }, []);

  return (
    <nav className='top-0 w-full bg-secondary shadow-sm z-50 py-2 sticky '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between space-x-3'>
            <Link href={"/"} className='flex items-center space-x-2' >
            <Image src={"/logo.png"} alt='logo' width={70} height={70} className='object-contain' />
            <div className='flex flex-col leading-tight'>
            <span className='font-bold text-lg sm:text-xl md:text-lg text-black'>White House Premiere 6</span>
             <span className="text-sm text-black/80 font-medium">
                Hunian Nyaman & Strategis
              </span>
            </div>
            </Link> 

            {/* tampilan kanan */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Kembali ke Beranda */}
              <Link href="/#type" className="flex items-center">
                {/* Desktop version */}
                <span className="hidden md:inline text-black font-medium hover:underline text-sm md:text-base">
                  Kembali ke Beranda
                </span>
                {/* Mobile version */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden bg-[#0a1a3f] hover:bg-[#11214d] text-white rounded-full p-2"
                >
                  <Home className="w-10 h-10" />
                </Button>
              </Link>

              {/* Info Selengkapnya (WhatsApp) */}
              <Link href="https://wa.me/6281234567890" target="_blank" className="flex items-center">
                {/* Desktop version */}
                <Button className="hidden md:flex bg-[#0a1a3f] hover:bg-[#11214d] text-white items-center gap-2 rounded-lg px-4 py-2 text-sm md:text-base">
                  Info Selengkapnya
                  <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                </Button>
                {/* Mobile version */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden bg-[#0a1a3f] hover:bg-[#11214d] text-white rounded-full p-2"
                >
                  <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                </Button>
              </Link>
            </div>
        </div>

        
      </div>
    </nav>
  )
}

export default NavbarDetail