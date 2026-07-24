"use client";

import Image from "next/image";
import Link from "next/link";
import { signatureDishes } from "@/data/signatureDishes";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardVariant,
} from "@/lib/animations";

export default function SignatureDishes() {
  return (
 <section
  id="signature-dishes"
  className="
    relative
    overflow-hidden
    bg-[#F8F3E9]
    bg-[url('/images/hero/signature-bg.png')]
    bg-cover
    bg-center
    bg-no-repeat
    py-16
    lg:py-20
  "
>
      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#FFF9EE]/20" />

      {/* Decorative Mandala */}
<motion.div
  className="pointer-events-none absolute inset-x-0 top-8 flex justify-center opacity-[0.06]"
  initial={{ rotate: -8, scale: 1.15 }}
  whileInView={{ rotate: 0, scale: 1 }}
  transition={{
    duration: 2,
    ease: [0.22, 1, 0.36, 1],
  }}
  viewport={{ once: true }}
>

  <Image
    src="/images/design/mandala.png"
    alt=""
    width={420}
    height={420}
    className="select-none"
  />
</motion.div>

      {/* Decorative side text */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-[1] hidden -translate-y-1/2 -rotate-90 lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2F6B3D]/30">
          Authentic South Indian Cuisine
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        
        {/* Heading */}
        <motion.div
  className="mx-auto mb-12 max-w-2xl text-center lg:mb-16"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
>
  
{/* Premium Decorative Divider */}
<div className="mb-8 flex items-center justify-center">
  <div className="flex items-center gap-5">
    <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#C8A44D]/60 to-[#C8A44D]" />

    <div className="relative flex items-center justify-center">
      <span className="text-[#C8A44D] text-2xl">❋</span>

      <div className="absolute h-10 w-10 rounded-full border border-[#C8A44D]/20" />
    </div>

    <span className="h-px w-20 bg-gradient-to-l from-transparent via-[#C8A44D]/60 to-[#C8A44D]" />
  </div>
</div>
      <div className="mb-3 flex items-center justify-center gap-3">
  <span className="h-px w-10 bg-[#C8A44D]/60" />

  <span className="text-[#C8A44D]">✦</span>

  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#2F6B3D]">
    A Taste of Tradition
  </p>

  <span className="text-[#C8A44D]">✦</span>

  <span className="h-px w-10 bg-[#C8A44D]/60" />
</div>

          <h2
  className="
    font-serif
    text-4xl
    font-semibold
    leading-[1.05]
    text-[#1E1E1E]
    sm:text-5xl
    lg:text-6xl
  "
>
  Chef's Signature
  <span className="block italic text-[#2F6B3D]">
    Collection
  </span>
</h2>

          {/* Ornament */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8A44D]" />

            <span className="text-lg text-[#C8A44D]">
              ✦
            </span>

            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8A44D]" />
          </div>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B5B45] md:text-xl">
  Experience a handpicked selection of our finest dishes, where authentic
  recipes, fresh ingredients, and timeless South Indian flavours come
  together to create an unforgettable dining experience.
</p>

        </motion.div>
<div className="mb-10 flex items-center justify-center">
  <div className="h-px w-24 bg-[#C8A44D]/25" />
  <div className="mx-4 h-2 w-2 rounded-full bg-[#C8A44D]" />
  <div className="h-px w-24 bg-[#C8A44D]/25" />
</div>

        {/* Dish Grid */}
        <motion.div
  className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

          {signatureDishes.map((dish) => (

           <motion.article
  key={dish.name}
  variants={cardVariant}
  className="
    group
    relative
    h-[440px]
    overflow-hidden
    rounded-[30px]
    border
    border-[#C8A44D]/25
    bg-black
    shadow-[0_18px_50px_rgba(49,39,22,0.12)]
    transition-all
    duration-500
    hover:-translate-y-2
    hover:border-[#C8A44D]/50
    hover:shadow-[0_30px_80px_rgba(49,39,22,0.22)]
    sm:h-[480px]
    lg:h-[520px]
  "
>

              {/* Food Image */}
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  group-hover:scale-[1.06]
                "
              />

              {/* Cinematic Gradient */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-black/5
                "
              />

              {/* Top subtle gradient */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />

              {/* Category */}
              <div
                className="
                  absolute
                  left-6
                  top-6
                  rounded-full
                  border
                  border-white/25
                  bg-black/20
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  backdrop-blur-md
                "
              >
                {dish.category}
              </div>

              {/* Brand Mark */}
              <div
                className="
                  absolute
                  right-6
                  top-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-white/70
                "
              >
                Dakshina paaka
              </div>

              {/* Content */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-7
                  sm:p-8
                  lg:p-10
                "
              >

              {/* Gold Line */}
<div
  className="
    mb-5
    h-px
    w-12
    bg-[#C8A44D]
    transition-all
    duration-500
    group-hover:w-20
  "
/>

{/* Signature Badge */}
<p
  className="
    mb-3
    text-[11px]
    font-semibold
    uppercase
    tracking-[0.25em]
    text-[#C8A44D]
  "
>
  {dish.badge}
</p>

<h3
  className="
    max-w-md
    font-serif
    text-3xl
    font-semibold
    leading-tight
    text-white
    sm:text-4xl
  "
>
  {dish.name}
</h3>

                <p
                  className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                    text-white/75
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {dish.description}
                </p>

              </div>

              {/* Premium border glow */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  rounded-[30px]
                  ring-1
                  ring-inset
                  ring-white/10
                "
              />

            </motion.article>

          ))}

        </motion.div>

        {/* Bottom CTA */}
        <motion.div
  className="mt-12 text-center lg:mt-16"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
>

         <p
  className="
    text-center
    font-serif
    text-[28px]
    italic
    text-[#7A6440]
    lg:text-[24px]
  "
>
  Discover more signature dishes crafted with authentic flavours.
</p>

          <Link
            href="#contact"
            className="
group
inline-flex
items-center
gap-3
rounded-full
bg-[#174D32]
px-10
py-5
font-semibold
uppercase
tracking-[0.18em]
text-white
shadow-[0_14px_35px_rgba(23,77,50,0.25)]
transition-all
duration-500
hover:-translate-y-1
hover:bg-[#1E5C3A]
hover:shadow-[0_22px_50px_rgba(23,77,50,0.35)]
"
          >
            Explore Signature Dishes

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </motion.div>

      </div>

    </section>
  );
}