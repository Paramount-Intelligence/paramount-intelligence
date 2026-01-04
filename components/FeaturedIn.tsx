import Image from "next/image";

export default function FeaturedIn() {
  const publications = [
    { name: "Forbes", logo: "/images/Forbes_logo.svg" },
    { name: "The New York Times", logo: "/images/NewYorkTimes.svg" },
    { name: "Business Insider", logo: "/images/Business_Insider_Logo.svg" },
    { name: "TNW", logo: "/images/TNW_logo.svg" },
    { name: "WIRED", logo: "/images/Wired_logo.svg" },
    { name: "TechCrunch", logo: "/images/techcrunch-logo.svg" },
  ];

  // Duplicate the publications array multiple times for seamless infinite looping
  const duplicatedPublications = [
    ...publications,
    ...publications,
    ...publications,
    ...publications,
  ];

  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center mb-12">
          Experience across organizations featured in
        </h2>

        <div className="relative">
          <div className="flex animate-scroll">
            {duplicatedPublications.map((publication, index) => (
              <div
                key={index}
                className="shrink-0 w-1/3 flex items-center justify-center px-8"
              >
                <Image
                  src={publication.logo}
                  alt={publication.name}
                  width={150}
                  height={50}
                  className="w-auto h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
