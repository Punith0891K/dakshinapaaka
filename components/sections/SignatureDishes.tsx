"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Flame, Clock, Sparkles } from "lucide-react";
import { signatureDishes, type SignatureDish } from "@/data/signatureDishes";
import SignatureCollectionModal from "@/components/ui/SignatureCollectionModal";
import SignatureCollectionMobile from "@/components/ui/SignatureCollectionMobile";
import DishDetailSheet from "@/components/ui/DishDetailSheet";
import {
  fadeUp,
  staggerContainer,
  cardVariant,
} from "@/lib/animations";

export default function SignatureDishes() {
  const [openCollection, setOpenCollection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDish, setSelectedDish] = useState<SignatureDish | null>(null);

  const homepageDishes = signatureDishes.filter((dish) =>
    [1, 2, 5, 6].includes(dish.id)
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="signature-dishes"
      data-testid="signature-dishes-section"
      className="relative overflow-hidden bg-[#F8F3E9]"
    >
      <div
        className="signature-dishes-canvas relative overflow-hidden pt-14 pb-24 lg:pt-20 lg:pb-32"
        style={{
          backgroundImage:
            "url('/images/hero/signature_bg1.png'), url('/images/hero/signature_scene2.png'), linear-gradient(180deg, #faf3e4 0%, #f8f3e9 100%)",
          backgroundSize: "100% auto, 100% auto, 100% 100%",
          backgroundPosition: "top center, center 66.667vw, center",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        }}
      >
        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFF9EE]/3 via-transparent to-[#FFF9EE]/10" />
        <div className="mobile-signature-canvas-fade pointer-events-none absolute inset-x-0 z-[1] lg:hidden" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-[#F8F3E9] sm:h-56 lg:h-72" />

        {/* Floating spice particles — subtle luxury motion */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#C8A44D]/40"
              style={{
                left: `${(i * 137) % 100}%`,
                top: `${(i * 71) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Decorative Mandala */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-8 flex justify-center opacity-[0.06]"
          initial={{ rotate: -8, scale: 1.15 }}
          whileInView={{ rotate: 0, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Side text */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-[1] hidden -translate-y-1/2 -rotate-90 lg:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2F6B3D]/30">
            Authentic South Indian Cuisine
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Heading */}
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center lg:mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="mb-7 flex items-center justify-center sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-5">
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#C8A44D]/60 to-[#C8A44D] sm:w-20" />
                <div className="relative flex items-center justify-center">
                  <span className="text-2xl text-[#C8A44D]">❋</span>
                  <div className="absolute h-10 w-10 rounded-full border border-[#C8A44D]/20" />
                </div>
                <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#C8A44D]/60 to-[#C8A44D] sm:w-20" />
              </div>
            </div>

            <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-px w-6 bg-[#C8A44D]/60 sm:w-10" />
              <span className="text-[#C8A44D]">✦</span>
              <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.32em] text-[#2F6B3D] sm:text-xs sm:tracking-[0.4em]">
                A Taste of Tradition
              </p>
              <span className="text-[#C8A44D]">✦</span>
              <span className="h-px w-6 bg-[#C8A44D]/60 sm:w-10" />
            </div>

            <h2 className="mx-auto max-w-[20rem] text-balance font-serif text-[clamp(2.25rem,9.5vw,2.85rem)] font-semibold leading-[0.96] tracking-[-0.025em] text-[#1E1E1E] sm:max-w-none sm:text-5xl lg:text-6xl">
              <span className="block">Dakshina Paaka&apos;s</span>
              <span className="block">
                Signature <em className="font-normal italic text-[#2F6B3D]">Dishes</em>
              </span>
            </h2>

            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8A44D]" />
              <span className="text-lg text-[#C8A44D]">✦</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8A44D]" />
            </div>

            <p className="mx-auto mt-6 max-w-[22rem] text-pretty text-[16px] leading-8 text-[#6B5B45] sm:max-w-2xl sm:text-lg md:text-xl">
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
            viewport={{ once: true, amount: 0.15 }}
          >
            {homepageDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelect={() => setSelectedDish(dish)}
              />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-10 text-center lg:mt-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="mx-auto max-w-[20rem] text-center font-serif text-[26px] italic leading-tight text-[#7A6440] lg:text-[24px]">
              Discover more signature dishes crafted with authentic flavours.
            </p>

            <button
              type="button"
              aria-haspopup="dialog"
              data-testid="explore-more-signature-btn"
              onClick={() => setOpenCollection(true)}
              className="group mx-auto mt-8 flex max-w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[#174D32] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_14px_35px_rgba(23,77,50,0.25)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#1E5C3A] hover:shadow-[0_22px_50px_rgba(23,77,50,0.35)] sm:inline-flex sm:px-10 sm:py-5 sm:text-sm sm:tracking-[0.18em]"
            >
              Explore More Signature Dishes
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>

        {/* Collection modal (browse all) */}
        {isMobile ? (
          <SignatureCollectionMobile
            open={openCollection}
            onClose={() => setOpenCollection(false)}
          />
        ) : (
          <SignatureCollectionModal
            open={openCollection}
            onClose={() => setOpenCollection(false)}
          />
        )}

        {/* Direct detail sheet — opens when a home card is tapped */}
        <AnimatePresence>
          {selectedDish && (
            <DishDetailSheet
              dish={selectedDish}
              onClose={() => setSelectedDish(null)}
              onSelectRelated={(d) => setSelectedDish(d)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

interface DishCardProps {
  dish: SignatureDish;
  onSelect: () => void;
}

function DishCard({ dish, onSelect }: DishCardProps) {
  return (
    <motion.article
      variants={cardVariant}
      layoutId={`dish-card-${dish.id}`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group relative isolate h-[440px] cursor-pointer overflow-hidden rounded-[30px] border border-[#C8A44D]/25 bg-black shadow-[0_18px_50px_rgba(49,39,22,0.12)] transition-shadow duration-500 hover:border-[#C8A44D]/50 hover:shadow-[0_30px_80px_rgba(49,39,22,0.22)] sm:h-[480px] lg:h-[520px]"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`View details for ${dish.name}`}
      data-testid={`signature-card-${dish.id}`}
    >
      {/* Food image with layoutId for shared-element transition into sheet */}
      <motion.div
        layoutId={`dish-image-${dish.id}`}
        className="absolute inset-0"
      >
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
      </motion.div>

      {/* Cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/5" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Shimmer sweep on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100%] rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:animate-[dp-sig-shine_1.2s_ease-out]" />
      </div>
      <style>{`
        @keyframes dp-sig-shine {
          from { transform: translateX(-40%) rotate(12deg); }
          to { transform: translateX(60%) rotate(12deg); }
        }
      `}</style>

      {/* Top row: category + brand */}
      <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-2 sm:inset-x-7 lg:inset-x-8">
        <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
          {dish.category}
        </span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:inline">
          Dakshina paaka
        </span>
      </div>

      {/* Quick facts strip (spice + prep) */}
      <div className="absolute right-6 top-16 z-10 hidden flex-col items-end gap-1.5 sm:flex sm:right-7 lg:right-8">
        {dish.prepTime && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] text-white/90 backdrop-blur-md">
            <Clock size={11} /> {dish.prepTime}
          </span>
        )}
            {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#F4A56D]/40 bg-[#C24B3A]/25 px-2.5 py-1 text-[10px] text-[#F4A56D] backdrop-blur-md">
                <Flame size={11} strokeWidth={2.2} />
                <span className="ml-0.5 uppercase tracking-widest">
                  {dish.spiceLevel === 3 ? "Spicy" : dish.spiceLevel === 2 ? "Medium" : "Mild"}
                </span>
              </span>
            )}
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 lg:p-10">
        <motion.div
          className="mb-5 h-px w-12 bg-[#C8A44D] transition-all duration-500 group-hover:w-24"
        />

        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F4D06F]">
          <Sparkles size={12} className="text-[#F4D06F]" /> {dish.badge}
        </p>

        <motion.h3
          layoutId={`dish-title-${dish.id}`}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="max-w-md font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl"
        >
          {dish.name}
        </motion.h3>

        <p className="mt-4 line-clamp-3 max-w-md text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
          {dish.description}
        </p>

        {/* Highlight chips */}
        {dish.highlights && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {dish.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-[#C8A44D]/40 bg-white/8 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur-sm"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* View details affordance */}
        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F4D06F] transition-all duration-300 group-hover:tracking-[0.28em]">
            View Details
          </span>
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A44D]/50 bg-[#C8A44D]/15 text-[#F4D06F] backdrop-blur-md transition-all duration-300 group-hover:border-[#C8A44D] group-hover:bg-[#C8A44D] group-hover:text-[#0A1712]"
            whileHover={{ rotate: 45, scale: 1.05 }}
          >
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </motion.span>
        </div>
      </div>

      {/* Inset ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/10" />
    </motion.article>
  );
}
