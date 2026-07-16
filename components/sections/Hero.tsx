import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Artwork */}
      <div className="absolute inset-0 overflow-hidden">
  <Image
    src="/images/hero/hero_main.jpg"
    alt="Dakshinapaaka"
    fill
    priority
    className="object-cover object-[85%_center]"
  />
</div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/1" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto max-w-7xl w-full px-8">

          <div className="max-w-xl lg:-ml-12">

            <p className="mb-5 uppercase tracking-[8px] text-[#43B05C] font-semibold">
              Authentic South Indian Cuisine
            </p>

            <h1 className="font-serif text-6xl lg:text-7xl font-bold leading-tight text-white">
              Experience the Taste
              <br />
              of Tradition
            </h1>

            <p className="mt-8 text-xl leading-9 text-gray-200">
              Traditional South Indian cuisine prepared with fresh
              ingredients and warm hospitality in the heart of Mysuru.
            </p>

            <button className="mt-12 rounded-full bg-[#2F6B3D] px-9 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#255632]">
              Explore Our Menu →
            </button>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl">
        ↓
      </div>

    </section>
  );
}