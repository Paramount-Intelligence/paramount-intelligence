import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === "") return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export default function CaseStudyHero({ title, subtitle, heroImage }: CaseStudyHeroProps) {
  const hasValidImage = isValidUrl(heroImage);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg pt-3 text-gray-700 font-semibold mb-8">{subtitle}</p>

        {hasValidImage ? (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={heroImage.trim()}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[16/9] rounded-2xl bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
      </div>
    </section>
  );
}