import React from 'react'

const Home = () => {
  return (
    <section id='home' className="relative h-screen bg-center bg-cover flex items-center justify-center bg-[url('/Home.jpg')]">
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xs"></div>

      {/* Konten utama */}
      <div className="relative z-10 text-center text-gold px-4"> 
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-yellow-500">
          White House Premier
        </h1>
        <p className="text-lg md:text-xl mb-6 text-yellow-500">
          Hunian modern dengan sentuhan klasik elegan di lokasi strategis Jakarta.
        </p>
        <button className="bg-yellow-500 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold transition">
          Lihat Detail Rumah
        </button>
      </div>

    </section>
  )
}

export default Home