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
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Camera,
  MessageSquare,
  Play,
  Pause,
  Share2,
  Check,
} from "lucide-react";
import { testimonials, testimonialStats } from "@/data/testimonials";

const AUTOPLAY_MS = 6500;

// Real, current Google Business numbers for Dakshina Paaka — kept as literal
// constants (rather than derived from testimonialStats) so this figure can
// only ever say what Google actually shows. Update these two values if the
// listing's rating or review count changes.
const GOOGLE_RATING = 4.2;
const GOOGLE_REVIEW_COUNT = 1717;
const GOOGLE_REVIEW_COUNT_DISPLAY = "1,700+";

export default function Testimonials() {
  const [featured, setFeatured] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const total = testimonials.length;
  const current = useMemo(() => testimonials[featured], [featured]);

  const next = useCallback(() => {
    setFeatured((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setFeatured((i) => (i - 1 + total) % total);
  }, [total]);

  // Arrow-key navigation — only acts while the carousel region itself is
  // focused or hovered, so it never hijacks arrow keys used elsewhere on
  // the page (standard accessible-carousel pattern).
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  // Copies the current review's text + attribution — a real way to share a
  // review without a screenshot.
  const handleCopyQuote = useCallback(async () => {
    const text = `"${current.body}" — ${current.name}, Google Reviews`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Clipboard permission denied or unavailable — fail quietly, the
      // button simply won't show the confirmation state.
    }
  }, [current]);

  // Autoplay for the featured card — pauses on hover, drag, keyboard focus,
  // or the explicit pause control.
  useEffect(() => {
    if (hovering || isDragging || autoplayPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [hovering, isDragging, autoplayPaused, next, featured]);

  // Subtle parallax so the background scenes breathe with scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgFloat = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 30]),
    { stiffness: 60, damping: 22 }
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      data-testid="testimonials-section"
      className="relative overflow-hidden scroll-mt-24 bg-[#0B1F17] pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      {/* ============================================================
         BACKGROUND — deep emerald canvas layered with:
         · vertical gradient (top warmth → mid darkness → bottom warmth)
         · two radial "spot lights" behind the featured card
         · large concentric gold rings (asymmetric, decorative)
         · vertical hairline "temple pillar" seams
         · subtle grain
         All layers z-0 + pointer-events-none. Content sits at z-10.
         ============================================================ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F16] via-[#071812] to-[#0A1F16]" />

        <motion.div
          style={reduceMotion ? undefined : { y: bgFloat }}
          className="absolute left-1/2 top-1/3 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,91,67,0.55)_0%,rgba(15,91,67,0)_65%)] will-change-transform [transform:translateZ(0)]"
        />
        <motion.div
          style={reduceMotion ? undefined : { y: bgFloat }}
          className="absolute -left-40 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,164,77,0.22)_0%,transparent_60%)] will-change-transform [transform:translateZ(0)]"
        />
        <motion.div
          style={reduceMotion ? undefined : { y: bgFloat }}
          className="absolute -right-32 bottom-12 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(226,196,110,0.16)_0%,transparent_60%)] will-change-transform [transform:translateZ(0)]"
        />

        <div className="absolute -right-40 top-24 hidden h-[520px] w-[520px] rounded-full border border-[#C8A44D]/12 sm:block" />
        <div className="absolute -right-24 top-40 hidden h-[380px] w-[380px] rounded-full border border-[#C8A44D]/08 sm:block" />
        <div className="absolute -left-40 bottom-24 hidden h-[520px] w-[520px] rounded-full border border-[#C8A44D]/12 sm:block" />
        <div className="absolute -left-24 bottom-40 hidden h-[380px] w-[380px] rounded-full border border-[#C8A44D]/08 sm:block" />

        <div className="absolute inset-y-0 left-[8%] hidden w-px bg-gradient-to-b from-transparent via-[#C8A44D]/18 to-transparent sm:block" />
        <div className="absolute inset-y-0 right-[8%] hidden w-px bg-gradient-to-b from-transparent via-[#C8A44D]/18 to-transparent sm:block" />

        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:radial-gradient(circle_at_22%_25%,rgba(240,220,170,0.65)_1px,transparent_1.6px),radial-gradient(circle_at_74%_46%,rgba(240,220,170,0.5)_1px,transparent_1.6px),radial-gradient(circle_at_42%_82%,rgba(240,220,170,0.55)_1px,transparent_1.6px)] [background-size:28px_28px]" />

        {/* ---- Seam from Gallery ----
            Gallery's own floor now dissolves all the way to this exact
            tone (#0A1F16) before it hands off, so this section opens
            already color-matched — no second "from cream" gradient
            competing for the same rows. Only a soft warm halo echoes
            across the boundary, mirroring the one Gallery draws at its
            own floor, so the glow reads as one continuous light instead
            of two independent fades meeting at a hard edge. */}
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(200,164,77,0.14),transparent_75%)] sm:h-28" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        {/* ========= HEADER ========= */}
        <div className="text-center">
          <motion.span
            data-testid="testimonials-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C8A44D]/40 bg-[#0F5B43]/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#E9CE85] backdrop-blur-sm sm:text-xs sm:tracking-[0.38em]"
          >
            <span className="h-1 w-1 rotate-45 bg-[#C8A44D]" />
            Voices of Our Guests
            <span className="h-1 w-1 rotate-45 bg-[#C8A44D]" />
          </motion.span>

          <h2 className="mt-6 font-serif text-[clamp(2.4rem,7.5vw,4.4rem)] leading-[1.04] tracking-[-0.02em] text-[#F5EFDE]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Stories From
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-[#E9CE85]"
            >
              Our Table
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 flex w-40 items-center justify-center gap-3"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A44D]/70" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#C8A44D]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A44D]/70" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#D4CFB8]/90 sm:text-lg sm:leading-8"
          >
            Handwritten memories from the guests who&apos;ve broken bread with us —
            straight from Google Reviews.
          </motion.p>
        </div>

        {/* ========= RATING STRIP ========= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-[#C8A44D]/25 bg-white/[0.04] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md sm:mt-14 sm:flex-row sm:justify-between sm:gap-2 sm:rounded-full sm:px-10 sm:py-6 sm:backdrop-blur-xl"
          data-testid="testimonials-stats"
        >
          <div className="flex items-center gap-4">
            <GoogleGlyph />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <PartialStars
                  rating={GOOGLE_RATING}
                  size={16}
                  testId="testimonials-rating-stars"
                />
                <span className="ml-1 font-serif text-lg text-[#F5EFDE]">
                  {GOOGLE_RATING.toFixed(1)}
                </span>
              </div>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-[#D4CFB8]/70">
                Rated on Google
              </span>
            </div>
          </div>

          <div className="hidden h-8 w-px bg-[#C8A44D]/25 sm:block" />

          <div
            className="flex flex-col items-center sm:items-start"
            aria-label={`${GOOGLE_REVIEW_COUNT.toLocaleString()} Google reviews`}
          >
            <span className="font-serif text-lg text-[#F5EFDE]">
              {GOOGLE_REVIEW_COUNT_DISPLAY}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4CFB8]/70">
              Google Reviews
            </span>
          </div>

          <div className="hidden h-8 w-px bg-[#C8A44D]/25 sm:block" />

          <div className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-[#E9CE85]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E9CE85]">
              {testimonialStats.displayText}
            </span>
          </div>
        </motion.div>

        {/* ========= FEATURED CAROUSEL CARD ========= */}
        <div
          className="mt-12 outline-none sm:mt-16"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest testimonials"
          tabIndex={0}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          onKeyDown={handleKeyDown}
        >
          <p aria-live="polite" className="sr-only">
            Showing testimonial {featured + 1} of {total}: {current.name},{" "}
            {current.rating} out of 5 stars.
          </p>
          <div className="relative mx-auto max-w-4xl">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-[#C8A44D]/20 via-transparent to-[#0F5B43]/20 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[28px] border border-[#C8A44D]/25 bg-[#0A1712]/85 shadow-[0_35px_80px_rgba(0,0,0,.55)] backdrop-blur-md sm:rounded-[36px] sm:backdrop-blur-xl">
              <CornerFlourish className="left-4 top-4" />
              <CornerFlourish className="right-4 top-4 scale-x-[-1]" />
              <CornerFlourish className="bottom-4 left-4 scale-y-[-1]" />
              <CornerFlourish className="bottom-4 right-4 -scale-100" />

              <AnimatePresence mode="wait">
                <motion.article
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative cursor-grab select-none px-6 py-8 active:cursor-grabbing sm:px-14 sm:py-14"
                  data-testid={`featured-testimonial-${current.id}`}
                  drag="x"
                  dragElastic={0.12}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_event, info) => {
                    setIsDragging(false);
                    if (info.offset.x < -80 || info.velocity.x < -400) {
                      next();
                    } else if (info.offset.x > 80 || info.velocity.x > 400) {
                      prev();
                    }
                  }}
                >
                  <Quote
                    size={92}
                    strokeWidth={1}
                    className="pointer-events-none absolute -top-4 left-6 -rotate-6 text-[#C8A44D]/15 sm:left-10 sm:top-6"
                  />

                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    aria-label={copied ? "Review copied" : "Copy this review"}
                    data-testid="testimonial-copy-btn"
                    className="absolute right-5 top-5 z-[1] flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-white/5 text-[#E9CE85]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C8A44D] hover:bg-[#C8A44D]/15 hover:text-[#E9CE85] sm:right-8 sm:top-8"
                  >
                    {copied ? <Check size={15} /> : <Share2 size={15} />}
                  </button>

                  <div className="mb-5 flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -60 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 300 }}
                      >
                        <Star
                          size={18}
                          className={
                            i < current.rating
                              ? "fill-[#E9CE85] text-[#E9CE85]"
                              : "text-white/20"
                          }
                          strokeWidth={1.5}
                        />
                      </motion.span>
                    ))}
                    <span className="ml-3 text-[10px] uppercase tracking-[0.32em] text-[#D4CFB8]/70">
                      {current.timeAgo}
                    </span>
                  </div>

                  <blockquote className="relative font-serif text-[17px] leading-[1.75] text-[#F1EAD5] sm:text-[22px] sm:leading-[1.7]">
                    <span className="mr-2 font-serif text-4xl leading-none text-[#E9CE85]/70 sm:text-5xl">
                      &ldquo;
                    </span>
                    {current.body}
                    <span className="ml-1 font-serif text-4xl leading-none text-[#E9CE85]/70 sm:text-5xl">
                      &rdquo;
                    </span>
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4 border-t border-[#C8A44D]/15 pt-6">
                    <Avatar
                      initials={current.initials}
                      accent={current.accent}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-serif text-lg text-[#F5EFDE]">
                          {current.name}
                        </p>
                        {current.role && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#C8A44D]/40 bg-[#C8A44D]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#E9CE85]">
                            <BadgeCheck size={10} /> {current.role}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-[#D4CFB8]/60">
                        {current.reviews && (
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare size={11} /> {current.reviews} Reviews
                          </span>
                        )}
                        {current.photos && (
                          <span className="inline-flex items-center gap-1">
                            <Camera size={11} /> {current.photos} Photos
                          </span>
                        )}
                      </div>
                    </div>
                    <GoogleGlyph small />
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Autoplay progress */}
              <div className="relative h-[3px] w-full overflow-hidden bg-white/5">
                {!hovering && !autoplayPaused && !isDragging && (
                  <motion.div
                    key={featured}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#C8A44D] via-[#E9CE85] to-[#0F5B43]"
                    data-testid="testimonial-autoplay-progress"
                  />
                )}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              data-testid="testimonial-prev-btn"
              className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8A44D]/40 bg-[#0A1712]/90 text-[#E9CE85] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#0A1712] md:flex"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              data-testid="testimonial-next-btn"
              className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[#C8A44D]/40 bg-[#0A1712]/90 text-[#E9CE85] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#0A1712] md:flex"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Pagination dots + autoplay control */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                data-testid={`testimonial-dot-${i}`}
                onClick={() => setFeatured(i)}
                className="group flex h-6 items-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === featured
                      ? "w-8 bg-[#E9CE85]"
                      : "w-1.5 bg-[#C8A44D]/30 group-hover:bg-[#C8A44D]/70"
                  }`}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAutoplayPaused((p) => !p)}
              aria-label={autoplayPaused ? "Resume autoplay" : "Pause autoplay"}
              aria-pressed={autoplayPaused}
              data-testid="testimonial-autoplay-toggle"
              className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C8A44D]/30 text-[#E9CE85]/70 transition-all duration-300 hover:border-[#C8A44D] hover:text-[#E9CE85]"
            >
              {autoplayPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
          </div>

          {/* Mobile Prev/Next + counter */}
          <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              data-testid="testimonial-mobile-prev-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A44D]/40 bg-white/5 text-[#E9CE85] active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#D4CFB8]/80">
              {String(featured + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              data-testid="testimonial-mobile-next-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A44D]/40 bg-white/5 text-[#E9CE85] active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ========= MARQUEE — all testimonials continuously scrolling ========= */}
        <div
          data-testid="testimonial-marquee"
          className="relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:mt-20"
        >
          <style>{`
            @keyframes dp-marquee {
              from { transform: translate3d(0,0,0); }
              to { transform: translate3d(-50%,0,0); }
            }
            .dp-marquee-track {
              animation: dp-marquee 48s linear infinite;
              will-change: transform;
              backface-visibility: hidden;
              transform: translate3d(0,0,0);
            }
            .dp-marquee-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) {
              .dp-marquee-track { animation: none; }
            }
          `}</style>

          <div className="dp-marquee-track flex w-max gap-5 pr-5">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <MiniCard
                key={`${t.id}-${idx}`}
                testimonial={t}
                onClick={() => setFeatured(idx % total)}
                active={idx % total === featured}
                testId={`testimonial-mini-${idx}`}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 flex flex-col items-center gap-3 text-center sm:mt-16"
        >
          <p className="max-w-md text-sm text-[#D4CFB8]/80 sm:text-base">
            Loved by locals and travellers alike — come write yours.
          </p>
          <a
            href="https://www.google.com/search?q=Dakshina+Paaka+Restaurant"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="review-us-google-btn"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#C8A44D]/50 bg-[#C8A44D]/10 px-6 py-3 text-sm font-semibold tracking-wide text-[#E9CE85] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#C8A44D] hover:text-[#0A1712]"
          >
            <GoogleGlyph small />
            Review Us on Google
            <ChevronRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================================
   SUB-COMPONENTS
   ======================================================================== */

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-[#0A1712] shadow-[0_10px_28px_rgba(0,0,0,0.35)] ring-2 ring-[#C8A44D]/40"
      style={{
        background: `linear-gradient(135deg, ${accent}, #E9CE85)`,
      }}
    >
      <span className="drop-shadow-sm">{initials}</span>
      <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0A1712] ring-2 ring-[#0A1712]">
        <BadgeCheck size={13} className="text-[#E9CE85]" />
      </span>
    </div>
  );
}

function GoogleGlyph({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-white/95 shadow-inner ${
        small ? "h-6 w-6" : "h-11 w-11"
      }`}
      aria-label="Google"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={size}
        height={size}
      >
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    </div>
  );
}

function PartialStars({
  rating,
  size = 16,
  testId,
}: {
  rating: number;
  size?: number;
  testId?: string;
}) {
  // Discrete full stars + at most one partially-clipped star, rather than
  // clipping the whole 5-star row by percentage. Clipping the full row
  // forces the flex container to shrink its children to fit the narrower
  // box, which desyncs the filled row from the outline row underneath and
  // shows up as a ghosted "double star". Clipping a single, isolated star
  // (same approach as the Footer rating pill) has no flex context to
  // shrink against, so it stays pixel-aligned with the row around it.
  const clamped = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clamped + 0.001);
  const partial = clamped - fullStars;
  const hasPartial = partial > 0.03 && fullStars < 5;
  const emptyStars = 5 - fullStars - (hasPartial ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1.5" data-testid={testId} aria-hidden>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="shrink-0 fill-[#E9CE85] text-[#E9CE85]"
          strokeWidth={1.5}
        />
      ))}
      {hasPartial && (
        <span
          className="relative inline-block shrink-0"
          style={{ width: size, height: size }}
        >
          <Star size={size} className="absolute inset-0 text-white/20" strokeWidth={1.5} />
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partial * 100}%` }}
          >
            <Star size={size} className="fill-[#E9CE85] text-[#E9CE85]" strokeWidth={1.5} />
          </span>
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="shrink-0 text-white/20" strokeWidth={1.5} />
      ))}
    </span>
  );
}

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute h-6 w-6 text-[#C8A44D]/40 sm:h-8 sm:w-8 ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M0 8 Q0 0 8 0 L14 0" strokeLinecap="round" />
      <path d="M2 12 Q2 2 12 2" strokeLinecap="round" opacity="0.6" />
      <circle cx="4" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
}

interface MiniCardProps {
  testimonial: (typeof testimonials)[number];
  onClick: () => void;
  active: boolean;
  testId?: string;
}

function MiniCard({ testimonial, onClick, active, testId }: MiniCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`group flex w-[300px] shrink-0 flex-col rounded-2xl border p-5 text-left transition-all duration-500 sm:w-[340px] ${
        active
          ? "border-[#C8A44D]/60 bg-[#0F5B43]/20 shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
          : "border-white/10 bg-white/[0.03] hover:border-[#C8A44D]/40 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-[#0A1712]"
          style={{
            background: `linear-gradient(135deg, ${testimonial.accent}, #E9CE85)`,
          }}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#F5EFDE]">
            {testimonial.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4CFB8]/60">
            {testimonial.timeAgo}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={11}
            className="fill-[#E9CE85] text-[#E9CE85]"
            strokeWidth={1.5}
          />
        ))}
      </div>

      <p className="mt-3 line-clamp-4 text-[12.5px] leading-[1.65] text-[#D4CFB8]/85 group-hover:text-[#F1EAD5]">
        {testimonial.body}
      </p>
    </button>
  );
}


