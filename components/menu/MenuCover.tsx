"use client";

import Image from "next/image";

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
{/* Paper Edge */}
<div
  className="
    absolute
    right-0
    top-5
    bottom-5
    w-3
    rounded-r-full
    bg-gradient-to-l
    from-[#FFF9EC]
    via-[#F2E5C7]
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
      border-[#D6B15A]/30
      bg-white/5
      backdrop-blur-sm
      shadow-[0_0_40px_rgba(214,177,90,0.18)]
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
    mt-8
    font-playfair
    text-5xl
    font-bold
    tracking-[0.08em]
    text-[#F8F3E9]
  "
>
  Dakshinapaaka
</h1>

    <div className="mx-auto mt-8 h-px w-32 bg-[#D6B15A]/60" />

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
    opacity-[0.06]
    pointer-events-none
    [background-image:
      radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18)_1px,transparent_1px),
      radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12)_1px,transparent_1px)]
    [background-size:34px_34px]
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
    </div>
    
  );
}