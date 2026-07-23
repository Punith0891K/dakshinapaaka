"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MenuShowcase from "../menu/MenuShowcase";
import MenuModal from "../menu/MenuModal";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <section
  id="menu"
  className="relative overflow-hidden py-26 lg:py-30"
>
     {/* Background */}

<Image
  src="/images/hero/menu-bg.png"
  alt=""
  fill
  priority
  className="
    object-cover
    object-[58%_center]
    pointer-events-none
    select-none
    -z-30
  "
/>

{/* Premium Overlay */}

<div
  className="
    absolute
    inset-0
    -z-20
    bg-gradient-to-r
    from-[#FAF7F2]/70
    via-[#FAF7F2]/25
    to-transparent
  "
/>


        <div className="relative mx-auto grid max-w-[1450px] items-center gap-24 px-6 lg:grid-cols-2">

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

   <h2
  className="
    mt-5
    font-serif
    text-[54px]
    leading-[0.95]
    tracking-[-0.03em]
    text-[#143C34]
    lg:text-[72px]
  "
>
  Explore Our
  <br />
  <span className="text-[#0F5B43]">
    Authentic
  </span>
  <br />
  Menu
</h2>

           <p className="mt-8 max-w-xl text-lg leading-8 text-[#5B5B5B]">
  Discover a carefully curated collection of authentic South Indian
  delicacies, rich North Indian favourites, sizzling Tandoor
  specialties, Indo-Chinese classics, refreshing beverages and
  signature house specials — all crafted with premium ingredients
  and traditional recipes.
</p>

<div className="mt-10 flex flex-wrap gap-3">

  {[
    "South Indian",
    "North Indian",
    "Chinese",
    "Tandoor",
    "Beverages",
  ].map((item) => (
    <span
      key={item}
      className="
        rounded-full
        border
        border-[#C89B3C]/25
        bg-white/70
        px-4
        py-2
        text-sm
        font-medium
        text-[#1F5B45]
        shadow-sm
      "
    >
      {item}
    </span>
  ))}

</div>

<div className="mt-10 flex gap-10">

  <div>
    <p className="text-3xl font-bold text-[#1F5B45]">
      100+
    </p>

    <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#9B7B35]">
      Dishes
    </p>
  </div>

  <div>
    <p className="text-3xl font-bold text-[#1F5B45]">
      5
    </p>

    <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#9B7B35]">
      Categories
    </p>
  </div>

  <div>
    <p className="text-3xl font-bold text-[#1F5B45]">
      Fresh
    </p>

    <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#9B7B35]">
      Ingredients
    </p>
  </div>

</div>

            <button
              onClick={() => setOpen(true)}
              className="group mt-10 rounded-full bg-[#276B3A] px-8 py-4 text-white transition hover:scale-105 hover:bg-[#215C32]"
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