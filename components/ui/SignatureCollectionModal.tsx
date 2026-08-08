"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { signatureDishes } from "@/data/signatureDishes";
import heroThali from "@/public/images/food/hero-thali.png";
interface SignatureCollectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignatureCollectionModal({
  open,
  onClose,
}: SignatureCollectionModalProps) {

  const [activeCategory, setActiveCategory] = useState("All");
  const showHero = activeCategory === "All";
const [compactHeader, setCompactHeader] = useState(false);
const ticking = useRef(false);
const filteredDishes = useMemo(() => {
  const dishes = signatureDishes.slice(1);

  if (activeCategory === "All")
    return dishes;

  return dishes.filter(
    dish => dish.category === activeCategory
  );
}, [activeCategory]);

const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  if (ticking.current) return;

  const target = e.currentTarget;

  ticking.current = true;

  requestAnimationFrame(() => {
    const compact = target.scrollTop > 80;

    setCompactHeader((prev) =>
      prev !== compact ? compact : prev
    );

    ticking.current = false;
  });
};
  return (
    <AnimatePresence>
      {open && (
        <motion.div
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
              bg-[radial-gradient(circle_at_top,#FFFDF8_0%,#FBF6ED_40%,#F5EBDD_100%)]
              shadow-[0_18px_40px_rgba(0,0,0,0.18)]
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="signature-collection-desktop-title"
          >
            {/* Decorative Top Glow */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFF5D7]/70 to-transparent pointer-events-none" />

{/* Ambient Golden Glow */}
<div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    h-[700px]
    w-[700px]
    rounded-full
    bg-[#C8A44D]/[0.03]
    blur-[70px]
  "
/>
            {/* HEADER */}
            <header
  className={`
    relative
    flex
    items-center
    transform-gpu
    justify-between
    border-b
    border-[#E5D7B7]
    px-8
    md:px-12
    transition-[padding]
    duration-500
    ${compactHeader ? "py-2" : "py-7"}
  `}
>

              <div>

               <p
  className={`
    uppercase
    tracking-[0.45em]
    text-[#2F6B3D]
    transition-all
    duration-500
    ${
      compactHeader
        ? "text-[10px]"
        : "text-xs"
    }
  `}
>
                  Dakshina Paaka
                </p>

                <h2
  id="signature-collection-desktop-title"
  className={`
    mt-2
    font-serif
    text-[#1F1F1F]
    transition-all
    duration-500
    ${
      compactHeader
        ? "text-3xl md:text-4xl"
        : "text-4xl md:text-5xl"
    }
  `}
>
                  Signature Collection
                </h2>

                <p
  className={`
    mt-3
    max-w-xl
    text-[#6B5B45]
transition-[opacity,transform] duration-300
    overflow-hidden

    ${
      compactHeader
        ? "opacity-0 -translate-y-3 max-h-0 mt-0"
        : "opacity-100 translate-y-0 max-h-20"
    }
  `}
>
                  Discover our chef&apos;s handpicked creations,
                  prepared with authentic South Indian flavours.
                </p>

              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close signature collection"
        className={`
flex
items-center
justify-center
rounded-full
border
border-[#D6C9A8]
bg-white
text-[#174D32]
transition-all
duration-500

${
compactHeader
? "h-11 w-11"
: "h-14 w-14"
}
`}
>
                <X size={22} />
              </button>

            </header>

       {/* BODY */}
<div
  onScroll={handleScroll}
  className="flex-1 overflow-y-auto px-8 py-10 md:px-12"
>

{/* ================= OPENING STORY ================= */}

<section className="mx-auto max-w-5xl py-10">

  <div className="text-center">

    <p
      className="
        text-xs
        uppercase
        tracking-[0.55em]
        text-[#B88B2C]
        font-medium
      "
    >
      Welcome to Dakshinapaaka
    </p>

    <h2
      className="
        mt-8
        font-serif
        text-[56px]
md:text-[64px]
        leading-[1.05]
        text-[#1C1C1C]
      "
    >
      Where Tradition
      <span className="block italic text-[#174D32]">
        Meets Every Plate
      </span>
    </h2>

    <p
      className="
        mx-auto
        mt-10
        max-w-3xl
        text-[20px]
        leading-9
        text-[#6B5B45]
      "
    >
      Every recipe tells the story of South India —
      prepared with time-honoured techniques,
      fresh ingredients and the warmth of
      authentic hospitality.
    </p>

  </div>

</section>

<div className="mb-10 flex items-center justify-center gap-6">

  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8C89F]" />

  <div
    className="
      h-3
      w-3
      rotate-45
      border
      border-[#C8A44D]
      bg-[#FFF9ED]
    "
  />

  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8C89F]" />

</div>

{/* ================= MENU NAVIGATION ================= */}

<section className="mt-16 mb-16">

  <div className="text-center mb-8">

    <p
      className="
        text-xs
        uppercase
        tracking-[0.45em]
        text-[#B88B2C]
      "
    >
      EXPLORE OUR MENU
    </p>

    <h3
      className="
        mt-4
        font-serif
        text-[36px]
        text-[#1F1F1F]
      "
    >
      Discover Every Flavour
    </h3>

  </div>

  <div className="flex justify-center">

    <div
      className="
        flex
        items-center
        rounded-[999px]
        border
        border-[#E7DDC5]
        bg-[#FFFDF8]/80
        backdrop-blur-xl
        px-10
        py-4
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        backdrop-saturate-150
      "
    >

  {[
  "All",
  "Breakfast",
  "Meals",
  "Starters",
  "Beverages",
  "Desserts",
].map((item, index, array) => (
  <div
    key={item}
    className="flex items-center"
  >
    <button
      type="button"
      onClick={() => setActiveCategory(item)}
      aria-pressed={activeCategory === item}
      className="
        relative
        px-5
        py-2
        font-serif
        text-[18px]
        transition-colors
        duration-300
      "
    >
      <span
        className={
          activeCategory === item
            ? "text-[#174D32]"
            : "text-[#7A6B55] hover:text-[#174D32]"
        }
      >
        {item}
      </span>

      {activeCategory === item && (
        <motion.div
          layoutId="menu-indicator"
          className="
            absolute
            left-0
            right-0
            bottom-[-10px]
            mx-auto
            h-[2px]
            w-8
            rounded-full
            bg-[#C8A44D]
          "
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 30,
          }}
        />
      )}
    </button>

    {index !== array.length - 1 && (
      <div
        className="
          mx-2
          h-5
          w-px
          bg-[#E7DDC5]
        "
      />
    )}
  </div>
))}

    </div>   {/* Navigation pill */}
  </div>     {/* justify-center */}
</section>   {/* MENU NAVIGATION */}
{/* ================= CINEMATIC HERO ================= */}

<AnimatePresence mode="wait">
  {showHero && (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="mb-16"
    >
<div
className="
group
relative
overflow-hidden
rounded-[38px]
border
border-[#E7DDC5]
bg-[#151515]
shadow-[0_30px_80px_rgba(0,0,0,0.18)]
"
>

<div className="relative h-[430px] overflow-hidden rounded-[38px]">
<Image
  src={heroThali}
  alt="Dakshinapaaka Signature Thali"
  fill
  priority
  sizes="100vw"
  className="
    object-cover
    object-[35%_55%]
    transition-transform
    duration-[12000ms]
    ease-out
    group-hover:scale-[1.03]
  "
/>

  {/* Right side gradient for card */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-black/5
      via-transparent
      to-black/55
    "
  />
</div>


<div className="absolute left-10 bottom-10">

  <div
  className="
    absolute
    left-10
    bottom-10
  "
>

<p
className="
uppercase
tracking-[0.45em]
text-white/90
text-xs
font-medium
"
>
THE DAKSHINAPAAKA EXPERIENCE
</p>

<div
className="
mt-5
h-px
w-44
bg-[#C8A44D]
"
/>

</div>

</div>

<div
className="
absolute
right-6
bottom-6

w-[420px]

rounded-[30px]

border
border-white/15

bg-black/25

backdrop-blur-2xl

p-3

shadow-[0_20px_50px_rgba(0,0,0,.45)]
"
>
<p
className="
uppercase
tracking-[0.35em]
text-[#D9B15F]
text-xs
"
>
OUR PHILOSOPHY
</p>
<h3
className="
mt-8
font-serif
text-[30px]
leading-[1.45]
text-white
"
>
Every meal begins
with tradition
and ends with
memories.
</h3>

<div className="my-8 h-px bg-[#B8892D]/60" />
<p
className="
leading-8
text-white/80
"
>
Prepared fresh every day using
authentic South Indian recipes
and premium ingredients.
</p>
</div>

</div>

    </motion.section>
  )}
</AnimatePresence>
  <motion.div
  style={{ willChange: "transform" }}
    key={activeCategory}
    exit="hidden"
initial={{
  opacity: 0,
  y: 20,
}}

animate={{
  opacity: 1,
  y: 0,
}}

transition={{
  duration: 0.35,
}}
    className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
  >

    {filteredDishes.map((dish, index) => (

      <motion.div
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
hover:-translate-y-1
hover:border-[#C8A44D]
shadow-sm
hover:shadow-md
        "
      >

        {/* Image */}

        <div className="relative h-64 overflow-hidden">

          
<div
  className="
    absolute
    inset-0
    bg-white/5
    opacity-0
    transition-opacity
    duration-300
    group-hover:opacity-100
    z-20
  "
/>

         <Image
  src={dish.image}
  alt={dish.name}
  fill
  loading="lazy"
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1280px) 50vw,
    33vw
  "
  className="
    object-cover
    transition-transform
    duration-500
    group-hover:scale-[1.015]
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

</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
