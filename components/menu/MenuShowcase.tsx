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
      <div className="absolute h-[650px] w-[650px] rounded-full bg-[#D4AF37]/10 blur-[170px]" />

      {/* Emerald Glow */}
      <div className="absolute h-[420px] w-[420px] rounded-full bg-[#0F5B43]/15 blur-[120px]" />

      {/* Decorative Ring */}
      <div className="absolute h-[520px] w-[520px] rounded-full border border-[#D6B15A]/10" />

      {/* Book */}
      <MenuBook onOpen={onOpen} />

      {/* Floor Shadow */}
      <div className="absolute bottom-0 h-12 w-[420px] rounded-full bg-black/10 blur-3xl" />
    </motion.div>
  );
}