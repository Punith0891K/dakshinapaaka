"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/70 backdrop-blur-xl shadow-lg"
      : "bg-transparent"
  }`}
>

      <div className="mx-auto max-w-[1600px] px-6">

<nav
  className={`
    flex items-center justify-between
    px-5 lg:px-8
    transition-all duration-300
    ${scrolled ? "h-16" : "h-20 lg:h-24"}
  `}
>

          {/* Logo */}

<Link href="/" className="shrink-0">
<Image
  src="/images/logo/logo.png"
  alt="Dakshinapaaka"
  width={90}
  height={90}
  priority
  className={`
    w-14 lg:w-20
    h-auto
    transition-all
    duration-300
    ${scrolled ? "lg:w-16" : "lg:w-20"}
  `}
/>
</Link>

          {/* Desktop Menu */}

      <div className="hidden lg:flex items-center gap-8">

  {[
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ].map((item) => (

    <Link
      key={item.name}
      href={item.href}
      className={`group relative pb-1 font-medium transition-all duration-300 ${
        scrolled
          ? "text-gray-800 hover:text-[#2F6B3D]"
          : "text-white hover:text-[#C8A44D]"
      }`}
    >
      {item.name}

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C8A44D] transition-all duration-300 group-hover:w-full"></span>

    </Link>

  ))}

</div>
          {/* Call */}

          <a
            href="tel:7204488774"
            className="hidden lg:flex rounded-full bg-[#2F6B3D] px-6 py-3 text-white"
          >
            Call Now
          </a>

          {/* Mobile */}

         <button
  className="
    lg:hidden
    p-2
    rounded-xl
    hover:bg-white/10
    transition
  "
>

            <Menu
  size={28}
  className={scrolled ? "text-black" : "text-white"}
/>

          </button>

        </nav>

      </div>

    </header>
  );
}