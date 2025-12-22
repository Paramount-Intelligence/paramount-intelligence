import Link from "next/link";
import Image from "next/image";

export default function LLMServices() {
  const services = [
    {
      title: "RAG Engineering",
      description:
        "We implement tailored RAG pipelines using state-of-the-art techniques and technology to automate complex processes while eliminating hallucinations.",
      link: "#rag-engineering",
      imageSrc: "/images/Screenshot_1.png",
    },
    {
      title: "AI Consulting & Advisory",
      description:
        "Our AI strategy consulting program identifies the best solutions for your business, optimizing processes with advanced language models and tailored AI technologies.",
      link: "#ai-consulting",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
    },
    {
      title: "LangChain development",
      description:
        "Our experts speed up your project development by using the LangChain framework to build Large Language Models (LLMs) more efficiently.",
      link: "#langchain",
      imageSrc: "/images/iStock-1270309856-1.jpg",
    },
    {
      title: "LLMOps",
      description:
        "Our team supports efficient optimization, scaling, and management of your Large Language Models using tailored LLM solutions.",
      link: "#llmops",
      imageSrc: "/images/iStock-1456175011.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
          Our LLM development services
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
                  className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
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
