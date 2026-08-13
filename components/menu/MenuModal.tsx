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
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export default function MenuModal({ open, onClose }: Props) {
  const [page, setPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const isTouch = useIsTouchDevice();

  const currentPage = useMemo(() => menuPages[page], [page]);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, menuPages.length - 1));
  }, []);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 0));
  }, []);

  // Reset to cover whenever the modal is closed so it re-opens cleanly.
  useEffect(() => {
    if (!open) {
      setPage(0);
      setShareState("idle");
    }
  }, [open]);

  // Body scroll lock + keyboard nav
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") nextPage();
      else if (e.key === "ArrowLeft") prevPage();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [nextPage, onClose, open, prevPage]);

  // Auto-hide controls on desktop only. On touch devices we keep controls
  // pinned — auto-hide plus a random touchstart re-showing them created a
  // visible flicker every time users swiped.
  useEffect(() => {
    if (!open) return;
    if (isTouch) {
      setShowControls(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3200);
    };
    show();

    window.addEventListener("mousemove", show);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", show);
    };
  }, [open, isTouch]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Dakshinapaaka Menu",
      text: "Explore the Dakshinapaaka authentic South Indian menu.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as Navigator).share(shareData);
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(shareData.url);
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] overflow-hidden bg-black/92 backdrop-blur-xl"
            data-testid="menu-modal-backdrop"
          >
            <div className="absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0F5B43]/30 blur-[170px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[360px] w-[360px] rounded-full bg-[#C8A44D]/25 blur-[150px]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-[radial-gradient(circle,#C8A44D22_0%,transparent_70%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto overscroll-contain px-3 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-5"
            data-testid="menu-modal"
          >
            {/* Top action bar (mobile-first, always visible) */}
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[10001] flex items-start justify-between px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
              {/* Share + Download */}
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share menu"
                  data-testid="share-menu-btn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:h-12 sm:w-12"
                >
                  {shareState === "copied" ? (
                    <Check size={18} strokeWidth={2.4} />
                  ) : (
                    <Share2 size={18} />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  aria-label="Download current page"
                  data-testid="download-menu-btn"
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:inline-flex sm:h-12 sm:w-12"
                >
                  <Download size={18} />
                </button>
              </div>

              {/* Close */}
              <motion.button
                animate={{
                  opacity: isTouch ? 1 : showControls ? 1 : 0.4,
                  scale: showControls ? 1 : 0.94,
                }}
                transition={{ duration: 0.25 }}
                onClick={onClose}
                aria-label="Close menu"
                data-testid="menu-close-btn"
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:bg-[#C8A44D] hover:text-[#173F2D] sm:h-12 sm:w-12"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Left arrow — off-canvas on very narrow phones (bottom bar covers nav there) */}
            <motion.button
              animate={{
                opacity: isTouch ? 0 : showControls ? 1 : 0,
                x: showControls ? 0 : -20,
              }}
              transition={{ duration: 0.25 }}
              onClick={prevPage}
              disabled={page === 0}
              aria-label="Previous page"
              className="absolute left-4 top-1/2 z-[10000] hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-30 md:flex lg:left-8"
            >
              <ChevronLeft size={28} />
            </motion.button>

            {/* Content */}
            <div className="relative flex w-full max-w-7xl flex-col items-center pt-14 sm:pt-4">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mb-4 text-center sm:mb-8"
              >
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] sm:mb-3 sm:text-xs sm:tracking-[0.55em]">
                  Dakshinapaaka
                </p>
                <h2 className="font-playfair text-2xl text-white sm:text-4xl lg:text-5xl">
                  Digital Menu
                </h2>
                <div className="mx-auto mt-2.5 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent sm:mt-5 sm:w-40" />
              </motion.div>

              {/* Category quick-jump chips */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="dp-thumb-scroller mb-4 flex w-full max-w-3xl gap-2 overflow-x-auto px-1 pb-1 sm:mb-6 sm:justify-center sm:gap-2.5 sm:overflow-visible sm:px-0"
                data-testid="category-quickjump"
              >
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
                          : "border-white/15 bg-white/5 text-white/70 hover:border-[#C8A44D]/60 hover:text-[#F4D06F]"
                      }`}
                    >
                      <Icon size={13} strokeWidth={2} />
                      {cat.label}
                    </button>
                  );
                })}
              </motion.div>

              {/* Viewer */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.18,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MenuViewer
                  page={page}
                  nextPage={nextPage}
                  prevPage={prevPage}
                />
              </motion.div>

              {/* Counter */}
              <div
                className="mt-4 text-xs tracking-[0.35em] text-[#D4AF37] sm:mt-6 sm:text-sm sm:tracking-[0.45em]"
                data-testid="page-counter"
              >
                {String(page + 1).padStart(2, "0")} /{" "}
                {String(menuPages.length).padStart(2, "0")}
              </div>

              {/* Thumbnails */}
              <motion.div
                animate={{
                  opacity: isTouch ? 1 : showControls ? 1 : 0.4,
                  y: showControls ? 0 : 12,
                }}
                transition={{ duration: 0.25 }}
                className="mt-5 w-full sm:mt-8"
              >
                <ThumbnailBar page={page} setPage={setPage} />
              </motion.div>

              {/* Keyboard Hint — desktop only */}
              {!isTouch && (
                <motion.p
                  animate={{ opacity: showControls ? 0.5 : 0 }}
                  className="mt-6 hidden text-xs uppercase tracking-[0.35em] text-white/60 sm:block"
                >
                  ← Previous &nbsp;&nbsp; → Next &nbsp;&nbsp; Z Zoom &nbsp;&nbsp; Esc Close
                </motion.p>
              )}

              {/* Mobile sticky footer nav — big tap targets always visible */}
              <div
                className="sticky bottom-0 z-[10000] mt-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/12 bg-black/70 px-3 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,.4)] backdrop-blur-xl sm:hidden"
                style={{
                  marginBottom: "env(safe-area-inset-bottom)",
                }}
              >
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  data-testid="mobile-prev-btn"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/5 py-3 text-sm font-medium text-white/90 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <button
                  onClick={handleDownload}
                  aria-label="Download"
                  data-testid="mobile-download-btn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#D4AF37] transition-all active:scale-95"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={nextPage}
                  disabled={page === menuPages.length - 1}
                  data-testid="mobile-next-btn"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#C8A44D]/40 bg-[#C8A44D]/15 py-3 text-sm font-semibold text-[#F4D06F] transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Right arrow */}
            <motion.button
              animate={{
                opacity: isTouch ? 0 : showControls ? 1 : 0,
                x: showControls ? 0 : 20,
              }}
              transition={{ duration: 0.25 }}
              onClick={nextPage}
              disabled={page === menuPages.length - 1}
              aria-label="Next page"
              className="absolute right-4 top-1/2 z-[10000] hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-30 md:flex lg:right-8"
            >
              <ChevronRight size={28} />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
