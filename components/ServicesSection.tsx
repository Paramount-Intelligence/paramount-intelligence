"use client";

import { useState } from "react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"engineering" | "consulting">(
    "engineering"
  );

  return (
    <section className="min-h-screen py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
          Technology Consulting
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <button
            onClick={() => setActiveTab("engineering")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "engineering"
                ? "text-[#17599d] border-[#17599d]"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            AI Engineering
          </button>
          <button
            onClick={() => setActiveTab("consulting")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "consulting"
                ? "text-[#17599d] border-[#17599d]"
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
                  We engineer and operationalize the complete system. Our teams
                  build custom AI solutions, LLM applications, agentic systems,
                  data platforms, and secure cloud infrastructure, implementing
                  advanced RAG, LLMOps, and intelligent automation to deliver
                  reliable, production-grade systems at scale.
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
                  We partner with leadership to define the technical vision and
                  executable roadmap. Our advisory work establishes enterprise
                  AI strategy, prioritizes high-impact use cases, and de-risks
                  execution through readiness assessments, feasibility analysis,
                  and governance design, ensuring initiatives are built for
                  scale and ROI.
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
