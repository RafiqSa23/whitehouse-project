import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import {Home} from 'lucide-react'
import { Icon } from '@iconify/react'

const DetailProduct = () => {
    const thumbnails = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];
  return (
    <section className="w-full max-w-7xl mx-auto  text-[#0a1a3f] rounded-2xl shadow-lg overflow-hidden mt-10 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kiri - Gambar utama & thumbnail */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Gambar utama */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
            <Image
              src="/img1.jpg"
              alt="Luxury House"
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex gap-3 justify-center flex-wrap">
            {thumbnails.map((thumb, i) => (
              <div
                key={i}
                className="relative w-20 h-16 md:w-24 md:h-20 rounded-md overflow-hidden border hover:scale-105 transition-transform"
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Kanan - Detail produk */}
        <div className="flex-1 space-y-4 md:space-y-6">
          {/* Judul */}
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-600">
            LUXURY TYPE
          </h1>

          {/* Harga & info ukuran */}
          <div>
            <p className="text-3xl font-bold text-white">Rp XXX.XXX.XXX</p>
            <p className="text-sm text-white">
              Luas Rumah: <span className="font-medium">95m² / 60m²</span>
            </p>
          </div>

          {/* Spesifikasi */}
          <div className=" rounded-lg p-4 space-y-1">
            <p className="font-semibold text-white">Spesifikasi Lengkap:</p>
            <ul className="list-disc list-inside text-white text-sm md:text-base">
              <li>2 lantai</li>
              <li>Kamar mandi 3</li>
              <li>Kamar utama 1</li>
              <li>Kamar tamu 2</li>
              <li>Carport 1</li>
              <li>Balkon 1</li>
            </ul>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gray-300 text-[#0a1a3f] hover:bg-gray-200 flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Button>
            </Link>

            <Link href="https://wa.me/6281234567890" target="_blank" className="flex-1">
              <Button className="w-full bg-secondary text-black flex items-center justify-center gap-2">
                <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                Hubungi Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailProduct