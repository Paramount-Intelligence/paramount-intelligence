import Image from "next/image";

export default function FeaturedIn() {
  const publications = [
    { name: "Forbes", logo: "/images/Forbes_logo.svg", slotWidth: 270 },
    {
      name: "The New York Times",
      logo: "/images/NewYorkTimes.svg",
      slotWidth: 390,
    },
    {
      name: "Business Insider",
      logo: "/images/Business_Insider_Logo.svg",
      slotWidth: 310,
    },
    { name: "TNW", logo: "/images/TNW_logo.svg", slotWidth: 240 },
    { name: "WIRED", logo: "/images/Wired_logo.svg", slotWidth: 270 },
    {
      name: "TechCrunch",
      logo: "/images/techcrunch-logo.svg",
      slotWidth: 310,
    },
  ];

  const publicationGroups = [publications, publications];

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center mb-12">
          Experience across organizations featured in
        </h2>

        <div className="relative overflow-hidden">
          <div className="featured-publications-track flex w-max items-center">
            {publicationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex shrink-0 items-center">
                {group.map((publication) => (
                  <div
                    key={`${groupIndex}-${publication.name}`}
                    className="flex h-20 shrink-0 items-center justify-center px-8"
                    style={{ width: `${publication.slotWidth}px` }}
                  >
                    <Image
                      src={publication.logo}
                      alt={publication.name}
                      width={150}
                      height={50}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes featuredPublicationsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .featured-publications-track {
          animation: featuredPublicationsScroll 29s linear infinite;
        }

        .featured-publications-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
