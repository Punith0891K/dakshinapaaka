"use client";

/**
 * The inside face of the front cover.
 *
 * The flipping cover is a two-sided plane: MenuCover is the outside (what
 * you see while the book is closed) and this is the inside (what you see
 * once it swings open past ~90deg). Without a real second face here,
 * backface-visibility:hidden has nothing to render past the halfway point
 * of the flip and the cover just vanishes — this component is what makes
 * the open animation continuous instead of "disappearing".
 */
export default function MenuCoverInside() {
  return (
    <div className="relative h-full w-full">
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[470px]
          -translate-x-1/2
          -translate-y-1/2
          scale-[0.553]
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-[#FBF3DE]
          via-[#F3E6BC]
          to-[#E4CE99]
          shadow-[inset_0_0_70px_rgba(120,88,24,.28)]
          sm:scale-[0.596]
          lg:scale-[0.886]
          xl:scale-100
        "
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        {/* Spine shadow — the gutter where the cover meets the pages */}
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-10
            bg-gradient-to-r
            from-black/25
            via-black/5
            to-transparent
          "
        />

        {/* Ribbon bookmark, sewn into the spine */}
        <div
          className="absolute left-24 top-0 h-44 w-6 bg-gradient-to-b from-[#8C1F2C] to-[#5E1219] shadow-[0_10px_18px_rgba(0,0,0,.3)]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)",
          }}
        />

        {/* Gold border, matching the outer cover */}
        <div className="absolute inset-[10px] rounded-[24px] border border-[#B8923F]/60" />

        {/* Decorative corners */}
        <div className="absolute left-8 top-8 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-[#B8923F]/45" />
        <div className="absolute right-8 top-8 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-[#B8923F]/45" />
        <div className="absolute bottom-8 left-8 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-[#B8923F]/45" />
        <div className="absolute bottom-8 right-8 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-[#B8923F]/45" />

        {/* Marbled endpaper texture, typical of a hardcover lining */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.07]
            mix-blend-multiply
            pointer-events-none
            [background-image:
              radial-gradient(circle_at_22%_28%,rgba(15,91,67,.55)_1px,transparent_1.6px),
              radial-gradient(circle_at_72%_62%,rgba(120,88,24,.45)_1px,transparent_1.6px),
              radial-gradient(circle_at_48%_86%,rgba(15,91,67,.4)_1px,transparent_1.6px)]
            [background-size:24px_24px]
          "
        />

        {/* Emblem */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 text-center">
          <span className="text-[30px] text-[#B8923F]">❦</span>

          <p className="font-playfair mt-6 text-2xl tracking-wide text-[#184838]">
            Dakshina Paaka
          </p>

          <div className="mt-5 h-px w-24 bg-[#B8923F]/50" />

          <p className="mt-5 text-[11px] uppercase tracking-[0.4em] text-[#8C6A2D]">
            Fine Dining Since 2024
          </p>
        </div>

        {/* Soft top light, consistent with the outer cover */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-44
            bg-gradient-to-b
            from-white/25
            via-white/5
            to-transparent
          "
        />

        {/* Soft vignette */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[32px]
            bg-gradient-to-b
            from-transparent
            via-transparent
            to-black/10
          "
        />
      </div>
    </div>
  );
}
