"use client";

import { motion } from "framer-motion";

export default function MenuPages() {
  return (
    <div className="relative h-[700px] w-[470px]">

      {/* Page Stack */}

      {Array.from({ length: 18 }).map((_, i) => (

        <motion.div

          key={i}

          className="
          absolute
          rounded-[30px]
          bg-[#FFFDF8]
          border
          border-[#EFE7D4]
          "

          style={{
            inset: 0,
            left: i * 1.1,
            top: i * 0.8,
            zIndex: i,
          }}

          animate={{
            x: 0,
          }}

        />

      ))}

      {/* Main Paper */}

      <div
        className="
        absolute
        inset-0
        rounded-[30px]
        overflow-hidden
        bg-[#FFFDF8]
        border
        border-[#E7DFC9]
        shadow-[0_20px_40px_rgba(0,0,0,.15)]
        "
      >

        {/* Paper Grain */}

        <div
          className="
          absolute
          inset-0
          opacity-[0.04]
          pointer-events-none
          [background-image:
          radial-gradient(circle,rgba(0,0,0,.2)_1px,transparent_1px)]
          [background-size:12px_12px]
          "
        />

        {/* Gold Edge */}

        <div
          className="
          absolute
          right-0
          top-0
          h-full
          w-3
          bg-gradient-to-l
          from-[#F9E9B8]
          via-[#E8CF84]
          to-transparent
          "
        />

        {/* Inner Shadow */}

        <div
          className="
          absolute
          inset-0
          shadow-[inset_0_0_35px_rgba(0,0,0,.06)]
          "
        />

        {/* Welcome Page */}

        <div className="flex h-full flex-col items-center justify-center text-center px-16">

          <p className="tracking-[0.45em] uppercase text-[#B9923F] text-sm">
            Welcome
          </p>

          <div className="mt-10 h-px w-24 bg-[#D4AF37]" />

          <h2 className="mt-10 font-playfair text-5xl text-[#184838]">
            Dakshinapaaka
          </h2>

          <p className="mt-8 text-lg leading-9 text-[#666]">
            Authentic South Indian Cuisine
            <br />
            Prepared with Tradition
          </p>

          <div className="mt-12 h-px w-20 bg-[#D4AF37]/60" />

          <p className="mt-10 text-sm uppercase tracking-[0.35em] text-[#B9923F]">
            Since 2023
          </p>

        </div>

      </div>

    </div>
  );
}