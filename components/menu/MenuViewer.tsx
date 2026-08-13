"use client";

import Image from "next/image";
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
  PanInfo,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2,
} from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

import { menuPages } from "@/data/menu";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface Props {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}

const TRANSITION = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function MenuViewer({
  page,
  nextPage,
  prevPage,
}: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isTouch = useIsTouchDevice();
  const lastTapRef = useRef<number>(0);

  const current = useMemo(() => menuPages[page], [page]);

  const progress = useMemo(
    () => ((page + 1) / menuPages.length) * 100,
    [page]
  );

  const handleSwipe = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Give priority to horizontal-dominant swipes only
      if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;

      const swipeThreshold = 80;
      const velocityThreshold = 400;

      if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
        nextPage();
        return;
      }
      if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
        prevPage();
      }
    },
    [nextPage, prevPage]
  );

  const slides = useMemo(
    () => menuPages.map((item) => ({ src: item.image })),
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (event.key === "ArrowLeft") prevPage();
      else if (event.key === "ArrowRight") nextPage();
      else if (event.key.toLowerCase() === "z") setLightboxOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextPage, prevPage]);

  // Double-tap to zoom on touch devices (mirrors the native photo-viewer feel).
  const handleImageTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      setLightboxOpen(true);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, []);

  // Adjacent-page preload — the browser fetches the next & previous image while
  // the user is looking at the current one, so navigation feels instantaneous.
  const preloadSrcs = useMemo(() => {
    const srcs: string[] = [];
    if (menuPages[page + 1]) srcs.push(menuPages[page + 1].image);
    if (menuPages[page - 1]) srcs.push(menuPages[page - 1].image);
    return srcs;
  }, [page]);

  return (
    <>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={page}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleTapDelay: 250,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />

      {/* Invisible image tags so the browser prefetches adjacent pages */}
      <div aria-hidden className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden">
        {preloadSrcs.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={40}
            height={60}
            sizes="40px"
            quality={20}
          />
        ))}
      </div>

      <div
        className="relative flex w-full max-w-6xl flex-col items-center"
        data-testid="menu-viewer"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            onDragEnd={handleSwipe}
            initial={{ opacity: 0, x: 70, rotateY: 10, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: -70, rotateY: -10, scale: 0.97 }}
            transition={TRANSITION}
            style={{ transformStyle: "preserve-3d" }}
            className="relative touch-pan-y"
          >
            {/* Background Glow */}
            <motion.div
              className="pointer-events-none absolute -inset-8 rounded-[60px] bg-gradient-to-r from-[#C8A44D]/20 via-[#0F5B43]/20 to-[#C8A44D]/20 blur-[70px] sm:-inset-10"
              animate={{
                opacity: [0.35, 0.55, 0.35],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Premium Border */}
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E2C46E] via-[#0F5B43] to-[#C8A44D] p-[2px] shadow-[0_35px_80px_rgba(0,0,0,.55)] sm:rounded-[34px]">
              <div className="rounded-[22px] bg-[#050505] p-[5px] sm:rounded-[32px] sm:p-[6px]">
                <button
                  type="button"
                  onClick={() => {
                    if (isTouch) handleImageTap();
                    else setLightboxOpen(true);
                  }}
                  className="relative block overflow-hidden rounded-[18px] sm:rounded-[28px]"
                  data-testid="menu-image-zoom-button"
                  aria-label={`Zoom in on ${current.title}. Double-tap on mobile.`}
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    width={900}
                    height={1300}
                    priority={page <= 1}
                    draggable={false}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 900px"
                    className="
                      max-h-[62vh]
                      w-auto
                      max-w-[92vw]
                      select-none
                      rounded-[18px]
                      object-contain
                      shadow-2xl
                      sm:max-h-[70vh]
                      sm:rounded-[28px]
                      lg:max-h-[76vh]
                    "
                  />

                  {/* Zoom affordance badge — appears in the corner so users
                      know the image is interactive without needing a tour. */}
                  <span className="pointer-events-none absolute right-3 top-3 z-20 hidden items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#F4D06F] backdrop-blur-md sm:flex">
                    <ZoomIn size={12} strokeWidth={2.2} /> Click to zoom
                  </span>
                  <span className="pointer-events-none absolute right-2.5 top-2.5 z-20 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[#F4D06F] backdrop-blur-md sm:hidden">
                    <Maximize2 size={10} strokeWidth={2.2} /> Double-tap
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="mt-5 w-full max-w-3xl px-2 sm:mt-8"
        >
          <div className="rounded-2xl border border-[#C8A44D]/25 bg-white/5 shadow-[0_16px_50px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-5 sm:py-5">
              {/* Previous */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={prevPage}
                disabled={page === 0}
                aria-label="Previous page"
                data-testid="viewer-prev-btn"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A44D]/30
                  text-[#F5F2EA]
                  transition-all
                  hover:bg-[#C8A44D]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  sm:h-12
                  sm:w-12
                "
              >
                <ChevronLeft size={22} />
              </motion.button>

              {/* Center */}
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.32em] text-[#C8A44D]/80 sm:text-xs sm:tracking-[0.35em]">
                  Digital Menu
                </span>
                <h2 className="mt-1.5 line-clamp-1 text-base font-semibold text-[#F8F6F2] sm:mt-2 sm:text-xl">
                  {current.title}
                </h2>
                <p className="mt-0.5 text-[11px] text-gray-400 sm:mt-1 sm:text-sm">
                  Page {page + 1} of {menuPages.length}
                </p>
              </div>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={nextPage}
                disabled={page === menuPages.length - 1}
                aria-label="Next page"
                data-testid="viewer-next-btn"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A44D]/30
                  text-[#F5F2EA]
                  transition-all
                  hover:bg-[#C8A44D]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  sm:h-12
                  sm:w-12
                "
              >
                <ChevronRight size={22} />
              </motion.button>
            </div>

            {/* Progress */}
            <div className="px-4 pb-4 sm:px-6 sm:pb-5">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10 sm:h-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8A44D] via-[#E2C46E] to-[#0F5B43]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 sm:text-xs">
                <span>{isTouch ? "Swipe to navigate" : "← Swipe or use arrows"}</span>
                <span>{isTouch ? "Double-tap to zoom" : "Click image to zoom"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
