import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section id='about'>
        <div className='bg-primary text-white '>
            <div className='text-4xl font-bold justify-center items-center text-center  '>
                <h1 className='mt-10'>About</h1>
            </div>
            <div className='grid grid-cols-1 gap-4 p-10 mt-10 md:grid-cols-2'>
                <div>
                    <Image src={'/Home.jpg'} alt="About Image" width={500} height={300} className='rounded-lg shadow-lg'/>
                </div>
                <p>
                White House Premier adalah hunian modern yang menggabungkan sentuhan klasik elegan dengan kenyamanan masa kini. Terletak di lokasi strategis Jakarta, properti ini menawarkan akses mudah ke berbagai fasilitas kota seperti pusat perbelanjaan, restoran, dan area rekreasi. Dengan desain arsitektur yang menawan dan interior yang mewah, White House Premier memberikan pengalaman tinggal yang tak tertandingi bagi penghuninya.
                </p>
            </div>
        </div>
    </section>
  )
}

export default About