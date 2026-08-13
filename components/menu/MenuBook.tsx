"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import MenuCover from "./MenuCover";
import MenuCoverInside from "./MenuCoverInside";
import MenuPages from "./MenuPages";

interface Props {
  onOpen: () => void;
}

export default function MenuBook({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const openTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
  }, []);

  const handleOpen = useCallback(() => {
    if (opening) return;

    setOpening(true);
    // Users who prefer reduced motion (or older mobile GPUs that stutter on
    // the 1.1s flip) get a faster hand-off so we don't leave them looking at
    // a stuck animation.
    const openDelay = reduceMotion ? 220 : 1100;
    openTimer.current = window.setTimeout(() => {
      onOpen();
      setOpening(false);
    }, openDelay);
  }, [opening, onOpen, reduceMotion]);

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
    scale: opening ? 1.22 : 1,
    opacity: opening ? 0.5 : 0.18,
    y: opening ? 6 : 0,
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
          blur-3xl
        "
      />

<motion.div
  animate={{
    opacity: opening ? 0.45 : 0.18,
    scale: opening ? 1.15 : 1,
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
    blur-3xl
    -z-10
  "
/>

      {/* 3D Scene */}
<div
  className="
    relative

    h-[390px]
    w-[260px]

    sm:h-[420px]
    sm:w-[280px]

    lg:h-[620px]
    lg:w-[420px]

    xl:h-[700px]
    xl:w-[470px]
  "
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
        whileHover={{
  rotateY: -10,
  rotateX: 6,
  rotateZ: -1,
  y: -15,
  scale: 1.03,
}}
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
    x: opening ? 6 : 0,
    scaleX: opening ? 0.985 : 1,
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
    animate={{ opacity: opening ? 1 : 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  />
</motion.div>

          {/* Front Cover */}
<motion.div
  animate={{
    rotateY: opening ? -165 : 0,
    x: opening ? -2 : 0,
    scale: opening ? 1.01 : 1,
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
