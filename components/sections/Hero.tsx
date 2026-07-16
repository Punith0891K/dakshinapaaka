import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full">

      {/* Background Image */}

      <Image
        src="/images/hero/hero-main.jpg"
        alt="Dakshinapaaka Restaurant"
        fill
        priority
        className="object-cover object-[70%_center]"
      />

      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

          <div className="max-w-2xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[6px] text-[#43B05C]">
              Authentic South Indian Cuisine
            </p>

            <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Experience the Taste
              <br />
              of Tradition
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-200">
              Traditional South Indian cuisine prepared with fresh
              ingredients and warm hospitality in the heart of Mysuru.
            </p>

            <div className="mt-10">

              <button className="rounded-full bg-[#2F6B3D] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-[#255632]">
                Explore Our Menu →
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        ↓
      </div>

    </section>
  );
}