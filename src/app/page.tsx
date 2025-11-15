import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Type from "@/components/Type";
import Contact from "@/components/Contact";

export const metadata = {
  title: "White House Premiere - Hunian Nyaman & Strategis",
  description:
    "Temukan rumah impian Anda di White House Premiere dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau.",
  keywords: "rumah, hunian, properti, perumahan, white house premiere",
};

export default function page() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Type />
      <Contact />
      <Footer />
    </>
  );
}
