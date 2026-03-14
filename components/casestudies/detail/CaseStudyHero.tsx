import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

export default function CaseStudyHero({ title, subtitle, heroImage }: CaseStudyHeroProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-16">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg pt-3 text-gray-700 font-semibold mb-8">{subtitle}</p>

        {/* Hero Image */}
        <div className="relative w-full h-80 md:h-125 lg:h-120  rounded-2xl overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
