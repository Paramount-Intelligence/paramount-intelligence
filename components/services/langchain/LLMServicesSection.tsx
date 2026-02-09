"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState("Data & Analytics Consulting");

  const services = [
    {
      id: "Data & Analytics Consulting",
      title: "Data & Analytics Consulting",
      content: {
        title: "Data & Analytics Consulting",
        description:
          "We define and execute data strategies that turn information into a sustained competitive advantage. The scope of this service involves:",
        items: [
          "Auditing data architecture, processes, and analytics maturity to identify gaps and priorities.",
          "Developing data strategies and roadmaps aligned with business outcomes, such as customer intelligence and operational optimization.",
          "Implementing business intelligence solutions for real-time KPI visibility and performance tracking.",
          "Deploying advanced analytics, including predictive modeling and NLP for unstructured data.",
        ],
      },
    },
    {
      id: "Data Engineering",
      title: "Data Engineering",
      content: {
        title: "Data Engineering",
        description:
          "We build scalable, reliable data pipelines that ensure trusted information flows across the enterprise.",
        items: [
          "Designing and implementing enterprise-grade ETL and ELT pipelines.",
          "Modernizing legacy data environments and migrating to cloud-native platforms.",
          "Building and managing data lakes for structured and unstructured data.",
          "Enhancing datasets through augmentation to improve downstream analytics and AI performance.",
        ],
      },
    },
    {
      id: "Data Management & Governance",
      title: "Data Management & Governance",
      content: {
        title: "Data Management & Governance",
        description:
          "We establish the controls, standards, and security that make data trustworthy and compliant.",
        items: [
          "Defining data governance frameworks covering ownership, quality, and lifecycle management.",
          "Implementing security, privacy, and access controls aligned with regulatory requirements.",
          "Establishing data quality processes to ensure accuracy and consistency.",
          "Creating data catalogs and a single source of truth to improve data literacy and discoverability.",
        ],
      },
    },
    {
      id: "Analytics & Platform Implementation",
      title: "Analytics & Platform Implementation",
      content: {
        title: "Analytics & Platform Implementation",
        description:
          "We architect future-proof analytics platforms that scale from reporting to enterprise AI.",
        items: [
          "Implementing cloud data warehouses and lakehouse architectures.",
          "Designing connected data fabrics across multi-cloud and on-premise environments.",
          "Building scalable MLOps platforms to deploy and manage machine learning models.",
          "Developing dashboards and visualizations that translate analytics into action.",
        ],
      },
    },
    {
      id: "Data Science",
      title: "Data Science",
      content: {
        title: "Data Science",
        description:
          "We embed advanced intelligence into operations through custom analytical and machine learning models.",
        items: [
          "Developing predictive and prescriptive models using machine learning and deep learning.",
          "Operationalizing AI initiatives with MLOps best practices.",
          "Building computer vision solutions for image analysis and automation.",
          "Integrating generative AI responsibly to augment analytics and decision support.",
        ],
      },
    },
    {
      id: "Data Mining",
      title: "Data Mining",
      content: {
        title: "Data Mining",
        description:
          "We uncover patterns, correlations, and trends that reveal hidden insights and opportunities.",
        items: [
          "Applying statistical and machine learning techniques to analyze complex datasets.",
          "Supporting fraud detection, risk assessment, and customer segmentation initiatives.",
          "Performing association and market basket analysis to inform strategy.",
          "Creating structured knowledge graphs to enhance search, recommendation, and AI systems.",
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
          Our Data and Analytics Services
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
