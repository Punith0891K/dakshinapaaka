"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import MenuCover from "./MenuCover";
import MenuCoverInside from "./MenuCoverInside";
import MenuPages from "./MenuPages";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface Props {
  onOpen: () => void;
  /**
   * Mirrors whether the fullscreen menu modal is currently mounted/visible
   * — pass the SAME boolean you give to <MenuModal open={...} />, not a
   * copy, not a "has this ever been opened" flag. The book uses it to keep
   * its cover swung open for as long as the modal is up, and to play a
   * real, visible closing flip once that boolean goes back to false.
   *
   * If this is left undefined (prop not passed at all), the book falls
   * back to closing itself automatically a moment after opening — safe,
   * but no synced closing flip. If it's passed but never actually returns
   * to false when the modal closes, the book will stay open indefinitely
   * and stop responding to taps — that's not a bug in this component, it
   * means the value being passed here isn't the live "is the modal open"
   * state. Double-check it's wired to the exact same variable that
   * controls <MenuModal open={...} />, not a second piece of state that
   * only ever gets set to true.
   */
  isMenuOpen?: boolean;
}

// Mirrors the `lg` breakpoint (1024px) already used throughout this file's
// Tailwind classes. Defaults to false (the mobile-safe branch) until the
// media query resolves on the client — there's no viewport during SSR, and
// the value only ever changes what happens *after* a user tap anyway.
function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

export default function MenuBook({ onOpen, isMenuOpen }: Props) {
  // `opening` covers only the brief initial flip, from tap to hand-off.
  // `coverOpen` is the full visual "book is open" window: the flip itself,
  // plus the whole time the fullscreen modal is up (when `isMenuOpen` is
  // wired correctly — see the Props doc above). Everything below that
  // affects the cover's look keys off `coverOpen`, so it stays swung open
  // behind the modal instead of snapping shut the moment onOpen() fires,
  // which is what made the close feel like a hard cut.
  //
  // `isControlled` distinguishes "the parent says the modal is closed"
  // from "the parent isn't telling me anything" (prop simply omitted) —
  // those need different fallbacks, and treating them the same is what
  // caused the book to open fine but never close in an earlier version.
  const [opening, setOpening] = useState(false);
  const isControlled = typeof isMenuOpen === "boolean";
  const coverOpen = opening || (isControlled && isMenuOpen);
  const openTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktopViewport();
  // Real hover doesn't exist on touch, but plenty of mobile browsers fire a
  // synthetic hover on tap anyway — which used to leave the cover stuck
  // mid-tilt (rotateY/rotateX/y offset) until some unrelated later tap
  // cleared it. Scoping the 3D tilt to non-touch input fixes that and also
  // skips a moderately expensive transform on exactly the devices least
  // able to spare it. The press feedback (whileTap) still applies everywhere.
  const isTouch = useIsTouchDevice();

  // The open flip pivots the cover from its left edge (transformOrigin:
  // "left center"), so at -165deg it swings almost all the way flat,
  // extending ~1x the cover's own width to the LEFT of the book. On
  // desktop there's plenty of page around the book for that to land in.
  // On mobile the book sits close to the viewport edge, so that same
  // swing pushed the cover past x:0 and the section's `overflow-hidden`
  // (in Menu.tsx) sliced it off mid-animation. Capping the swing to just
  // past perpendicular on small screens keeps it fully on-screen — it's
  // also a briefer visual beat than desktop's, which suits how quickly
  // the fullscreen modal takes over right after.
  const openRotateY = isDesktop ? -165 : -100;

  useEffect(() => () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
  }, []);

  const handleOpen = useCallback(() => {
    if (coverOpen) return;

    setOpening(true);
    // Users who prefer reduced motion (or older mobile GPUs that stutter on
    // the 1.1s flip) get a faster hand-off so we don't leave them looking at
    // a stuck animation.
    const openDelay = reduceMotion ? 220 : 1100;
    openTimer.current = window.setTimeout(() => {
      onOpen();
      if (!isControlled) {
        // No `isMenuOpen` wiring — fall back to the safe self-timed reset
        // instead of waiting on a signal that will never arrive.
        setOpening(false);
      }
      // When controlled, deliberately NOT setOpening(false) here — the
      // effect below hands off to `isMenuOpen` once the parent's re-render
      // actually lands, which avoids a one-frame flash-closed race.
    }, openDelay);
  }, [coverOpen, isControlled, onOpen, reduceMotion]);

  // Once the modal has taken over (isMenuOpen === true), `opening` has done
  // its job — hand off cleanly so a later `isMenuOpen` -> false transition
  // is the ONLY thing driving the cover shut, producing one real closing
  // flip instead of two competing resets.
  useEffect(() => {
    if (isControlled && isMenuOpen && opening) setOpening(false);
  }, [isControlled, isMenuOpen, opening]);

  return (
<motion.div
  className="menu-book relative will-change-transform"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  }}
>
      {/* Floor Shadow */}

      <motion.div
      animate={{
    scale: coverOpen ? 1.22 : 1,
    opacity: coverOpen ? 0.5 : 0.18,
    y: coverOpen ? 6 : 0,
}}
        transition={{ duration: 0.45 }}
        className="
          absolute
          left-1/2
          bottom-[-25px]
          h-10
          w-[220px]
          sm:h-12
          sm:w-[270px]
          lg:h-14
          lg:w-[380px]
          xl:w-[440px]
          -translate-x-1/2
          rounded-full
          bg-black
          blur-2xl
          sm:blur-3xl
        "
      />

<motion.div
  animate={{
    opacity: coverOpen ? 0.45 : 0.18,
    scale: coverOpen ? 1.15 : 1,
  }}
  transition={{
    duration: 0.8,
  }}
  className="
    absolute
    left-1/2
    top-1/2
    h-[150px]
    w-[150px]
    sm:h-[180px]
    sm:w-[180px]
    lg:h-[240px]
    lg:w-[240px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    bg-[#D6B15A]/35
    blur-2xl
    sm:blur-3xl
    -z-10
  "
/>

      {/* 3D Scene */}
<div
  className={`
    relative

    h-[390px]
    w-[260px]

    sm:h-[420px]
    sm:w-[280px]

    lg:h-[620px]
    lg:w-[420px]

    xl:h-[700px]
    xl:w-[470px]

    transition-transform
    duration-700
    ease-out

    ${coverOpen ? "translate-x-[22px] sm:translate-x-[26px] lg:translate-x-0" : "translate-x-0"}
  `}
  style={{
    perspective: "1800px",
    // NOTE: this used to be `contain: "paint"`. Paint containment forces
    // the browser to hard-clip anything that visually overflows this
    // box's edges — but the hover animation below (scale/y/rotate) is
    // *designed* to lift the book slightly outside its resting bounds.
    // That combination is what was slicing the cover's corner off on
    // hover. `layout style` keeps the same perf isolation (this
    // subtree's layout/counters can't leak out and affect the rest of
    // the page) without forcing a clip on transformed content.
    contain: "layout style",
  }}
>
        <motion.div
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Open the full digital menu"
          data-testid="menu-book-open"
        whileHover={
  isTouch
    ? undefined
    : {
        rotateY: -10,
        rotateX: 6,
        rotateZ: -1,
        y: -15,
        scale: 1.03,
      }
}
          whileTap={{
            scale: 0.99,
          }}
         transition={{
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}}
          className="relative h-full w-full cursor-pointer touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-[#D6B15A] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Back Cover */}

          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(-16px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <MenuCover animated={false} />
          </div>

          {/* Spine */}

<div
  className="
    absolute
    left-0
    top-0
    h-full
    w-7
    rounded-l-[32px]
    overflow-hidden
    z-20
  "
  style={{
    transform: "translateZ(3px)",
  }}
>
  <div
    className="
      h-full
      w-full
      bg-gradient-to-r
      from-[#05271E]
      via-[#0A3F30]
      to-[#145341]
    "
  />

  {/* Gold Line */}

  <div
    className="
      absolute
      right-1
      top-10
      bottom-10
      w-px
      bg-[#D6B15A]/50
    "
  />

  {/* Spine Highlight */}

  <div
    className="
      absolute
      inset-y-0
      left-0
      w-2
      bg-white/10
      blur-sm
    "
  />
</div>

          {/* Page Stack */}

          <motion.div
  className="absolute inset-0"
  animate={{
    x: coverOpen ? 6 : 0,
    scaleX: coverOpen ? 0.985 : 1,
  }}
  transition={{
    duration: 0.8,
  }}
  style={{
    z: -8,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform",
  }}
>
  <MenuPages />

  {/* Contact shadow cast by the lifting cover onto the page beneath it.
      Fades in as the cover opens and hugs the spine edge — the one bit
      of extra physicality that sells the flip as "premium" rather than
      just a rotating rectangle. */}
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-y-0 left-0 w-2/3 rounded-[30px] bg-gradient-to-r from-black/25 via-black/5 to-transparent"
    animate={{ opacity: coverOpen ? 1 : 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  />
</motion.div>

          {/* Front Cover */}
<motion.div
  animate={{
    rotateY: coverOpen ? openRotateY : 0,
    x: coverOpen ? (isDesktop ? -2 : 0) : 0,
    scale: coverOpen ? (isDesktop ? 1.01 : 0.97) : 1,
  }}

  transition={{
    duration: 0.95,
    ease: [0.22, 1, 0.36, 1],
  }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              z: 8,
              willChange: "transform",
            }}
            className="absolute inset-0 z-30"
          >
            {/* Outer face — the cover art visible while the book is closed
                and for the first half of the flip. */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <MenuCover />
            </div>

            {/* Inner face — the lining, revealed once the cover has swung
                past 90deg. This is the fix for the cover "disappearing":
                previously there was nothing here, so backface-visibility
                had no second face to show and the cover just vanished
                mid-swing instead of continuing to read as a solid object. */}
            <div
              className="absolute inset-0"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <MenuCoverInside />
            </div>
          </motion.div>
          {/* Light Reflection */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-40
              overflow-hidden
              rounded-[32px]
            "
          >
            <style>{`
              @keyframes dp-book-shimmer {
                0% { transform: translateX(-140%); }
                27.27% { transform: translateX(180%); }
                100% { transform: translateX(180%); }
              }
            `}</style>
            <div
              className="
                h-full
                w-40
                rotate-12
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
              "
              style={{
                animation: "dp-book-shimmer 5.5s ease-in-out infinite",
                willChange: "transform",
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
