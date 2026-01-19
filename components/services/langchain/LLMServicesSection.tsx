"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState("consultation");

  const services = [
    {
      id: "consultation",
      title: "LLM Consultation",
      content: {
        title: "LLM Consultation",
        description:
          "This service includes an in-depth analysis of your business needs, challenges, and goals. We guide you through the process of identifying where LLM-based solutions can bring the most value. The scope of this service involves:",
        items: [
          "Defining the potential applications of LLMs tailored to your industry.",
          "Evaluating existing workflows and identifying areas for optimization.",
          "Recommending tools, frameworks, and best practices for implementation.",
          "Providing a roadmap for development and integration of LLM-based solutions.",
        ],
      },
    },
    {
      id: "poc",
      title: "Proof of Concept (PoC)",
      content: {
        title: "Proof of Concept (PoC)",
        description:
          "We develop a working prototype to validate your LLM solution concept. This helps assess feasibility, identify potential challenges, and demonstrate value before full-scale development.",
        items: [
          "Rapid prototyping of your LLM use case.",
          "Testing technical feasibility and performance.",
          "Gathering stakeholder feedback and requirements.",
          "Defining technical architecture and approach.",
        ],
      },
    },
    {
      id: "mvp",
      title: "MVP Development",
      content: {
        title: "MVP Development",
        description:
          "Building a Minimum Viable Product with core LLM functionalities to validate market fit and gather user feedback for iterative improvement.",
        items: [
          "Core feature implementation with LLM integration.",
          "User interface and experience design.",
          "Performance optimization and testing.",
          "Deployment to staging environment for validation.",
        ],
      },
    },
    {
      id: "full-solution",
      title: "Full Solution Delivery",
      content: {
        title: "Full Solution Delivery",
        description:
          "Complete end-to-end development and deployment of your LLM-based solution with all required features, integrations, and optimizations.",
        items: [
          "Comprehensive feature development and integration.",
          "Scalable architecture and infrastructure setup.",
          "Security implementation and compliance measures.",
          "Production deployment and launch support.",
        ],
      },
    },
    {
      id: "audit",
      title: "Project Audit",
      content: {
        title: "Project Audit",
        description:
          "Comprehensive evaluation of your existing LLM implementation to identify improvement opportunities, security gaps, and optimization potential.",
        items: [
          "Code quality and architecture review.",
          "Performance and efficiency assessment.",
          "Security and compliance evaluation.",
          "Recommendations for improvements and optimizations.",
        ],
      },
    },
    {
      id: "deployment",
      title: "Deployment Services",
      content: {
        title: "Deployment Services",
        description:
          "Professional deployment services ensuring smooth transition from development to production with minimal downtime and maximum reliability.",
        items: [
          "Infrastructure setup and configuration.",
          "CI/CD pipeline implementation.",
          "Monitoring and alerting setup.",
          "Launch support and troubleshooting.",
        ],
      },
    },
    {
      id: "maintenance",
      title: "Maintenance & Scalability",
      content: {
        title: "Maintenance & Scalability",
        description:
          "Ongoing support and optimization to ensure your LLM solution continues to perform efficiently as your business grows.",
        items: [
          "Regular updates and performance optimization.",
          "Scaling infrastructure as demand grows.",
          "Bug fixes and technical support.",
          "Feature enhancements and improvements.",
        ],
      },
    },
  ];

  const currentService = services.find((s) => s.id === activeService);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our LLM-based software services
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
