"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import MenuCover from "./MenuCover";
import MenuPages from "./MenuPages";

interface Props {
  onOpen: () => void;
}

export default function MenuBook({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const openTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
  }, []);

  const handleOpen = useCallback(() => {
    if (opening) return;

    setOpening(true);
    // Keep the scene visible until the cover has fully cleared the pages.
    // The previous 850ms timeout interrupted the 950ms cover animation.
    openTimer.current = window.setTimeout(() => {
      onOpen();
      setOpening(false);
    }, 1100);
  }, [opening, onOpen]);

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
  style={{ perspective: "1800px" }}
>
        <motion.div
          onClick={handleOpen}
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
          className="relative h-full w-full cursor-pointer touch-manipulation"
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
            }}
          >
            <MenuCover />
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
    transform: "translateZ(-8px)",
  }}
>
  <MenuPages />
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
              backfaceVisibility: "hidden",
              z: 8,
            }}
            className="absolute inset-0 z-30"
          >
            <MenuCover />
          </motion.div>
          {/* Light Reflection */}

          <motion.div
            animate={{
              x: ["-140%", "180%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 4,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              z-40
              overflow-hidden
              rounded-[32px]
            "
          >
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
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
