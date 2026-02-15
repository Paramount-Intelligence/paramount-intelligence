import Link from "next/link";
import Image from "next/image";

export default function AIServices() {
  const services = [
    {
      title: "AI Solutions & Engineering",
      description:
        "We translate strategic intent into production-ready AI systems, designing and operationalizing Generative AI applications, agentic solutions, and scalable MLOps platforms that enhance core business workflows and deliver measurable ROI.",
      link: "/services/ai-solutions-and-engineering",
      imageSrc: "/images/Screenshot_1.png",
    },
    {
      title: "AI Strategy & Consulting",
      description:
        "We define the path from experimentation to enterprise value, providing strategy, readiness assessments, and governance frameworks that align AI initiatives with business objectives and long-term impact.",
      link: "/services/ai-strategy-and-consulting",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "Data & Analytics",
      description:
        "We build the trusted data foundation that powers insight and AI engineering, secure, scalable platforms that transform raw data into confident, real-time decision-making.",
      link: "/services/data-and-analytics",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "Cloud Services",
      description:
        "We architect resilient cloud foundations for intelligent growth, delivering modernization, multi-cloud management, and DevOps practices that convert strategy into scalable execution.",
      link: "/services/cloud-services",
      imageSrc: "/images/iStock-1270309856-1.jpg",
    },
    {
      title: "AI Workflow Automation",
      description:
        "We streamline operations through intelligent automation, designing end-to-end workflows that connect systems, remove bottlenecks, and accelerate outcomes across the enterprise.",
      link: "/services/ai-workflow-automation",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
    // {
    //   title: "Automation & Workflow Systems",
    //   description:
    //     "We design and implement automation solutions using tools such as Airtable, Zapier, and n8n to streamline operations and eliminate manual work. Our automation work often delivers immediate ROI and serves as a foundation for AI and agent-based systems.",
    //   link: "#",
    //   imageSrc: "/images/iStock-1456175011.jpg",
    // },
    // {
    //   title: "Web Scraping & Data Extraction",
    //   description:
    //     "We build web scraping and data extraction pipelines to acquire, structure, and maintain external data required for AI, agent, and automation workflows. These systems address data gaps that often block AI adoption and enable downstream analytics and intelligent automation.",
    //   link: "#",
    //   imageSrc: "/images/iStock-1456175011.jpg",
    // },
  ];

  return (
    <section className="pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
          Our Services
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
