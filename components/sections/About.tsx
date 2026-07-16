import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  "Authentic South Indian Recipes",
  "Fresh & Quality Ingredients",
  "Comfortable Family Dining",
  "Clean & Hygienic Kitchen",
];

export default function About() {
  return (
   <section
  id="about"
 className="bg-[#F8F6F1] pt-24 pb-28"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 max-w-2xl">


      <p className="mb-3 text-sm font-semibold uppercase tracking-[5px] text-[#2F6B3D]">
  ABOUT DAKSHINAPAAKA
</p>

<h2 className="font-serif text-5xl font-bold leading-tight text-[#181818]">
  Crafted with
  <br />
  Tradition
</h2>

        </div>

       <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-24 items-center">

          {/* Image */}

<div className="relative">

  {/* Decorative Background */}
 <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#2F6B3D]/10 blur-3xl"></div>

  {/* Actual Image Card */}
  <div
    className="
      relative
      mx-auto
      w-full
      max-w-lg
      h-[520px]
      overflow-hidden
      rounded-[32px]
      shadow-2xl
      ring-1
      ring-black/5
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
    "
  >
    <Image
      src="/images/hero/interior.jpeg"
      alt="Dakshinapaaka Interior"
      width={900}
      height={700}
      className="h-full w-full object-cover transition duration-700 hover:scale-105"
    />
  </div>

</div>

          {/* Content */}

          <div>

       <p className="mt-8 max-w-lg text-lg leading-9 text-gray-600">
  At Dakshinapaaka, every meal celebrates the rich culinary heritage of South India.
  Our chefs prepare each dish using authentic recipes, premium ingredients,
  and time-honoured cooking techniques to create an unforgettable dining experience.
</p>

<div className="mt-12 grid gap-4">

  {features.map((feature) => (
    <div
      key={feature}
      className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white px-6 py-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <CheckCircle
        className="text-[#2F6B3D]"
        size={24}
      />

      <span className="font-medium text-[#181818]">
        {feature}
      </span>

    </div>
  ))}

</div>

          </div>

        </div>

      </div>
    </section>
  );
}