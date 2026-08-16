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
  className="relative min-h-[760px] scroll-mt-[92px] overflow-hidden py-20 sm:py-24 lg:min-h-[820px] lg:scroll-mt-[104px] lg:py-24 xl:min-h-[900px] xl:py-28"
>
     {/* Background */}

<Image
  src="/images/hero/menu-bg.png"
  alt=""
  fill
  priority
  className="
    object-cover
    object-[66%_center]
    lg:object-[58%_center]
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
    from-[#FAF7F2]/95
    via-[#FAF7F2]/60
    to-transparent
  "
/>

<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_50%,rgba(212,175,55,0.14),transparent_32%),linear-gradient(to_bottom,rgba(255,253,247,0.2),transparent_18%,rgba(68,49,20,0.08))]" />

{/* Top seam blend — matches SignatureDishes' bottom fade color exactly (both sides pre-blend to #FAF7F2) */}
<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent sm:h-48" />

<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#6A532D]/10 to-transparent" />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 xl:gap-20">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="text-center lg:text-left"
          >
            <span className="mb-5 inline-block rounded-full border border-[#C89B3C]/30 bg-white/90 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8C6A2D] sm:text-xs sm:tracking-[0.35em]">
              Our Menu
            </span>

   <h2
  className="
    mt-5
    font-serif
    text-[clamp(3rem,14vw,4.5rem)]
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

           <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#5B5B5B] sm:text-lg sm:leading-8 lg:mx-0 lg:mt-8">
  Discover a carefully curated collection of authentic South Indian
  delicacies, rich North Indian favourites, sizzling Tandoor
  specialties, Indo-Chinese classics, refreshing beverages and
  signature house specials — all crafted with premium ingredients
  and traditional recipes.
</p>

<div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start lg:gap-3">

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
        px-3.5
        py-2
        text-xs
        font-medium
        text-[#1F5B45]
        shadow-sm
      "
    >
      {item}
    </span>
  ))}

</div>

<div className="mt-9 grid grid-cols-3 gap-3 text-center lg:mt-10 lg:flex lg:gap-10 lg:text-left">

  <div>
    <p className="text-2xl font-bold text-[#1F5B45] sm:text-3xl">
      200+
    </p>

    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#9B7B35] sm:text-sm sm:tracking-[0.25em]">
      Dishes
    </p>
  </div>

  <div>
    <p className="text-2xl font-bold text-[#1F5B45] sm:text-3xl">
      8
    </p>

    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#9B7B35] sm:text-sm sm:tracking-[0.25em]">
      Categories
    </p>
  </div>

  <div>
    <p className="text-2xl font-bold text-[#1F5B45] sm:text-3xl">
      Fresh
    </p>

    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#9B7B35] sm:text-sm sm:tracking-[0.25em]">
      Ingredients
    </p>
  </div>

</div>

            <button
              onClick={() => setOpen(true)}
              data-testid="explore-menu-btn"
              className="group mt-10 hidden rounded-full border border-white/25 bg-[#276B3A] px-8 py-4 text-white shadow-[0_14px_32px_rgba(39,107,58,0.28)] transition hover:scale-105 hover:bg-[#215C32] hover:shadow-[0_20px_42px_rgba(39,107,58,0.34)] lg:inline-flex"
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
