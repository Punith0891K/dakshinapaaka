"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  BookOpen,
  Utensils,
  Flame,
  Leaf,
  Soup,
  CupSoda,
  Check,
  Maximize,
  Minimize,
  Play,
  Pause,
  Eye,
  EyeOff,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { menuCategories, menuPages } from "@/data/menu";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import MenuViewer from "./MenuViewer";
import ThumbnailBar from "./ThumbnailBar";

interface Props {
  open: boolean;
  onClose: () => void;
}

const iconMap = {
  leaf: Leaf,
  flame: Flame,
  soup: Soup,
  cup: CupSoda,
  utensils: Utensils,
  book: BookOpen,
} as const;

const AUTOPLAY_MS = 4500;

export default function MenuModal({ open, onClose }: Props) {
  const [page, setPage] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const isTouch = useIsTouchDevice();
  const rootRef = useRef<HTMLDivElement>(null);

  const currentPage = useMemo(() => menuPages[page], [page]);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, menuPages.length - 1));
  }, []);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 0));
  }, []);

  const progress = useMemo(
    () => ((page + 1) / menuPages.length) * 100,
    [page]
  );

  // Reset on close.
  useEffect(() => {
    if (!open) {
      setPage(0);
      setShareState("idle");
      setAutoplay(false);
      setCinematic(false);
    }
  }, [open]);

  // Body scroll lock + keyboard shortcuts.
  // Escape handling is intentionally split from the other shortcuts and
  // registered in the *capture* phase so that portal-based children
  // (like the lightbox) can never eat the event before we see it.
  const cinematicRef = useRef(cinematic);
  useEffect(() => {
    cinematicRef.current = cinematic;
  }, [cinematic]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Read cinematic from ref so this handler always sees the latest value
        // — the useEffect can be attached once and still Do The Right Thing.
        if (cinematicRef.current) setCinematic(false);
        else onClose();
        return;
      }
      if (e.key === "ArrowRight") nextPage();
      else if (e.key === "ArrowLeft") prevPage();
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key === " ") {
        e.preventDefault();
        setAutoplay((a) => !a);
      } else if (e.key.toLowerCase() === "c") setCinematic((c) => !c);
    };
    // Capture phase so portal children can't swallow Escape first.
    window.addEventListener("keydown", handleKey, true);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage, onClose, open, prevPage]);

  // Autoplay slideshow.
  useEffect(() => {
    if (!open || !autoplay) return;
    const t = setTimeout(() => {
      setPage((p) => (p >= menuPages.length - 1 ? 0 : p + 1));
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [open, autoplay, page]);

  // Track native fullscreen state changes (Esc, F11, etc).
  useEffect(() => {
    const sync = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Dakshinapaaka Menu",
      text: "Explore the Dakshinapaaka authentic South Indian menu.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
    if (typeof navigator !== "undefined" && "share" in navigator) {
  await navigator.share(shareData);
} else if (
  typeof navigator !== "undefined" &&
  "clipboard" in navigator
) {
  await (navigator as Navigator).clipboard.writeText(
    shareData.url
  );
  setShareState("copied");
  setTimeout(() => setShareState("idle"), 1800);
}
    } catch {
      /* user cancelled */
    }
  }, []);

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = currentPage.image;
    a.download = `dakshinapaaka-${currentPage.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [currentPage]);

  const chromeOpacity = cinematic ? 0 : 1;
  const chromePointer = cinematic ? "pointer-events-none" : "pointer-events-auto";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] overflow-hidden bg-black/94 backdrop-blur-xl"
            data-testid="menu-modal-backdrop"
          >
            <div className="absolute left-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-[#0F5B43]/28 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[320px] w-[320px] rounded-full bg-[#C8A44D]/22 blur-[130px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,#C8A44D18_0%,transparent_65%)]" />
          </motion.div>

          {/* Modal shell — fixed to viewport, dvh-locked, no scroll */}
          <motion.div
            ref={rootRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
            style={{
              height: "100dvh",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
              paddingLeft: "env(safe-area-inset-left)",
              paddingRight: "env(safe-area-inset-right)",
            }}
            data-testid="menu-modal"
            onClick={(e) => {
              // Tapping the empty side of the stage toggles cinematic on touch.
              if (
                isTouch &&
                (e.target as HTMLElement).dataset.role === "stage-bg"
              ) {
                setCinematic((c) => !c);
              }
            }}
          >
            {/* TOP BAR */}
            <motion.div
              animate={{ opacity: chromeOpacity, y: cinematic ? -20 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${chromePointer} relative z-20 flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3.5`}
            >
              {/* Left cluster */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ActionBtn
                  onClick={handleShare}
                  ariaLabel="Share menu"
                  testId="share-menu-btn"
                >
                  {shareState === "copied" ? (
                    <Check size={17} strokeWidth={2.4} />
                  ) : (
                    <Share2 size={17} />
                  )}
                </ActionBtn>
                <ActionBtn
                  onClick={handleDownload}
                  ariaLabel="Download current page"
                  testId="download-menu-btn"
                >
                  <Download size={17} />
                </ActionBtn>
              </div>

              {/* Center title */}
              <div className="pointer-events-none flex min-w-0 flex-col items-center text-center">
                <p className="hidden text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] sm:block sm:text-[10px] sm:tracking-[0.55em]">
                  Dakshinapaaka
                </p>
                <h2 className="font-playfair text-base leading-tight text-white sm:text-xl">
                  Digital Menu
                </h2>
              </div>

              {/* Right cluster */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ActionBtn
                  onClick={() => setAutoplay((a) => !a)}
                  ariaLabel={autoplay ? "Pause slideshow" : "Play slideshow"}
                  testId="autoplay-btn"
                  active={autoplay}
                >
                  {autoplay ? <Pause size={17} /> : <Play size={17} />}
                </ActionBtn>
                <ActionBtn
                  onClick={() => setCinematic((c) => !c)}
                  ariaLabel={cinematic ? "Exit cinematic mode" : "Cinematic mode"}
                  testId="cinematic-btn"
                  hideOnMobile
                >
                  {cinematic ? <EyeOff size={17} /> : <Eye size={17} />}
                </ActionBtn>
                <ActionBtn
                  onClick={toggleFullscreen}
                  ariaLabel={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  testId="fullscreen-btn"
                  hideOnMobile
                >
                  {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                </ActionBtn>
                <ActionBtn
                  onClick={onClose}
                  ariaLabel="Close menu"
                  testId="menu-close-btn"
                  danger
                >
                  <X size={18} />
                </ActionBtn>
              </div>
            </motion.div>

            {/* CATEGORY CHIPS */}
            <motion.div
              animate={{ opacity: chromeOpacity, y: cinematic ? -12 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${chromePointer} relative z-20 shrink-0`}
              data-testid="category-quickjump"
            >
              <div className="dp-thumb-scroller flex gap-2 overflow-x-auto px-3 pb-1 sm:justify-center sm:overflow-visible sm:px-6 sm:pb-0">
                {menuCategories.map((cat) => {
                  const Icon = iconMap[cat.icon];
                  const active = cat.page === page;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setPage(cat.page)}
                      data-testid={`category-chip-${cat.label.toLowerCase()}`}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs ${
                        active
                          ? "border-[#C8A44D] bg-[#C8A44D]/20 text-[#F4D06F] shadow-[0_0_18px_rgba(200,164,77,.35)]"
                          : "border-white/12 bg-white/5 text-white/70 hover:border-[#C8A44D]/60 hover:text-[#F4D06F]"
                      }`}
                    >
                      <Icon size={13} strokeWidth={2} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* STAGE — flex-1 so it fills whatever is left. Arrows are
                overlaid absolutely so they never affect the image height. */}
            <div
              data-role="stage-bg"
              className="relative flex flex-1 min-h-0 items-center justify-center px-2 py-2 sm:px-6 sm:py-4"
            >
              {/* Left arrow */}
              <motion.button
                animate={{ opacity: chromeOpacity }}
                onClick={prevPage}
                disabled={page === 0}
                aria-label="Previous page"
                data-testid="viewer-prev-btn"
                className={`${chromePointer} absolute left-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-25 sm:left-3 sm:h-14 sm:w-14 lg:left-6`}
              >
                <ChevronLeft size={22} className="sm:hidden" />
                <ChevronLeft size={28} className="hidden sm:block" />
              </motion.button>

              <MenuViewer
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
                minimal={cinematic}
              />

              {/* Right arrow */}
              <motion.button
                animate={{ opacity: chromeOpacity }}
                onClick={nextPage}
                disabled={page === menuPages.length - 1}
                aria-label="Next page"
                data-testid="viewer-next-btn"
                className={`${chromePointer} absolute right-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-25 sm:right-3 sm:h-14 sm:w-14 lg:right-6`}
              >
                <ChevronRight size={22} className="sm:hidden" />
                <ChevronRight size={28} className="hidden sm:block" />
              </motion.button>
            </div>

            {/* BOTTOM BAR — progress + title + thumbnails */}
            <motion.div
              animate={{ opacity: chromeOpacity, y: cinematic ? 24 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${chromePointer} relative z-20 shrink-0 px-3 pb-2 pt-1 sm:px-6 sm:pb-3`}
            >
              {/* Progress */}
              <div className="mx-auto mb-2 flex max-w-4xl items-center gap-3">
                <span
                  className="shrink-0 font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] sm:text-xs sm:tracking-[0.35em]"
                  data-testid="page-counter"
                >
                  {String(page + 1).padStart(2, "0")}/
                  {String(menuPages.length).padStart(2, "0")}
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10 sm:h-1.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#C8A44D] via-[#E2C46E] to-[#0F5B43]"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
                <span className="hidden shrink-0 text-xs text-white/70 sm:inline">
                  {currentPage.title}
                </span>
              </div>

              <ThumbnailBar page={page} setPage={setPage} />

              {/* Keyboard hint — desktop only */}
              {!isTouch && !cinematic && (
                <p className="mt-2 hidden text-center text-[10px] uppercase tracking-[0.35em] text-white/50 sm:block">
                  ← → Nav &nbsp;·&nbsp; Space Play &nbsp;·&nbsp; F Fullscreen &nbsp;·&nbsp; C Cinematic &nbsp;·&nbsp; Z Zoom &nbsp;·&nbsp; Esc Close
                </p>
              )}
            </motion.div>

            {/* Autoplay progress ring — small floater on the top-right when playing */}
            <AnimatePresence>
              {autoplay && !cinematic && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  key="autoplay-bar"
                  className="pointer-events-none absolute left-1/2 top-[64px] z-30 -translate-x-1/2 sm:top-[70px]"
                >
                  <div className="flex items-center gap-2 rounded-full border border-[#C8A44D]/40 bg-black/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#F4D06F] backdrop-blur-xl">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4D06F] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F4D06F]" />
                    </span>
                    Slideshow
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cinematic exit-hint chip */}
            <AnimatePresence>
              {cinematic && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={() => setCinematic(false)}
                  className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-xl transition hover:opacity-100"
                  data-testid="cinematic-exit-btn"
                >
                  Tap to show controls
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */

interface ActionBtnProps {
  onClick: () => void;
  ariaLabel: string;
  testId?: string;
  children: React.ReactNode;
  danger?: boolean;
  active?: boolean;
  hideOnMobile?: boolean;
}

function ActionBtn({
  onClick,
  ariaLabel,
  testId,
  children,
  danger,
  active,
  hideOnMobile,
}: ActionBtnProps) {
  // We deliberately switch the base display class instead of relying on
  // `hidden sm:inline-flex` alongside a base `inline-flex`. Tailwind emits
  // `.inline-flex` after `.hidden`, so the two collide and the mobile-hide
  // stops working — that's exactly what testing-agent v2 caught.
  const displayClass = hideOnMobile
    ? "hidden sm:inline-flex"
    : "inline-flex";

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      data-testid={testId}
      className={`
        ${displayClass}
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/15
        bg-black/55
        text-white
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-[1px]
        hover:border-[#C8A44D]/60
        hover:bg-[#C8A44D]
        hover:text-[#173F2D]
        active:scale-95
        sm:h-11
        sm:w-11
        ${active ? "border-[#C8A44D] bg-[#C8A44D]/25 text-[#F4D06F]" : ""}
        ${danger ? "hover:rotate-90" : ""}
      `}
    >
      {children}
    </button>
  );
}
