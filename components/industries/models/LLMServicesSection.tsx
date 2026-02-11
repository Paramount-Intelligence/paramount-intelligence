"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState("Process Mining & Discovery");

  const services = [
    {
      id: "Process Mining & Discovery",
      title: "Process Mining & Discovery",
      content: {
        title: "Process Mining & Discovery",
        description:
          "We identify where automation delivers the highest value before systems are built. The scope of this service involves:",
        items: [
          "Mapping and analyzing core processes across operations, finance, HR, and customer service.",
          "Using process mining to surface inefficiencies, bottlenecks, and automation-ready steps.",
          "Prioritizing use cases based on ROI, complexity, and strategic alignment.",
          "Delivering a phased automation roadmap with clear sequencing.",
        ],
      },
    },
    {
      id: "Robotic Process Automation (RPA)",
      title: "Robotic Process Automation (RPA)",
      content: {
        title: "Robotic Process Automation (RPA)",
        description:
          "We deploy software robots to automate high-volume, rule-based work with precision and control.",
        items: [
          "Selecting and implementing enterprise-grade RPA platforms suited to your environment.",
          "Designing and testing bots for tasks such as data entry, reconciliation, and reporting.",
          "Integrating bots with existing applications, databases, and APIs.",
          "Establishing governance, monitoring, and exception handling.",
        ],
      },
    },
    {
      id: "Intelligent Document Processing (IDP)",
      title: "Intelligent Document Processing (IDP)",
      content: {
        title: "Intelligent Document Processing (IDP)",
        description:
          "We transform unstructured documents into reliable, system-ready data.",
        items: [
          "Processing invoices, contracts, forms, and communications using AI and NLP.",
          "Achieving high extraction accuracy while materially reducing manual error.",
          "Routing validated data directly into ERPs, CRMs, and downstream systems.",
          "Ensuring compliance through secure processing and audit trails.",
        ],
      },
    },
    {
      id: "Intelligent Workflow Integration & Management",
      title: "Intelligent Workflow Integration & Management",
      content: {
        title: "Intelligent Workflow Integration & Management",
        description:
          "We connect people, systems, and decisions into cohesive, automated flows.",
        items: [
          "Designing multi-step workflows combining AI decisions, automation, and human approvals.",
          "Integrating CRMs, ERPs, cloud services, and communication tools.",
          "Eliminating data silos through end-to-end workflow orchestration.",
          "Monitoring and optimizing workflows for speed, cost, and reliability.",
        ],
      },
    },
    {
      id: "AI-Powered Decisioning & Analytics",
      title: "AI-Powered Decisioning & Analytics",
      content: {
        title: "AI-Powered Decisioning & Analytics",
        description:
          "We embed intelligence directly into workflows to guide actions in real time.",
        items: [
          "Developing predictive models for forecasting, fraud detection, and prioritization.",
          "Implementing decision engines that recommend next-best actions.",
          "Providing dashboards that surface workflow performance and ROI.",
          "Applying generative AI for summarization, reporting, and operational insight.",
        ],
      },
    },
    {
      id: "Low-Code / No-Code Automation Platforms",
      title: "Low-Code / No-Code Automation Platforms",
      content: {
        title: "Low-Code / No-Code Automation Platforms",
        description:
          "We enable business teams to extend automation safely and at scale.",
        items: [
          "Advising on and implementing enterprise-grade low-code automation platforms.",
          "Training teams to build and maintain workflows within governed environments.",
          "Establishing standards for security, lifecycle management, and reuse.",
          "Providing ongoing support, optimization, and scaling.",
        ],
      },
    },
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
          Our AI Workflow Automation Services
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
