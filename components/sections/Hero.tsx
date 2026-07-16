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
className="
object-cover
object-[52%_center]
sm:object-[62%_center]
lg:object-[85%_center]
"
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 lg:bg-black/10" />

      {/* Left Gradient */}
     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent lg:from-black/70 lg:via-black/25" />
      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center pt-32 pb-14 lg:pt-0">  

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="max-w-[340px] sm:max-w-md lg:max-w-xl lg:-ml-12">

            {/* Subtitle */}
            <p className="
             mb-4
            uppercase
            tracking-[3px]
            sm:tracking-[5px]
            lg:tracking-[8px]
            text-[#43B05C]
            text-[12px]
            sm:text-sm
            font-semibold
">
              Authentic South Indian Cuisine
            </p>

            {/* Heading */}
            <h1 className="
font-serif
text-[54px]
leading-[0.95]
sm:text-6xl
lg:text-7xl
font-bold
text-white
">
              Experience the Taste
              <br />
              of Tradition
            </h1>

            {/* Description */}
            <p className="
mt-6
text-base
leading-8
sm:text-lg
lg:text-xl
text-gray-200
max-w-xs
sm:max-w-md
">
              Traditional South Indian cuisine prepared with fresh ingredients
              and warm hospitality in the heart of Mysuru.
            </p>

            {/* CTA */}
            <button
             className="
mt-10
rounded-full
bg-[#2F6B3D]
px-8
py-4
text-base
lg:px-9
lg:text-lg
font-semibold
text-white
transition-all
duration-300
hover:scale-105
hover:bg-[#255632]
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