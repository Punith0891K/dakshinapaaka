"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Leaf,
  Soup,
  Flame,
  CupSoda,
} from "lucide-react";

export default function MenuCover() {
  return (
    <div
      className="
        relative
     h-[700px]
     w-[470px]
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-br
        from-[#0B4D3A]
        via-[#0F5B43]
        to-[#08382C]
        shadow-[0_40px_80px_rgba(0,0,0,.45)]
      "
    >
        {/* Book Spine */}
<div
  className="
    absolute
    left-0
    top-0
    h-full
    w-7
    bg-gradient-to-r
    from-black/40
    via-[#0B4D3A]
    to-transparent
  "
/>

<div
  className="
    absolute
    left-5
    top-8
    bottom-8
    w-px
    bg-gradient-to-b
    from-transparent
    via-[#D6B15A]/60
    to-transparent
  "
/>

{/* Paper Edge */}
<div
  className="
    absolute
    right-0
    top-5
    bottom-5
    w-5
    rounded-r-full
  bg-gradient-to-l
from-[#FFFDF5]
via-[#F8EFD5]
via-[#E6D7AF]
to-transparent
    opacity-80
  "
/>
      {/* Gold Border */}
      <div
  className="
    absolute
    inset-[10px]
    rounded-[24px]
    border
    border-[#D6B15A]/80
    shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
  "
/>

      {/* Decorative Corners */}
      <div className="absolute left-8 top-8 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-[#D6B15A]/60" />
      <div className="absolute right-8 top-8 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-[#D6B15A]/60" />
      <div className="absolute bottom-8 left-8 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-[#D6B15A]/60" />
      <div className="absolute bottom-8 right-8 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-[#D6B15A]/60" />

{/* Top Light */}
<div
  className="
    absolute
    inset-x-0
    top-0
    h-44
    bg-gradient-to-b
    from-white/12
    via-white/4
    to-transparent
    pointer-events-none
  "
/>
      {/* Content */}
 {/* Content */}
<div className="relative z-10 flex h-full flex-col justify-between px-12 py-14">

  {/* Top */}

  <div className="text-center">

    <p className="text-xs uppercase tracking-[0.5em] text-[#D6B15A]">
      Since 2024
    </p>

   <div className="mt-10 flex justify-center">

  <div
    className="
      relative
      flex
      h-36
      w-36
      items-center
      justify-center
      rounded-full
      border
      border-[#D6B15A]
      bg-black
      backdrop-blur-sm
      shadow-[0_15px_50px_rgba(0,0,0,.45)]
    "
  >
 <Image
  src="/images/logo/dakshinapaaka.png"
  alt="Dakshinapaaka Logo"
  width={180}
  height={120}
  priority
  className="object-contain"
/>
  </div>

</div>

  </div>

  {/* Center */}

  <div className="text-center">

   <h1
  className="
font-playfair
text-[44px]
font-bold
tracking-[0.04em]
bg-gradient-to-b
from-[#FFF2B0]
via-[#D6B15A]
to-[#8F6A1E]
bg-clip-text
text-transparent
drop-shadow-[0_2px_4px_rgba(0,0,0,.4)]
"
>
  Dakshina Paaka
</h1>

<div className="mt-8 flex items-center justify-center gap-4">

  <div className="h-px w-28 bg-[#D6B15A]/50" />

  <span className="text-[#D6B15A] text-xl">
    ❦
  </span>

  <div className="h-px w-28 bg-[#D6B15A]/50" />

</div>

   <p className="mt-6 text-lg leading-8 tracking-wide text-[#E6DCCB]">
  Authentic South Indian Cuisine
</p>

<div className="mt-8 flex items-start justify-center gap-5">

  {[
    {
      icon: UtensilsCrossed,
      line1: "North",
      line2: "Indian",
    },
    {
      icon: Leaf,
      line1: "South",
      line2: "Indian",
    },
    {
      icon: Soup,
      line1: "Chinese",
    },
    {
      icon: Flame,
      line1: "Tandoor",
    },
    {
      icon: CupSoda,
      line1: "Beverages",
    },
  ].map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={item.line1}
        className="relative flex w-[72px] flex-col items-center"
      >
        {index !== 0 && (
          <div className="absolute -left-3 top-2 h-16 w-px bg-[#D6B15A]/30" />
        )}

        <Icon
          size={24}
          strokeWidth={1.7}
          className="text-[#D6B15A]"
        />

        <span className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#D6B15A]">
          {item.line1}
        </span>

        {item.line2 && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#D6B15A]">
            {item.line2}
          </span>
        )}
      </div>
    );
  })}

</div>
  </div>

  {/* Bottom */}

  <div className="text-center">

    <p className="text-base uppercase tracking-[0.45em] text-[#D6B15A]">
      Menu
    </p>

    <div className="mx-auto mt-6 h-px w-20 bg-[#D6B15A]/50" />

    <p className="mt-6 text-sm text-[#D9CFBD]">
      Crafted with Tradition
      <br />
      Served with Love
      <div className="mt-8 flex justify-center">

<span className="text-3xl text-[#D6B15A]">

♡

</span>

</div>
    </p>

  </div>

</div>

      {/* Subtle texture */}
     {/* Luxury Leather Texture */}
<div
  className="
    absolute
    inset-0
    opacity-[0.045]
    mix-blend-overlay
    pointer-events-none
    [background-image:
      radial-gradient(circle at 20% 20%,rgba(255,255,255,.20) 1px,transparent 1.5px),
      radial-gradient(circle at 70% 40%,rgba(255,255,255,.10) 1px,transparent 1.5px),
      radial-gradient(circle at 40% 80%,rgba(255,255,255,.14) 1px,transparent 1.5px)]
    [background-size:22px_22px]
  "
/>

{/* Soft Vignette */}
<div
  className="
    absolute
    inset-0
    rounded-[32px]
    bg-gradient-to-b
    from-transparent
    via-transparent
    to-black/20
    pointer-events-none
  "
/>
<div
  className="
    pointer-events-none
    absolute
    inset-0
    overflow-hidden
    rounded-[32px]
  "
>

 <motion.div
  animate={{
    x: ["-180%", "220%"],
  }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    repeatDelay: 2,
    ease: "easeInOut",
  }}
  className="
    absolute
    top-0
    h-full
    w-36
    rotate-12
    bg-gradient-to-r
    from-transparent
    via-white/18
    to-transparent
  "
/>
</div>

<div
  className="
    absolute
    -right-2
    top-5
    bottom-5
    w-4
    rounded-r-xl
    bg-gradient-to-l
    from-[#FFFDF7]
    via-[#E7D8B3]
    to-[#B99A53]
    opacity-90
  "
/>
    </div>
  );
  
}