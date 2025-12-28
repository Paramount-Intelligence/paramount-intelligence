"use client";

import { useState } from "react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"engineering" | "consulting">(
    "engineering"
  );

  return (
    <section className="min-h-screen py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
          Agentic AI company
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <button
            onClick={() => setActiveTab("engineering")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "engineering"
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            AI Engineering
          </button>
          <button
            onClick={() => setActiveTab("consulting")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "consulting"
                ? "text-red-500 border-red-500"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            AI Consulting & Advisory
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-200 rounded-2xl overflow-hidden">
          {activeTab === "engineering" && (
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  AI Engineering
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  As a full end-to-end partner, we deliver advanced tailored AI
                  systems, LLM applications, and agentic solutions built for
                  real business workflows. We automate processes through deep
                  practical expertise across the full delivery stack, from
                  advanced RAG and LangChain orchestration to LLMOps, system
                  integrations, web scraping and data extraction, and
                  production-grade deployment that operates reliably at scale.
                </p>
              </div>

              {/* Right Visualization */}
              <div className="flex items-center rounded-2xl overflow-hidden justify-center">
                <img
                  src="/images/Conversational-AI-1.jpg"
                  alt="Conversational AI"
                />
              </div>
            </div>
          )}

          {activeTab === "consulting" && (
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  AI Consulting & Advisory
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We uniquely blend strategy, advisory services, and Gen AI and
                  LLM technologies to help organizations achieve operational
                  scalability, high ROI on AI investments, and improved
                  efficiency through practical AI agents and automation. With a
                  strong business and technical understanding, we align goals
                  with execution reality by prioritizing use cases, mapping
                  constraints, shaping architectures, and driving delivery from
                  strategy through implementation, including automation
                  workflows using Airtable, Zapier, and n8n.
                </p>
              </div>

              {/* Right Visualization */}
              <div className="flex items-center rounded-2xl overflow-hidden justify-center">
                <img
                  src="/images/tendrils-czerwonego-dymu-1.jpg"
                  alt="Tendrils of Red Smoke"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
