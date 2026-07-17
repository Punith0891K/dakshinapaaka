import Image from "next/image";
import Link from "next/link";

const dishes = [
  {
    name: "Traditional South Indian Meals",
    category: "Traditional",
    description:
      "A wholesome traditional spread served with rice, poori, curries and authentic accompaniments.",
    image: "/images/food/food1.png",
  },
  {
    name: "Andhra Meals",
    category: "Regional Speciality",
    description:
      "A traditional Andhra-style meal served with steamed rice, flavourful curries, dal, chutneys, rasam and classic accompaniments.",
    image: "/images/food/food3.png",
  },
  {
    name: "Filter Coffee",
    category: "Beverage",
    description:
      "Freshly brewed South Indian filter coffee, rich in aroma and served the traditional way.",
    image: "/images/food/food2.png",
  },
  {
    name: "Khara Bath",
    category: "Karnataka Speciality",
    description:
      "A classic Karnataka-style savoury dish prepared with semolina, aromatic spices and traditional seasoning.",
    image: "/images/food/food4.jpg",
  },

  {
  name: "Mysore Masala Dosa",
  category: "Mysuru Speciality",
  description:
    "A crisp golden dosa spread with spicy Mysore-style chutney and filled with a flavourful potato masala, served with traditional accompaniments.",
  image: "/images/food/food5.png",
},
];

export default function SignatureDishes() {
  return (
    <section
      id="menu"
      className="
        relative
        overflow-hidden
        bg-[#F8F3E9]
        bg-[url('/images/hero/signature-bg.png')]
        bg-cover
        bg-center
        bg-no-repeat
        py-20
        sm:py-24
        lg:py-32
      "
    >
      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#FFF9EE]/20" />

      {/* Decorative side text */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-[1] hidden -translate-y-1/2 -rotate-90 lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2F6B3D]/30">
          Authentic South Indian Cuisine
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#2F6B3D] sm:text-sm">
            A Taste of Tradition
          </p>

          <h2
            className="
              font-serif
              text-4xl
              font-semibold
              leading-[1.05]
              text-[#1E1E1E]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Our Signature
            <span className="block italic text-[#2F6B3D]">
              Dishes
            </span>
          </h2>

          {/* Ornament */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8A44D]" />

            <span className="text-lg text-[#C8A44D]">
              ✦
            </span>

            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8A44D]" />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
            Discover authentic South Indian flavours prepared with
            time-honoured recipes and the warmth of traditional hospitality.
          </p>

        </div>

        {/* Dish Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">

          {dishes.map((dish) => (

            <article
              key={dish.name}
              className="
                group
                relative
                h-[440px]
                overflow-hidden
                rounded-[30px]
                border
                border-[#C8A44D]/25
                bg-black
                shadow-[0_18px_50px_rgba(49,39,22,0.12)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#C8A44D]/50
                hover:shadow-[0_30px_80px_rgba(49,39,22,0.22)]
                sm:h-[480px]
                lg:h-[520px]
              "
            >

              {/* Food Image */}
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  group-hover:scale-[1.06]
                "
              />

              {/* Cinematic Gradient */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-black/5
                "
              />

              {/* Top subtle gradient */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />

              {/* Category */}
              <div
                className="
                  absolute
                  left-6
                  top-6
                  rounded-full
                  border
                  border-white/25
                  bg-black/20
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  backdrop-blur-md
                "
              >
                {dish.category}
              </div>

              {/* Brand Mark */}
              <div
                className="
                  absolute
                  right-6
                  top-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-white/70
                "
              >
                Dakshinapaaka
              </div>

              {/* Content */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-7
                  sm:p-8
                  lg:p-10
                "
              >

                {/* Gold Line */}
                <div
                  className="
                    mb-5
                    h-px
                    w-12
                    bg-[#C8A44D]
                    transition-all
                    duration-500
                    group-hover:w-20
                  "
                />

                <h3
                  className="
                    max-w-md
                    font-serif
                    text-3xl
                    font-semibold
                    leading-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  {dish.name}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                    text-white/75
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {dish.description}
                </p>

              </div>

              {/* Premium border glow */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  rounded-[30px]
                  ring-1
                  ring-inset
                  ring-white/10
                "
              />

            </article>

          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center lg:mt-16">

          <p
            className="
              mb-6
              font-serif
              text-xl
              italic
              text-black/55
            "
          >
            Explore more flavours from our kitchen
          </p>

          <Link
            href="#contact"
            className="
              group
              inline-flex
              items-center
              gap-4
              rounded-full
              border
              border-[#2F6B3D]
              bg-[#2F6B3D]
              px-9
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white
              shadow-[0_12px_30px_rgba(47,107,61,0.22)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#245631]
              hover:shadow-[0_18px_40px_rgba(47,107,61,0.3)]
            "
          >
            Explore Our Menu

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

      </div>
    </section>
  );
}