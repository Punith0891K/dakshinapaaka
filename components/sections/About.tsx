"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CookingPot,
  Leaf,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Authentic Recipes",
    description: "Time-honoured traditional dishes",
    icon: CookingPot,
  },
  {
    title: "Fresh Ingredients",
    description: "Handpicked daily for pure & rich flavors",
    icon: Leaf,
  },
  {
    title: "Family Dining",
    description: "A warm place for memories together",
    icon: Users,
  },
  {
    title: "Hygienic Kitchen",
    description: "Prepared with care & highest standards",
    icon: UtensilsCrossed,
  },
];

export default function About() {

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

const interiorImages = [
  "/images/hero/interior1.jpeg",
  "/images/hero/interior2.png",
  "/images/hero/interior3.png",
];

const nextImage = () => {
  setDirection(1);

  setCurrentImage((prev) =>
    prev === interiorImages.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setDirection(-1);

  setCurrentImage((prev) =>
    prev === 0 ? interiorImages.length - 1 : prev - 1
  );
};

const handleDragEnd = (
  _: MouseEvent | TouchEvent | PointerEvent,
  info: { offset: { x: number } }
) => {
  if (info.offset.x < -100) {
    nextImage();
  }

  if (info.offset.x > 100) {
    prevImage();
  }
};

useEffect(() => {
  if (isHovered) return;

  const interval = setInterval(() => {
    nextImage();
  }, 5000);

  return () => clearInterval(interval);
}, [isHovered]);

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.97,
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.97,
  }),
};
  return (
   <section
  id="about"
  className="relative overflow-hidden bg-[#F7F1E7] py-20 lg:py-28"
>
  {/* Heritage Background */}
  <div
    className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
    style={{
      backgroundImage: "url('/images/hero/about-bg.png')",
    }}
  />

  {/* Soft overlay for text readability */}
  <div className="pointer-events-none absolute inset-0 bg-[#F7F1E7]/20" />
      {/* Decorative background glow */}
      
      {/* Decorative corner pattern */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-64 w-64 opacity-[0.06] lg:block">
        <div className="absolute right-[-70px] top-[-70px] h-72 w-72 rounded-full border-[30px] border-[#C8A44D]" />
        <div className="absolute right-[-25px] top-[-25px] h-44 w-44 rounded-full border border-[#C8A44D]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* LEFT CONTENT */}
          <div>

          {/* Small Heading */}
           <FadeIn>
          <div className="mb-6">
              <p className="text-center text-xs font-semibold uppercase tracking-[4px] text-[#1F6138] lg:text-left lg:text-sm lg:tracking-[6px]">
                About Dakshinapaaka
              </p>

              {/* Gold ornament */}
              <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-10 bg-[#C8A44D]" />
                <span className="text-[#C8A44D]">✦</span>
                <span className="h-px w-10 bg-[#C8A44D]" />
              </div>
            </div>
            </FadeIn>

            {/* Main Heading */}
            <FadeIn delay={0.1}>
            <h2 className="text-center font-serif text-5xl font-bold leading-[1.05] text-[#181818] sm:text-6xl lg:text-left lg:text-[72px]">
              Crafted with
              <br />
              Tradition
            </h2>
            </FadeIn>

            {/* Bottom ornament */}
           <FadeIn delay={0.2}>
  <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-16 bg-[#C8A44D]/70" />
              <span className="text-lg text-[#C8A44D]">❈</span>
              <span className="h-px w-16 bg-[#C8A44D]/70" />
            </div>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.3}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-8 text-[#4B4B4B] sm:text-lg lg:mx-0 lg:text-left lg:leading-9">
              At Dakshinapaaka, every meal celebrates the rich culinary
              heritage of South India. Our chefs prepare each dish using
              authentic recipes, premium ingredients, and time-honoured
              cooking techniques to create an unforgettable dining experience.
            </p>
            </FadeIn>

            {/* Feature Cards */}
            <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-2 xl:grid-cols-4">
                {features.map((feature, index) => {
                const Icon = feature.icon;

 return (
    <FadeIn
      key={feature.title}
      delay={0.4 + index * 0.1}
    >
     <div
  className="
    group
    flex
    h-[285px]
    flex-col
    items-center
    rounded-[22px]
    border
    border-[#C8A44D]/10
    bg-white/75
    px-5
    py-6
    text-center
    shadow-[0_10px_28px_rgba(74,55,30,0.08)]
    backdrop-blur-sm
    transition-all
    duration-500
    hover:-translate-y-2
    hover:border-[#C8A44D]/30
    hover:shadow-[0_18px_40px_rgba(74,55,30,0.14)]
  "
>
                    {/* Icon */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#174D2C] text-[#D5B15B] shadow-lg transition-transform duration-500 group-hover:scale-110">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    {/* Card Title */}
                    <h3 className="mt-4 min-h-[52px] font-serif text-[20px] font-semibold leading-6 text-[#24201C]">
                      {feature.title}
                    </h3>

                    {/* Small Gold Line */}
                    <div className="mx-auto my-4 h-px w-8 bg-[#C8A44D]" />

                    {/* Description */}
                    <p className="mt-auto max-w-[160px] text-[14px] leading-7 text-[#666]">
                      {feature.description}
                    </p>
                 </div>
</FadeIn>
);
              })}

            </div>
          </div>
          

          {/* RIGHT IMAGE */}
      
<FadeIn delay={0.3}>
  <div className="relative mx-auto w-full max-w-[680px]">

            {/* Gold decorative outline */}
            <div className="absolute -inset-3 rounded-[38px] border border-[#C8A44D]/30" />

            {/* Image */}
            <div className="relative h-[420px] overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(46,35,20,0.22)] sm:h-[520px] lg:h-[690px]">
             <div className="relative h-full w-full overflow-hidden rounded-[2rem]"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
<AnimatePresence
  initial={false}
  custom={direction}
  mode="wait"
>
 <motion.div
  key={currentImage}
  custom={direction}
  variants={variants}
  initial="enter"
  animate="center"
  exit="exit"

  transition={{
    x: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
    opacity: {
      duration: 0.25,
    },
    scale: {
      duration: 0.25,
    },
  }}

  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.25}
  onDragEnd={handleDragEnd}

  className="absolute inset-0 cursor-grab active:cursor-grabbing"
>
  <Image
    src={interiorImages[currentImage]}
    alt="Dakshinapaaka Interior"
    fill
    priority
    className="object-cover scale-105 transition-transform duration-[7000ms]"
  />
</motion.div>
</AnimatePresence>
  {/* Previous */}
<button
  onClick={prevImage}
  className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white"
>
  <ChevronLeft className="h-6 w-6" />
</button>

{/* Next */}
<button
  onClick={nextImage}
  className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white"
>
  <ChevronRight className="h-6 w-6" />
</button>

  {/* Image Counter */}
  <div className="absolute right-5 top-5 z-20 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white backdrop-blur-md">
    {String(currentImage + 1).padStart(2, "0")} /
    {" "}
    {String(interiorImages.length).padStart(2, "0")}
  </div>

{/* Indicators */}
<div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
  {interiorImages.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentImage(index)}
      className={`transition-all duration-300 ${
        currentImage === index
          ? "h-2.5 w-8 rounded-full bg-[#C8A44D]"
          : "h-2.5 w-2.5 rounded-full bg-white/70 hover:bg-white"
      }`}
    />
  ))}
</div>

</div>

              {/* Image gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Brand Card */}
            <div className="absolute bottom-5 right-5 rounded-[24px] border border-[#C8A44D]/60 bg-[#173D28]/95 px-6 py-5 text-center shadow-2xl backdrop-blur-md sm:bottom-8 sm:right-8 sm:px-8 sm:py-6">
              <div className="mb-2 text-[#D5B15B]">
                ✦
              </div>

              <p className="font-serif text-base leading-6 text-[#E6C875] sm:text-lg">
                Serving Authentic
                <br />
                South Indian Cuisine
              </p>

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[3px] text-[#D5B15B] sm:text-xs">
                Made with Love
              </p>
            </div>

          </div>
          </FadeIn>
        </div>
      </div>

      

      {/* Bottom decorative strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#173D28] via-[#C8A44D] to-[#173D28]" />
    </section>
  );
}