"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { signatureDishes } from "@/data/signatureDishes";

interface SignatureCollectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignatureCollectionModal({
  open,
  onClose,
}: SignatureCollectionModalProps) {

  const featuredDish = signatureDishes[0];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDishes =
  activeCategory === "All"
    ? signatureDishes.slice(1)
    : signatureDishes
        .slice(1)
        .filter((dish) => dish.category === activeCategory);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
         layout
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Close when clicking backdrop */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Main Window */}
          <motion.div
           layout
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            className="
              relative
              z-10
              flex
              h-[92vh]
              w-full
              max-w-7xl
              flex-col
              overflow-hidden
              rounded-[34px]
              border
              border-[#D6C9A8]
              bg-[#F8F3E9]
              shadow-[0_40px_120px_rgba(0,0,0,0.45)]
            "
          >
            {/* Decorative Top Glow */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFF5D7]/70 to-transparent pointer-events-none" />

            {/* HEADER */}
            <header className="relative flex items-center justify-between border-b border-[#E5D7B7] px-8 py-7 md:px-12">

              <div>

                <p className="text-xs uppercase tracking-[0.45em] text-[#2F6B3D]">
                  Dakshinapaaka
                </p>

                <h2 className="mt-3 font-serif text-4xl text-[#1F1F1F] md:text-5xl">
                  Signature Collection
                </h2>

                <p className="mt-3 max-w-xl text-[#6B5B45]">
                  Discover our chef's handpicked creations,
                  prepared with authentic South Indian flavours.
                </p>

              </div>

              <button
                onClick={onClose}
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D6C9A8]
                  bg-white
                  text-[#174D32]
                  transition-all
                  duration-300
                  hover:rotate-90
                  hover:bg-[#174D32]
                  hover:text-white
                "
              >
                <X size={22} />
              </button>

            </header>

       {/* BODY */}
<div className="flex-1 overflow-y-auto px-8 py-10 md:px-12">

<div className="mb-12">

  <div className="text-center">

    <p className="text-sm uppercase tracking-[0.35em] text-[#C8A44D]">
      Curated Collection
    </p>

    <h3 className="mt-3 font-serif text-5xl text-[#1E1E1E]">
      Every Dish Tells
      <span className="block italic text-[#2F6B3D]">
        A Story
      </span>
    </h3>

    <p className="mx-auto mt-5 max-w-3xl text-lg text-[#6B5B45]">
      Every recipe is prepared using traditional techniques,
      premium ingredients and authentic South Indian flavours.
    </p>

  </div>

  <div className="mt-10 flex flex-wrap justify-center gap-3">

{[
  "All",
  "Breakfast",
  "Meals",
  "Starters",
  "Beverages",
  "Desserts",
].map((item) => (

<button
  key={item}
  onClick={() => setActiveCategory(item)}
className={`
  rounded-full
  border
  px-6
  py-3
  text-sm
  font-medium
  transition-all
  duration-500
  hover:-translate-y-1
  hover:scale-105

  ${
    activeCategory === item
      ? "bg-[#174D32] text-white border-[#174D32] shadow-[0_12px_35px_rgba(23,77,50,0.25)]"
      : "bg-white text-[#174D32] border-[#D8C8A0] hover:bg-[#174D32] hover:text-white hover:shadow-[0_10px_30px_rgba(23,77,50,0.15)]"
  }
`}
>
  {item}
</button>

    ))}

  </div>

</div>

{/* ================= FEATURED DISH ================= */}

<AnimatePresence mode="wait">

  {activeCategory === "All" && (

    <motion.div
      key="featured-dish"
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.97,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-16 overflow-hidden rounded-[32px] border border-[#D8C8A0] bg-white shadow-xl"
    >
{/* Ambient Glow */}

<div
  className="
    pointer-events-none
    absolute
    -top-24
    left-1/2
    h-[420px]
    w-[420px]
    -translate-x-1/2
    rounded-full
    bg-[#E8C46A]/20
    blur-[130px]
  "
/>
      <div className="grid lg:grid-cols-2">

        {/* Left Image */}

        <div className="relative h-[420px]">
          <div
  className="
    absolute
    inset-0
    bg-gradient-to-br
    from-[#FFF7DA]/20
    via-transparent
    to-transparent
    z-10
  "
/>

          <Image
            src={featuredDish.image}
            alt={featuredDish.name}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        </div>

        {/* Right Content */}

        <div className="flex flex-col justify-center p-10 lg:p-14">

          <div className="flex items-center gap-3">

            <span className="inline-flex rounded-full bg-[#174D32] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white">
              Chef's Recommendation
            </span>

            <span className="rounded-full bg-[#F4E8C8] px-4 py-2 text-sm font-medium text-[#174D32]">
              {featuredDish.category}
            </span>

          </div>

          <h2 className="mt-6 font-serif text-5xl text-[#1E1E1E]">
            {featuredDish.name}
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#6B5B45]">
            {featuredDish.description}
          </p>

          <div className="mt-8 flex items-center gap-4">

            <span className="text-[#C8A44D] font-medium">
              {featuredDish.badge}
            </span>

          </div>

        </div>

      </div>

    </motion.div>

  )}

</AnimatePresence>


{/* ================= DISH GRID ================= */}

<AnimatePresence mode="wait">

  <motion.div
    key={activeCategory}
    layout
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.12,
        },
      },
    }}
    className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
  >

    {filteredDishes.map((dish, index) => (

      <motion.div
       layout
        key={dish.name}
       variants={{
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}}
     transition={{
  duration: 0.55,
  delay: index * 0.06,
  ease: [0.22, 1, 0.36, 1],
}}
        className="
          group
          overflow-hidden
          rounded-[28px]
          border
          border-[#E3D5B3]
          bg-white
          shadow-lg
          hover:-translate-y-3
          hover:rotate-[0.3deg]
          hover:border-[#C8A44D]
          hover:shadow-[0_35px_80px_rgba(18,18,18,0.18)]
        "
      >

        {/* Image */}

        <div className="relative h-64 overflow-hidden">

          <div
  className="
    absolute
    inset-0
    -translate-x-full
    bg-gradient-to-r
    from-transparent
    via-white/20
    to-transparent
    transition-transform
    duration-1000
    group-hover:translate-x-full
    z-20
  "
/>

          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
              group-hover:rotate-1
              hover:-translate-y-3
              hover:shadow-[0_30px_70px_rgba(23,77,50,0.18)]
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <span
            className="
              absolute
              left-5
              top-5
              rounded-full
              bg-[#174D32]
              px-4
              py-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-white
            "
          >
            {dish.category}
          </span>

        </div>

        {/* Content */}

        <div className="p-6">

          <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D]">
            {dish.badge}
          </p>

          <h3 className="mt-3 font-serif text-3xl text-[#1E1E1E]">
            {dish.name}
          </h3>

          <p className="mt-4 leading-7 text-[#6B5B45]">
            {dish.description}
          </p>

        </div>

      </motion.div>

    ))}

  {filteredDishes.length === 0 && (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="col-span-full py-20 text-center"
    >

      <h3 className="font-serif text-3xl text-[#174D32]">
        Nothing here yet
      </h3>

      <p className="mt-4 text-[#6B5B45]">
        Our chefs are preparing something delicious.
      </p>

    </motion.div>

  )}

  </motion.div>

</AnimatePresence>
</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}