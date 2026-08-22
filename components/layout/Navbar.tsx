"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf } from "lucide-react";
import MobileMenu from "@/components/ui/MobileMenu";
import { CONTACT } from "@/lib/contact";
import {
  navItems,
  scrollToSection,
  NAV_HEIGHT_SCROLLED,
  NAV_HEIGHT_DESKTOP_EXPANDED,
} from "@/lib/navigation";

const SCROLL_TRIGGER = 40; // px scrolled before the navbar condenses

// A section counts as "reached" once its top has crossed this far below the
// viewport's top edge. Below this, we're still effectively at the hero, so
// "Home" wins regardless of what technically overlaps.
const ACTIVE_TRIGGER_LINE = 150;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const prefersReducedMotion = useReducedMotion();
  const sectionsRef = useRef<{ name: string; el: HTMLElement }[]>([]);

  const collectSections = useCallback(() => {
    sectionsRef.current = navItems
      .filter((item) => item.sectionId)
      .map((item) => ({ name: item.name, el: document.getElementById(item.sectionId) }))
      .filter((s): s is { name: string; el: HTMLElement } => Boolean(s.el));
  }, []);

  // Track scroll-condensing AND the active section from a single,
  // rAF-throttled pass. Previously this used an IntersectionObserver with a
  // thin "band" near the top of the viewport — during a fast scroll (e.g.
  // dragging the scrollbar), a section could enter and leave that band
  // between two observer callbacks and never get registered, leaving the
  // highlight stuck on whatever section was last correctly detected. Doing
  // the check by direct measurement every animation frame during scroll
  // can't skip a position like that.
  useEffect(() => {
    collectSections();

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_TRIGGER);

      if (sectionsRef.current.length === 0) collectSections();

      if (y < ACTIVE_TRIGGER_LINE) {
        setActiveSection("Home");
      } else {
        let current = "Home";
        for (const { name, el } of sectionsRef.current) {
          if (el.getBoundingClientRect().top <= ACTIVE_TRIGGER_LINE) {
            current = name;
          }
        }
        setActiveSection(current);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [collectSections]);

  // Smooth-scroll to a section (or top, for Home), offset for the fixed
  // header's height so the heading doesn't land underneath it.
  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      scrollToSection(
        sectionId,
        scrolled ? NAV_HEIGHT_SCROLLED : NAV_HEIGHT_DESKTOP_EXPANDED,
        prefersReducedMotion ? "auto" : "smooth"
      );
    },
    [scrolled, prefersReducedMotion]
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-[#C8A44D]/25 bg-[#FBF3E3]/85 backdrop-blur-2xl shadow-[0_12px_45px_rgba(66,49,20,0.10)]"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      {/* Gold hairline — always present, brightens once scrolled */}
      <div
        aria-hidden="true"
        className={`absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent transition-opacity duration-700 ${
          scrolled ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* Keyboard/screen-reader users can jump straight past the nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#2F6B3D] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.nav
          initial={prefersReducedMotion ? false : { opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          aria-label="Primary"
          className={`relative flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled ? "h-[72px]" : "h-[92px] lg:h-[104px]"
          }`}
        >
          {/* Logo + Pure Veg badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <Link
              href="/"
              aria-label="Dakshinapaaka Home"
              className="relative z-10 flex shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A44D]"
            >
              {!prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-[#C8A44D]/60"
                  initial={{ opacity: 0.7, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.7 }}
                  transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
                />
              )}
              <Image
                src="/images/logo/dakshinapaaka.png"
                alt="Dakshinapaaka"
                width={100}
                height={100}
                priority
                className={`h-auto object-contain transition-all duration-500 ${
                  scrolled
                    ? "w-[68px] lg:w-[82px] brightness-[0.9] contrast-125 saturate-125 drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
                    : "w-[76px] lg:w-[96px] brightness-110 contrast-110 drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]"
                }`}
              />
            </Link>

            {/* Mobile brand badge — same oval pill treatment as the desktop
                badge below (border + rounded-full + tinted fill), just
                condensed to fit the compact mobile bar. */}
            <div
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-sm transition-all duration-500 lg:hidden ${
                scrolled
                  ? "border-[#2F6B3D]/25 bg-[#F4FBF5]"
                  : "border-white/30 bg-white/10 backdrop-blur-md"
              }`}
            >
              <Leaf
                className={`h-3 w-3 shrink-0 ${scrolled ? "text-[#2F6B3D]" : "text-[#8ED081]"}`}
                aria-hidden="true"
              />
              <span
                className={`whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  scrolled ? "text-[#2F6B3D]" : "text-white"
                }`}
              >
                Pure Veg
              </span>
            </div>

            {/* Desktop badge */}
            <div
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 transition-all duration-500 lg:flex ${
                scrolled
                  ? "border-[#2F6B3D]/20 bg-[#F4FBF5]"
                  : "border-white/20 bg-white/10 backdrop-blur-md"
              }`}
            >
              <Leaf
                className={`h-4 w-4 ${scrolled ? "text-[#2F6B3D]" : "text-[#8ED081]"}`}
                aria-hidden="true"
              />
              <span
                className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.25em] ${
                  scrolled ? "text-[#2F6B3D]" : "text-white"
                }`}
              >
                Pure Veg Restaurant
              </span>
            </div>
          </motion.div>

          {/* Desktop navigation */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: "easeOut" }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  aria-current={activeSection === item.name ? "page" : undefined}
                  className={`group relative inline-flex items-center gap-1.5 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                    scrolled
                      ? activeSection === item.name
                        ? "text-[#2F6B3D]"
                        : "text-[#1E1E1E] hover:text-[#2F6B3D]"
                      : activeSection === item.name
                      ? "text-[#C8A44D]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {/* The underline hugs the word itself — it lives on its
                      own relative wrapper so the optional ✦ marker next to
                      it doesn't get folded into the underline's width. */}
                  <span className="relative inline-block">
                    {item.name}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#C8A44D] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        activeSection === item.name ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                  {activeSection === item.name && (
                    <span aria-hidden="true" className="text-[10px] text-[#C8A44D]">
                      ✦
                    </span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="hidden items-center gap-3 lg:flex"
          >
            <motion.a
              href={CONTACT.location}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Dakshinapaaka's location in Google Maps (opens in a new tab)"
              whileTap={{ scale: 0.96 }}
              className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-semibold transition-all duration-500 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A44D] ${
                scrolled
                  ? "border-[#2F6B3D] bg-white text-[#2F6B3D] hover:bg-[#F4FBF5] hover:shadow-[0_14px_35px_rgba(47,107,61,0.18)]"
                  : "border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-[#C8A44D] hover:bg-white/20"
              }`}
            >
              <span aria-hidden="true">📍</span>
              <span>Find Us</span>
            </motion.a>

            <motion.a
              href={CONTACT.phoneHref}
              aria-label={`Call Dakshinapaaka at ${CONTACT.phone}`}
              whileTap={{ scale: 0.96 }}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[15px] font-semibold transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A44D] ${
                scrolled
                  ? "bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.22)] hover:bg-[#255632] hover:shadow-[0_18px_40px_rgba(47,107,61,0.35)]"
                  : "bg-[#2F6B3D] text-white shadow-[0_8px_24px_rgba(47,107,61,0.30)] hover:bg-[#255632]"
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span aria-hidden="true" className="relative">📞</span>
              <span className="relative">Call Now</span>
            </motion.a>
          </motion.div>

          {/* Mobile menu trigger + panel */}
          <div className="relative z-10 lg:hidden">
            <MobileMenu scrolled={scrolled} activeSection={activeSection} />
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
