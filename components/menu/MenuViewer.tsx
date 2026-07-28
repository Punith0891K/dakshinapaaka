"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AnimatePresence,
  motion,
  PanInfo,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

import { menuPages } from "@/data/menu";

interface Props {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}

const TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function MenuViewer({
  page,
  nextPage,
  prevPage,
}: Props) {

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const current = useMemo(
    () => menuPages[page],
    [page]
  );

  const progress = useMemo(
    () => ((page + 1) / menuPages.length) * 100,
    [page]
  );

  const handleSwipe = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

      if (info.offset.x < -120) {
        nextPage();
        return;
      }

      if (info.offset.x > 120) {
        prevPage();
      }

    },
    [nextPage, prevPage]
  );

  const slides = useMemo(
    
    () =>
      menuPages.map((item) => ({
        src: item.image,
      })),
    []
  );
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (lightboxOpen) return;

    switch (event.key) {
      case "ArrowLeft":
        prevPage();
        break;

      case "ArrowRight":
        nextPage();
        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [lightboxOpen, nextPage, prevPage]);
    return (
    <>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={page}
        plugins={[Zoom]}
        carousel={{
          finite: true,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />

      <div className="relative flex w-full max-w-6xl flex-col items-center">

        <AnimatePresence mode="wait" initial={false}>

          <motion.div
            key={page}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleSwipe}
            initial={{
              opacity: 0,
              x: 90,
              rotateY: 12,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: -90,
              rotateY: -12,
              scale: 0.97,
            }}
            transition={TRANSITION}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >

            {/* Background Glow */}

            <motion.div
              className="pointer-events-none absolute -inset-10 rounded-[60px] bg-gradient-to-r from-[#C8A44D]/20 via-[#0F5B43]/20 to-[#C8A44D]/20 blur-[70px]"
              animate={{
                opacity: [0.35, 0.6, 0.35],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Premium Border */}

            <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#E2C46E] via-[#0F5B43] to-[#C8A44D] p-[2px] shadow-[0_45px_120px_rgba(0,0,0,.55)]">

              <div className="rounded-[32px] bg-[#050505] p-[6px]">

                <motion.button
                  whileTap={{ scale: 0.99 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setLightboxOpen(true)}
                  className="block overflow-hidden rounded-[28px]"
                >

                  <Image
                    src={current.image}
                    alt={current.title}
                    width={900}
                    height={1300}
                    priority={page === 0}
                    draggable={false}
                    className="
                      max-h-[82vh]
                      w-auto
                      object-contain
                      rounded-[28px]
                      select-none
                      cursor-zoom-in
                      shadow-2xl
                    "
                  />

                </motion.button>

              </div>

            </div>

          </motion.div>

        </AnimatePresence>
                {/* Bottom Controls */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.45,
          }}
          className="mt-8 w-full max-w-3xl"
        >
          <div className="rounded-3xl border border-[#C8A44D]/25 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">

            <div className="flex items-center justify-between px-5 py-5">

              {/* Previous */}

              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "rgba(200,164,77,.15)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={prevPage}
                disabled={page === 0}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A44D]/30
                  text-[#F5F2EA]
                  transition-all
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <ChevronLeft size={22} />
              </motion.button>

              {/* Center */}

              <div className="flex flex-col items-center">

                <span className="text-xs uppercase tracking-[0.35em] text-[#C8A44D]/80">
                  Digital Menu
                </span>

                <h2 className="mt-2 text-xl font-semibold text-[#F8F6F2]">
                  {current.title}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Page {page + 1} of {menuPages.length}
                </p>

              </div>

              {/* Next */}

              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "rgba(200,164,77,.15)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={nextPage}
                disabled={page === menuPages.length - 1}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A44D]/30
                  text-[#F5F2EA]
                  transition-all
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <ChevronRight size={22} />
              </motion.button>

            </div>

            {/* Progress */}

            <div className="px-6 pb-5">

              <div className="h-2 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8A44D] via-[#E2C46E] to-[#0F5B43]"
                  initial={false}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                />

              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">

                <span>← Swipe or use arrows</span>

                <span>Tap image to zoom</span>

              </div>

            </div>

          </div>
        </motion.div>
              </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[40px] border border-[#C8A44D]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}