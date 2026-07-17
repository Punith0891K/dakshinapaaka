"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/ui/MobileMenu";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
          ? "border-b border-black/5 bg-[#FAF7F2]/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <nav
          className={`relative flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled ? "h-[72px]" : "h-[92px] lg:h-[104px]"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Dakshinapaaka Home"
            className="relative z-10 flex shrink-0 items-center transition-transform duration-500 hover:scale-[1.04]"
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

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative py-2 text-[15px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                  scrolled
                    ? "text-[#1E1E1E] hover:text-[#2F6B3D]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#C8A44D] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <a
              href="tel:7204488774"
              className={`group relative overflow-hidden rounded-full border px-7 py-3 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? "border-[#2F6B3D] bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.22)] hover:bg-[#255632]"
                  : "border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-black"
              }`}
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="relative z-10 lg:hidden">
            <MobileMenu scrolled={scrolled} />
          </div>
        </nav>
      </div>
    </header>
  );
}