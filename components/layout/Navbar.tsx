"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="mx-auto max-w-7xl">

        <nav className="flex h-24 items-center justify-between px-6">

          {/* Logo */}

          <Image
            src="/images/logo/logo.png"
            alt="Dakshinapaaka"
            width={90}
            height={90}
            priority
          />

          {/* Desktop Menu */}

          <div className="hidden lg:flex gap-10">

            <Link href="/">Home</Link>

            <Link href="#about">About</Link>

            <Link href="#menu">Menu</Link>

            <Link href="#gallery">Gallery</Link>

            <Link href="#contact">Contact</Link>

          </div>

          {/* Call */}

          <a
            href="tel:7204488774"
            className="hidden lg:flex rounded-full bg-[#2F6B3D] px-6 py-3 text-white"
          >
            Call Now
          </a>

          {/* Mobile */}

          <button className="lg:hidden">

            ☰

          </button>

        </nav>

      </div>

    </header>
  );
}