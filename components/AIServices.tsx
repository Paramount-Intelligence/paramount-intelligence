import Link from "next/link";
import Image from "next/image";

export default function AIServices() {
  const services = [
    {
      title: "RAG Engineering",
      description:
        "We implement tailored Retrieval-Augmented Generation pipelines that connect LLMs to structured and unstructured business data. Our RAG systems are designed to reduce hallucinations, improve accuracy, and support real-time decision-making across mission-critical workflows.",
      link: "#",
      imageSrc: "/images/Screenshot_1.png",
    },
    {
      title: "AI Consulting & Advisory",
      description:
        "We uniquely blend independent consulting judgment, strategy, and hands-on execution to help organizations apply AI, Gen AI, and automation with clarity and intent. Our advisory work supports leadership and delivery teams in prioritizing use cases, aligning vision with execution reality, and driving measurable operational outcomes.",
      link: "#",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "AI Agents & Agentic Systems",
      description:
        "We design and implement agent-based systems that operate across real business workflows, enabling intelligent task execution, decision support, and process automation. Our agentic solutions integrate LLMs, data sources, and automation layers to function reliably in production environments.",
      link: "#",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "LangChain development",
      description:
        "We use LangChain to orchestrate complex agent workflows, tool usage, and multi-step reasoning across LLM-powered systems. Our work focuses on building maintainable, extensible architectures that support real-world agent behavior rather than isolated experiments.",
      link: "#",
      imageSrc: "/images/iStock-1270309856-1.jpg",
    },
    {
      title: "LLMOps",
      description:
        "We support the operationalization of LLM systems through deployment, monitoring, iteration, and lifecycle management. Our LLMOps services ensure reliability, scalability, and controlled evolution of production AI systems over time.",
      link: "#",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
    {
      title: "Automation & Workflow Systems",
      description:
        "We design and implement automation solutions using tools such as Airtable, Zapier, and n8n to streamline operations and eliminate manual work. Our automation work often delivers immediate ROI and serves as a foundation for AI and agent-based systems.",
      link: "#",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
    {
      title: "Web Scraping & Data Extraction",
      description:
        "We build web scraping and data extraction pipelines to acquire, structure, and maintain external data required for AI, agent, and automation workflows. These systems address data gaps that often block AI adoption and enable downstream analytics and intelligent automation.",
      link: "#",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
          Our AI & Automation Services
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
