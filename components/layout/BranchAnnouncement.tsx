"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BranchAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* =========================================================
          2ND BRANCH ANNOUNCEMENT
      ========================================================= */}
      <div className="relative z-[200] h-[72px] w-full border-b border-[#D9B45B]/50 bg-[#0B2A1D] sm:h-[50px]">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center px-3 sm:px-6">

          {/* =====================================================
              DESKTOP
          ===================================================== */}
          <div className="hidden items-center justify-center gap-5 sm:flex">

            {/* BIG NEWS */}
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[#E8C96A]">📣</span>

              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#E8C96A]">
                BIG NEWS
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-[#D9B45B]/40" />

            {/* Announcement */}
            <p className="whitespace-nowrap text-[14px] font-medium text-white">
              Our 2nd Branch{" "}
              <span className="font-semibold text-[#E8C96A]">
                Coming Soon!
              </span>
            </p>

            {/* Location */}
            <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] text-[#F5E9C8]">
              <span className="text-[#E8C96A]">📍</span>
              Mysuru – Bengaluru Expressway
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="
                shrink-0
                rounded-full
                bg-[#E8C96A]
                px-5
                py-2
                text-[10px]
                font-bold
                tracking-[0.14em]
                text-[#10251A]
                shadow-[0_4px_18px_rgba(232,201,106,0.12)]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-[#F3D986]
              "
            >
              STAY TUNED
              <span className="ml-1.5">→</span>
            </button>
          </div>

          {/* =====================================================
              MOBILE
          ===================================================== */}
          <div className="flex w-full items-center justify-between gap-3 sm:hidden">

            {/* Left content */}
            <div className="min-w-0 flex-1">

              {/* Main announcement */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[12px] leading-none text-[#E8C96A]">
                  📣
                </span>

                <p className="truncate text-[12px] font-semibold leading-[1.35] text-white">
                  Our 2nd Branch{" "}
                  <span className="text-[#E8C96A]">
                    Coming Soon!
                  </span>
                </p>
              </div>

              {/* Location */}
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 text-[11px] leading-none text-[#E8C96A]">
                  📍
                </span>

                <p className="truncate text-[11px] font-medium leading-[1.2] text-[#F5E9C8]">
                  Mysuru – Bengaluru Expressway
                </p>
              </div>
            </div>

            {/* Mobile CTA */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="
                shrink-0
                rounded-full
                bg-[#E8C96A]
                px-4
                py-2.5
                text-[9px]
                font-bold
                tracking-[0.1em]
                text-[#10251A]
                shadow-[0_4px_15px_rgba(232,201,106,0.18)]
                transition-all
                duration-300
                active:scale-95
              "
            >
              STAY TUNED
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          BRANCH MODAL
      ========================================================= */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/80
            p-3
            backdrop-blur-md
            sm:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            className="
              relative
              flex
              max-h-[92vh]
              w-full
              max-w-4xl
              flex-col
              overflow-y-auto
              overflow-x-hidden
              rounded-2xl
              border
              border-[#D9B45B]/40
              bg-[#092116]
              shadow-2xl
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-announcement-title"
          >

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close announcement"
              className="
                absolute
                right-3
                top-3
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-black/65
                text-xl
                text-white
                backdrop-blur-md
                transition
                hover:bg-black/90
                active:scale-95
              "
            >
              ×
            </button>

            {/* Branch image */}
            <div className="relative h-[38vh] min-h-[210px] w-full shrink-0 bg-black sm:h-[52vh]">
              <Image
                src="/images/branch/branch-2.jpeg"
                alt="Dakshinapaaka second branch coming soon on the Mysuru–Bengaluru Expressway"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                className="object-cover"
              />
            </div>

            {/* Modal information */}
            <div className="shrink-0 px-4 py-5 text-center sm:px-8 sm:py-6">

              <p className="mb-2 text-[9px] font-bold tracking-[0.3em] text-[#E8C96A] sm:text-[10px]">
                BIG NEWS
              </p>

              <h2
                id="branch-announcement-title"
                className="
                  font-[var(--font-heading)]
                  text-xl
                  leading-tight
                  text-white
                  sm:text-3xl
                "
              >
                Our 2nd Branch is{" "}
                <span className="text-[#E8C96A]">
                  Coming Soon!
                </span>
              </h2>

              <p className="mt-3 text-sm text-white/70 sm:text-base">
                📍 Mysuru – Bengaluru Expressway
              </p>

              <p className="mt-3 text-xs text-white/45 sm:text-sm">
                Stay tuned for more updates from Dakshinapaaka.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}