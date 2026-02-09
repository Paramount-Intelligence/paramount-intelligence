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
      title:
        "Teams planning core technology initiatives who need to align vision with execution reality",
      description:
        "We help decision-makers gain clarity on goals, scope, and execution paths for new initiatives. From first use case through production deployment, we support both advisory and hands-on delivery across AI, data, and cloud. We assist teams with:",
      points: [
        "Technology and AI strategy aligned to business priorities and operating constraints",
        "Designing and building AI and LLM applications aligned to real workflows",
        "Developing AI agents, data pipelines, and analytics platforms for intelligent operations",
        "Secure RAG architectures and cloud foundations to scale AI reliably",
        "Legacy modernization and workflow automation to reduce friction and manual effort",
        "PoC and MVP delivery with a clear path to production readiness",
      ],
    },
    {
      title:
        "Organizations with underperforming technology initiatives that struggle to reach adoption",
      description:
        "Many AI and automation programs fail due to fragmented systems, unclear ownership, or weak foundations. We diagnose why deployments stall and restructure them to operate reliably in real-world conditions. Our work includes:",
      points: [
        "Independent advisory combined with hands-on engineering to reset stalled initiatives",
        "Redesigning RAG systems, agent architectures, and data pipelines to fit actual constraints",
        "LLMOps and cloud modernization to stabilize and scale existing deployments",
        "Workflow automation and system integration to eliminate manual workarounds",
        "Data foundation remediation, including external data acquisition where required",
        "Knowledge transfer and documentation to restore internal ownership",
      ],
    },
    {
      title:
        "Enterprises and fast-growing teams accelerating complex technology programs",
      description:
        "Some organizations have direction and talent but lack execution capacity. We act as a senior extension of leadership, owning defined workstreams and delivering production-grade outcomes at speed. We help acceleration by:",
      points: [
        "Advising on sequencing, prioritization, and execution trade-offs",
        "Delivering AI agents, LLM applications, and cloud-native data platforms",
        "Integrating AI systems across legacy and modern environments",
        "Driving operational productivity through targeted automation",
        "Filling critical capability gaps across product, data, cloud, and operations teams",
        "Owning scoped sub-projects with clear accountability and measurable outcomes",
      ],
    },
  ];

  return (
    <section className="min-h-screen pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Main Heading */}
          <div>
            <h2 className="text-3xl md:text-2xl lg:text-[26px] font-bold text-gray-900 leading-tight mb-6">
              Who We Work With
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We support startups, mid-market organizations, and enterprises as
              a reliable partner for end-to-end technology consulting and
              execution. Our teams work globally to design and operationalize
              intelligent systems across AI, data, cloud, and automation,
              turning complex business pain points into durable,
              production-ready capabilities.
            </p>
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
                    {audience.points.length > 0 && (
                      <ul className="space-y-3">
                        {audience.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-3"
                          >
                            <span className="text-gray-900 font-bold mb-1">
                              •
                            </span>
                            <span className="text-gray-700 text-sm">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
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
