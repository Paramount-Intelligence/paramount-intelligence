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
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center mb-2">
            Trusted by teams at world-renowned brands
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="trusted-brands-track flex w-max items-center">
          {brandGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-shrink-0 items-center">
              {group.map((brand) => (
                <div
                  key={`${groupIndex}-${brand.name}`}
                  className="flex-shrink-0 flex items-center justify-center h-24"
                  style={{
                    width: `${brand.slotWidth}px`,
                  }}
                >
                  <a
                    href={brandLinks[brand.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={brand.name}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <div
                      className="relative flex items-center justify-center"
                      style={{
                        width: `${brand.width}px`,
                        height: `${brand.height}px`,
                      }}
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        sizes={`${brand.width}px`}
                        className="object-contain object-center mix-blend-multiply transition-transform duration-300"
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
