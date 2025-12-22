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
                  As a full end-to-end partner, we deliver advanced tailored
                  autonomous AI systems and Agentic solutions. We automate
                  processes through deep practical expertise in all fields, from
                  orchestrating frameworks to engineering unique components
                  using Machine Learning and Deep Learning.
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
                  We provide strategic guidance and expert advisory services to
                  help organizations navigate their AI transformation journey.
                  Our consultants work closely with your team to identify
                  opportunities, mitigate risks, and develop comprehensive AI
                  strategies aligned with your business goals.
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
