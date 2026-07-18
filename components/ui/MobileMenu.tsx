"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Leaf,
  UtensilsCrossed,
  Images,
  Phone,
} from "lucide-react";

const menuItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: Leaf },
  { name: "Menu", href: "#menu", icon: UtensilsCrossed },
  { name: "Gallery", href: "#gallery", icon: Images },
  { name: "Contact", href: "#contact", icon: Phone },
];

export default function MobileMenu({
  scrolled,
}: {
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-[#C8A44D]/40 bg-[#174D32] text-[#E6C66A] shadow-lg"
            : "border-white/30 bg-black/20 text-white backdrop-blur-md"
        }`}
      >
        <Menu size={24} strokeWidth={1.8} />
      </button>

      {/* Background Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[998] bg-black/65 backdrop-blur-md transition-all duration-500 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Premium Mobile Menu */}
 <AnimatePresence>
  {open && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed right-0 top-0 z-[999] flex h-dvh w-[90%] max-w-[410px] flex-col overflow-hidden rounded-bl-[36px] border-l border-[#C8A44D]/30 bg-[#FBF6EC] shadow-[-25px_0_80px_rgba(0,0,0,0.28)]"
    >
        {/* Subtle Decorative Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 10%, #C8A44D 0, transparent 30%), radial-gradient(circle at 90% 90%, #2F6B3D 0, transparent 30%)",
          }}
        />

        {/* Top Decorative Gold Line */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-7 pb-5 pt-7">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Dakshinapaaka"
              width={85}
              height={85}
              className="h-auto w-[72px] object-contain"
            />
          </Link>

          {/* Close Button */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A44D] bg-[#153F2B] text-[#E2B955] shadow-[0_8px_25px_rgba(21,63,43,0.25)] transition-all duration-500 hover:rotate-90 active:scale-95"
          >
            <X size={24} strokeWidth={1.6} />
          </button>
        </div>

        {/* Small Ornament */}
        <div className="relative z-10 flex items-center justify-center gap-3 px-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A44D]" />

          <span className="text-sm text-[#C8A44D]">
            ✦
          </span>

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A44D]" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex flex-1 flex-col justify-center px-6">
          <div className="flex flex-col gap-1">

            {menuItems.map((item, index) => {
              const Icon = item.icon;

          return (
  <motion.div
    key={item.name}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      delay: index * 0.08,
      duration: 0.4,
    }}
  >
    <Link
      href={item.href}
      onClick={() => setOpen(false)}
                  className={`
                    group
                    flex items-center
                    gap-5
                    border-b border-[#C8A44D]/20
                    px-4 py-5
                    transition-all duration-500
                  `}
                >
                  {/* Icon */}
                  <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/5 text-[#B88A2B] transition-all duration-300 group-hover:border-[#C8A44D] group-hover:bg-[#153F2B] group-hover:text-[#E2B955]"
                  >
                    <Icon size={21} strokeWidth={1.6} />
                  </div>

                  {/* Name */}
                  <span
            className="font-serif text-[30px] font-semibold tracking-tight text-[#20201D] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#174D32]"
                  >
                    {item.name}
                  </span>

                  {/* Gold Ornament */}
                  <span className="ml-auto text-xs text-[#C8A44D] opacity-70">
                    ✦
                  </span>
                </Link>
            </motion.div>
              );
            })}

          </div>

          {/* Call Now */}
          <a
            href="tel:7204488774"
className="mt-8 flex items-center justify-center gap-3 rounded-full border border-[#C8A44D] bg-[#153F2B] px-8 py-4 font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(21,63,43,0.25)] transition-all duration-300 active:scale-95"
          >
            <Phone
              size={19}
              className="text-[#E2B955]"
              strokeWidth={1.8}
            />

            Call Now
          </a>
        </nav>

        {/* Bottom Premium Branding */}
        <div className="relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C8A44D]/50 to-transparent" />

          <div className="bg-[#153F2B] px-6 py-5 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[4px] text-[#D6B55D]">
              ✦ &nbsp; Made With Tradition &nbsp; ✦
            </p>
          </div>
        </div>

     </motion.div>
)}
</AnimatePresence>
    </>
  );
}