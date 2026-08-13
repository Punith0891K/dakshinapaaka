import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SignatureDishes from "@/components/sections/SignatureDishes";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import FloatingMenuButton from "@/components/ui/FloatingMenuButton";
// import WhyChooseUs from "@/components/sections/WhyChooseUs";
// import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

<main>
  <Hero />
  <About />
  <SignatureDishes />
  <Menu />
  <Gallery />
  <Testimonials />
  <FloatingMenuButton />
</main>
      <Footer />
      {/* <Footer /> */}
    </>
  );
}
