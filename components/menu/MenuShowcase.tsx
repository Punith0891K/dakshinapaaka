"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowRight } from "lucide-react";

import MenuCover from "./MenuCover";

interface MenuShowcaseProps {
  onOpen: () => void;
}

export default function MenuShowcase({
  onOpen,
}: MenuShowcaseProps) {
  return (
    <div className="flex flex-col items-center">

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1800}
          glareEnable
          glareMaxOpacity={0.12}
          glareColor="#ffffff"
          glarePosition="all"
          transitionSpeed={1800}
          className="rounded-[36px]"
        >
          <motion.button
            onClick={onOpen}
            whileHover={{
              scale: 1.03,
              y: -10,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="group relative cursor-pointer"
          >
            {/* Gold Glow */}
            <motion.div
              className="
                absolute
                -inset-10
                rounded-[48px]
                bg-gradient-to-r
                from-[#C8A44D]/20
                via-[#DDBA62]/25
                to-[#0F5B43]/20
                blur-3xl
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            <MenuCover />
          </motion.button>
        </Tilt>
      </motion.div>

      {/* Page Dots */}

      <div className="mt-8 flex gap-3">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{
              scale: i === 0 ? 1.2 : 1,
              opacity: i === 0 ? 1 : 0.35,
            }}
            className="h-2.5 w-2.5 rounded-full bg-[#C8A44D]"
          />
        ))}
      </div>

      {/* CTA */}

      <motion.button
        onClick={onOpen}
        whileHover={{
          y: -3,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="
          group
          mt-10
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#C8A44D]/30
          bg-[#0F5B43]
          px-8
          py-4
          text-white
          shadow-xl
          transition-all
          hover:border-[#C8A44D]
        "
      >
        <span className="font-medium tracking-wide">
          Explore Digital Menu
        </span>

        <motion.div
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
        >
          <ArrowRight size={18} />
        </motion.div>
      </motion.button>

    </div>
  );
}