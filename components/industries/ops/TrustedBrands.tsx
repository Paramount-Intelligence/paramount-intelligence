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
            Trusted by teams at world-renowned brands
          </h2>
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
