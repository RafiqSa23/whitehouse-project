export interface Rumah {
    id:number,
    name: string,
    price: number,
    luas: string,
    desc: string,
    img: string
}

export const rumahData: Rumah[] = [
    {
    id: 1,
    name: "Whitehouse A",
    price: 875000000,
    luas: '95 x 100 M',
    desc: "Rumah tipe premium dengan desain modern minimalis.",
    img: "/Home.jpg",
  },
  {
    id: 2,
    name: "Whitehouse B",
    price: 965000000,
    luas: "100 x 100 M",
    desc: "Dilengkapi taman belakang dan garasi 2 mobil.",
    img: "/images/rumah2.jpg",
  },
  {
    id: 3,
    name: "Whitehouse C",
    price: 1080000000,
    luas: "75 x 90 M",
    desc: "Rumah sudut dengan pencahayaan alami maksimal.",
    img: "/images/rumah3.jpg",
  },
  {
    id: 4,
    name: "Whitehouse D",
    price: 1200000000,
    luas: "80 x 96 M",
    desc: "Didesain elegan dengan konsep smart home.",
    img: "/images/rumah4.jpg",
  },
  {
    id: 5,
    name: "Whitehouse E",
    price: 1350000000,
    luas: "120 x 150 M",
    desc: "Memiliki rooftop garden dengan pemandangan kota.",
    img: "/images/rumah5.jpg",
  },
];