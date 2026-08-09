"use client";

export default function MenuPages() {
  return (
    <div className="relative h-full w-full">
      {/*
        MenuCover designs its content on a fixed 700x470 canvas and then
        scales that whole canvas down per breakpoint, so text always stays
        proportional to the book's actual on-screen size. This component
        never had that treatment — its text used fixed sizes (text-5xl,
        text-lg, px-16) regardless of container size, so on mobile (where
        the book renders far smaller than 470px wide) "Dakshinapaaka"
        overflowed past both edges and the body copy wrapped one word per
        line. Wrapping everything in the same scaled canvas fixes that and
        keeps this page visually in sync with the cover at every size.
      */}
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
          sm:scale-[0.596]
          lg:scale-[0.886]
          xl:scale-100
        "
      >
        {/* Page Stack */}

        {Array.from({ length: 18 }).map((_, i) => (

          <div

            key={i}

            className="
            absolute
            rounded-[30px]
            bg-[#FFFDF8]
            border
            border-[#EFE7D4]
            "

            style={{
              inset: 0,
              left: i * 1.1,
              top: i * 0.8,
              zIndex: i,
            }}

          />

        ))}

        {/* Main Paper */}

        <div
          className="
          absolute
          inset-0
          rounded-[30px]
          overflow-hidden
          bg-[#FFFDF8]
          border
          border-[#E7DFC9]
          shadow-[0_20px_40px_rgba(0,0,0,.15)]
          "
          style={{
            // The 18 stacked page divs above use explicit z-index 0-17.
            // Positive z-index always paints above a z-index:auto element
            // regardless of DOM order, so without this the welcome content
            // below was being fully hidden behind the blank stacked pages.
            // 20 sits above the whole stack.
            zIndex: 20,
          }}
        >

          {/* Paper Grain */}

          <div
            className="
            absolute
            inset-0
            opacity-[0.04]
            pointer-events-none
            [background-image:
            radial-gradient(circle,rgba(0,0,0,.2)_1px,transparent_1px)]
            [background-size:12px_12px]
            "
          />

          {/* Gold Edge */}

          <div
            className="
            absolute
            right-0
            top-0
            h-full
            w-3
            bg-gradient-to-l
            from-[#F9E9B8]
            via-[#E8CF84]
            to-transparent
            "
          />

          {/* Inner Shadow */}

          <div
            className="
            absolute
            inset-0
            shadow-[inset_0_0_35px_rgba(0,0,0,.06)]
            "
          />

          {/* Welcome Page */}

          <div className="flex h-full flex-col items-center justify-center text-center px-16">

            <p className="tracking-[0.45em] uppercase text-[#B9923F] text-sm">
              Welcome
            </p>

            <div className="mt-10 h-px w-24 bg-[#D4AF37]" />

            <h2 className="mt-10 font-playfair text-5xl text-[#184838]">
              Dakshinapaaka
            </h2>

            <p className="mt-8 text-lg leading-9 text-[#666]">
              Authentic South Indian Cuisine
              <br />
              Prepared with Tradition
            </p>

            <div className="mt-12 h-px w-20 bg-[#D4AF37]/60" />

            <p className="mt-10 text-sm uppercase tracking-[0.35em] text-[#B9923F]">
              Since 2024
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
