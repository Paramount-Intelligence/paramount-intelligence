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
          /* 1. Mobile par 'h-auto' aur 'aspect-auto' rakha hai taake image ke size ke mutabiq div adjust ho.
             2. 'md:h-[500px]' desktop par aapka purana size barkarar rakhega.
             3. 'bg-transparent' kar diya hai taake koi gray area na dikhe.
          */
          <div className="relative w-full h-auto aspect-auto md:h-[500px] lg:h-[480px] rounded-2xl overflow-hidden bg-transparent">
            <Image
              src={heroImage.trim()}
              alt={title}
              /* Desktop par 'fill' zaroori hai fixed height ke liye, 
                 lekin mobile par hum responsive image behavior use karenge.
              */
              width={1200} 
              height={800}
              priority
              className="w-full h-auto md:absolute md:top-0 md:left-0 md:h-full object-contain md:object-cover object-center"
            />
          </div>
        ) : (
          <div className="w-full h-80 md:h-[500px] lg:h-[480px] rounded-2xl bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
      </div>
    </section>
  );
}