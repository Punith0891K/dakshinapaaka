"use client";

import { useState } from "react";

import MenuModal from "@/components/menu/MenuModal";
import MenuShowcase from "@/components/menu/MenuShowcase";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="menu"
        className="relative overflow-hidden bg-[#FAF7F2] py-32 lg:py-40"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[700px]
              w-[700px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#C8A44D]/10
              blur-3xl
            "
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.45em] text-[#C8A44D]">
              OUR MENU
            </span>

            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#173F2D] lg:text-6xl">
              Crafted With Tradition,
              <br />
              Served With Love.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#5B5B5B]">
              Explore our thoughtfully curated menu featuring
              authentic South Indian delicacies, Chinese favourites,
              refreshing beverages and desserts—prepared with
              traditional recipes and premium ingredients.
            </p>

          </div>

          {/* Showcase */}

          <div className="mt-24 flex justify-center">

            <MenuShowcase
              onOpen={() => setOpen(true)}
            />

          </div>

        </div>
      </section>

      <MenuModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}