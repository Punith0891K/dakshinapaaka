"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuPages } from "@/data/menu";

interface Props {
  page: number;
  setPage: (page: number) => void;
}

export default function ThumbnailBar({ page, setPage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [page]);

  return (
    <div className="w-full max-w-5xl" data-testid="menu-thumbnail-bar">
      {/* Inline scrollbar-hide fallback so we don't have to touch tailwind config */}
      <style>{`
        .dp-thumb-scroller::-webkit-scrollbar { display: none; }
        .dp-thumb-scroller { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        ref={containerRef}
        className="dp-thumb-scroller flex gap-2.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-2xl sm:gap-4 sm:px-5 sm:py-4"
      >
        {menuPages.map((item, index) => {
          const active = page === index;

          return (
            <motion.button
              key={item.id}
              ref={active ? activeRef : null}
              onClick={() => setPage(index)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: active ? 1.06 : 1 }}
              transition={{ duration: 0.22 }}
              data-testid={`thumbnail-${index}`}
              aria-label={`Jump to page ${index + 1}: ${item.title}`}
              className={`group flex shrink-0 flex-col items-center ${
                active ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className={`overflow-hidden rounded-xl border-2 transition-all duration-300 sm:rounded-2xl ${
                  active
                    ? "border-[#C8A44D] shadow-[0_0_20px_rgba(200,164,77,.45)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={82}
                  height={118}
                  sizes="(max-width: 640px) 60px, 82px"
                  className="h-[74px] w-[52px] object-cover transition-transform duration-300 group-hover:scale-105 sm:h-[110px] sm:w-[78px]"
                />
              </div>

              <span
                className={`mt-1.5 max-w-[64px] truncate text-center text-[10px] font-medium transition-colors sm:mt-2 sm:max-w-[85px] sm:text-[11px] ${
                  active ? "text-[#F4D06F]" : "text-white/60 group-hover:text-white"
                }`}
              >
                {item.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
