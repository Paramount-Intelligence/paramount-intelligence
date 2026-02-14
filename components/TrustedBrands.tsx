import Image from "next/image";

export default function TrustedBrands() {
  type BrandName =
    | "Gratia"
    | "Donaldson"
    | "Veon"
    | "Alibaba"
    | "Bore and Bore"
    | "Davidson"
    | "Aramco"
    | "Deloitte";

  const brands: { name: BrandName; logo: string }[] = [
    {
      name: "Gratia",
      logo: "/images/Gratia-logo.svg",
    },
    { name: "Donaldson", logo: "/images/donaldson-logo.png" },
    { name: "Veon", logo: "/images/veon_logo.svg" },
    { name: "Alibaba", logo: "/images/alibaba-logo.png" },
    { name: "Bore and Bore", logo: "/images/BnB-logo.png" },
    { name: "Davidson", logo: "/images/davidson-logo.png" },
    { name: "Aramco", logo: "/images/aramco-logo.png" },
    { name: "Deloitte", logo: "/images/deloitte.png" },
  ];

  // Duplicate the brands array multiple times for seamless infinite looping
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Rating */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center mb-2">
            Trusted by teams at world-renowned brands
          </h2>
          {/* <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-gray-900">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-[9px] text-center text-gray-500">On Catalant</span>
            </div>
          </div> */}
        </div>

        {/* Scrolling Brand Logos */}
        <div className="relative">
          <div className="flex animate-scroll">
            {duplicatedBrands.map((brand, index) => {
              const brandLinks: Record<BrandName, string> = {
                Gratia: "https://gogratia.com/",
                Donaldson: "https://www.donaldson.com/en-us/",
                Veon: "https://www.veon.com/",
                Alibaba: "https://www.alibaba.com/",
                "Bore and Bore": "https://boreandbore.com/",
                Davidson: "https://www.davidson.group/",
                Aramco: "https://www.aramco.com/",
                Deloitte: "https://www2.deloitte.com/global/en.html",
              };
              return (
                <div
                  key={index}
                  className="shrink-0 w-1/4 flex items-center justify-center px-8"
                >
                  <a
                    href={brandLinks[brand.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={brand.name}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={150}
                      height={50}
                      priority={brand.name === "Davidson"}
                      className={`w-auto h-auto max-w-full object-contain ${
                        brand.name === "Veon" || brand.name === "Alibaba" || brand.name === "Davidson"
                          ? "max-h-8"
                          : "max-h-12"
                      }`}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
