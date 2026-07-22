"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import MenuShowcase from "../menu/MenuShowcase";
import MenuModal from "../menu/MenuModal";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="menu"
        className="relative overflow-hidden bg-[#FAF7F2] py-28"
      >
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C89B3C]/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >
            <span className="mb-6 inline-block rounded-full border border-[#C89B3C]/30 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8C6A2D]">
              Our Menu
            </span>

            <h2 className="font-serif text-5xl leading-tight text-[#173F35] lg:text-6xl">
              Traditional
              <br />
              South Indian
              <br />
              Cuisine
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#5F5F5F]">
              Experience authentic flavours prepared using recipes
              passed down through generations. Every dish reflects
              the richness of South Indian culinary heritage.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="group mt-10 rounded-full bg-[#1F5B45] px-8 py-4 text-white transition hover:scale-105 hover:bg-[#184738]"
            >
              Explore Menu
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>

          {/* RIGHT */}

          <MenuShowcase onOpen={() => setOpen(true)} />
        </div>
      </section>

      <MenuModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}