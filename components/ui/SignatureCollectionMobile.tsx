"use client";
import { LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { signatureDishes } from "@/data/signatureDishes";
import { ArrowUpRight } from "lucide-react";
import DishDetailSheet from "@/components/ui/DishDetailSheet";
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
type SignatureDish = (typeof signatureDishes)[number];

const [selectedDish, setSelectedDish] =
  useState<SignatureDish | null>(null);
const featuredCard = filteredDishes[0];
const remainingCards = filteredDishes.slice(1);
  return (
    <LayoutGroup>
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
    z-30
    border-b
    border-[#E8DDBF]
    bg-[#FFFDF8]/85
    backdrop-blur-2xl
  "
>
  <div className="flex items-start justify-between px-6 pt-4 pb-4">

    <div>

      <p
        className="
          text-[11px]
          uppercase
          tracking-[0.45em]
          text-[#2F6B3D]
        "
      >
        Dakshinapaaka
      </p>

   <h1
  className="
    mt-2
    font-serif
    text-[42px]
    leading-[0.82]
    tracking-[-0.03em]
    text-[#1C1C1C]
    md:text-[60px]
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
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border
        border-[#D9CCAA]
        bg-white/70
        backdrop-blur-xl
        transition-all
        active:scale-95
      "
    >
      <X size={26} strokeWidth={1.8} />
    </button>

  </div>
</header>

            {/* Scroll Area */}

            <div
              className="
                flex-1
                overflow-y-auto
                pb-10
              "
            >
{/* ================= EDITORIAL STORY ================= */}

<section className="px-6 pt-8 pb-10">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >

    <p
      className="
        text-[11px]
        uppercase
        tracking-[0.5em]
        text-[#C8A44D]
      "
    >
      WELCOME TO DAKSHINAPAAKA
    </p>

    <h2
      className="
        mt-6
        font-serif
        text-[44px]
        leading-[0.95]
        text-[#1E1E1E]
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
        mt-6
        max-w-sm
        text-[16px]
        leading-8
        text-[#6B5B45]
      "
    >
      Every recipe tells the story of South India—
      prepared with time-honoured techniques,
      fresh ingredients and the warmth of
      authentic hospitality.
    </p>

  </motion.div>

</section>

<div className="px-6">

  <div className="flex items-center gap-4">

    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8C89F]" />

    <div
      className="
        h-2.5
        w-2.5
        rotate-45
        border
        border-[#C8A44D]
        bg-[#FFF8EA]
      "
    />

    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8C89F]" />

  </div>

</div>
            {/* ================= HERO 2.0 ================= */}

<section className="px-5 pt-5">

  {/* Hero Image */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="
      relative
      h-[430px]
      overflow-hidden
      rounded-[34px]
    "
  >

    {/* Image */}
<Image
  fill
  priority
  quality={100}
  src="/images/food/hero-thalimobile.png"
  alt="Dakshinapaaka Signature Collection"
  sizes="100vw"
className="
  object-cover
  object-[center_40%]
  scale-[1.1]
"
/>

<div
  className="
    absolute
    inset-0
    bg-gradient-to-t
    from-black/35
    via-black/5
    to-transparent
  "
/>
    {/* Overlay */}

    {/* Experience Label */}
<div className="absolute left-6 top-10">

  <p
    className="
      text-[11px]
      uppercase
      tracking-[0.45em]
      text-white
    "
  >
    THE DAKSHINAPAAKA
    <br />
    EXPERIENCE
  </p>

  <div className="mt-5 flex items-center gap-2">

    <div className="h-px w-12 bg-[#D8B15A]" />

    <div className="h-2 w-2 rotate-45 bg-[#D8B15A]" />

    <div className="h-px w-12 bg-[#D8B15A]" />

  </div>

</div>
  </motion.div>

  {/* Floating Card */}

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.2,
      duration: 0.5,
    }}
    className="
      relative
      z-10
      mx-4
      -mt-20
    "
  >

    {/* Philosophy Card */}
<div
className="
absolute
top-[55%]
right-0
translate-y-[-69%]
z-20
w-[210px]
rounded-[28px]
bg-[rgba(40,24,10,0.82)]
backdrop-blur-xl
border border-[#C8A44D]/20
shadow-[0_20px_60px_rgba(0,0,0,0.35)]

"
>
  <div className="px-6 pt-6 pb-5">

    {/* Label */}

    <p
      className="
        text-[8px]
        uppercase
        tracking-[0.35em]
        text-[#D8B15A]
      "
    >
      OUR PHILOSOPHY
    </p>

    {/* Heading */}

    <h3
      className="
        mt-4
        font-serif
        text-[15px]
        leading-[1.2]
        text-white
      "
    >
      Every meal begins
      <br />
      with tradition
      <br />
      and ends with
      <br />
      memories.
    </h3>

    {/* Divider */}

    <div className="my-5 flex items-center gap-3">

      <div className="h-px flex-1 bg-[#C8A44D]/40" />

      <div className="h-2 w-2 rotate-45 bg-[#D8B15A]" />

      <div className="h-px flex-1 bg-[#C8A44D]/40" />

    </div>

    {/* Features */}

    <div className="grid grid-cols-3 gap-3">

      <div className="text-center">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#D8B15A]">
          AUTHENTIC
        </p>
        <p className="mt-1 text-[8px] leading-4 text-white/80">
          Recipes
        </p>
      </div>

      <div className="text-center">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#D8B15A]">
          FRESH
        </p>
        <p className="mt-1 text-[8px] leading-4 text-white/80">
          Ingredients
        </p>
      </div>

      <div className="text-center">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#D8B15A]">
          TIMELESS
        </p>
        <p className="mt-1 text-[8px] leading-4 text-white/80">
          Hospitality
        </p>
      </div>

    </div>

  </div>
</div>
  </motion.div>

</section>

              {/* ================= CATEGORIES ================= */}

            {/* ================= MENU FILTER ================= */}

<section className="mt-8 px-5">

<div className="mb-5">

<p
  className="
    text-[11px]
    uppercase
    tracking-[0.45em]
    text-[#C8A44D]
    text-center
  "
>
  EXPLORE OUR MENU
</p>
<div className="mx-auto mt-6 mb-6 flex w-40 items-center gap-3">

  <div className="h-px flex-1 bg-[#D8C89F]" />

  <div className="h-2 w-2 rotate-45 border border-[#C8A44D]" />

  <div className="h-px flex-1 bg-[#D8C89F]" />

</div>
<h3
  className="
    mt-4
    font-serif
    text-[36px]
    leading-[1]
    text-[#1E1E1E]
    text-center
  "
>
  Discover Every
  <br />
  Flavour
</h3>



</div>

<div
className="
rounded-[18px]
border
border-[#E6DAB8]
bg-white/70
backdrop-blur-xl
p-2
shadow-lg
overflow-hidden
"
>

<div
className="
flex
gap-2
overflow-x-auto
scroll-smooth
[-ms-overflow-style:none]
[scrollbar-width:none]
"
>
{categories.map((category) => (

<button
key={category}
onClick={() => setActiveCategory(category)}
className={`
relative
flex-shrink-0
rounded-[18px]
px-5
py-3
text-[14px]
font-medium
transition-all
duration-300

${
activeCategory===category
?
"bg-[#174D32] text-white shadow-lg"
:
"bg-transparent text-[#6B5B45] hover:bg-[#F7F1E6]"
}
`}
>

{category}

</button>

))}

</div>

</div>

</section>

{/* ================= MENU GRID ================= */}
<section className="mt-10 px-5">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >

    <p className="text-[11px] uppercase tracking-[0.4em] text-[#C8A44D]">
      CHEF'S FEATURED
    </p>

    <h2
      className="
        mt-3
        font-serif
        text-[34px]
        leading-none
        text-[#1E1E1E]
      "
    >
      {featuredCard.name}
    </h2>
<div
  className="
    mt-6
    overflow-hidden
    rounded-[30px]
    bg-white
    shadow-[0_14px_40px_rgba(0,0,0,0.08)]
  "
>
  {/* Image */}

  <div className="relative h-[240px] overflow-hidden">

    <Image
      fill
      src={featuredCard.image}
      alt={featuredCard.name}
      sizes="100vw"
      className="object-cover object-[center_25%]"
      quality={90}
    />
<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-0
    h-24
    bg-gradient-to-t
    from-[#FFFDF9]
    via-[#FFFDF9]/60
    to-transparent
  "
/>

    <div
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/55
        via-black/5
        to-transparent
      "
    />

    <div className="absolute left-5 bottom-5">

      <span
        className="
          rounded-full
          bg-white/90
          px-4
          py-2
          text-[11px]
          uppercase
          tracking-[0.25em]
          text-[#174D32]
          backdrop-blur-md
        "
      >
        {featuredCard.category}
      </span>

    </div>

  </div>

  {/* Content */}

  <div className="p-6">

    <h3
      className="
        font-serif
        text-[24px]
        leading-none
        text-[#1E1E1E]
      "
    >
      {featuredCard.name}
    </h3>

    <p
      className="
        mt-5
        text-[15px]
        leading-7
        text-[#6B5B45]
      "
    >
      {featuredCard.description}
    </p>

    <div className="mt-6">

      <span
        className="
          inline-flex
          rounded-full
          bg-[#FFF5DF]
          px-4
          py-2
          text-[11px]
          uppercase
          tracking-[0.25em]
          text-[#B8892D]
        "
      >
        {featuredCard.badge}
      </span>

    </div>

  </div>

</div>
  </motion.div>

</section>
<section className="mt-12 px-5 pb-10">

  <div className="mb-6">

    <p
      className="
        text-[11px]
        uppercase
        tracking-[0.4em]
        text-[#C8A44D]
      "
    >
      MORE TO EXPLORE
    </p>

    <h3
      className="
        mt-3
        font-serif
        text-[30px]
        leading-none
        text-[#1E1E1E]
      "
    >
      Explore More
      <br />
      Signature Dishes
    </h3>

  </div>

  <motion.div
  key={activeCategory}
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  }}
  className="grid grid-cols-2 gap-5"
>

{remainingCards.map((dish) => (

<motion.article
  key={dish.id}
  layoutId={`dish-card-${dish.id}`}
  onClick={() => setSelectedDish(dish)}
  variants={{
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }}
  whileTap={{ scale: 0.98 }}
  whileHover={{ y: -4 }}
  transition={{
    type: "spring",
    stiffness: 250,
    damping: 30,
  }}
  className="
    cursor-pointer
    overflow-hidden
    rounded-[24px]
    bg-white
    shadow-[0_8px_22px_rgba(0,0,0,0.07)]
  "
>

<motion.div
  layoutId={`dish-image-${dish.id}`}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 28,
  }}
  className="relative h-[170px] overflow-hidden"
>
  <Image
    fill
    src={dish.image}
    alt={dish.name}
    className="object-cover transition-transform duration-500 hover:scale-105"
  />
</motion.div>

<div className="p-5">

  <div className="flex items-start justify-between">

    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.3em]
        text-[#C8A44D]
      "
    >
      {dish.category}
    </p>

    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-[#E5D3A8]
        bg-[#FFF9EF]
        text-[#174D32]
      "
    >
      <ArrowUpRight size={16} />
    </motion.button>

  </div>

<motion.h4
  layoutId={`dish-title-${dish.id}`}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 28,
  }}
  className="
    mt-4
    font-serif
    text-[24px]
    leading-[1.05]
    text-[#1E1E1E]
  "
>
  {dish.name}
</motion.h4>

</div>

</motion.article>

))}

</motion.div>

</section>
            </div> {/* Scroll Area */}
          </motion.div> {/* Mobile Sheet */}
        </>
      )}

{selectedDish && (
  <DishDetailSheet
    dish={selectedDish}
    onClose={() => setSelectedDish(null)}
  />
)}
    </AnimatePresence>
    </LayoutGroup>
  );
}