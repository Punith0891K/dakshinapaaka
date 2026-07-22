"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import MenuCover from "./MenuCover";
import MenuPages from "./MenuPages";

interface Props {
  onOpen: () => void;
}

export default function MenuBook({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;

    setOpening(true);

    setTimeout(() => {
      onOpen();
      setOpening(false);
    }, 900);
  };

  return (
    <motion.div

  animate={{
    y: [0, -5, 0],
  }}
  whileHover={{
    y: -12,
  }}
  transition={{
    y: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 4,
      ease: "easeInOut",
    },
    type: "spring",
    stiffness: 180,
    damping: 18,
  }}
  className="relative"
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
          bottom-[-38px]
          h-12
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-black
          blur-3xl
        "
      />

<motion.div
  animate={{
    opacity: opening ? 0.45 : 0.15,
    scale: opening ? 1.25 : 1,
  }}
  transition={{
    duration: 0.8,
  }}
  className="
    absolute
    inset-0
    rounded-full
    bg-[#D6B15A]
    blur-[140px]
    -z-10
  "
/>

      {/* 3D Scene */}

      <div
        className="relative h-[700px] w-[470px]"
        style={{
          perspective: "2600px",
        }}
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
            type: "spring",
            stiffness: 160,
            damping: 18,
          }}
          className="relative h-full w-full cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
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