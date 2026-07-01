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
      tag: "Engineering",
    },
    {
      title: "AI Strategy & Consulting",
      description:
        "We define the path from experimentation to enterprise value, providing strategy, readiness assessments, and governance frameworks that align AI initiatives with business objectives and long-term impact.",
      link: "/services/ai-strategy-and-consulting",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
      tag: "Advisory",
    },
    {
      title: "Data & Analytics",
      description:
        "We build the trusted data foundation that powers insight and AI engineering — secure, scalable platforms that transform raw data into confident, real-time decision-making.",
      link: "/services/data-and-analytics",
      imageSrc: "/images/33319793_koy7-scaled-e1729162173694.jpg",
      tag: "Data",
    },
    {
      title: "Cloud Services",
      description:
        "We architect resilient cloud foundations for intelligent growth, delivering modernization, multi-cloud management, and DevOps practices that convert strategy into scalable execution.",
      link: "/services/cloud-services",
      imageSrc: "/images/iStock-1270309856-1.jpg",
      tag: "Cloud",
    },
    {
      title: "AI Workflow Automation",
      description:
        "We streamline operations through intelligent automation, designing end-to-end workflows that connect systems, remove bottlenecks, and accelerate outcomes across the enterprise.",
      link: "/services/ai-workflow-automation",
      imageSrc: "/images/iStock-1456175011.jpg",
      tag: "Automation",
    },
    {
      title: "AI Studio & Platform Engineering",
      description:
        "We design and build AI studios and cloud-native platform foundations that enable multimodal content generation, agent-driven workflows, and production-scale AI systems operating securely on Oracle Cloud Infrastructure.",
      link: "/services/ai-studio-and-platform-engineering",
      imageSrc: "/images/iStock-1456175011.jpg",
      tag: "Platform",
    },
  ];

  return (
    <section className="py-10 relative overflow-hidden" style={{ background: "#f1f3f6" }}>
      {/* Subtle bg dots */}
      <div className="absolute inset-0 geo-dots opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Our Services
            </span>
            <div className="accent-line" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#0d1f3c" }}
          >
            Full-Spectrum AI & Technology Solutions
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            From strategy to engineering to scale — we cover the complete technology lifecycle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group reveal rounded-2xl overflow-hidden border transition-all duration-300 hover-glow-blue flex flex-col"
              data-delay={String(Math.min(index * 80, 500))}
              style={{
                borderColor: "rgba(30,111,217,0.12)",
                background: "#ffffff",
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Blue gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,31,60,0.65) 0%, transparent 60%)",
                  }}
                />
                {/* Tag */}
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(30,111,217,0.85)",
                    color: "#ffffff",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-lg font-bold mb-3 transition-colors group-hover:text-[#1e6fd9]"
                  style={{ color: "#0d1f3c" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/link"
                  style={{ color: "#1e6fd9" }}
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal" data-delay="300">
          <Link href="/services" className="btn-primary inline-flex text-sm">
            View All Services
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}