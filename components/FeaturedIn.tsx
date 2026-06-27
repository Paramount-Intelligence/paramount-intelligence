import Image from "next/image";

export default function FeaturedIn() {
  const publications = [
    { name: "Forbes", logo: "/images/Forbes_logo.svg", slotWidth: 270 },
    { name: "The New York Times", logo: "/images/NewYorkTimes.svg", slotWidth: 390 },
    { name: "Business Insider", logo: "/images/Business_Insider_Logo.svg", slotWidth: 310 },
    { name: "TNW", logo: "/images/TNW_logo.svg", slotWidth: 240 },
    { name: "WIRED", logo: "/images/Wired_logo.svg", slotWidth: 270 },
    { name: "TechCrunch", logo: "/images/techcrunch-logo.svg", slotWidth: 310 },
  ];

  const publicationGroups = [publications, publications];

  return (
    <section
      className="py-4"
      style={{
        background: "#cbced1ff",
        borderBottom: "1px solid rgba(30,111,217,0.08)",
      }}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center reveal">
        <div className="flex items-center justify-center gap-4">
          <div
            className="flex-1 max-w-[80px] h-[1px]"
            style={{ background: "linear-gradient(to right, transparent, rgba(30,111,217,0.3))" }}
          />
          <h2
            className="text-lg md:text-xl font-semibold"
            style={{ color: "#0d1f3c" }}
          >
            Experience across organizations featured in
          </h2>
          <div
            className="flex-1 max-w-[80px] h-[1px]"
            style={{ background: "linear-gradient(to left, transparent, rgba(30,111,217,0.3))" }}
          />
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="relative overflow-hidden fade-mask-x">
        <div className="featured-publications-track flex w-max items-center">
          {publicationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {group.map((publication) => (
                <div
                  key={`${groupIndex}-${publication.name}`}
                  className="flex h-20 shrink-0 items-center justify-center px-8 publication-item"
                  style={{ width: `${publication.slotWidth}px` }}
                >
                  <Image
                    src={publication.logo}
                    alt={publication.name}
                    width={150}
                    height={50}
                    className="h-8 w-auto object-contain publication-logo transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes featuredPublicationsScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .featured-publications-track {
          animation: featuredPublicationsScroll 32s linear infinite;
        }

        .featured-publications-track:hover {
          animation-play-state: paused;
        }

        /* Real colors always — no grayscale */
        .publication-logo {
          filter: opacity(0.8);
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .publication-item:hover .publication-logo {
          filter: opacity(1);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
