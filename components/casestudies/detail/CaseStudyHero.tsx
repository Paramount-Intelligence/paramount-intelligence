import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

export default function CaseStudyHero({ title, subtitle, heroImage }: CaseStudyHeroProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 font-semibold mb-8">{subtitle}</p>

        {/* Hero Image */}
        <div className="relative w-full h-100 md:h-125 lg:h-150 rounded-2xl overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
}
