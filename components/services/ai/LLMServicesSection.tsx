"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState(
    "Business Process Automation",
  );

  const services = [
    {
      id: "Business Process Automation",
      title: "Business Process Automation",
      content: {
        title: "Business Process Automation",
        description:
          "We use cloud-native platforms to automate repetitive work and orchestrate complex processes across the enterprise. The scope of this service involves:",
        items: [
          "Analyzing core business processes to identify high-impact automation opportunities.",
          "Designing and implementing cloud-based workflows using RPA, orchestration, and intelligent document processing.",
          "Integrating automated processes with existing enterprise systems and data sources.",
          "Monitoring performance and continuously optimizing workflows.",
        ],
      },
    },
    {
      id: "DevOps & SecOps",
      title: "DevOps & SecOps",
      content: {
        title: "DevOps & SecOps",
        description:
          "We implement disciplined DevOps and SecOps practices to accelerate delivery while embedding security throughout the lifecycle.",
        items: [
          "Establishing automated CI/CD pipelines for faster, more reliable releases.",
          "Implementing Infrastructure as Code for consistent and auditable environments.",
          "Integrating security scanning, compliance checks, and secret management into pipelines.",
          "Designing monitoring, logging, and incident response strategies.",
        ],
      },
    },
    {
      id: "AWS, Azure, GCP & Oracle",
      title: "Cloud Platform Integration",
      content: {
        title: "Cloud Platform Integration",
        description:
          "We design, build, and manage cloud environments across all major platforms to optimize performance, security, and cost.",
        items: [
          "Providing architecture design and reviews focused on scalability, resilience, and cost efficiency.",
          "Developing and deploying cloud-native applications using platform-specific services.",
          "Managing multi-cloud and hybrid environments to reduce vendor lock-in.",
          "Delivering ongoing optimization, cost management, and operational support.",
        ],
      },
    },
    {
      id: "Cloud Modernization & Migration",
      title: "Cloud Modernization & Migration",
      content: {
        title: "Cloud Modernization & Migration",
        description:
          "We guide cloud journeys with a focus on business outcomes, not just workload movement.",
        items: [
          "Assessing application landscapes and defining cloud readiness and migration priorities.",
          "Designing tailored migration strategies, including rehosting, replatforming, and refactoring.",
          "Modernizing legacy systems using microservices and serverless architectures.",
          "Optimizing performance, security, and cost post-migration.",
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
          Our Cloud Services
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
