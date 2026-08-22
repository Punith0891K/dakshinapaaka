"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  CalendarDays,
  Play,
  Pause,
  MoveHorizontal,
  Images,
  CookingPot,
  Leaf,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import {
  useCallback,
  useState,
  useEffect,
  type KeyboardEvent,
} from "react";

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

const credentials = [
  { icon: CalendarDays, label: "Est. 2024" },
  { icon: Leaf, label: "100% Pure Veg" },
  { icon: Heart, label: "Family Recipes" },
];

const interiorImages = [
  "/images/hero/interior1.jpeg",
  "/images/hero/interior2.png",
  "/images/hero/interior3.png",
];

// All three interior shots are the same AC dining hall, so the caption is
// a single accurate label rather than three invented, differing ones.
const INTERIOR_CAPTION = "AC Dining Hall";

const AUTOPLAY_MS = 5000;

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const reduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  // Briefly surface a "swipe to explore" hint on touch devices so the
  // drag gesture (already supported below) is actually discoverable —
  // it dismisses itself on a timer or the instant someone starts
  // dragging, whichever happens first.
  useEffect(() => {
    if (!isTouch) return;
    setShowSwipeHint(true);
    const timer = setTimeout(() => setShowSwipeHint(false), 2800);
    return () => clearTimeout(timer);
  }, [isTouch]);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) =>
      prev === interiorImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) =>
      prev === 0 ? interiorImages.length - 1 : prev - 1
    );
  }, []);

  const goToImage = useCallback(
    (index: number) => {
      setDirection(index > currentImage ? 1 : -1);
      setCurrentImage(index);
    },
    [currentImage]
  );

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

  const handleCarouselKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImage();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevImage();
    }
  };

  // Respect the OS-level reduced-motion preference by defaulting the
  // slideshow to paused — the play button still lets someone opt back
  // in if they want the motion.
  useEffect(() => {
    if (reduceMotion) setIsPaused(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (isHovered || isPaused) return;

    const interval = setInterval(() => {
      nextImage();
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isHovered, isPaused, nextImage]);

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? 300 : -300,
          opacity: 0,
          scale: 0.97,
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
        },
        exit: (dir: number) => ({
          x: dir > 0 ? -300 : 300,
          opacity: 0,
          scale: 0.97,
        }),
      };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F3E5D0] py-20 lg:py-28"
    >
      {/* Heritage Background. This illustration is landscape (3:2) with
          detail — temple, palms, corner mandala/leaves — living at the
          edges and a plain sky/parchment middle. Two things broke it
          before: (1) stretching it with `cover` across the WHOLE section
          zoomed so far in on tall mobile layouts that only the plain
          empty middle was ever in frame, and (2) it used Tailwind's
          `aspect-[3/2]` utility for sizing — aspect-ratio utilities are a
          newer, sometimes-optional part of a Tailwind build (unlike
          `height`, which is core and always present); if that class
          didn't generate, the div silently collapsed to zero height and
          the whole thing vanished regardless of opacity. Fixed heights
          per breakpoint below have zero dependency on that. It also used
          `mask-image` for the fade, which is inconsistent across
          browsers/GPUs — replaced with a second, plain gradient div,
          which is about as universally supported as CSS gets. The fade
          target and the section's own background are now the exact
          parchment tone sampled from the image itself (#F3E5D0), so the
          seam between "illustration" and "plain area below" is invisible
          instead of shifting to a mismatched cream. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[240px] opacity-60 sm:h-[380px] md:h-[460px] lg:h-[620px] xl:h-[720px]"
        style={{
          backgroundImage: "url('/images/hero/about-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[240px] sm:h-[380px] md:h-[460px] lg:h-[620px] xl:h-[720px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 45%, #F3E5D0 100%)",
        }}
      />

      {/* Soft overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-[#F3E5D0]/15" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="relative">

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

            {/* Credibility strip */}
            <FadeIn delay={0.25}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                {credentials.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A44D]/25 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#174D2C] shadow-sm"
                  >
                    <Icon size={13} strokeWidth={2} className="text-[#C8A44D]" />
                    {label}
                  </span>
                ))}
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
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <FadeIn key={feature.title} delay={0.4 + index * 0.1}>
                    <div
                      className="
                        group
                        relative
                        flex
                        h-[230px]
                        flex-col
                        items-center
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-[#C8A44D]/10
                        bg-white/75
                        px-4
                        py-5
                        text-center
                        shadow-[0_10px_28px_rgba(74,55,30,0.08)]
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:border-[#C8A44D]/30
                        hover:shadow-[0_18px_40px_rgba(74,55,30,0.14)]
                        motion-reduce:transition-none
                        motion-reduce:hover:translate-y-0
                        sm:h-[260px]
                        sm:px-5
                        sm:py-6
                        lg:h-[285px]
                      "
                    >
                      {/* Icon */}
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#174D2C] text-[#D5B15B] shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none sm:h-14 sm:w-14">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>

                      {/* Card Title */}
                      <h3 className="mt-4 min-h-[44px] font-serif text-[17px] font-semibold leading-6 text-[#24201C] sm:min-h-[52px] sm:text-[20px]">
                        {feature.title}
                      </h3>

                      {/* Small Gold Line */}
                      <div className="mx-auto my-3 h-px w-8 bg-[#C8A44D] sm:my-4" />

                      {/* Description */}
                      <p className="mt-auto max-w-[160px] text-[13px] leading-6 text-[#666] sm:text-[14px] sm:leading-7">
                        {feature.description}
                      </p>

                      {/* Hover underline sweep */}
                      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent transition-transform duration-500 group-hover:scale-x-100 motion-reduce:hidden" />
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Brand note */}
            <FadeIn delay={0.4 + features.length * 0.1}>
              <div className="relative mt-9 rounded-2xl border border-[#C8A44D]/15 bg-white/55 p-5 pt-8 sm:mt-11 sm:p-7 sm:pt-9">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-6 select-none font-serif text-5xl leading-none text-[#C8A44D]/40 sm:-top-5 sm:left-7 sm:text-6xl"
                >
                  “
                </span>
                <p className="font-serif text-[15px] italic leading-7 text-[#3A3A3A] sm:text-base">
                  Good food can&apos;t be rushed. Our dosa batter ferments
                  overnight, the sambar simmers for hours, and our filter
                  coffee is still brewed the old way — slow, patient, and
                  unhurried. That&apos;s simply how we cook here, the same
                  way we always have.
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[3px] text-[#8C6A2D]">
                  — Dakshinapaaka
                </p>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT IMAGE */}
          <FadeIn delay={0.3}>
            <div className="relative mx-auto w-full max-w-[680px]">

              {/* Photo frame — outline + image grouped together so the
                  frame's size is never affected by where the brand card
                  below ends up sitting. */}
              <div className="relative">

                {/* Gold decorative outline */}
                <div className="pointer-events-none absolute -inset-3 rounded-[38px] border border-[#C8A44D]/30" />

                {/* Image */}
                <div className="relative h-[420px] overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(46,35,20,0.22)] sm:h-[520px] lg:h-[690px]">
                  <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Restaurant interior photos"
                    tabIndex={0}
                    onKeyDown={handleCarouselKeyDown}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative h-full w-full overflow-hidden rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#C8A44D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3E5D0]"
                  >
                    {/* Screen-reader announcement, decoupled from the visual chip below */}
                    <span className="sr-only" aria-live="polite">
                    {`Showing photo ${currentImage + 1} of ${interiorImages.length}: ${INTERIOR_CAPTION}`}
                  </span>

                  {/* `transform: scaleX` rather than animating `width` —
                      compositor-only, so this doesn't trigger layout work
                      on every frame while it runs (matters most on lower-
                      end mobile devices, where a 5-second `width` animation
                      is a small but avoidable source of jank). */}
                  <style>{`
                    @keyframes dp-about-progress {
                      from { transform: scaleX(0); }
                      to { transform: scaleX(1); }
                    }
                  `}</style>

                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentImage}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={
                        reduceMotion
                          ? { duration: 0.25 }
                          : {
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
                            }
                      }
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragStart={() => setShowSwipeHint(false)}
                      onDragEnd={handleDragEnd}
                      className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
                    >
                      {/* Slow Ken Burns zoom, isolated from the slide-in/out
                          transform above so the two never fight each other. */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1 }}
                        animate={{ scale: reduceMotion ? 1 : 1.09 }}
                        transition={{
                          duration: AUTOPLAY_MS / 1000 + 1,
                          ease: "easeOut",
                        }}
                      >
                        <Image
                          src={interiorImages[currentImage]}
                          alt={`Dakshinapaaka — ${INTERIOR_CAPTION}`}
                          fill
                          priority={currentImage === 0}
                          quality={85}
                          sizes="(max-width: 1024px) 100vw, 680px"
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Swipe hint — mobile/touch only, self-dismissing */}
                  <AnimatePresence>
                    {showSwipeHint && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center sm:hidden"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                          <MoveHorizontal size={14} aria-hidden="true" />
                          Swipe to explore
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Previous */}
                  <button
                    onClick={prevImage}
                    aria-label="Previous photo"
                    className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextImage}
                    aria-label="Next photo"
                    className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#174D32] hover:text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Counter + play/pause */}
                  <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
                    <button
                      onClick={() => setIsPaused((p) => !p)}
                      aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#174D32]"
                    >
                      {isPaused ? <Play size={14} /> : <Pause size={14} />}
                    </button>

                    <div className="rounded-full bg-black/40 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                      {String(currentImage + 1).padStart(2, "0")} /{" "}
                      {String(interiorImages.length).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Caption + indicators — bottom-LEFT deliberately, so
                      they never collide with the floating brand card that
                      sits over the bottom-right corner. */}
                  <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-2">
                    <span className="w-fit rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
                      {INTERIOR_CAPTION}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {interiorImages.map((_, index) => {
                        const isActive = index === currentImage;
                        const isPast = index < currentImage;
                        const showAnimatedProgress =
                          isActive && !reduceMotion && !isPaused;

                        return (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            aria-label={`Go to photo ${index + 1} of ${interiorImages.length}`}
                            aria-current={isActive}
                            className="relative h-[3px] w-7 overflow-hidden rounded-full bg-white/35"
                          >
                            {showAnimatedProgress ? (
                              <span
                                key={`progress-${currentImage}`}
                                className="absolute inset-0 origin-left rounded-full bg-[#C8A44D]"
                                style={{
                                  animation: `dp-about-progress ${AUTOPLAY_MS}ms linear forwards`,
                                  animationPlayState: isHovered
                                    ? "paused"
                                    : "running",
                                }}
                              />
                            ) : (
                              <span
                                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                                  isActive || isPast
                                    ? "bg-[#C8A44D]"
                                    : "bg-transparent"
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                  {/* Image gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Brand Card — stacks below the photo on phones
                  (no room to overlap without colliding with the caption/
                  indicator cluster), then overlaps the bottom-right corner
                  from `sm:` up, matching the original premium look once
                  there's enough width to spare. */}
              <div className="relative mx-auto mt-4 w-fit rounded-[24px] border border-[#C8A44D]/60 bg-[#173D28]/95 px-5 py-4 text-center shadow-2xl sm:absolute sm:bottom-8 sm:right-8 sm:mx-0 sm:mt-0 sm:w-auto sm:px-8 sm:py-6">
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

              {/* More from our gallery — the left column runs taller than
                  the photo alone once the credibility strip and founder
                  note are in play, so this fills that space with something
                  useful rather than leaving it empty: a small teaser using
                  the same interior shots (no invented image paths that
                  might not exist in the project), handing off to the real
                  Gallery section on the last tile. */}
              <FadeIn delay={0.5}>
                <div className="mt-8">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[3px] text-[#8C6A2D] lg:text-left">
                    More From Our Gallery
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {interiorImages.slice(0, 2).map((src) => (
                      <a
                        key={src}
                        href="#gallery"
                        aria-label="View full photo gallery"
                        className="group relative block h-24 overflow-hidden rounded-xl border border-[#C8A44D]/20 transition-colors duration-300 hover:border-[#C8A44D]/50 sm:h-28 lg:h-32"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 30vw, 200px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </a>
                    ))}
                    <a
                      href="#gallery"
                      aria-label="View full photo gallery"
                      className="group relative block h-24 overflow-hidden rounded-xl border border-[#C8A44D]/20 transition-colors duration-300 hover:border-[#C8A44D]/50 sm:h-28 lg:h-32"
                    >
                      <Image
                        src={interiorImages[2]}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 30vw, 200px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 text-white transition-colors duration-300 group-hover:bg-black/70">
                        <Images size={18} aria-hidden="true" />
                        <span className="text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] sm:text-[11px]">
                          View
                          <br />
                          Gallery
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </FadeIn>

            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#173D28] via-[#C8A44D] to-[#173D28]" />
    </section>
  );
}
