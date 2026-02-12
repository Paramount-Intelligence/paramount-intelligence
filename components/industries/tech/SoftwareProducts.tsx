"use client";

import { useState } from "react";
import { Plus, Minus, Dot } from "lucide-react";

export default function WhoWeServe() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const targetAudiences = [
    {
      title: "Product Intelligence & User Experience",
      description:
        "We design systems that understand user context and behavior to deliver tailored, intuitive product experiences. From adaptive interfaces to intelligent in-product assistance, these capabilities improve usability, increase adoption, and make complex enterprise software easier to navigate and operate.",
    },
    {
      title: "Software Lifecycle Automation",
      description:
        "We engineer automation across development, deployment, and support workflows to reduce manual effort and operational friction. This accelerates release cycles, lowers overhead, and allows engineering teams to focus on high-value product and platform innovation.",
    },
    {
      title: "Predictive Platform Behavior",
      description:
        "We build data and analytics foundations that allow platforms to anticipate outcomes rather than react to them. This includes usage forecasting, anomaly detection, and proactive system behavior that improves reliability, resilience, and long-term trust.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Main Heading */}
          <div>
            <h2 className="text-3xl md:text-2xl lg:text-[26px] font-bold text-gray-900 leading-tight mb-6">
              Modern software products are moving beyond static functionality,
              evolving into adaptive platforms that respond to users, data, and
              operational context in real time.
            </h2>
          </div>

          {/* Right Side - Target Audiences */}
          <div className="space-y-2">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="pb-2">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start border-gray-200 border p-2 justify-between gap-4 text-left group"
                >
                  <h3
                    className={`text-lg font-bold leading-tight transition-colors ${
                      openAccordion === index
                        ? "text-[#17599d]"
                        : "text-gray-900"
                    }`}
                  >
                    {audience.title}
                  </h3>
                  <div className="shrink-0 mt-1">
                    {openAccordion === index ? (
                      <Minus
                        className="w-5 h-5 text-[#17599d]"
                        strokeWidth={3}
                      />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-900" strokeWidth={3} />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {openAccordion === index && audience.description && (
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
