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
          Our Clients Achieve
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
            Hyper-Customization
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
                  Hyper-Automation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hyper-automation extends beyond processes to encompass data,
                  infrastructure, and workflows. By automating complex systems
                  across the organization, we enable businesses to scale
                  operations efficiently, minimize errors, and optimize
                  resources. This results in significantly higher operational
                  efficiency, reduced costs, and the agility to adapt to new
                  opportunities.
                </p>
              </div>

              {/* Right Visualization */}
              <div className="flex items-center rounded-2xl overflow-hidden justify-center">
                <img loading="lazy"
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
                  Hyper-Customization
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hyper-customization leverages integrated data and AI to
                  tailor customer experiences and internal operations. This
                  leads to stronger customer engagement, loyalty, and conversion
                  rates, while also enabling more relevant products and
                  services, ultimately driving sustainable revenue growth and
                  competitive differentiation.
                </p>
              </div>

              {/* Right Visualization */}
              <div className="flex items-center rounded-2xl overflow-hidden justify-center">
                <img loading="lazy"
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
                  Efficient Decision Making
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Robust data foundations and intelligent systems enable faster,
                  more accurate, data-driven choices. By reducing risks,
                  improving strategic foresight, and accelerating responses to
                  market dynamics, we empower leadership with a decisive
                  information advantage for superior planning and execution.
                </p>
              </div>

              {/* Right Visualization */}
              <div className="flex items-center rounded-2xl overflow-hidden justify-center">
                <img loading="lazy"
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
