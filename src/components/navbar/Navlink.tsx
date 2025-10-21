"use client"

import { Button } from '@/components/ui/button'
import {Menu, X} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { navItems } from '@/lib/navItems'

const Navlink = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
          {/* 🔹 Toggle Button (Mobile Only) */}
      <Button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-700 dark:text-gray-100 focus:outline-none"
        variant="ghost"
        size="icon"
        aria-label="Toggle Menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* 🔹 Menu (Satu Struktur untuk Desktop & Mobile) */}
      <div
        className={`
          flex flex-col md:flex-row md:items-center md:space-x-8 
          absolute md:static left-0 w-full md:w-auto 
           dark:bg-gray-900 shadow-md md:shadow-none
          transition-all duration-300 ease-in-out overflow-hidden
          ${open ? "max-h-64 opacity-100 visible" : "max-h-0 opacity-0 invisible md:max-h-none md:opacity-100 md:visible"}
          z-30
        `}
        style={{ top: open ? "70px" : "70px" }}
      >
        <div className="flex flex-col mt-1 shadow-sm md:flex-row items-start md:items-center w-full md:w-auto space-y-3 md:space-y-0 md:space-x-8 px-4 py-3 md:p-0  bg-secondary">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-800 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-base font-semibold transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navlink