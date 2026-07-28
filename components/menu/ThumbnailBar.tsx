"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuPages } from "@/data/menu";

interface Props {
  page: number;
  setPage: (page: number) => void;
}

export default function ThumbnailBar({
  page,
  setPage,
}: Props) {
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
    <div className="w-full max-w-5xl">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-2xl scrollbar-hide"
      >
        {menuPages.map((item, index) => {
          const active = page === index;

          return (
            <motion.button
              key={item.id}
              ref={active ? activeRef : null}
              onClick={() => setPage(index)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: active ? 1.08 : 1,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`group flex shrink-0 flex-col items-center ${
                active ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  active
                    ? "border-[#C8A44D] shadow-[0_0_25px_rgba(200,164,77,.45)]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={82}
                  height={118}
                  className="h-[110px] w-[78px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <span
                className={`mt-2 max-w-[85px] text-center text-[11px] font-medium transition-colors ${
                  active
                    ? "text-[#F4D06F]"
                    : "text-white/60 group-hover:text-white"
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