import Link from "next/link";
import Image from "next/image";

export default function IntudriesServices() {
  const services = [
    {
      title: "Technology & Enterprise Software",
      description:
        "We help enterprise software companies develop intelligent, scalable platforms that can adapt to real-time user behavior, data, and operational context. Our solutions enhance product intelligence, user experience, and software lifecycle automation, empowering teams to make data-driven decisions.",
      link: "/industries/technology-and-enterprise-software",
      imageSrc: "/images/Screenshot_1.png",
    },
    {
      title: "Telecommunications",
      description:
        "As telecom networks evolve into software-defined, data-driven systems, we enable operators to optimize performance, improve service quality, and scale operations with intelligent network management solutions. From network intelligence to predictive operations, our solutions provide actionable insights for telecom providers.",
      link: "/industries/telecommunications",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "Manufacturing, Industrial & Energy",
      description:
        "We enable manufacturing and industrial companies to adopt smart, connected systems for asset management, process optimization, and predictive maintenance. By embedding AI and automation into critical operations, we help organizations reduce costs, improve productivity, and ensure safety and reliability.",
      link: "/industries/manufacturing-industrial-and-energy",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "Fintech & Digital Payments",
      description:
        "Our fintech solutions empower financial institutions to enhance transaction accuracy, monitor real-time risks, and automate core operations. With a focus on scalable, secure systems, we help organizations in the financial sector drive innovation while maintaining compliance and protecting customer data.",
      link: "/industries/fintech-and-digital-payments",
      imageSrc: "/images/iStock-1270309856-1.jpg",
    },
    {
      title: "B2B Enterprise Solutions",
      description:
        "We design integrated systems that enable smooth workflows across B2B enterprise operations, connecting teams, data, and platforms for seamless execution. Our solutions ensure enterprises can scale efficiently while optimizing decision-making, business processes, and resource management.",
      link: "/industries/b2b-enterprise-solutions",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
    {
      title: "Digital Lifestyle & Entertainment",
      description:
        "We provide entertainment companies with personalized, always-on digital experiences, designing systems that improve engagement, content delivery, and user interactions. By leveraging AI and cloud technologies, we create intuitive systems that scale and adapt to user needs.",
      link: "/industries/digital-lifestyle-and-entertainment",
      imageSrc: "/images/Screenshot_1.png",
    },
    {
      title: "Mobility, Ride-Hailing & Delivery",
      description:
        "From real-time demand and routing intelligence to fleet management automation, we build intelligent systems that optimize operations and ensure efficiency in mobility and delivery platforms. Our AI solutions empower organizations to balance demand and supply, reducing delays and improving user satisfaction.",
      link: "/industries/mobility-ride-hailing-and-delivery",
      imageSrc: "/images/iStock-1270309856-1.jpg",
    },
    {
      title: "E-commerce & Marketplaces",
      description:
        "We support e-commerce platforms in optimizing their pricing, inventory, and fulfillment operations with intelligent systems that adapt in real time to market conditions. Our AI solutions help increase conversion rates, streamline operations, and enable businesses to scale efficiently in dynamic commerce environments.",
      link: "/industries/e-commerce-and-marketplaces",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
  ];

  return (
    <section className="pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
          Our Industry Expertise
        </h2>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-50 overflow-hidden">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-[#17599d] font-medium hover:text-[#144a75] transition-colors"
                >
                  <span className="mr-2">/</span>
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
