"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { X, Flame, Clock, Users, Leaf, ChefHat, Sparkles } from "lucide-react";
import { signatureDishes, type SignatureDish } from "@/data/signatureDishes";
import { useEffect } from "react";

interface DishDetailSheetProps {
  dish: SignatureDish;
  onClose: () => void;
  /** Optional callback so the sheet can jump to a related dish inline. */
  onSelectRelated?: (dish: SignatureDish) => void;
}

// A slow, weighted "easeOutExpo"-style curve. The deceleration reads as
// considered and unhurried rather than snappy — that unhurriedness is what
// makes a reveal feel premium instead of merely fast. Used for anything
// entering (opening).
const LUXE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The mirror image of LUXE_EASE — accelerates away instead of decelerating
// in. Closing should feel quicker and more decisive than opening, the way a
// heavy drawer is easy to push shut but was eased open carefully.
const LUXE_EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

// Overlay: a soft, slow bloom in; a quick fade on the way out so the page
// underneath feels immediately available again.
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.65,
    transition: { duration: 0.5, ease: LUXE_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.32, ease: LUXE_EASE_IN },
  },
};

// Sheet: rises into place with a weighted spring (a little settle at the
// end reads as considered), then drops away on a brisk tween — closing
// shouldn't linger. Scale + opacity are layered on top of the y-slide so
// the motion feels dimensional rather than a flat curtain.
const sheetVariants: Variants = {
  hidden: { y: "100%", opacity: 0.6 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
  },
  exit: {
    y: "100%",
    opacity: 0.7,
    transition: { duration: 0.4, ease: LUXE_EASE_IN },
  },
};

export default function DishDetailSheet({
  dish,
  onClose,
  onSelectRelated,
}: DishDetailSheetProps) {
  // Swipe-down-to-dismiss (mobile). The sheet content stays visible while
  // the user drags — release past 120px OR fast downward velocity closes.
  // This lives on its own motion value (separate from the mount/exit slide
  // below) — mixing a drag-tracked value into the same key that `variants`
  // also animates is what caused the open/close transitions to be skipped
  // entirely: an externally-created motion value always wins over a
  // declarative `initial`/`animate` target on the same property, so the
  // sheet was rendering at its final position from the very first frame.
  const dragY = useMotionValue(0);
  const sheetScale = useTransform(dragY, [0, 400], [1, 0.96]);

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
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        data-testid="dish-sheet-backdrop"
        className="fixed inset-0 z-[1200] bg-black backdrop-blur-md"
      />

      <motion.div
        variants={sheetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-x-0 bottom-0 z-[1201] max-w-full sm:mx-auto sm:max-w-2xl"
      >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.35 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 500) onClose();
        }}
        style={{ y: dragY, scale: sheetScale }}
        className="flex h-[92dvh] w-full max-w-full flex-col overflow-hidden rounded-t-[34px] bg-gradient-to-b from-[#FFFDF9] via-[#FBF5E6] to-[#F8EEDA] shadow-[0_-24px_60px_rgba(0,0,0,0.28)] sm:h-[88dvh] sm:rounded-[34px]"
        data-testid={`dish-sheet-${dish.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dish-title-${dish.id}`}
      >
        {/* Drag indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.35, ease: LUXE_EASE }}
          className="relative z-30 flex shrink-0 justify-center pb-2 pt-3"
        >
          <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#EAD8A6] via-[#C8A44D] to-[#EAD8A6] shadow-[0_1px_6px_rgba(200,164,77,0.35)]" />
        </motion.div>

        {/* Close — sits above the scroll container so it stays reachable
            even when the sheet content is scrolled. */}
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.14, duration: 0.4, ease: LUXE_EASE }}
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
            transition={{ type: "spring", stiffness: 210, damping: 30 }}
            className="relative h-[260px] overflow-hidden sm:h-[320px]"
          >
            {/* Slow Ken Burns settle — independent of the layout move so the
                shared-element transition stays crisp while the image itself
                still breathes in. */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: LUXE_EASE }}
              className="absolute inset-0"
            >
              <Image
                fill
                src={dish.image}
                alt={dish.name}
                sizes="(max-width: 640px) 100vw, 640px"
                priority
                className="object-cover object-[center_40%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/85 via-[#0F0F0F]/25 to-transparent" />

            {/* Category chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17, duration: 0.45, ease: LUXE_EASE }}
              className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md"
            >
              {dish.category}
            </motion.div>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-24 sm:right-28">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: LUXE_EASE }}
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F4D06F]"
              >
                {dish.badge}
              </motion.p>
              <motion.h1
                layoutId={`dish-title-${dish.id}`}
                id={`dish-title-${dish.id}`}
                transition={{ type: "spring", stiffness: 210, damping: 30 }}
                className="mt-2 font-serif text-[26px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px]"
              >
                {dish.name}
              </motion.h1>
            </div>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, ease: LUXE_EASE }}
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: LUXE_EASE }}
              className="mx-5 mt-4 flex flex-wrap gap-2 sm:mx-8"
            >
              {dish.dietary.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-[#174D32]/25 bg-[#F1EED5] px-3 py-1 text-[11px] font-medium text-[#174D32]"
                >
                  <Leaf size={11} strokeWidth={2.2} />
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.5, ease: LUXE_EASE }}
            className="mx-5 mt-6 sm:mx-8 sm:mt-8"
          >
            <p className="font-serif text-[16px] leading-[1.75] text-[#3E3527] sm:text-[17px]">
              {dish.description}
            </p>
          </motion.div>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: LUXE_EASE }}
              className="mx-5 mt-8 sm:mx-8"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[#C8A44D]">❦</span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8C6A2D]">
                  Made With
                </p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: LUXE_EASE }}
                  style={{ transformOrigin: "left" }}
                  className="h-px flex-1 bg-gradient-to-r from-[#C8A44D]/50 to-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing, i) => (
                  <motion.span
                    key={ing}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: LUXE_EASE }}
                    className="rounded-full border border-[#E3D5B3] bg-white px-3 py-1.5 text-[12px] font-medium text-[#5F5241] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                  >
                    {ing}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chef's note */}
          {dish.chefNote && (
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: LUXE_EASE }}
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: LUXE_EASE }}
              className="mx-5 mt-10 mb-6 sm:mx-8 sm:mb-8"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[#C8A44D]">✦</span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8C6A2D]">
                  You Might Also Love
                </p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: LUXE_EASE }}
                  style={{ transformOrigin: "left" }}
                  className="h-px flex-1 bg-gradient-to-r from-[#C8A44D]/50 to-transparent"
                />
              </div>
              <div className="dp-thumb-scroller -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
                {related.map((r, i) => (
                  <motion.button
                    key={r.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: LUXE_EASE }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectRelated?.(r)}
                    data-testid={`related-dish-${r.id}`}
                    className="group flex w-[180px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#E3D5B3] bg-white text-left shadow-[0_10px_25px_rgba(45,35,15,0.08)] transition-all duration-300 hover:border-[#C8A44D] hover:shadow-[0_18px_40px_rgba(45,35,15,0.18)] sm:w-full"
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
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: LUXE_EASE }}
            className="mx-5 mb-8 flex flex-col gap-3 sm:mx-8 sm:flex-row"
          >
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
          </motion.div>
        </div>
      </motion.div>
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
