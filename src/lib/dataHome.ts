export interface HalamanBeranda {
  id: number;
  nama: string;
  gambar: string;
}

export const slideshowData: HalamanBeranda[] = [
  {
    id: 1,
    nama: "luxury",
    gambar: "/home/luxury.jpg",
  },
  {
    id: 2,
    nama: "premier",
    gambar: "/home/premier.jpg",
  },
  {
    id: 3,
    nama: "premierA",
    gambar: "/home/premierA.jpg",
  },
  {
    id: 4,
    nama: "premierB",
    gambar: "/home/premierB.jpg",
  },
];

export const getSlideshowData = (): HalamanBeranda[] => {
  return slideshowData;
};
