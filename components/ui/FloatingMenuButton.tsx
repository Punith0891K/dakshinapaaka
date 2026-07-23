"use client";

import { BookOpen } from "lucide-react";

export default function FloatingMenuButton() {
  return (
    <a
  href="#menu"
  className="
    group
    fixed
    bottom-6
    right-6
    z-[100]
    hidden
    lg:flex
    items-center
    gap-3
    rounded-full
    bg-[#174D32]
    px-6
    py-4
    text-white
    shadow-[0_18px_45px_rgba(23,77,50,0.35)]
    transition-all
    duration-500
    float-pulse
    hover:-translate-y-1
    hover:scale-105
    hover:bg-[#1E5C3A]
  "
>
      <BookOpen
        className="
          h-5
          w-5
          text-[#D6B15A]
          transition-transform
          duration-300
          group-hover:rotate-6
        "
      />

      <span
        className="
          text-sm
          font-semibold
          uppercase
          tracking-[0.18em]
        "
      >
        View Menu
      </span>
    </a>
  );
}