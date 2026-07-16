import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-32 pb-20">

      <Container>

        <div className="mx-auto max-w-5xl text-center">

          {/* Restaurant Image */}

          <div className="relative overflow-hidden rounded-[28px] shadow-2xl">

            <Image
              src="/images/hero/restaurant.jpg"
              alt="Dakshinapaaka Restaurant"
              width={1800}
              height={1200}
              priority
              className="h-[260px] w-full object-cover md:h-[500px]"
            />

            <div className="absolute inset-0 bg-black/40" />

          </div>

          {/* Content */}

          <div className="mt-12">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[6px] text-[#2F6B3D]">
              Authentic South Indian Cuisine
            </p>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-[#181818] md:text-7xl">

              Experience the Taste
              <br />
              of Tradition

            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#666]">

              Traditional recipes crafted with fresh
              ingredients and warm hospitality in the
              heart of Mysuru.

            </p>

            <div className="mt-10 flex justify-center">

              <Button>
                Explore Our Menu
              </Button>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}