"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { signatureDishes } from "@/data/signatureDishes";

type SignatureDish = (typeof signatureDishes)[number];

interface DishDetailSheetProps {
  dish: SignatureDish;
  onClose: () => void;
}

export default function DishDetailSheet({
  dish,
  onClose,
}: DishDetailSheetProps) {
  return (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[1200]
        bg-black/60
        backdrop-blur-md
      "
    />

    <motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{
    type: "spring",
    stiffness: 250,
    damping: 28,
  }}
  className="
    fixed
    inset-x-0
    bottom-0
    z-[1201]
    h-[90dvh]
    overflow-y-auto
    rounded-t-[34px]
    bg-[#FFFDF9]
  "
>
<div className="flex justify-center pt-3 pb-2">
  <div
    className="
      h-1.5
      w-14
      rounded-full
      bg-gradient-to-r
      from-[#EAD8A6]
      via-[#C8A44D]
      to-[#EAD8A6]
      shadow-[0_1px_6px_rgba(200,164,77,0.35)]
    "
  />
</div>

<motion.div
  layoutId={`dish-image-${dish.id}`}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 28,
  }}
  className="relative h-[260px] overflow-hidden rounded-b-[32px]"
>

  <Image
    fill
    src={dish.image}
    alt={dish.name}
    className="object-cover object-[center_40%]"
  />

<div
  className="
    absolute
    inset-0
    bg-gradient-to-t
    from-[#0F0F0F]/70
    via-[#0F0F0F]/18
    via-55%
    to-transparent
  "
/>

</motion.div>

<motion.button
  onClick={onClose}
  whileTap={{ scale: 0.92 }}
  whileHover={{ scale: 1.05 }}
  className="
    absolute
    right-5
    top-5
    z-20
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-white/20
    bg-white/20
    backdrop-blur-2xl
    shadow-[0_8px_25px_rgba(0,0,0,0.18)]
    transition-all
    duration-300
    ring-1
    ring-white/10
  "
>
  <X
    size={24}
    strokeWidth={2}
    className="text-[#1E1E1E]"
  />
</motion.button>

<div className="px-8 pt-7 pb-8">

  <p
    className="
      text-[11px]
      uppercase
      tracking-[0.4em]
      text-[#C8A44D]
    "
  >
    {dish.category}
  </p>

<motion.h1
  layoutId={`dish-title-${dish.id}`}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 28,
  }}
  className="
    mt-3
    font-serif
text-[42px]
leading-[0.92]
tracking-[-0.03em]
    text-[#1E1E1E]
  "
>
  {dish.name}
</motion.h1>

  <p
className="
mt-6
max-w-[95%]
text-[15px]
leading-8
tracking-[0.01em]
text-[#5F5A52]
"
  >
    {dish.description}
  </p>

</div>

<div
  className="
    mx-7
    rounded-[24px]
    bg-[#F8F2E8]
    p-6
  "
>
<div className="my-4 flex items-center gap-3">
  <div className="h-px flex-1 bg-[#D8C89F]" />

  <span className="text-[#C8A44D] text-lg">
    ❦
  </span>

  <div className="h-px flex-1 bg-[#D8C89F]" />
</div>

<p
  className="
    text-[11px]
    uppercase
    tracking-[0.35em]
    text-[#C8A44D]
    text-center
  "
>
  FROM OUR KITCHEN
</p>

  <p
    className="
      mt-4
      text-[15px]
      leading-7
      text-[#5F5241]
    "
  >
    Prepared fresh every day using
    traditional South Indian cooking
    techniques, bringing authentic
    flavours to every plate.
  </p>

</div>
</motion.div>
</>

  );
}