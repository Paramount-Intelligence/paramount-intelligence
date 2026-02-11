"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState("AI Product Development");

  const services = [
    {
      id: "AI Product Development",
      title: "AI Product Development",
      content: {
        title: "AI Product Development",
        description:
          "We manage the full lifecycle of AI-driven software products from concept and architecture through deployment, scaling, and continuous optimization.",
        items: [
          "Conducting product discovery to define user-centric functionality and technical architecture.",
          "Developing secure, scalable applications with embedded AI and machine learning capabilities.",
          "Implementing DevOps and MLOps practices for reliable deployment, monitoring, and iteration.",
          "Managing iterative improvement based on user feedback and performance metrics.",
        ],
      },
    },
    {
      id: "Generative AI Applications",
      title: "Generative AI Applications",
      content: {
        title: "Generative AI Applications",
        description:
          "We design and build secure generative AI applications for content creation, synthesis, and task automation grounded in a real business context.",
        items: [
          "Identifying and prioritizing high-value generative AI use cases across text, image, and code.",
          "Selecting, configuring, and fine-tuning foundation models for domain-specific performance.",
          "Implementing secure application layers with guardrails and Retrieval-Augmented Generation (RAG).",
          "Integrating generative capabilities directly into existing systems and user workflows.",
        ],
      },
    },
    {
      id: "Agentic AI Systems",
      title: "Agentic AI Systems",
      content: {
        title: "Agentic AI Systems",
        description:
          "We engineer autonomous AI agents capable of planning, executing tasks, and completing multi-step business workflows.",
        items: [
          "Designing agent architectures with reasoning, tool use, and memory capabilities.",
          "Developing and orchestrating multi-agent systems for complex operational environments.",
          "Implementing oversight, auditability, and security controls for autonomous behavior.",
          "Aligning agent performance with defined business objectives and measurable outcomes.",
        ],
      },
    },
    {
      id: "AI Platforms and Machine Learning",
      title: "AI Platforms and Machine Learning",
      content: {
        title: "AI Platforms and Machine Learning",
        description:
          "We build and manage the foundational data and MLOps platforms required for repeatable, enterprise-scale AI.",
        items: [
          "Architecting cloud-native platforms for model training, versioning, and deployment.",
          "Building automated pipelines for data preparation, training, monitoring, and retraining.",
          "Establishing governance for model performance, data quality, and regulatory compliance.",
          "Providing ongoing platform optimization, management, and operational support.",
        ],
      },
    },
    {
      id: "Voice AI Agents",
      title: "Voice AI Agents",
      content: {
        title: "Voice AI Agents",
        description:
          "We design and deploy intelligent voice systems for customer service, internal operations, and interactive products.",
        items: [
          "Designing natural, context-aware conversational flows and voice experiences.",
          "Integrating advanced speech recognition (ASR) and text-to-speech (TTS) technologies.",
          "Connecting voice agents to knowledge bases, APIs, and transactional systems",
          "Optimizing for accuracy, latency, reliability, and user experience.",
        ],
      },
    },
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
          Our AI Solutions and Engineering Services
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
