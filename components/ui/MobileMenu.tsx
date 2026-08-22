"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Menu, X, MapPin, ExternalLink, Phone, Leaf } from "lucide-react";
import {
  navItems,
  scrollToSection,
  NAV_HEIGHT_SCROLLED,
  NAV_HEIGHT_MOBILE_EXPANDED,
} from "@/lib/navigation";
import { CONTACT } from "@/lib/contact";

type MobileMenuProps = {
  scrolled: boolean;
  /** Name of the currently active nav item, e.g. from a scroll-spy in Navbar. */
  activeSection?: string;
};

function hapticTick() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(8);
  }
}

export default function MobileMenu({ scrolled, activeSection = "Home" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dialogId = useId();

  const openMenu = useCallback(() => {
    hapticTick();
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    hapticTick();
    setOpen(false);
  }, []);

  // Lock body scroll while open, compensating for the scrollbar going away
  // so the page doesn't jump sideways (matters most in tablet/landscape).
  useEffect(() => {
    if (!open) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // Auto-close if the viewport grows into the desktop nav.
  useEffect(() => {
    if (!open) return;
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Escape closes the drawer; Tab is trapped inside it while open; focus
  // moves into the panel on open and back to the trigger on close.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  // Smooth-scroll to a section (or top, for Home) after the drawer closes.
  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      setOpen(false);
      window.setTimeout(() => {
        scrollToSection(
          sectionId,
          scrolled ? NAV_HEIGHT_SCROLLED : NAV_HEIGHT_MOBILE_EXPANDED,
          prefersReducedMotion ? "auto" : "smooth"
        );
      }, 300);
    },
    [scrolled, prefersReducedMotion]
  );

  const handleDragEnd = useCallback((_event: unknown, info: PanInfo) => {
    if (info.offset.x > 80 || info.velocity.x > 500) setOpen(false);
  }, []);

  return (
    <>
      {/* Hamburger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        onClick={openMenu}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A44D] ${
          scrolled
            ? "border-[#C8A44D]/40 bg-[#174D32] text-[#E6C66A] shadow-lg"
            : "border-white/30 bg-black/20 text-white backdrop-blur-md"
        }`}
      >
        <motion.div
          animate={{
            rotate: open ? 90 : 0,
            scale: open ? 0 : 1,
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Menu size={24} strokeWidth={1.8} aria-hidden="true" />
        </motion.div>
      </button>

      {/* Background overlay. No backdrop-blur here on purpose — blurring the
          full viewport is one of the most expensive things you can animate
          on a mid-range phone. A tinted gradient reads almost identically
          and costs nothing to composite. */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-[998] bg-gradient-to-br from-black/80 via-[#0B1F14]/82 to-black/88 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Premium mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={dialogId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.6 }}
            onDragEnd={handleDragEnd}
            // Slide + scale only — no filter/blur here. Animating a CSS
            // blur over a large, content-heavy panel forces the browser to
            // re-rasterize the whole subtree every frame, which is the
            // single most common cause of a janky drawer on real devices.
            // Scale + opacity are compositor-only and stay smooth even on
            // low-end phones.
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%", scale: 0.96, opacity: 0.4 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%", scale: 0.96, opacity: 0.4 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 280, damping: 30, mass: 0.9 }
            }
            className="fixed right-0 top-0 z-[999] flex h-dvh w-[90%] max-w-[410px] flex-col overflow-hidden transform-gpu will-change-transform rounded-bl-[24px] border-l border-[#C8A44D]/20 bg-[#FBF6EC] shadow-[-12px_0_35px_rgba(0,0,0,0.16)]"
          >
            {/* Subtle decorative background — static, no animation, so it
                costs one paint and nothing more. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 10%, #C8A44D 0, transparent 30%), radial-gradient(circle at 90% 90%, #2F6B3D 0, transparent 30%)",
              }}
            />

            {/* Top decorative gold line, with a slow shimmer sweep — a
                single small div animating `x` (transform-only, cheap) with
                a long pause between passes. */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent"
            >
              {!prefersReducedMotion && (
                <motion.div
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  animate={{ x: ["-120%", "320%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              )}
            </div>

            {/* Header */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="relative z-10 flex items-center justify-between gap-3 px-6 pb-5 pt-7"
            >
              <div className="flex min-w-0 items-center gap-3">
                {/* Logo medallion — a solid cream disc with a gold ring
                    behind the mark, so the logo has guaranteed contrast and
                    a fixed visual size no matter how much transparent
                    padding the source PNG itself has. */}
                <Link
                  href="/"
                  onClick={closeMenu}
                  aria-label="Dakshinapaaka Home"
                  className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-[#C8A44D] bg-white shadow-[0_10px_28px_rgba(21,63,43,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A44D]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -m-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(200,164,77,0.28) 0%, rgba(200,164,77,0) 72%)",
                    }}
                  />
                  <Image
                    src="/images/logo/dakshinapaaka.png"
                    alt="Dakshinapaaka"
                    width={96}
                    height={96}
                    className="relative h-[60px] w-[60px] object-contain"
                  />
                </Link>

                {/* Pure Veg badge */}
                <div className="flex flex-col items-start gap-1 rounded-2xl border border-[#C8A44D]/50 bg-gradient-to-b from-[#153F2B] to-[#0F3423] px-3 py-2 shadow-[0_6px_18px_rgba(21,63,43,0.3)]">
                  <div className="flex items-center gap-1.5">
                    <Leaf size={12} strokeWidth={2} className="text-[#8ED081]" aria-hidden="true" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E9CE85]">
                      Pure Veg
                    </span>
                  </div>
                  <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#D4CFB8]/70">
                    Since 2024
                  </span>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C8A44D] bg-[#153F2B] text-[#E2B955] shadow-[0_8px_25px_rgba(21,63,43,0.25)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-45 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A44D]"
              >
                <motion.div
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <X size={24} strokeWidth={1.6} aria-hidden="true" />
                </motion.div>
              </button>
            </motion.div>

            {/* Small ornament */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 flex items-center justify-center gap-3 px-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A44D]" />
              <span className="text-sm text-[#C8A44D]">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A44D]" />
            </motion.div>

            {/* Navigation */}
            <nav
              aria-label="Mobile"
              className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-6 py-4"
            >
              <div className="flex flex-col">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.name;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: index * 0.025, duration: 0.18, ease: "easeOut" }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      {/* Active row: a soft gold wash plus a slim left accent
                          bar, both gliding between items via layoutId. */}
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="mobile-nav-active-bg"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C8A44D]/12 via-[#C8A44D]/5 to-transparent"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                          <motion.div
                            layoutId="mobile-nav-active-bar"
                            className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[#C8A44D]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        </>
                      )}

                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.sectionId)}
                        aria-current={isActive ? "page" : undefined}
                        className="group relative flex items-center gap-4 rounded-lg border-b border-[#C8A44D]/20 px-4 py-3.5 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A44D]"
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: index * 0.025 + 0.08,
                            type: "spring",
                            stiffness: 420,
                            damping: 18,
                          }}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-[#C8A44D] group-hover:bg-[#153F2B] group-hover:text-[#E2B955] ${
                            isActive
                              ? "border-[#C8A44D] bg-[#153F2B] text-[#E2B955]"
                              : "border-[#C8A44D]/30 bg-[#C8A44D]/5 text-[#B88A2B]"
                          }`}
                        >
                          <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                        </motion.div>

                        <span
                          className={`font-serif text-[27px] font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#174D32] ${
                            isActive ? "text-[#174D32]" : "text-[#20201D]"
                          }`}
                        >
                          {item.name}
                        </span>

                        <motion.span
                          aria-hidden="true"
                          className="ml-auto text-xs text-[#C8A44D]"
                          animate={{
                            opacity: isActive ? 1 : 0.5,
                            rotate: isActive ? 45 : 0,
                            scale: isActive ? 1.15 : 1,
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                          ✦
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Visit Us */}
              <div className="mt-5 rounded-2xl border border-[#C8A44D]/20 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#153F2B] text-[#E2B955]">
                    <MapPin size={20} aria-hidden="true" />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B88A2B]">
                      Visit Us
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-[#153F2B]">
                      Dakshina Paaka Restaurant
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#5B5B5B]">
                      Residency road, Near Mini Vidhana soudha, Nazarbad-570010
                      <br />
                      Mysuru
                    </p>
                  </div>
                </div>

                <motion.a
                  href={CONTACT.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Dakshinapaaka's location in Google Maps (opens in a new tab)"
                  whileTap={{ scale: 0.97 }}
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-[#C8A44D] bg-[#FBF6EC] py-3 text-sm font-semibold text-[#153F2B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#153F2B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153F2B]"
                >
                  <ExternalLink size={17} aria-hidden="true" />
                  Open in Google Maps
                </motion.a>
              </div>

              {/* Call Now */}
              <motion.a
                href={CONTACT.phoneHref}
                aria-label={`Call Dakshinapaaka at ${CONTACT.phone}`}
                whileTap={{ scale: 0.97 }}
                className="group relative mt-5 flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#C8A44D] bg-[#153F2B] px-8 py-4 font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(21,63,43,0.25)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2B955]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <Phone size={19} className="relative text-[#E2B955]" strokeWidth={1.8} aria-hidden="true" />
                <span className="relative">Call Now</span>
              </motion.a>
            </nav>

            {/* Bottom premium branding */}
            <div className="relative z-10">
              <div
                aria-hidden="true"
                className="h-px bg-gradient-to-r from-transparent via-[#C8A44D]/50 to-transparent"
              />
              <div className="bg-[#153F2B] px-6 py-5 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[4px] text-[#D6B55D]">
                  <span aria-hidden="true">✦ &nbsp;</span>
                  Made With Tradition
                  <span aria-hidden="true">&nbsp; ✦</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

