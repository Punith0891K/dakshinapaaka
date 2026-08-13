"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { X, Flame, Clock, Users, Leaf, ChefHat, Sparkles } from "lucide-react";
import { signatureDishes, type SignatureDish } from "@/data/signatureDishes";
import { useEffect } from "react";

interface DishDetailSheetProps {
  dish: SignatureDish;
  onClose: () => void;
  /** Optional callback so the sheet can jump to a related dish inline. */
  onSelectRelated?: (dish: SignatureDish) => void;
}

export default function DishDetailSheet({
  dish,
  onClose,
  onSelectRelated,
}: DishDetailSheetProps) {
  // Swipe-down-to-dismiss (mobile). The sheet content stays visible while
  // the user drags — release past 120px OR fast downward velocity closes.
  const y = useMotionValue(0);
  const overlayOpacity = useTransform(y, [0, 400], [0.65, 0]);
  const sheetScale = useTransform(y, [0, 400], [1, 0.96]);

  // Lock body scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const related = signatureDishes
    .filter((d) => d.id !== dish.id && d.category === dish.category)
    .slice(0, 3);

  return (
    <>
      <motion.div
        style={{ opacity: overlayOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-testid="dish-sheet-backdrop"
        className="fixed inset-0 z-[1200] bg-black backdrop-blur-md"
      />

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.35 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 500) onClose();
        }}
        style={{ y, scale: sheetScale }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-x-0 bottom-0 z-[1201] flex h-[92dvh] max-w-full flex-col overflow-hidden rounded-t-[34px] bg-gradient-to-b from-[#FFFDF9] via-[#FBF5E6] to-[#F8EEDA] shadow-[0_-24px_60px_rgba(0,0,0,0.28)] sm:mx-auto sm:h-[88dvh] sm:max-w-2xl sm:rounded-[34px]"
        data-testid={`dish-sheet-${dish.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dish-title-${dish.id}`}
      >
        {/* Drag indicator */}
        <div className="relative z-30 flex shrink-0 justify-center pb-2 pt-3">
          <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#EAD8A6] via-[#C8A44D] to-[#EAD8A6] shadow-[0_1px_6px_rgba(200,164,77,0.35)]" />
        </div>

        {/* Close — sits above the scroll container so it stays reachable
            even when the sheet content is scrolled. */}
        <motion.button
          onClick={onClose}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05, rotate: 90 }}
          className="absolute right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-xl shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-shadow duration-300"
          aria-label="Close dish details"
          data-testid={`dish-sheet-close-${dish.id}`}
        >
          <X size={20} strokeWidth={2} />
        </motion.button>

        {/* Scrollable body */}
        <div className="relative flex-1 overflow-y-auto overscroll-contain">
          {/* Hero image */}
          <motion.div
            layoutId={`dish-image-${dish.id}`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="relative h-[260px] overflow-hidden sm:h-[320px]"
          >
            <Image
              fill
              src={dish.image}
              alt={dish.name}
              sizes="(max-width: 640px) 100vw, 640px"
              priority
              className="object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/85 via-[#0F0F0F]/25 to-transparent" />

            {/* Category chip */}
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
              {dish.category}
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-24 sm:right-28">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F4D06F]">
                {dish.badge}
              </p>
              <motion.h1
                layoutId={`dish-title-${dish.id}`}
                id={`dish-title-${dish.id}`}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="mt-2 font-serif text-[26px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px]"
              >
                {dish.name}
              </motion.h1>
            </div>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-5 -mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-[#E3D5B3] bg-white/85 p-3 shadow-[0_18px_40px_rgba(45,35,15,0.12)] backdrop-blur-xl sm:mx-8 sm:gap-3 sm:p-4"
          >
            <MetaItem
              icon={<Clock size={16} className="text-[#174D32]" />}
              label="Prep Time"
              value={dish.prepTime ?? "—"}
            />
            <MetaItem
              icon={<Users size={16} className="text-[#174D32]" />}
              label="Serves"
              value={dish.servingSize ?? "—"}
            />
            <MetaItem
              icon={<Flame size={16} className="text-[#C24B3A]" />}
              label="Spice"
              value={<SpiceMeter level={dish.spiceLevel ?? 0} />}
            />
          </motion.div>

          {/* Dietary chips */}
          {dish.dietary && dish.dietary.length > 0 && (
            <div className="mx-5 mt-4 flex flex-wrap gap-2 sm:mx-8">
              {dish.dietary.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-[#174D32]/25 bg-[#F1EED5] px-3 py-1 text-[11px] font-medium text-[#174D32]"
                >
                  <Leaf size={11} strokeWidth={2.2} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mx-5 mt-6 sm:mx-8 sm:mt-8">
            <p className="font-serif text-[16px] leading-[1.75] text-[#3E3527] sm:text-[17px]">
              {dish.description}
            </p>
          </div>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mx-5 mt-8 sm:mx-8"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[#C8A44D]">❦</span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8C6A2D]">
                  Made With
                </p>
                <span className="h-px flex-1 bg-gradient-to-r from-[#C8A44D]/50 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-[#E3D5B3] bg-white px-3 py-1.5 text-[12px] font-medium text-[#5F5241] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chef's note */}
          {dish.chefNote && (
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mx-5 mt-8 overflow-hidden rounded-2xl border border-[#D8C89F] bg-gradient-to-br from-[#174D32] to-[#0F3722] p-6 text-white sm:mx-8 sm:p-7"
            >
              <div className="flex items-center gap-2">
                <ChefHat size={16} className="text-[#F4D06F]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#F4D06F]">
                  Chef&apos;s Note
                </p>
              </div>
              <p className="mt-3 font-serif text-[15px] italic leading-[1.65] text-white/90 sm:text-[17px]">
                &ldquo;{dish.chefNote}&rdquo;
              </p>
              {dish.pairing && (
                <p className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#F4D06F]/80">
                  <Sparkles size={12} /> {dish.pairing}
                </p>
              )}
            </motion.blockquote>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mx-5 mt-10 mb-6 sm:mx-8 sm:mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[#C8A44D]">✦</span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8C6A2D]">
                  You Might Also Love
                </p>
                <span className="h-px flex-1 bg-gradient-to-r from-[#C8A44D]/50 to-transparent" />
              </div>
              <div className="dp-thumb-scroller -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelectRelated?.(r)}
                    data-testid={`related-dish-${r.id}`}
                    className="group flex w-[180px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#E3D5B3] bg-white text-left shadow-[0_10px_25px_rgba(45,35,15,0.08)] transition-all hover:-translate-y-1 hover:border-[#C8A44D] hover:shadow-[0_18px_40px_rgba(45,35,15,0.18)] sm:w-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] uppercase tracking-[0.24em] text-[#C8A44D]">
                        {r.category}
                      </p>
                      <p className="mt-1 line-clamp-2 font-serif text-[14px] leading-tight text-[#1E1E1E]">
                        {r.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mx-5 mb-8 flex flex-col gap-3 sm:mx-8 sm:flex-row">
            <a
              href="#menu"
              onClick={onClose}
              data-testid={`view-in-menu-${dish.id}`}
              className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#174D32] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_35px_rgba(23,77,50,0.25)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1E5C3A] hover:shadow-[0_22px_45px_rgba(23,77,50,0.35)]"
            >
              View in Full Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="tel:+919999999999"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#174D32]/25 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#174D32] transition-all hover:border-[#174D32] hover:bg-[#F1EED5]"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-[#FFFDF8] px-2 py-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1EED5] sm:h-9 sm:w-9">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C6A2D] sm:text-[10px]">
          {label}
        </p>
        <div className="text-[12px] font-semibold text-[#1E1E1E] sm:text-[13px]">
          {value}
        </div>
      </div>
    </div>
  );
}

function SpiceMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <Flame
          key={i}
          size={12}
          strokeWidth={2}
          className={
            i < level ? "fill-[#C24B3A] text-[#C24B3A]" : "text-[#C24B3A]/25"
          }
        />
      ))}
      {level === 0 && (
        <span className="ml-1 text-[10px] uppercase text-[#8C6A2D]">Mild</span>
      )}
    </span>
  );
}
