export interface Rumah {
    id:number,
    name: string,
    price: number,
    date: string,
    desc: string,
    img: string
}

export const rumahData: Rumah[] = [
    {
    id: 1,
    name: "Whitehouse A",
    price: 875000000,
    date: "2025-01-14",
    desc: "Rumah tipe premium dengan desain modern minimalis.",
    img: "/images/rumah1.jpg",
  },
  {
    id: 2,
    name: "Whitehouse B",
    price: 965000000,
    date: "2025-02-05",
    desc: "Dilengkapi taman belakang dan garasi 2 mobil.",
    img: "/images/rumah2.jpg",
  },
  {
    id: 3,
    name: "Whitehouse C",
    price: 1080000000,
    date: "2025-03-20",
    desc: "Rumah sudut dengan pencahayaan alami maksimal.",
    img: "/images/rumah3.jpg",
  },
  {
    id: 4,
    name: "Whitehouse D",
    price: 1200000000,
    date: "2025-04-15",
    desc: "Didesain elegan dengan konsep smart home.",
    img: "/images/rumah4.jpg",
  },
  {
    id: 5,
    name: "Whitehouse E",
    price: 1350000000,
    date: "2025-05-02",
    desc: "Memiliki rooftop garden dengan pemandangan kota.",
    img: "/images/rumah5.jpg",
  },
];