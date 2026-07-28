"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Hero() {
  return (
<section
className="
relative
min-h-[115svh]
lg:min-h-screen
overflow-hidden
bg-[#080A08]
"
>

      {/* Background Artwork */}
{/* Desktop Hero */}
<motion.div
  initial={{ scale: 1.08, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    duration: 2,
    ease: "easeOut",
  }}
  className="absolute inset-0 hidden lg:block"
>
  <Image
    src="/images/hero/hero-desktop.png"
    alt="Dakshinapaaka Hero"
    fill
    priority
    quality={100}
    sizes="(min-width:1024px) 100vw"
    className="object-cover object-center select-none pointer-events-none"
  />
</motion.div>

{/* Mobile Hero */}
<motion.div
  initial={{ scale: 1.08, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    duration: 2,
    ease: "easeOut",
  }}
  className="absolute inset-0 lg:hidden"
>
  <Image
    src="/images/hero/hero-mobile.png"
    alt="Dakshinapaaka Hero"
    fill
    priority
    quality={100}
    sizes="100vw"
    className="object-cover object-top select-none pointer-events-none"
  />
</motion.div>

      {/* Overall cinematic tone */}
      <div
  className="
    absolute
    inset-0
    bg-black/10
    lg:bg-black/20
  "
/>

      {/* Dedicated left content gradient */}
<>

{/* Mobile Bottom Gradient */}
<div
  className="
    absolute
    inset-x-0
    bottom-0
    h-[72%]

    bg-gradient-to-t
    from-[#020202]
    via-[#020202]
    via-25%
    via-[#050505]/95
    via-55%
    to-transparent

    lg:hidden
  "
/>

{/* Desktop Gradient */}
<div
  className="
    hidden
    lg:block

    absolute
    inset-0

    bg-gradient-to-r
    from-black/60
    via-black/20
    to-transparent
  "
/>
</>

      {/* Extra local shadow behind desktop text only */}
      <div
        className="
          pointer-events-none
          absolute
          left-0 top-0
          hidden h-full w-[48%]
          bg-gradient-to-r
          from-black/45
          to-transparent
          lg:block
        "
      />

      {/* Navbar readability */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Content */}
<div
  className="
    relative
    z-10
    flex
    flex-col
    justify-end

    min-h-[115svh]

    pb-20
    pt-[68svh]

    lg:min-h-screen
    lg:justify-center
    lg:pt-24
"
>
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-6
            sm:px-10
            lg:px-16
            xl:px-20
          "
        >
          <div className="max-w-[350px] sm:max-w-[480px] lg:max-w-[540px]">

            {/* Eyebrow */}
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.7,
    delay: 0.1,
    ease: "easeOut",
  }}
  className="mb-5 flex items-center gap-4"
>
  <span className="h-px w-8 bg-[#C8A44D] lg:w-12" />

  <p
   className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#62B875] sm:text-xs"
  >
    Authentic South Indian Cuisine
  </p>
</motion.div>

            {/* Heading */}
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.3,
    ease: "easeOut",
  }}
className="font-serif text-[44px] font-semibold leading-[0.95] tracking-[-0.025em] text-white md:text-[58px] lg:text-[64px] xl:text-[68px]"
>
  Experience
  <span className="block">
    the Taste of
  </span>

  <span className="block italic text-[#E4C15D]">
    Tradition
  </span>
</motion.h1>

            {/* Ornament */}
        <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.7,
    delay: 0.45,
    ease: "easeOut",
  }}
  className="mt-6 flex items-center gap-3"
>
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{
      duration: 0.5,
      delay: 0.45,
      ease: "easeOut",
    }}
    className="h-px w-16 origin-left bg-[#C8A44D]"
  />

  <motion.span
    initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{
      duration: 0.5,
      delay: 0.6,
      ease: "easeOut",
    }}
    className="text-[10px] text-[#C8A44D]"
  >
    ✦
  </motion.span>

  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{
      duration: 0.5,
      delay: 0.75,
      ease: "easeOut",
    }}
    className="h-px w-6 origin-left bg-[#C8A44D]/40"
  />
</motion.div>

            {/* Description */}
    <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    ease: "easeOut",
  }}
  className="
    mt-6
    max-w-[340px]
    text-[15px]
    leading-7
    text-white/75
    sm:max-w-[430px]
    sm:text-base
    sm:leading-8
  "
>
  Discover the soul of South India through authentic recipes,
  fresh ingredients and warm hospitality in the heart of Mysuru.
</motion.p>

            {/* CTA */}
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.7,
    ease: "easeOut",
  }}
  className="mt-8"
>
              <Link
                href="#menu"
              className="
relative
overflow-hidden
group
inline-flex
items-center
gap-5
rounded-full
border
border-[#C8A44D]/40
bg-[#276B3A]
px-7
py-4
text-sm
font-semibold
text-white
shadow-[0_12px_30px_rgba(0,0,0,0.30)]
transition-all
duration-500
hover:-translate-y-1.5
hover:scale-[1.03]
active:scale-[0.98]
hover:bg-[#215C32]
hover:shadow-[0_22px_55px_rgba(0,0,0,0.45)]
"
              >
                Explore Our Menu

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span
  className="
    absolute
    inset-0
    -translate-x-full
    skew-x-[-20deg]
    bg-gradient-to-r
    from-transparent
    via-white/20
    to-transparent
    transition-transform
    duration-700
    group-hover:translate-x-[220%]
  "
/>
              </Link>
              </motion.div>
            </div>

          </div>
        </div>
      

      {/* Desktop Scroll Indicator */}
      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          lg:flex
        "
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/50">
          Discover
        </span>

        <div className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-2">
          <span className="h-1 w-1 animate-bounce rounded-full bg-[#C8A44D]" />
        </div>
      </div>

    </section>
  );
}