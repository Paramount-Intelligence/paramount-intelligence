import Image from "next/image";

export default function FeaturedIn() {
  const publications = [
    { name: "Forbes", logo: "/images/Forbes_logo.svg" },
    { name: "The New York Times", logo: "/images/NewYorkTimes.svg" },
    { name: "Business Insider", logo: "/images/Business_Insider_Logo.svg" },
    { name: "TNW", logo: "/images/TNW_logo.svg" },
    { name: "WIRED", logo: "/images/Wired_logo.svg" },
    { name: "TechCrunch", logo: "/images/techcrunch-vector-logo.svg" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">
          Our Clients are Featured In
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
    </section>
  );
}
