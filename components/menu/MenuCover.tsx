"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
      Since 2023
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
      border-[#D6B15A]/30
      bg-white/5
      backdrop-blur-sm
      shadow-[0_0_60px_rgba(214,177,90,.28)]
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
text-4xl
font-bold
tracking-[0.08em]
bg-gradient-to-b
from-[#FFF2B0]
via-[#D6B15A]
to-[#8F6A1E]
bg-clip-text
text-transparent
drop-shadow-[0_2px_4px_rgba(0,0,0,.4)]
"
>
  Dakshinapaaka
</h1>

  <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r
from-transparent
via-[#D6B15A]
to-transparent" 
/>

   <p className="mt-6 text-lg leading-8 tracking-wide text-[#E6DCCB]">
  Authentic South Indian Cuisine
</p>

<p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#C8A44D]">
  Traditional • Chinese • Beverages
</p>

  </div>

  {/* Bottom */}

  <div className="text-center">

    <p className="text-sm uppercase tracking-[0.35em] text-[#D6B15A]">
      Digital Menu
    </p>

    <div className="mx-auto mt-6 h-px w-20 bg-[#D6B15A]/50" />

    <p className="mt-6 text-sm text-[#D9CFBD]">
      Crafted with Tradition
      <br />
      Served with Love
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