"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function MobileMenu({
  scrolled,
}: {
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
<button
  onClick={() => setOpen(true)}
  className="lg:hidden rounded-lg p-2 transition-colors duration-300"
>
  <Menu
    size={30}
    className={scrolled ? "text-black" : "text-white"}
  />
</button>

      {/* Full Screen Menu */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col">

          {/* Top */}
          <div className="flex items-center justify-between p-6">

         <div className="flex items-center gap-3">
  <Image
    src="/images/logo/logo.png"
    alt="Dakshinapaaka"
    width={55}
    height={55}
  />

  <span className="font-serif text-2xl font-bold text-white">
    Dakshinapaaka
  </span>
</div>

            <button
              onClick={() => setOpen(false)}
              className="text-white"
            >
              <X size={34} />
            </button>

          </div>

          {/* Links */}
         <div className="flex flex-1 flex-col items-center justify-center gap-10">

            <Link
              href="/"
              onClick={() => setOpen(false)}
          className="text-2xl font-medium tracking-wide text-white transition-colors duration-300 hover:text-[#C8A44D]"
            >
              Home
            </Link>

            <Link
              href="#about"
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold text-white hover:text-[#43B05C]"
            >
              About
            </Link>

            <Link
              href="#menu"
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold text-white hover:text-[#43B05C]"
            >
              Menu
            </Link>

            <Link
              href="#gallery"
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold text-white hover:text-[#43B05C]"
            >
              Gallery
            </Link>

            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold text-white hover:text-[#43B05C]"
            >
              Contact
            </Link>

            <a
              href="tel:7204488774"
              className="mt-10 rounded-full bg-[#2F6B3D] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#255632]"
            >
              Call Now
            </a>

          </div>

        </div>
      )}
    </>
  );
}