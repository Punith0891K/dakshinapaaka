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
    <div className="w-full" data-testid="menu-thumbnail-bar">
      {/* Inline scrollbar-hide fallback so we don't have to touch tailwind config */}
      <style>{`
        .dp-thumb-scroller::-webkit-scrollbar { display: none; }
        .dp-thumb-scroller { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        ref={containerRef}
        className="dp-thumb-scroller mx-auto flex max-w-4xl gap-2 overflow-x-auto rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-2xl sm:gap-2.5 sm:rounded-2xl sm:px-3 sm:py-2"
      >
        {menuPages.map((item, index) => {
          const active = page === index;

          return (
            <motion.button
              key={item.id}
              ref={active ? activeRef : null}
              onClick={() => setPage(index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: active ? 1.05 : 1 }}
              transition={{ duration: 0.22 }}
              data-testid={`thumbnail-${index}`}
              aria-label={`Jump to page ${index + 1}: ${item.title}`}
              className={`group flex shrink-0 flex-col items-center ${
                active ? "opacity-100" : "opacity-55 hover:opacity-100"
              }`}
            >
              <div
                className={`overflow-hidden rounded-md border-2 transition-all duration-300 sm:rounded-lg ${
                  active
                    ? "border-[#C8A44D] shadow-[0_0_16px_rgba(200,164,77,.4)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={100}
                  sizes="(max-width: 640px) 44px, 60px"
                  quality={60}
                  className="h-[54px] w-[38px] object-cover transition-transform duration-300 group-hover:scale-105 sm:h-[70px] sm:w-[50px]"
                />
              </div>

              <span
                className={`mt-1 max-w-[52px] truncate text-center text-[9px] font-medium transition-colors sm:mt-1.5 sm:max-w-[70px] sm:text-[10px] ${
                  active ? "text-[#F4D06F]" : "text-white/55 group-hover:text-white/85"
                }`}
              >
                {item.title.split(" ")[0]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
