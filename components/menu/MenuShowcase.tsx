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
      className="relative flex items-center justify-center"
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
  className="absolute h-[650px] w-[650px] rounded-full bg-[#D4AF37]/15 blur-[170px]"
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
  className="absolute h-[420px] w-[420px] rounded-full bg-[#0F5B43]/18 blur-[120px]"
/>

      {/* Decorative Ring */}
      <div className="absolute h-[520px] w-[520px] rounded-full border border-[#D6B15A]/10" />

     {/* Book */}

<div className="relative">

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

  {/* Tap Hint */}

  
</div>
      {/* Floor Shadow */}
      <div className="absolute bottom-0 h-12 w-[420px] rounded-full bg-black/10 blur-3xl" />
    </motion.div>
  );
}