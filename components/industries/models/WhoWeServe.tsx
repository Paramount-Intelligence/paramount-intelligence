"use client";

import { useState } from "react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<
    "automation" | "personalization" | "decision-making"
  >("automation");

  return (
    <section className="min-h-screen py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
          Our clients achieve
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <button
            onClick={() => setActiveTab("automation")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "automation"
                ? "text-[#17599d] border-[#17599d]"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            Hyper-automation
          </button>
          <button
            onClick={() => setActiveTab("personalization")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "personalization"
                ? "text-[#17599d] border-[#17599d]"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            Hyper-personalization
          </button>
          <button
            onClick={() => setActiveTab("decision-making")}
            className={`text-sm md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === "decision-making"
                ? "text-[#17599d] border-[#17599d]"
                : "text-gray-900 border-transparent hover:text-gray-600"
            }`}
          >
            Enhanced decision-making processes
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-200 rounded-2xl overflow-hidden">
          {activeTab === "automation" && (
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Hyper-automation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hyper-automation leads to significantly higher operational
                  efficiency and reduced costs by automating complex processes
                  across the organization. It allows businesses to scale their
                  operations faster, minimize human errors, and optimize
                  resource allocation, resulting in improved productivity and
                  business agility.
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

          {activeTab === "personalization" && (
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Hyper-personalization
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hyper-personalization boosts customer engagement and loyalty
                  by offering tailored experiences, leading to higher
                  satisfaction, better conversion rates, and stronger brand
                  connections, ultimately driving revenue growth.
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

          {activeTab === "decision-making" && (
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Enhanced decision-making processes
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-enhanced decision-making enables more accurate, data-driven
                  choices, reducing risks, improving strategic planning, and
                  speeding up responses to market changes, giving companies a
                  competitive advantage.
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
