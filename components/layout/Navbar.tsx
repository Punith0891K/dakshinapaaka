"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* Logo */}

        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Dakshinapaaka"
            width={140}
            height={140}
            priority
          />
        </Link>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-10">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
              text-white
              text-sm
              uppercase
              tracking-wider
              transition-all
              duration-300
              hover:text-[#C8A44D]
              "
            >
              {item.name}
            </Link>
          ))}

        </div>

        {/* Call Button */}

        <a
          href="tel:7204488774"
          className="
          hidden
          md:flex
          items-center
          gap-2
          rounded-full
          bg-[#2F6B3D]
          px-5
          py-3
          text-white
          font-medium
          transition-all
          duration-300
          hover:bg-[#255632]
          hover:scale-105
          "
        >
          <Phone size={18} />
          Call Now
        </a>

      </nav>
    </header>
  );
}