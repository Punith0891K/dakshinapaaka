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

            {/* ================= HERO 2.0 ================= */}

<section className="px-5 pt-5">

<motion.div
initial={{
opacity:0,
y:25,
}}
animate={{
opacity:1,
y:0,
}}
transition={{
duration:.45,
}}
className="
relative
overflow-hidden
rounded-[32px]
"
>

    <div
className="
relative
h-[430px]
"
>

<Image
fill
priority
quality={90}
sizes="100vw"
src={featuredDish.image}
alt={featuredDish.name}
className="object-cover"
/>

<div
className="
absolute
inset-0
bg-gradient-to-t
from-black/90
via-black/20
to-transparent
"
/>

<div
className="
absolute
left-6
top-6
"
>

<span
className="
rounded-full
bg-[#174D32]
px-4
py-2
text-[11px]
uppercase
tracking-[0.25em]
text-white
"
>

Chef's Recommendation

</span>

</div>

                 <div
className="
absolute
left-4
right-4
bottom-4
rounded-[28px]
border
border-white/15
bg-white/10
backdrop-blur-xl
p-6
"
>

<p
className="
text-xs
uppercase
tracking-[0.25em]
text-[#F3D57C]
"
>

{featuredDish.category}

</p>

<h2
className="
mt-3
font-serif
text-[38px]
leading-none
text-white
"
>

{featuredDish.name}

</h2>

<p
className="
mt-4
line-clamp-2
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
text-sm
text-white/70
"
>

{featuredDish.badge}

</span>

<button
className="
rounded-full
bg-white
px-5
py-3
font-medium
text-[#174D32]
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

            {/* ================= MENU FILTER ================= */}

<section className="mt-8 px-5">

<div className="mb-5">

<p
className="
text-[11px]
uppercase
tracking-[0.35em]
text-[#C8A44D]
"
>
Browse Collection
</p>

<h3
className="
mt-2
font-serif
text-[32px]
leading-none
text-[#1E1E1E]
"
>
Choose Your
<br />
Favourite
</h3>

</div>

<div
className="
rounded-full
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
rounded-full
px-5
py-3
text-sm
font-medium
transition-all
duration-300

${
activeCategory===category

?

"bg-[#174D32] text-white shadow-md"

:

"text-[#6B5B45]"
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

<section className="mt-10 px-5 pb-10">

<motion.div
key={activeCategory}
initial="hidden"
animate="visible"
variants={{
visible:{
transition:{
staggerChildren:.05,
},
},
}}
className="
grid
grid-cols-2
gap-5
"
>

{filteredDishes.map((dish)=>(

    <motion.article
key={dish.id}
variants={{
hidden:{
opacity:0,
y:25,
},
visible:{
opacity:1,
y:0,
},
}}
transition={{
duration:.45,
}}
className="
group
overflow-hidden
rounded-[28px]
bg-white
shadow-[0_8px_24px_rgba(0,0,0,.08)]
"
>

<div
className="
relative
aspect-square
overflow-hidden
"
>
<Image
fill
loading="lazy"
sizes="50vw"
quality={80}
src={dish.image}
alt={dish.name}
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
from-black/50
to-transparent
"
/>

<div
className="
absolute
left-3
bottom-3
"
>

<span
className="
rounded-full
bg-white/90
px-3
py-2
text-[10px]
font-medium
backdrop-blur-md
"
>

{dish.category}

</span>

</div>

</div>

<div
className="
p-4
"
>

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
line-clamp-2
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

{dish.badge}

</span>

<div
className="
flex
h-10
w-10
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
    
  {filteredDishes.length===0&&(

<div
className="
col-span-2
py-24
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

Coming Soon

</h3>

<p
className="
mt-3
text-[#6B5B45]
"
>

Our chefs are preparing something special.

</p>

</div>

)}

</motion.div>

</section>
            </div> {/* Scroll Area */}
          </motion.div> {/* Mobile Sheet */}
        </>
      )}
    </AnimatePresence>
  );
}