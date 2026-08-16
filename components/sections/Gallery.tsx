"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  // Both scenes drift *into* the section as it travels the viewport —
  // never out of it — so the 64px bleed always covers the travel and no
  // painted edge (lamp, leaves, lotus) is ever clipped by the overflow.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sceneOneY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 48]),
    { stiffness: 60, damping: 20 }
  );
  const sceneTwoY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -48]),
    { stiffness: 60, damping: 20 }
  );

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

  // Measure the real rendered card width + gap so the track translates by
  // exact pixels — keeps the peek correct at every breakpoint.
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

  // Autoplay — pauses on hover, drag, or open lightbox. Depending on `index`
  // restarts the timer after every manual step so the cadence stays even.
  useEffect(() => {
    if (!canScroll || hovering || isDragging || lightboxIndex !== null) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [canScroll, hovering, isDragging, lightboxIndex, next, index]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      data-testid="gallery-section"
      className="relative overflow-hidden scroll-mt-24 bg-[#FAF6EE] pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      {/* ============================================================
         Background: Scene 1 → Scene 2, one continuous heritage canvas.
         Both scenes render full-bleed at their natural aspect ratio (no
         crop, no zoom) with long multi-stop dissolves, so the artwork is
         fully present and its painted edges stay intentional. A soft
         veil keeps type readable without dimming the scenes.
         Layer order: base → scenes → veil → warmth → rings → grain.
         Everything here is z-0 + pointer-events-none; content sits at z-10.
         ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Parchment base */}
        <div className="absolute inset-0 bg-[#FAF6EE]" />

        {/* Scene 1 — temple by the water, full-bleed from the top.
            Extra vertical bleed covers the parallax drift, so the artwork
            itself never scales and its painted edges stay intentional. */}
        <motion.div
          style={reduceMotion ? undefined : { y: sceneOneY }}
          className="absolute inset-x-0 -top-16 opacity-[0.9] will-change-transform [transform:translateZ(0)] sm:opacity-100"
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: "1672 / 941",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.6) 68%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.6) 68%, transparent 92%)",
            }}
          >
            <Image
              src="/images/gallery/bg_scene3.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Scene 2 — courtyard pillar and lamp, full-bleed from the bottom */}
        <motion.div
          style={reduceMotion ? undefined : { y: sceneTwoY }}
          className="absolute -bottom-16 inset-x-0 opacity-[0.9] will-change-transform [transform:translateZ(0)] sm:opacity-100"
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: "1672 / 941",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 18%, black 40%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 18%, black 40%, black 100%)",
            }}
          >
            <Image
              src="/images/gallery/bg_scene.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
        </motion.div>

        {/* Soft ivory veil — only enough to keep type readable;
            the artwork stays present right up to the content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_52%_at_50%_46%,rgba(250,246,238,0.42),rgba(250,246,238,0.12)_60%,transparent_82%)]" />

        {/* Antique-gold warmth at the crown */}
        <div className="absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(200,164,77,0.12),transparent_70%)]" />

        {/* Heritage ring motifs — outer edges only, desktop only */}
        <div className="absolute -right-28 top-16 hidden h-[26rem] w-[26rem] rounded-full border border-[#C8A44D]/15 sm:block" />
        <div className="absolute -right-16 top-28 hidden h-72 w-72 rounded-full border border-[#C8A44D]/10 sm:block" />
        <div className="absolute -left-28 bottom-16 hidden h-[26rem] w-[26rem] rounded-full border border-[#C8A44D]/15 sm:block" />
        <div className="absolute -left-16 bottom-28 hidden h-72 w-72 rounded-full border border-[#C8A44D]/10 sm:block" />

        {/* Kolam-style dotted motif — small, quiet accent tucked into the
            top corners so the canvas feels a touch more handcrafted
            without competing with the scenes underneath */}
        <svg
          aria-hidden
          className="absolute left-4 top-8 hidden h-16 w-16 text-[#C8A44D]/25 sm:block lg:left-8"
          viewBox="0 0 64 64"
          fill="none"
        >
          {[
            [8, 8], [24, 8], [40, 8], [56, 8],
            [8, 24], [56, 24],
            [8, 40], [56, 40],
            [8, 56], [24, 56], [40, 56], [56, 56],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill="currentColor" />
          ))}
        </svg>
        <svg
          aria-hidden
          className="absolute right-4 top-8 hidden h-16 w-16 rotate-90 text-[#C8A44D]/25 sm:block lg:right-8"
          viewBox="0 0 64 64"
          fill="none"
        >
          {[
            [8, 8], [24, 8], [40, 8], [56, 8],
            [8, 24], [56, 24],
            [8, 40], [56, 40],
            [8, 56], [24, 56], [40, 56], [56, 56],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill="currentColor" />
          ))}
        </svg>

        {/* Slow, cheap ambient warmth pulse — opacity-only animation so it
            stays GPU-composited and doesn't touch layout on scroll */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,164,77,0.07),transparent_70%)] will-change-[opacity]"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fine paper grain over everything, softened well before the
            floor so it never sits on top of the dissolve below */}
        <div className="absolute inset-0 bottom-40 opacity-[0.035] mix-blend-multiply [background-image:radial-gradient(circle_at_22%_25%,rgba(70,52,18,.55)_1px,transparent_1.5px),radial-gradient(circle_at_74%_46%,rgba(70,52,18,.4)_1px,transparent_1.5px),radial-gradient(circle_at_42%_82%,rgba(70,52,18,.45)_1px,transparent_1.5px)] [background-size:24px_24px] sm:bottom-56 lg:bottom-72" />

        {/* ---- Seam into Testimonials ----
            One long dissolve — cream, through a warm amber-olive midpoint,
            down to the *exact* deep emerald Testimonials opens on
            (#0A1F16) — so the two sections meet at one identical pixel
            color instead of two independent gradients fighting for the
            same few rows (that mismatch was the hard line you were
            seeing). Testimonials no longer re-introduces cream at its own
            top; it only echoes the halo below, so the glow reads as one
            continuous light spanning both sections. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent_0%,rgba(140,106,45,0.18)_38%,#12271D_72%,#0A1F16_100%)] sm:h-56 lg:h-72" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(200,164,77,0.14),transparent_75%)]" />

        {/* Gold stitch — the single, intentional mark of the handoff */}
        <div className="absolute inset-x-0 bottom-0 z-[1] flex items-center justify-center gap-4 px-10 pb-4">
          <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-[#E9CE85]/60" />
          <span className="h-2 w-2 rotate-45 border border-[#E9CE85]/80" />
          <span className="h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#E9CE85]/60" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        {/* Header — eyebrow, masked line-by-line kinetic reveal, gold flourish */}
        <div className="text-center">
          <motion.span
            data-testid="gallery-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C8A44D]/35 bg-white/75 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8C6A2D] backdrop-blur-sm sm:text-xs sm:tracking-[0.38em]"
          >
            <span className="h-1 w-1 rotate-45 bg-[#C8A44D]" />
            Our Gallery
            <span className="h-1 w-1 rotate-45 bg-[#C8A44D]" />
          </motion.span>

          <h2 className="mt-6 font-serif text-[clamp(2.4rem,7.5vw,4.4rem)] leading-[1.04] tracking-[-0.02em] text-[#143C34]">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                A Glimpse Into
              </motion.span>
            </span>
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] pr-[0.08em]">
              <motion.span
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-[#0F5B43]"
              >
                Dakshinapaaka
              </motion.span>
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 flex w-40 items-center justify-center gap-3"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A44D]/70" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#C8A44D]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A44D]/70" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#5B5B5B] sm:text-lg sm:leading-8"
          >
            From our kitchen to our doorstep — a visual taste of the food,
            the space and the people behind every plate.
          </motion.p>
        </div>

        {/* Filter tabs — compact scrollable strip on mobile, hugging pill on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 sm:mt-12"
        >
          <div className="-mx-5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-1 rounded-full border border-[#C8A44D]/30 bg-[#FFFDF8]/85 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_36px_rgba(140,106,45,0.10)] backdrop-blur-md sm:flex-wrap sm:justify-center sm:p-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  data-testid={`gallery-filter-${f.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  onClick={() => setActive(f)}
                  className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 sm:py-2.5 sm:text-sm"
                >
                  {active === f && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      className="absolute inset-0 rounded-full bg-[#174D32] shadow-[0_8px_22px_rgba(23,77,50,0.35)]"
                      transition={{ type: "spring", stiffness: 340, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active === f
                        ? "text-[#F7EFD9]"
                        : "text-[#5B5B45] hover:text-[#174D32]"
                    }`}
                  >
                    {f}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Carousel — the peeking card dissolves through a soft mask */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 sm:mt-14"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => setHovering(false)}
        >
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,black_0%,black_calc(100%_-_2.5rem),transparent_100%)] sm:[mask-image:linear-gradient(to_right,black_0%,black_calc(100%_-_5rem),transparent_100%)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                ref={trackRef}
                className="flex gap-4 will-change-transform sm:gap-6 lg:gap-7"
                drag={canScroll ? "x" : false}
                dragMomentum={false}
                dragElastic={0.08}
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
                // `animate` must restate every property set in `initial`,
                // otherwise it never animates back — opacity: 1 is the fix.
                animate={{ x: -index * step, opacity: 1 }}
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 32 },
                  opacity: { duration: 0.3 },
                }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                {items.map((img, i) => (
                  <div
                    key={img.id}
                    ref={i === 0 ? firstCardRef : undefined}
                    data-testid={`gallery-card-${img.id}`}
                    className="group relative w-[72vw] max-w-[320px] flex-shrink-0 cursor-pointer select-none sm:w-[46vw] sm:max-w-[360px] lg:w-[380px] xl:w-[400px]"
                    onClick={() => !isDragging && setLightboxIndex(i)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#E7DDC5] bg-[#151515] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_18px_44px_-14px_rgba(45,35,15,0.28)] transition-[transform,box-shadow,border-color] duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#C8A44D]/55 group-hover:shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_32px_70px_-18px_rgba(45,35,15,0.36)]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 72vw, (max-width: 1024px) 46vw, 400px"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C120E]/85 via-[#0C120E]/15 to-transparent" />

                      {/* Whisper of a gold frame on hover */}
                      <div className="pointer-events-none absolute inset-3 rounded-[18px] border border-white/0 transition-colors duration-500 group-hover:border-[#E9D9A8]/35" />

                      <span className="absolute left-4 top-4 rounded-full border border-[#C8A44D]/35 bg-[#FBF6E9]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E531F] backdrop-blur-sm sm:left-5 sm:top-5 sm:px-3.5">
                        {img.category}
                      </span>

                      <span className="absolute right-5 top-5 font-serif text-sm italic text-white/75">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                        <h3 className="font-serif text-[22px] leading-tight text-white sm:text-2xl">
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

          {/* Arrows — desktop only; mobile relies on drag.
              Positioned inside the container (inset positive) so they never
              cause horizontal overflow on smaller desktop widths. */}
          {canScroll && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                data-testid="gallery-prev-button"
                onClick={prev}
                className="absolute left-2 top-[calc(50%-24px)] z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-[#E7DDC5] bg-white/95 text-[#174D32] shadow-[0_14px_30px_rgba(45,35,15,0.16)] backdrop-blur-sm transition-[transform,background-color,color,border-color] duration-300 hover:scale-110 hover:border-[#174D32] hover:bg-[#174D32] hover:text-[#F7EFD9] md:flex lg:left-4"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                data-testid="gallery-next-button"
                onClick={next}
                className="absolute right-2 top-[calc(50%-24px)] z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-[#E7DDC5] bg-white/95 text-[#174D32] shadow-[0_14px_30px_rgba(45,35,15,0.16)] backdrop-blur-sm transition-[transform,background-color,color,border-color] duration-300 hover:scale-110 hover:border-[#174D32] hover:bg-[#174D32] hover:text-[#F7EFD9] md:flex lg:right-4"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </motion.div>

        {/* Editorial counter, autoplay progress, dots */}
        {canScroll && (
          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
            <span
              data-testid="gallery-counter"
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8C6A2D]"
            >
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 text-[#C8A44D]/70">/</span>
              {String(items.length).padStart(2, "0")}
            </span>

            <div className="h-[2px] w-36 overflow-hidden rounded-full bg-[#C8A44D]/20 sm:w-52">
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
                  data-testid={`gallery-dot-${i}`}
                  onClick={() => setIndex(i)}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-500 ${
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
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0B0F0C]/90 p-4 backdrop-blur-xl sm:p-6"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-testid="lightbox-close-button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-[transform,background-color,color] duration-300 hover:rotate-90 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:right-6 sm:top-6 sm:h-12 sm:w-12"
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                data-testid="lightbox-prev-button"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-[transform,background-color,color] duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:left-8 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                data-testid="lightbox-next-button"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-[transform,background-color,color] duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:right-8 sm:h-12 sm:w-12"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] flex max-h-[88vh] max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[54vh] w-[92vw] max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[68vh] sm:w-[80vw]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 640px) 92vw, 80vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-5 flex flex-col items-center text-center">
              <span className="mb-3 h-px w-12 bg-gradient-to-r from-transparent via-[#C8A44D]/80 to-transparent" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
                {active.category}
              </p>
              <h3 className="mt-2 font-serif text-xl text-white sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
                {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
