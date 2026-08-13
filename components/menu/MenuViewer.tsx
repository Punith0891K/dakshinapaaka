"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  PanInfo,
} from "framer-motion";
import { ZoomIn, Maximize2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { menuPages } from "@/data/menu";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface Props {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  /**
   * When true, the viewer strips its glow / drag / hint chrome and leans
   * fully into the surrounding modal. Used by fullscreen + cinematic modes.
   */
  minimal?: boolean;
}

const TRANSITION = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function MenuViewer({
  page,
  nextPage,
  prevPage,
  minimal = false,
}: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isTouch = useIsTouchDevice();
  const lastTapRef = useRef<number>(0);

  const current = useMemo(() => menuPages[page], [page]);

  const handleSwipe = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
      const swipeT = 70;
      const velT = 350;
      if (info.offset.x < -swipeT || info.velocity.x < -velT) {
        nextPage();
        return;
      }
      if (info.offset.x > swipeT || info.velocity.x > velT) {
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

  // Double-tap to zoom on touch devices.
  const handleImageTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      setLightboxOpen(true);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, []);

  // Preload neighbours so ← / → feels instant.
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
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true, doubleTapDelay: 250 }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
      />

      {/* Off-screen preload of adjacent pages */}
      <div aria-hidden className="pointer-events-none fixed left-0 top-0 -z-10 h-0 w-0 overflow-hidden">
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

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragEnd={handleSwipe}
        className="relative flex h-full w-full items-center justify-center touch-pan-y select-none"
        data-testid="menu-viewer"
      >
        {/* Ambient glow — static (no infinite anim) to keep mobile buttery.
            Also skipped entirely in minimal mode. */}
        {!minimal && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-6 rounded-[60px] bg-gradient-to-r from-[#C8A44D]/12 via-[#0F5B43]/12 to-[#C8A44D]/12 blur-[60px] sm:inset-8"
          />
        )}

        {/*
          Aspect-locked stage. The container's size never changes when the
          page changes, so the surrounding chrome (arrows, thumbnails,
          progress) never re-flows — this is the fix for the "everything
          shifts up and down when I press an arrow" bug.

          Source PNGs are ~1470×1070 (landscape 1.374:1). Locking the stage
          to the exact source aspect makes each menu page fill the frame
          edge-to-edge — no black letterboxing, no wasted viewport.
        */}
        <div
          className="relative max-h-full max-w-full"
          style={{ aspectRatio: "1470 / 1070", width: "min(100%, calc((100dvh - 210px) * (1470/1070)))" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#E2C46E] via-[#0F5B43] to-[#C8A44D] p-[2px] shadow-[0_25px_70px_rgba(0,0,0,.5)] sm:rounded-[28px]">
            <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#050505] sm:rounded-[26px]">
              <AnimatePresence initial={false}>
                <motion.button
                  type="button"
                  key={page}
                  onClick={() => {
                    if (isTouch) handleImageTap();
                    else setLightboxOpen(true);
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={TRANSITION}
                  className="absolute inset-0 block cursor-zoom-in overflow-hidden"
                  data-testid="menu-image-zoom-button"
                  aria-label={`Zoom in on ${current.title}`}
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    priority={page <= 1}
                    draggable={false}
                    quality={78}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 560px"
                    className="select-none object-contain"
                  />

                  {/* Zoom affordance badges */}
                  {!minimal && (
                    <>
                      <span className="pointer-events-none absolute right-3 top-3 z-20 hidden items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#F4D06F] backdrop-blur-md sm:flex">
                        <ZoomIn size={12} strokeWidth={2.2} /> Click to zoom
                      </span>
                      <span className="pointer-events-none absolute right-2.5 top-2.5 z-20 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[#F4D06F] backdrop-blur-md sm:hidden">
                        <Maximize2 size={10} strokeWidth={2.2} /> Double-tap
                      </span>
                    </>
                  )}
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
