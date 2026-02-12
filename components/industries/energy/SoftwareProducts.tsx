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
      title: "Operational Intelligence on the Factory Floor",
      description:
        "We design systems that unify data from machines, sensors, and production systems to provide real-time operational visibility. By embedding intelligence into shop-floor operations, teams gain faster insights into performance, quality, and throughput, enabling more informed, timely decisions.",
    },
    {
      title: "Industrial Process Automation",
      description:
        "We engineer automation across production, maintenance, and operational workflows to reduce manual intervention and variability. This improves consistency, lowers downtime, and allows teams to scale operations while maintaining safety and quality standards.",
    },
    {
      title: "Predictive Maintenance & Yield Optimization",
      description:
        "We build data and analytics foundations that enable proactive industrial operations. This includes asset health monitoring, failure prediction, and yield optimization, helping organizations prevent unplanned downtime, extend equipment life, and improve overall operational efficiency.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Main Heading */}
          <div>
            <h2 className="text-3xl md:text-2xl lg:text-[26px] font-bold text-gray-900 leading-tight mb-6">
              Industrial operations are increasingly driven by connected
              systems, where intelligence is required to monitor assets,
              optimize processes, and maintain reliability at scale.
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
