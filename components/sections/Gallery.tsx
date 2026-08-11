"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { galleryImages, type GalleryCategory, type GalleryImage } from "@/data/gallery";

const FILTERS: Array<"All" | GalleryCategory> = [
  "All",
  "Dishes",
  "Exterior & Interior",
  "Others",
];

const AUTOPLAY_MS = 4000;
const DRAG_THRESHOLD_RATIO = 0.2;
const DRAG_VELOCITY_THRESHOLD = 400;

export default function Gallery() {
  const [active, setActive] = useState<"All" | GalleryCategory>("All");
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active]
  );

  const canScroll = items.length > 1;

  // Reset to the first slide whenever the filter changes.
  useEffect(() => {
    setIndex(0);
  }, [active]);

  // Measure the real rendered card width + gap so the track can be
  // translated by exact pixels — this keeps the "peek" effect correct at
  // every breakpoint without duplicating breakpoint widths in JS.
  useEffect(() => {
    const measure = () => {
      if (!firstCardRef.current || !trackRef.current) return;
      const rect = firstCardRef.current.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || "0");
      setStep(rect.width + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (items.length ? (i + 1) % items.length : 0));
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
  }, [items.length]);

  // Autoplay — advances every 4s, pauses on hover, drag, or while the
  // lightbox is open. Depending on `index` here means the timer restarts
  // cleanly after every manual step too, so the cadence always feels
  // consistent rather than double-firing right after a click/swipe.
  useEffect(() => {
    if (!canScroll || hovering || isDragging || lightboxIndex !== null) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [canScroll, hovering, isDragging, lightboxIndex, next, index]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#FAF7F2] py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient background, matching the Menu section's treatment */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(200,164,77,0.10),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(47,107,61,0.08),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />

      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[#C89B3C]/30 bg-white/90 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8C6A2D] sm:text-xs sm:tracking-[0.35em]">
            Our Gallery
          </span>

          <h2 className="mt-5 font-serif text-[clamp(2.6rem,8vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-[#143C34]">
            A Glimpse Into
            <br />
            <span className="text-[#0F5B43]">Dakshinapaaka</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#5B5B5B] sm:text-lg sm:leading-8">
            From our kitchen to our doorstep — a visual taste of the food,
            the space and the people behind every plate.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-[#E7DDC5] bg-white/80 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className="relative rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 sm:text-sm"
              >
                {active === f && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#174D32]"
                    transition={{ type: "spring", stiffness: 340, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === f
                      ? "text-white"
                      : "text-[#5B5B45] hover:text-[#174D32]"
                  }`}
                >
                  {f}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 sm:mt-14"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Edge fade masks so the "peek" card dissolves into the page
              instead of ending in a hard crop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#FAF7F2] to-transparent sm:w-16 lg:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#FAF7F2] to-transparent sm:w-16 lg:w-24" />

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                ref={trackRef}
                className="flex gap-5 sm:gap-6 lg:gap-7"
                drag={canScroll ? "x" : false}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_event, info) => {
                  setIsDragging(false);
                  if (!canScroll || !step) return;
                  const threshold = step * DRAG_THRESHOLD_RATIO;
                  if (
                    info.offset.x < -threshold ||
                    info.velocity.x < -DRAG_VELOCITY_THRESHOLD
                  ) {
                    next();
                  } else if (
                    info.offset.x > threshold ||
                    info.velocity.x > DRAG_VELOCITY_THRESHOLD
                  ) {
                    prev();
                  }
                }}
                // NOTE: `initial` sets opacity to 0 for the filter-change
                // fade-in. `animate` is the *complete* target state — any
                // property that's in `initial` but missing from `animate`
                // never gets animated back, so it was previously stuck
                // invisible forever. `opacity: 1` here is the fix.
                animate={{ x: -index * step, opacity: 1 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 34 },
                  opacity: { duration: 0.3 },
                }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                {items.map((img, i) => (
                  <div
                    key={img.id}
                    ref={i === 0 ? firstCardRef : undefined}
                    className="group relative w-[76vw] max-w-[300px] flex-shrink-0 cursor-pointer select-none sm:w-[46vw] sm:max-w-[360px] lg:w-[380px] xl:w-[400px]"
                    onClick={() => !isDragging && setLightboxIndex(i)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-[#E7DDC5] bg-[#151515] shadow-[0_20px_45px_rgba(0,0,0,0.14)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.22)]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 400px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#174D32] backdrop-blur-sm">
                        {img.category}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                        <h3 className="font-serif text-2xl text-white">
                          {img.title}
                        </h3>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                          <ZoomIn size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows — desktop only; mobile relies on drag */}
          {canScroll && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-0 top-[calc(50%-24px)] z-20 hidden h-12 w-12 -translate-x-6 items-center justify-center rounded-full border border-[#E7DDC5] bg-white text-[#174D32] shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white md:flex"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="absolute right-0 top-[calc(50%-24px)] z-20 hidden h-12 w-12 translate-x-6 items-center justify-center rounded-full border border-[#E7DDC5] bg-white text-[#174D32] shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white md:flex"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </motion.div>

        {/* Autoplay progress + dots */}
        {canScroll && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-[#C8A44D]/20 sm:w-56">
              {!hovering && !isDragging && lightboxIndex === null && (
                <motion.div
                  key={`${active}-${index}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="h-full bg-[#174D32]"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === index
                        ? "w-7 bg-[#174D32]"
                        : "w-1.5 bg-[#C8A44D]/40 group-hover:bg-[#C8A44D]/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <GalleryLightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length))
        }
        onPrev={() =>
          setLightboxIndex((i) =>
            i === null ? null : (i - 1 + items.length) % items.length
          )
        }
      />
    </section>
  );
}

function GalleryLightbox({
  items,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  items: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    if (index === null) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onNext, onPrev]);

  const active = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-xl"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-[#C8A44D] hover:text-[#173F2D]"
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:left-8"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:right-8"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] flex max-h-[85vh] max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-[88vw] max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[70vh] sm:w-[80vw]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                {active.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                {active.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
