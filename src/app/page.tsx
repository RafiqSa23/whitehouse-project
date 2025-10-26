import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Type from "@/components/Type";
import Contact from "@/components/Contact";

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
