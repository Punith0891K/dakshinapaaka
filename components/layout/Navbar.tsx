"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Dakshinapaaka"
            width={95}
            height={95}
            priority
            className="transition duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-10">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
             className="group relative font-medium text-white transition duration-300 hover:text-[#C8A44D]"
            >
              {item.name}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#C8A44D] transition-all duration-300 group-hover:w-full"></span>

            </Link>
          ))}

        </div>

        {/* Call Button */}

        <a
          href="tel:7204488774"
          className="hidden md:flex items-center gap-2 rounded-full bg-[#2F6B3D] px-6 py-3 text-white transition duration-300 hover:scale-105 hover:bg-[#255632]"
        >
          <Phone size={18} />
          Call Now
        </a>

      </nav>
    </header>
  );
}