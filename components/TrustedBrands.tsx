import Image from "next/image";

export default function TrustedBrands() {
  const brands = [
    {
      name: "Gratia",
      logo: "/images/Gratia-logo.svg",
    },
    { name: "Donaldson", logo: "/images/donaldson-logo.png" },
    { name: "Veon", logo: "/images/veon_logo.svg" },
    { name: "Alibaba", logo: "/images/alibaba-logo.png" },
    { name: "Bore and Bore", logo: "/images/BnB-logo.png" },
  ];

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Rating */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-2">
          <h2 className="text-sm text-gray-700">
            Trusted by world-renowned brands
          </h2>
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
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
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center transition-all duration-300"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={150}
                height={50}
                className="w-auto h-8 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
