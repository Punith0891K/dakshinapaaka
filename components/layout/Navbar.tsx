"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/ui/MobileMenu";
import { motion } from "framer-motion";

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
    <motion.div
  initial={{ opacity: 0, scale: 0.9, y: -12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.15,
    ease: "easeOut",
  }}
>
  <Link
    href="/"
    aria-label="Dakshinapaaka Home"
    className="relative z-10 flex shrink-0 items-center transition-transform duration-500 hover:scale-[1.06]"
  >
            <Image
              src="/images/logo/logo.png"
              alt="Dakshinapaaka"
              width={100}
              height={100}
              priority
              className={`h-auto object-contain transition-all duration-500 ease-out ${
                scrolled
                  ? "w-[58px] lg:w-[64px]"
                  : "w-[68px] lg:w-[82px]"
              }`}
            />
          </Link>
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
  <a
    href="tel:7204488774"
    className={`group relative overflow-hidden rounded-full border px-7 py-3 text-[15px] font-semibold transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] ${
      scrolled
        ? "border-[#2F6B3D] bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.22)] hover:bg-[#255632] hover:shadow-[0_18px_40px_rgba(47,107,61,0.35)]"
        : "border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-black hover:shadow-[0_18px_40px_rgba(200,164,77,0.35)]"
    }`}
  >
    Call Now
  </a>
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