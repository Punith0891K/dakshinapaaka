import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <Image
        src="/images/hero/hero_main.jpg"
        alt="Dakshinapaaka"
        fill
        priority
        className="object-cover object-[72%_center] lg:object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center pt-24 pb-12 lg:pt-0">

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="max-w-md lg:max-w-2xl">

            {/* Subtitle */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#43B05C] sm:text-sm sm:tracking-[6px]">
              Authentic South Indian Cuisine
            </p>

            {/* Heading */}
            <h1 className="font-serif font-bold leading-[0.95] text-white text-5xl sm:text-6xl lg:text-7xl">
              Experience the Taste
              <br />
              of Tradition
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-8 text-gray-200 sm:text-lg">
              Traditional South Indian cuisine prepared with fresh ingredients
              and warm hospitality in the heart of Mysuru.
            </p>

            {/* CTA */}
            <button
              className="
                mt-10
                inline-flex
                items-center
                rounded-full
                bg-[#2F6B3D]
                px-7
                py-4
                text-base
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#255632]
                sm:px-8
              "
            >
              Explore Our Menu →
            </button>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-3xl text-white lg:block">
        ↓
      </div>

    </section>
  );
}