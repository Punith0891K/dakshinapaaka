"use client";

import { motion } from "framer-motion";
import MenuBook from "./MenuBook";

interface Props {
  onOpen: () => void;
}

export default function MenuShowcase({ onOpen }: Props) {
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
  overflow-hidden
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
  lg:overflow-visible
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
      {/* Main Ambient Glow */}
      <motion.div
  animate={{
    scale: [1, 1.08, 1],
    opacity: [0.25, 0.45, 0.25],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute h-[420px] w-[420px] rounded-full bg-[#D4AF37]/15 blur-[130px] sm:h-[560px] sm:w-[560px] lg:h-[720px] lg:w-[720px] lg:blur-[170px] xl:h-[820px] xl:w-[820px]"
/>

      {/* Emerald Glow */}
      <motion.div
  animate={{
    scale: [1, 1.05, 1],
    opacity: [0.2, 0.35, 0.2],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute h-[300px] w-[300px] rounded-full bg-[#0F5B43]/18 blur-[90px] sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] xl:h-[560px] xl:w-[560px]"
/>

      {/* Decorative Ring */}
      <div className="absolute h-[350px] w-[350px] rounded-full border border-[#D6B15A]/10 sm:h-[440px] sm:w-[440px] lg:h-[640px] lg:w-[640px] xl:h-[740px] xl:w-[740px]" />

      {/* Book */}

      <span className="pointer-events-none absolute top-5 z-10 rounded-full border border-[#C8A44D]/25 bg-white/75 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8C6A2D] shadow-sm lg:hidden">
        Menu Preview
      </span>

<div
  className="
    relative

    lg:ml-0
  "
>

  {/* Hover Glow */}

  <motion.div
    whileHover={{
      scale: 1.08,
      opacity: 1,
    }}
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

  <MenuBook onOpen={onOpen} />

</div>

      <div className="relative z-10 mt-4 flex flex-col items-center lg:hidden">
        <p className="text-xs font-medium tracking-[0.03em] text-[#6B5B45]">
          Tap the cover to explore every dish
        </p>

        <button
          onClick={onOpen}
          className="group mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#276B3A] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(39,107,58,0.26)] transition active:scale-95"
        >
          Open Full Menu
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
      {/* Floor Shadow */}
      <div className="absolute bottom-20 h-10 w-[220px] rounded-full bg-black/10 blur-3xl sm:w-[260px] lg:bottom-0 lg:h-14 lg:w-[440px] xl:w-[500px]" />
    </motion.div>
  );
}
