"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { menuPages } from "@/data/menu";
import MenuViewer from "./MenuViewer";
import ThumbnailBar from "./ThumbnailBar";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MenuModal({
  open,
  onClose,
}: Props) {
  const [page, setPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, menuPages.length - 1));
  };

  const prevPage = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  // Lock body scroll + keyboard navigation
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          nextPage();
          break;

        case "ArrowLeft":
          prevPage();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Auto hide controls
  useEffect(() => {
    if (!open) return;

    let timer: ReturnType<typeof setTimeout>;

    const show = () => {
      setShowControls(true);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    };

    show();

    window.addEventListener("mousemove", show);
    window.addEventListener("touchstart", show);

    return () => {
      clearTimeout(timer);

      window.removeEventListener("mousemove", show);
      window.removeEventListener("touchstart", show);
    };
  }, [open]);
    return (
    <AnimatePresence>
      {open && (
        <>
          {/* Premium Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] overflow-hidden bg-black/90 backdrop-blur-xl"
          >
            {/* Emerald Glow */}
            <div className="absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0F5B43]/30 blur-[170px]" />

            {/* Gold Glow */}
            <div className="absolute bottom-1/4 right-1/4 h-[360px] w-[360px] rounded-full bg-[#C8A44D]/25 blur-[150px]" />

            {/* Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
          >
            {/* Close Button */}
            <motion.button
              animate={{
                opacity: showControls ? 1 : 0,
                scale: showControls ? 1 : 0.9,
              }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="absolute right-8 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:bg-[#C8A44D] hover:text-[#173F2D]"
            >
              <X size={22} />
            </motion.button>

            {/* Previous */}
            <motion.button
              animate={{
                opacity: showControls ? 1 : 0,
                x: showControls ? 0 : -20,
              }}
              transition={{ duration: 0.25 }}
              onClick={prevPage}
              disabled={page === 0}
              className="absolute left-6 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-30 lg:left-12"
            >
              <ChevronLeft size={28} />
            </motion.button>

            {/* Content */}
            <div className="flex flex-col items-center gap-4">
              <MenuViewer
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
              />

              <motion.div
                animate={{
                  opacity: showControls ? 1 : 0,
                  y: showControls ? 0 : 20,
                }}
                transition={{ duration: 0.25 }}
              >
                <ThumbnailBar
                  page={page}
                  setPage={setPage}
                />
              </motion.div>
            </div>

            {/* Next */}
            <motion.button
              animate={{
                opacity: showControls ? 1 : 0,
                x: showControls ? 0 : 20,
              }}
              transition={{ duration: 0.25 }}
              onClick={nextPage}
              disabled={page === menuPages.length - 1}
              className="absolute right-6 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#C8A44D] hover:text-[#173F2D] disabled:cursor-not-allowed disabled:opacity-30 lg:right-12"
            >
              <ChevronRight size={28} />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}