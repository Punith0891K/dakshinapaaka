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
           initial={{
    opacity:0,
    backdropFilter:"blur(0px)"
}}

animate={{
    opacity:1,
    backdropFilter:"blur(18px)"
}}

exit={{
    opacity:0,
    backdropFilter:"blur(0px)"
}}

transition={{
    duration:.7
}}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] overflow-hidden bg-black/90 backdrop-blur-xl"
          >
            {/* Emerald Glow */}
            <div className="absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0F5B43]/30 blur-[170px]" />

            {/* Gold Glow */}
            <div className="absolute bottom-1/4 right-1/4 h-[360px] w-[360px] rounded-full bg-[#C8A44D]/25 blur-[150px]" />
<motion.div
    initial={{
        opacity:0,
        scale:.6
    }}

    animate={{
        opacity:.25,
        scale:1
    }}

    transition={{
        duration:1.2
    }}

    className="
    absolute
    inset-0
    bg-[radial-gradient(circle,#C8A44D22_0%,transparent_70%)]
    "
/>
            {/* Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          </motion.div>

          {/* Modal */}
          <motion.div
           initial={{
  opacity: 0,
  scale: 0.82,
  y: 80,
}}

animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}

exit={{
  opacity: 0,
  scale: 1.08,
}}

transition={{
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
}}
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

<div className="flex w-full max-w-7xl flex-col items-center">

  {/* Header */}

  <motion.div
    initial={{ opacity: 0, y: -25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15 }}
    className="mb-10 text-center"
  >

    <p className="mb-3 text-xs uppercase tracking-[0.55em] text-[#D4AF37]">
      Dakshinapaaka
    </p>

    <h2 className="font-playfair text-5xl text-white">
      Digital Menu
    </h2>

    <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

  </motion.div>

  {/* Viewer */}

  <motion.div
    initial={{
      opacity: 0,
      y: 35,
      scale: 0.94,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      delay: 0.2,
      duration: 0.8,
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

  <motion.div
    animate={{
      opacity: showControls ? 1 : 0,
      y: showControls ? 0 : 10,
    }}
    className="mt-7 text-sm tracking-[0.45em] text-[#D4AF37]"
  >
    {String(page + 1).padStart(2, "0")} / {String(menuPages.length).padStart(2, "0")}
  </motion.div>

  {/* Thumbnails */}

  <motion.div
    animate={{
      opacity: showControls ? 1 : 0,
      y: showControls ? 0 : 20,
    }}
    transition={{ duration: 0.25 }}
    className="mt-8"
  >
    <ThumbnailBar
      page={page}
      setPage={setPage}
    />
  </motion.div>

  {/* Keyboard Hint */}

  <motion.p
    animate={{
      opacity: showControls ? 0.5 : 0,
    }}
    className="mt-8 text-xs uppercase tracking-[0.35em] text-white/60"
  >
    ← Previous &nbsp;&nbsp;&nbsp; → Next &nbsp;&nbsp;&nbsp; Esc Close
  </motion.p>

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