import Image from "next/image";

export default function TrustedBrands() {
  type BrandName =
    // | "Gratia"
    | "Donaldson"
    | "Veon"
    | "Alibaba"
    | "Davidson"
    | "Aramco"
    | "Deloitte"
    | "Schneider Electric"
    | "Toptal";

  type Brand = {
    name: BrandName;
    logo: string;
    width: number;
    height: number;
    slotWidth: number;
  };

  const brands: Brand[] = [
    // {
    //   name: "Gratia",
    //   logo: "/images/Gratia-logo.svg",
    //   width: 135,
    //   height: 52,
    //   slotWidth: 220,
    // },
    {
      name: "Donaldson",
      logo: "/images/donaldson-logo.png",
      width: 175,
      height: 62,
      slotWidth: 250,
    },
    {
      name: "Veon",
      logo: "/images/veon_logo.svg",
      width: 125,
      height: 52,
      slotWidth: 195,
    },
    {
      name: "Alibaba",
      logo: "/images/alibaba-logo.png",
      width: 215,
      height: 100,
      slotWidth: 320,
    },
    {
      name: "Davidson",
      logo: "/images/davidson-logo.png",
      width: 195,
      height: 90,
      slotWidth: 285,
    },
    {
      name: "Aramco",
      logo: "/images/aramco-logo.png",
      width: 185,
      height: 60,
      slotWidth: 270,
    },
    {
      name: "Deloitte",
      logo: "/images/deloitte.png",
      width: 170,
      height: 180,
      slotWidth: 180,
    },
    {
      name: "Schneider Electric",
      logo: "/images/Schneider-electric.png",
      width: 205,
      height: 60,
      slotWidth: 245,
    },
    {
      name: "Toptal",
      logo: "/images/toptal.png",
      width: 150,
      height: 48,
      slotWidth: 195,
    },
  ];

  const brandGroups = [brands, brands];

  const brandLinks: Record<BrandName, string> = {
    // Gratia: "https://gogratia.com/",
    Donaldson: "https://www.donaldson.com/en-us/",
    Veon: "https://www.veon.com/",
    Alibaba: "https://www.alibaba.com/",
    Davidson: "https://www.davidson.group/",
    Aramco: "https://www.aramco.com/",
    Deloitte: "https://www2.deloitte.com/global/en.html",
    "Schneider Electric": "https://www.se.com/ww/en/",
    Toptal: "https://www.toptal.com/",
  };

  return (
    <section
      className="relative py-4 md:py-4"
      style={{ background: "#cbced1ff" }}
    >
      {/* Edge fade masks so logos don't appear to clip abruptly */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10"
        style={{
          background:
            "linear-gradient(to right, #0d1f3c 0%, rgba(13,31,60,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10"
        style={{
          background:
            "linear-gradient(to left, #0d1f3c 0%, rgba(13,31,60,0) 100%)",
        }}
      />
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Trusted Partners
            <span className="h-px w-6 bg-blue-500" />
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 tracking-tight">
            Trusted by teams at world-renowned brands
          </h2>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="relative overflow-hidden w-full">


        <div className="trusted-brands-track flex w-max items-center">
          {brandGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-shrink-0 items-center">
              {group.map((brand) => (
                <div
                  key={`${groupIndex}-${brand.name}`}
                  className="flex-shrink-0 flex items-center justify-center h-28 px-2"
                  style={{
                    width: `${brand.slotWidth}px`,
                  }}
                >
                  <a
                    href={brandLinks[brand.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={brand.name}
                    className="group flex items-center justify-center w-full h-full rounded-xl transition-colors duration-300 hover:bg-white/[0.04]"
                  >
                    <div
                      className="relative flex items-center justify-center"
                      style={{
                        width: `${brand.width}px`,
                        // Cap height so tall/square logos (e.g. Deloitte)
                        // don't dominate the row's visual weight.
                        height: `${Math.min(brand.height, 64)}px`,
                      }}
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        sizes={`${brand.width}px`}
                        className="object-contain object-center transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 group-hover:grayscale-0"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trustedBrandsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .trusted-brands-track {
          animation: trustedBrandsScroll 35s linear infinite;
        }

        .trusted-brands-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}