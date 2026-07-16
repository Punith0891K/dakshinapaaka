export default function Hero() {
  return (
    <section
      className="
      relative
      flex
      h-screen
      items-center
      justify-center
      overflow-hidden
      "
    >
      {/* Background */}

      <div
        className="
        absolute
        inset-0
        bg-[url('/images/hero/restaurant.jpg')]
        bg-cover
        bg-center
        "
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        <p className="mb-6 uppercase tracking-[10px] text-green-400">

          Authentic South Indian Cuisine

        </p>

        <h1 className="mb-8 text-6xl font-bold leading-tight text-white md:text-8xl">

          Experience the Taste of
          <br />
          Tradition

        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">

          Every meal is prepared using traditional recipes,
          fresh ingredients, and the rich culinary heritage
          of South India.

        </p>

        <div className="flex justify-center gap-5">

          <button
            className="
            rounded-full
            bg-green-700
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-green-800
            "
          >
            Explore Menu
          </button>

          <button
            className="
            rounded-full
            border
            border-white
            px-8
            py-4
            text-white
            transition
            hover:bg-white
            hover:text-black
            "
          >
            Contact Us
          </button>

        </div>

      </div>
    </section>
  );
}