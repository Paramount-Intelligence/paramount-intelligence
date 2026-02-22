"use client";

import { useState } from "react";

export default function LLMServicesSection() {
  const [activeService, setActiveService] = useState(
    "AI Studio Product Engineering",
  );

  const services = [
    {
      id: "AI Studio Product Engineering",
      title: "AI Studio Product Engineering",
      content: {
        title: "AI Studio Product Engineering",
        description:
          "We design and build AI creation environments that enable structured prompt-to-output workflows for multimodal generation.",
        items: [
          "Designing project-based studio interfaces for creators, operators, and enterprise teams",
          "Building structured generation flows for video, image, ad creative, and voice production",
          "Enabling version control, regeneration loops, template systems, and asset lifecycle tracking",
          "Developing reusable generation frameworks for scalable production environments",
        ],
      },
    },
    {
      id: "Multimodal API & Model Integration",
      title: "Multimodal API & Model Integration",
      content: {
        title: "Multimodal API & Model Integration",
        description:
          "We integrate leading generative APIs and open models into a unified enterprise platform layer.",
        items: [
          "Integrating Fal.ai API for generative acceleration pipelines",
          "Implementing OpenAI Sora API and Google Gemini API (Veo) for text-to-video generation",
          "Connecting Adobe Firefly Services API, AdCreative.ai API, Creatomate API, JSON2Video API, and Runware API for creative and production automation",
          "Benchmarking model performance using Artificial Analysis Text-to-Video Leaderboard",
          "Incorporating open-source and frontier models, including Olmo 3, Rnj-1, INTELLECT-3 (MoE with large-scale RL), and Anthropic Agent Skills",
        ],
      },
    },
    {
      id: "Voice AI & Real-Time Communication Systems",
      title: "Voice AI & Real-Time Communication Systems",
      content: {
        title: "Voice AI & Real-Time Communication Systems",
        description:
          "We engineer advanced voice-enabled and real-time interaction layers within AI studio platforms.",
        items: [
          "Integrating Gradium (voice) systems for AI-generated speech",
          "Deploying Resemble (Chatterbox Turbo) for expressive open-source voice AI",
          "Building real-time communication environments using LiveKit and Pipecat",
          "Implementing SAM Audio for unified multimodal audio separation and enhancement",
        ],
      },
    },
    {
      id: "Agentic AI & Emerging Standards",
      title: "Agentic AI & Emerging Standards",
      content: {
        title: "Agentic AI & Emerging Standards",
        description:
          "We design forward-compatible AI platforms aligned with emerging agentic standards and ecosystems.",
        items: [
          "Aligning with the Agentic AI Foundation (AAIF) ecosystem",
          "Implementing Model Context Protocol (MCP), goose, and AGENTS.md standards for structured agent workflows",
          "Designing agent-driven systems capable of multi-step reasoning and action execution",
        ],
      },
    },
    {
      id: "Oracle Cloud Infrastructure Foundations",
      title: "Oracle Cloud Infrastructure Foundations",
      content: {
        title: "Oracle Cloud Infrastructure Foundations",
        description:
          "We architect and deploy AI studio platforms natively on Oracle Cloud Infrastructure (OCI).",
        items: [
          "Designing scalable compute, networking, and storage architectures on OCI",
          "Leveraging Oracle AI Database 26ai and Oracle Autonomous AI Database for high-performance AI workloads",
          "Implementing Oracle Cloud Infrastructure Media Streams for real-time content processing",
          "Applying Oracle Cloud Cost Estimator and Oracle Cloud Infrastructure pricing governance frameworks for cost visibility and control",
        ],
      },
    },
    {
      id: "Automation & Platform Integration",
      title: "Automation & Platform Integration",
      content: {
        title: "Automation & Platform Integration",
        description:
          "We connect AI studios to enterprise systems and automation environments for structured execution.",
        items: [
          "Integrating Zapier automation, Make automation, n8n automation, and Pipedream automation for cross-system workflow automation",
          "Connecting Search Engine APIs such as SerpAPI for data enrichment and contextual grounding",
          "Building structured pipelines for asset generation, review, approval, and distribution",
        ],
      },
    },
    {
      id: "Platform Reliability, Monitoring & Governance",
      title: "Platform Reliability, Monitoring & Governance",
      content: {
        title: "Platform Reliability, Monitoring & Governance",
        description:
          "We ensure AI studios operate as secure, production-grade systems.",
        items: [
          "Implementing CI/CD pipelines and Infrastructure-as-Code for repeatable deployments",
          "Designing observability across logs, performance metrics, and model usage tracking",
          "Managing provider routing, usage limits, and cost monitoring across multi-model environments",
          "Establishing structured governance, access control, and audit frameworks for enterprise compliance",
        ],
      },
    },
  ];

  const currentService = services.find((s) => s.id === activeService);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our AI Studio & Platform Engineering Services
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
