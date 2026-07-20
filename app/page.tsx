import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SignatureDishes from "@/components/sections/SignatureDishes";
import Menu from "@/components/sections/Menu";
// import WhyChooseUs from "@/components/sections/WhyChooseUs";
// import Testimonials from "@/components/sections/Testimonials";
// import Gallery from "@/components/sections/Gallery";
// import Contact from "@/components/sections/Contact";
// import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

<main>
  <Hero />
  <About />
  <SignatureDishes />
  <Menu />
</main>
      {/* <Footer /> */}
    </>
  );
}