"use client";

import { motion } from "framer-motion";
import MenuBook from "./MenuBook";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface Props {
  onOpen: () => void;
  /**
   * Pass the exact same boolean you give <MenuModal open={...} /> — see the
   * detailed note on MenuBook's `isMenuOpen` prop for what this does and
   * why it has to be the live state, not a derived/one-way flag.
   */
  isMenuOpen?: boolean;
}

export default function MenuShowcase({ onOpen, isMenuOpen }: Props) {
  // Same reasoning as the hover tilt in MenuBook: skip the hover-only glow
  // gesture on touch so a tap can't leave it stuck "hovered" until some
  // later unrelated tap clears it.
  const isTouch = useIsTouchDevice();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
  relative
  isolate
  mt-4
  flex
  min-h-[520px]
  w-full
  max-w-[430px]
  flex-col
  items-center
  justify-center
  rounded-[32px]
  border
  border-[#C8A44D]/20
  bg-[#FFFDF8]/20
  px-4
  shadow-[0_18px_45px_rgba(74,55,30,0.08)]
  backdrop-blur-[2px]
  sm:min-h-[550px]
  lg:mt-0
  lg:min-h-[700px]
  lg:max-w-none
  lg:translate-x-1
  lg:rounded-none
  lg:border-0
  lg:bg-transparent
  lg:px-0
  lg:shadow-none
  lg:backdrop-blur-none
  xl:min-h-[780px]
  xl:translate-x-3
"
    >
      {/* Ambient Glow keyframes (CSS-driven so these infinite pulses run on
          the compositor thread instead of competing with the 3D book's
          transforms for main-thread time — same pulse, same timing).

          The pulsing scale/opacity loop is a nice ambient touch, but it's
          an always-on compositor cost for as long as this section stays
          mounted — worth paying on desktop where there's headroom, not
          worth it on the phones most visitors are actually using. Below
          `lg`, both glows render static (still visible, just not
          breathing) instead of animating. */}
      <style>{`
        @keyframes dp-glow-main {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes dp-glow-emerald {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.35; }
        }
        @media (min-width: 1024px) {
          .dp-glow-main { animation: dp-glow-main 5s ease-in-out infinite; }
          .dp-glow-emerald { animation: dp-glow-emerald 4s ease-in-out infinite; }
        }
      `}</style>

      {/*
        Decorative background layer (glows + ring). This is deliberately
        the ONLY thing clipped to the card's rounded shape on mobile.
        Previously that clipping (overflow-hidden + rounded-[32px]) lived
        on the outer card itself, which meant the book got clipped too —
        when its cover swings open on its spine it needs to sweep out past
        its own resting box, and the card's overflow-hidden was slicing
        that swing off mid-animation. Scoping the clip to just this layer
        keeps the same soft "glow inside a frame" look at rest while
        leaving the book free to open without being cut off. At lg+ this
        was never clipped anyway (matches the untouched desktop look).
      */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] lg:overflow-visible lg:rounded-none">
        {/* Main Ambient Glow — blur radius steps up with viewport size
            (was a flat 130px down to the smallest phones; that's a heavy
            GPU blur to run continuously on hardware with the least room
            for it). */}
        <div
          className="dp-glow-main absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/15 blur-[70px] sm:h-[560px] sm:w-[560px] sm:blur-[110px] lg:h-[720px] lg:w-[720px] lg:blur-[170px] xl:h-[820px] xl:w-[820px]"
          style={{ willChange: "transform, opacity" }}
        />

        {/* Emerald Glow */}
        <div
          className="dp-glow-emerald absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F5B43]/18 blur-[50px] sm:h-[380px] sm:w-[380px] sm:blur-[75px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] xl:h-[560px] xl:w-[560px]"
          style={{ willChange: "transform, opacity" }}
        />

        {/* Decorative Ring */}
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D6B15A]/10 sm:h-[440px] sm:w-[440px] lg:h-[640px] lg:w-[640px] xl:h-[740px] xl:w-[740px]" />
      </div>

      {/* Badge — now in normal document flow above the book instead of
          being absolutely pinned near the top of the card. It used to sit
          right on top of the cover's own "Since 2024" text on mobile,
          hiding it; giving it real layout space guarantees it can never
          overlap the cover regardless of book size. */}
      <span className="relative z-10 mb-4 rounded-full border border-[#C8A44D]/25 bg-white/75 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8C6A2D] shadow-sm lg:hidden">
        Menu Preview
      </span>

      {/* Book */}

<div className="relative lg:ml-0">

  {/* Hover Glow */}

  <motion.div
    whileHover={
      isTouch
        ? undefined
        : {
            scale: 1.08,
            opacity: 1,
          }
    }
    initial={{
      opacity: 0.45,
    }}
    transition={{
      duration: 0.35,
    }}
    className="
      absolute
      inset-0
      -z-10
      rounded-[36px]
      bg-[#D6B15A]/15
      blur-3xl
    "
  />

  <MenuBook onOpen={onOpen} isMenuOpen={isMenuOpen} />

</div>

      <div className="relative z-10 mt-4 flex flex-col items-center lg:hidden">
        <p className="text-xs font-medium tracking-[0.03em] text-[#6B5B45]">
          Tap the cover to browse every dish
        </p>

        <button
          onClick={onOpen}
          data-testid="open-full-menu-mobile-btn"
          className="group mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#276B3A] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(39,107,58,0.26)] transition active:scale-95"
        >
          Open Full Menu
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
      {/* Floor Shadow */}
      <div className="absolute bottom-20 hidden h-10 w-[220px] rounded-full bg-black/10 blur-3xl sm:w-[260px] lg:block lg:bottom-0 lg:h-14 lg:w-[440px] xl:w-[500px]" />
    </motion.div>
  );
}
