"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/ui/MobileMenu";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["Home", "About", "Menu", "Gallery", "Contact"];

const ids = {
  Home: "",
  About: "about",
  Menu: "menu",
  Gallery: "gallery",
  Contact: "contact",
};

let current = "Home";

for (const section of sections) {
  const id = ids[section as keyof typeof ids];

  if (!id) continue;

  const element = document.getElementById(id);

  if (element) {
 const rect = element.getBoundingClientRect();

if (rect.top <= 140 && rect.bottom > 140) {
  current = section;
}
  }
}

setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
       scrolled
          ? "border-b border-[#C8A44D]/20 bg-[#FAF7F2]/70 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.10)]"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.nav
  initial={{ opacity: 0, y: -25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease: "easeOut",
  }}
  className={`relative flex items-center justify-between transition-all duration-500 ease-out ${
    scrolled ? "h-[72px]" : "h-[92px] lg:h-[104px]"
  }`}
>
          {/* Logo */}
    {/* Logo + Pure Veg Badge */}
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: -12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.15,
    ease: "easeOut",
  }}
  className="flex items-center gap-4"
>
  <Link
    href="/"
    aria-label="Dakshinapaaka Home"
    className="relative z-10 flex shrink-0 items-center transition-transform duration-500 hover:scale-[1.06]"
  >
  <Image
  src="/images/logo/dakshinapaaka.png"
  alt="Dakshinapaaka"
  width={100}
  height={100}
  priority
  className={`
    h-auto
    object-contain
    transition-all
    duration-500
    ${
      scrolled
        ? "w-[72px] lg:w-[82px] brightness-[0.9] contrast-125 saturate-125 drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
        : "w-[82px] lg:w-[96px] brightness-110 contrast-110 drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]"
    }
  `}
/>
  </Link>

  {/* Pure Veg Badge */}
  <div
    className={`
      hidden lg:flex
      items-center
      gap-2
      rounded-full
      border
      px-4
      py-2
      transition-all
      duration-500
      ${
        scrolled
          ? "border-[#2F6B3D]/20 bg-[#F4FBF5]"
          : "border-white/20 bg-white/10 backdrop-blur-md"
      }
    `}
  >
    <Leaf
      className={`h-4 w-4 ${
        scrolled ? "text-[#2F6B3D] veg-glow" : "text-[#8ED081] veg-glow"
      }`}
    />

    <span
      className={`veg-glow text-[11px] font-semibold uppercase tracking-[0.25em] whitespace-nowrap ${
        scrolled ? "text-[#2F6B3D]" : "text-white"
      }`}
    >
      Pure Veg Restaurant
    </span>
  </div>
</motion.div>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
      {navItems.map((item, index) => (
  <motion.div
    key={item.name}
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: 0.25 + index * 0.08,
      ease: "easeOut",
    }}
  >
    <Link
      href={item.href}
      className={`group relative py-2 text-[15px] font-medium tracking-[0.02em] transition-colors duration-500 ${
      scrolled
  ? activeSection === item.name
    ? "text-[#2F6B3D]"
    : "text-[#1E1E1E] hover:text-[#2F6B3D]"
  : activeSection === item.name
    ? "text-[#C8A44D]"
    : "text-white/90 hover:text-white"
      }`}
    >
      {item.name}

<span
  className={`
    absolute
    bottom-0
    left-1/2
    h-[2px]
    -translate-x-1/2
    rounded-full
    bg-[#C8A44D]
    transition-all
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      activeSection === item.name
        ? "w-full"
        : "w-0 group-hover:w-full"
    }
  `}
/>
    </Link>
  </motion.div>
))}
          </div>

          {/* Desktop CTA */}
  <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.7,
    delay: 0.7,
    ease: "easeOut",
  }}
  className="hidden lg:flex"
>
{/* Desktop CTA */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.7,
    delay: 0.7,
    ease: "easeOut",
  }}
  className="hidden items-center gap-3 lg:flex"
>
  {/* Google Maps */}
  <a
    href="https://maps.app.goo.gl/atMDsDsLRYFA8QYS8"
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-semibold transition-all duration-500 hover:-translate-y-1 ${
      scrolled
        ? "border-[#2F6B3D] bg-white text-[#2F6B3D] hover:bg-[#F4FBF5] hover:shadow-[0_14px_35px_rgba(47,107,61,0.18)]"
        : "border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-[#C8A44D] hover:bg-white/20"
    }`}
  >
    📍
    <span>Find Us</span>
  </a>

  {/* Call Button */}
  <a
    href="tel:7204488774"
    className={`group inline-flex items-center rounded-full px-7 py-3 text-[15px] font-semibold transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] ${
      scrolled
        ? "bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.22)] hover:bg-[#255632] hover:shadow-[0_18px_40px_rgba(47,107,61,0.35)]"
        : "bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.30)] hover:bg-[#255632]"
    }`}
  >
    📞 Call Now
  </a>
</motion.div>

  
</motion.div>

          {/* Mobile Menu */}
          <div className="relative z-10 lg:hidden">
            <MobileMenu scrolled={scrolled} />
          </div>
        </motion.nav>
      </div>
    </header>
  );
}