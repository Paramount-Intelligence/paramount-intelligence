"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState("Business Optimization Consulting");

  const services = [
    {
      id: "Business Optimization Consulting",
      title: "Business Optimization Consulting",
      content: {
        title: "Business Optimization Consulting",
        description:
          "We assess your operations to identify where AI and automation can deliver the greatest efficiency, cost reduction, and value creation. The scope of this service involves:",
        items: [
          "Conducting structured workshops to map core processes and customer journeys.",
          "Identifying bottlenecks, manual effort, and opportunities for intelligent augmentation.",
          "Developing a prioritized transformation roadmap with clear ROI assumptions.",
          "Advising on change management to support adoption and sustained impact.",
        ],
      },
    },
    {
      id: "AI-Powered Product Strategy",
      title: "AI-Powered Product Strategy",
      content: {
        title: "AI-Powered Product Strategy",
        description:
          "We help define, validate, and shape AI-enabled products from concept through market readiness.",
        items: [
          "Facilitating strategy sessions to align product vision with market demand and user needs.",
          "Applying structured validation frameworks to define viable AI features and scope.",
          "Developing product roadmaps, MVP definitions, and investment business cases.",
          "Ensuring a user-centric approach that balances innovation with usability.",
        ],
      },
    },
    {
      id: "AI Readiness & Architecture Planning",
      title: "AI Readiness & Architecture Planning",
      content: {
        title: "AI Readiness & Architecture Planning",
        description:
          "We evaluate your current technology landscape and design a scalable foundation for secure AI adoption.",
        items: [
          "Assessing existing systems, data infrastructure, and cloud readiness.",
          "Providing buy-vs-build analysis to determine the most effective capability path.",
          "Designing secure, scalable architecture blueprints aligned with enterprise systems.",
          "Creating phased implementation plans that manage risk and sequencing.",
        ],
      },
    },
    {
      id: "AI Leadership & Team Upskilling",
      title: "AI Leadership & Team Upskilling",
      content: {
        title: "AI Leadership & Team Upskilling",
        description:
          "We enable leaders and teams to confidently govern, adopt, and operationalize AI.",
        items: [
          "Delivering executive briefings on AI opportunities, risks, and strategic tradeoffs.",
          "Running hands-on workshops covering generative AI, applied use cases, and tooling.",
          "Designing tailored training programs to close critical capability gaps.",
          "Establishing governance and ethical use frameworks for responsible AI adoption.",
        ],
      },
    },
    // {
    //   id: "audit",
    //   title: "Project Audit",
    //   content: {
    //     title: "Project Audit",
    //     description:
    //       "Comprehensive evaluation of your existing LLM implementation to identify improvement opportunities, security gaps, and optimization potential.",
    //     items: [
    //       "Code quality and architecture review.",
    //       "Performance and efficiency assessment.",
    //       "Security and compliance evaluation.",
    //       "Recommendations for improvements and optimizations.",
    //     ],
    //   },
    // },
    // {
    //   id: "deployment",
    //   title: "Deployment Services",
    //   content: {
    //     title: "Deployment Services",
    //     description:
    //       "Professional deployment services ensuring smooth transition from development to production with minimal downtime and maximum reliability.",
    //     items: [
    //       "Infrastructure setup and configuration.",
    //       "CI/CD pipeline implementation.",
    //       "Monitoring and alerting setup.",
    //       "Launch support and troubleshooting.",
    //     ],
    //   },
    // },
    // {
    //   id: "maintenance",
    //   title: "Maintenance & Scalability",
    //   content: {
    //     title: "Maintenance & Scalability",
    //     description:
    //       "Ongoing support and optimization to ensure your LLM solution continues to perform efficiently as your business grows.",
    //     items: [
    //       "Regular updates and performance optimization.",
    //       "Scaling infrastructure as demand grows.",
    //       "Bug fixes and technical support.",
    //       "Feature enhancements and improvements.",
    //     ],
    //   },
    // },
  ];

  const currentService = services.find((s) => s.id === activeService);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our AI Strategy and Consulting Services
        </h2>
        <p className="text-gray-600 mb-12">What we can help you with:</p>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Service List */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeService === service.id
                      ? "text-[#17599d] bg-white font-semibold border-l-4 border-[#17599d]"
                      : "text-gray-700 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8">
            {currentService && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  {currentService.content.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentService.content.description}
                </p>
                <ul className="space-y-3">
                  {currentService.content.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-700 leading-relaxed"
                    >
                      <span className="text-[#17599d] mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
