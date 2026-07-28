"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { signatureDishes } from "@/data/signatureDishes";

interface SignatureCollectionMobileProps {
  open: boolean;
  onClose: () => void;
}

export default function SignatureCollectionMobile({
  open,
  onClose,
}: SignatureCollectionMobileProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Breakfast",
    "Meals",
    "Starters",
    "Beverages",
    "Desserts",
  ];

  const featuredDish = signatureDishes[0];

  const filteredDishes = useMemo(() => {
    const dishes = signatureDishes.slice(1);

    if (activeCategory === "All") return dishes;

    return dishes.filter(
      (dish) => dish.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[999]
              bg-black/45
              backdrop-blur-md
            "
          />

          {/* Mobile Sheet */}

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
            className="
              fixed
              inset-x-0
              bottom-0
              z-[1000]
              flex
              h-[100dvh]
              flex-col
              overflow-hidden
              rounded-t-[32px]
              bg-[radial-gradient(circle_at_top,#FFFDF9_0%,#FBF6EE_45%,#F4E8D9_100%)]
              shadow-[0_-20px_60px_rgba(0,0,0,0.28)]
            "
            style={{
              paddingTop: "max(20px, env(safe-area-inset-top))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* Decorative Glow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-56
                bg-gradient-to-b
                from-[#FFF6DB]
                to-transparent
              "
            />

            {/* Header */}

            <header
              className="
                sticky
                top-0
                z-20
                flex
                items-start
                justify-between
                border-b
                border-[#E8DDBF]
                bg-white/65
                px-5
                py-4
                backdrop-blur-xl
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-[#2F6B3D]
                  "
                >
                  Dakshinapaaka
                </p>

                <h1
                  className="
                    mt-2
                    font-serif
                    text-[34px]
                    leading-none
                    text-[#1E1E1E]
                  "
                >
                  Signature
                  <br />
                  Collection
                </h1>
              </div>

              <button
                onClick={onClose}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D7C9A0]
                  bg-white/80
                  backdrop-blur-xl
                "
              >
                <X size={20} />
              </button>
            </header>

            {/* Scroll Area */}

            <div
              className="
                flex-1
                overflow-y-auto
                pb-10
              "
            >

                  {/* ================= HERO ================= */}

              <section className="px-5 pt-6">

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-[#E7DAB8]
                    bg-white
                    shadow-lg
                  "
                >

                  {/* Image */}

                  <div className="relative h-[340px]">

                    <Image
                      src={featuredDish.image}
                      alt={featuredDish.name}
                      fill
                      priority
                      quality={85}
                      sizes="100vw"
                      className="object-cover"
                    />

                    {/* Gradient */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/30
                        to-transparent
                      "
                    />

                    {/* Badge */}

                    <div
                      className="
                        absolute
                        left-5
                        top-5
                      "
                    >

                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-[#174D32]/95
                          px-4
                          py-2
                          text-[11px]
                          uppercase
                          tracking-[0.25em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        Chef's Recommendation
                      </span>

                    </div>

                    {/* Hero Content */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-6
                      "
                    >

                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-[0.25em]
                          text-[#F4D98B]
                        "
                      >
                        {featuredDish.badge}
                      </p>

                      <h2
                        className="
                          mt-3
                          font-serif
                          text-[36px]
                          leading-none
                          text-white
                        "
                      >
                        {featuredDish.name}
                      </h2>

                      <p
                        className="
                          mt-4
                          line-clamp-3
                          text-[15px]
                          leading-7
                          text-white/90
                        "
                      >
                        {featuredDish.description}
                      </p>

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            py-2
                            text-sm
                            text-white
                            backdrop-blur-md
                          "
                        >
                          {featuredDish.category}
                        </span>

                        <button
                          className="
                            rounded-full
                            bg-white
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-[#174D32]
                            transition-transform
                            active:scale-95
                          "
                        >
                          Explore →
                        </button>

                      </div>

                    </div>

                  </div>

                </motion.div>

              </section>

              {/* ================= CATEGORIES ================= */}

              <section className="mt-10">

                <div className="px-5">

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.35em]
                      text-[#C8A44D]
                    "
                  >
                    Browse Menu
                  </p>

                  <h3
                    className="
                      mt-3
                      font-serif
                      text-3xl
                      text-[#1F1F1F]
                    "
                  >
                    Our Specialities
                  </h3>

                </div>

                <div
                  className="
                    mt-6
                    flex
                    gap-3
                    overflow-x-auto
                    px-5
                    pb-3
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                  "
                >

                  {categories.map((category) => (

                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`
                        whitespace-nowrap
                        rounded-full
                        px-5
                        py-3
                        text-sm
                        font-medium
                        transition-all
                        duration-300

                        ${
                          activeCategory === category
                            ? "bg-[#174D32] text-white shadow-lg"
                            : "border border-[#E5D7B7] bg-white text-[#6B5B45]"
                        }
                      `}
                    >
                      {category}
                    </button>

                  ))}

                </div>

              </section>

              {/* ================= DISH GRID ================= */}

              <section className="mt-8 px-5 pb-10">

                <motion.div
                  key={activeCategory}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="grid grid-cols-2 gap-4"
                >

                  {filteredDishes.map((dish) => (

                    <motion.article
                      key={dish.id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 20,
                          scale: 0.96,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        },
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      className="
                        group
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#E6D9BA]
                        bg-white
                        shadow-sm
                        transition-all
                        duration-300
                        active:scale-[0.98]
                      "
                    >

                      {/* Image */}

                      <div className="relative aspect-[4/5] overflow-hidden">

                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          loading="lazy"
                          quality={75}
                          sizes="50vw"
                          className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/15
                            to-transparent
                          "
                        />

                        {/* Category */}

                        <span
                          className="
                            absolute
                            left-3
                            top-3
                            rounded-full
                            bg-[#174D32]/90
                            px-3
                            py-1.5
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-white
                            backdrop-blur-md
                          "
                        >
                          {dish.category}
                        </span>

                        {/* Badge */}

                        <span
                          className="
                            absolute
                            bottom-3
                            left-3
                            rounded-full
                            bg-white/90
                            px-3
                            py-1.5
                            text-[10px]
                            font-medium
                            text-[#174D32]
                            backdrop-blur-md
                          "
                        >
                          {dish.badge}
                        </span>

                      </div>

                      {/* Content */}

                      <div className="p-4">

                        <h3
                          className="
                            font-serif
                            text-[22px]
                            leading-6
                            text-[#1F1F1F]
                            line-clamp-2
                          "
                        >
                          {dish.name}
                        </h3>

                        <p
                          className="
                            mt-3
                            line-clamp-3
                            text-[13px]
                            leading-6
                            text-[#6B5B45]
                          "
                        >
                          {dish.description}
                        </p>

                        <div
                          className="
                            mt-5
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <span
                            className="
                              text-xs
                              uppercase
                              tracking-[0.2em]
                              text-[#C8A44D]
                            "
                          >
                            Explore
                          </span>

                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              bg-[#174D32]
                              text-white
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                          >
                            →
                          </div>

                        </div>

                      </div>

                    </motion.article>

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
                      className="
                        col-span-2
                        py-20
                        text-center
                      "
                    >

                      <h3
                        className="
                          font-serif
                          text-3xl
                          text-[#174D32]
                        "
                      >
                        Nothing Here Yet
                      </h3>

                      <p
                        className="
                          mt-4
                          text-[#6B5B45]
                        "
                      >
                        Our chefs are preparing something delicious.
                      </p>

                    </motion.div>

                  )}

                </motion.div>

              </section>

                        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}