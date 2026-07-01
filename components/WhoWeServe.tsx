"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function WhoWeServe() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const targetAudiences = [
    {
      title: "Teams planning core technology initiatives who need to align vision with execution reality",
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
      title: "Organizations with underperforming technology initiatives that struggle to reach adoption",
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
      title: "Enterprises and fast-growing teams accelerating complex technology programs",
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
    <section className="py-24 relative overflow-hidden" style={{ background: "#f1f3f6" }}>
      {/* Subtle top accent */}
      <div className="mb-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-3 reveal">
          <div className="accent-line" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#1e6fd9" }}
          >
            Who We Work With
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div className="reveal-left" data-delay="100">
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight mb-6"
              style={{ color: "#0d1f3c" }}
            >
              Serving organizations at every stage of their technology journey
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We support startups, mid-market organizations, and enterprises as
              a reliable partner for end-to-end technology consulting and
              execution. Our teams work globally to design and operationalize
              intelligent systems across AI, data, cloud, and automation,
              turning complex business pain points into durable,
              production-ready capabilities.
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌍", label: "Global Delivery" },
                { icon: "⚡", label: "Production-Ready" },
                { icon: "🤝", label: "Trusted Partners" },
                { icon: "📈", label: "Measurable ROI" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{
                    borderColor: "rgba(30,111,217,0.15)",
                    background: "rgba(30,111,217,0.04)",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#152d56" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side — Accordion */}
          <div className="space-y-3 reveal-right" data-delay="200">
            {targetAudiences.map((audience, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: openAccordion === index
                    ? "1px solid rgba(30,111,217,0.35)"
                    : "1px solid rgba(0,0,0,0.09)",
                  background: openAccordion === index
                    ? "rgba(30,111,217,0.04)"
                    : "#ffffff",
                  boxShadow: openAccordion === index
                    ? "0 4px 24px rgba(30,111,217,0.1)"
                    : "none",
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start justify-between gap-4 text-left px-5 py-4 group"
                >
                  <h3
                    className="text-base font-semibold leading-snug transition-colors"
                    style={{
                      color: openAccordion === index ? "#1e6fd9" : "#0d1f3c",
                    }}
                  >
                    {audience.title}
                  </h3>
                  <div
                    className="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: openAccordion === index
                        ? "rgba(30,111,217,0.15)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    {openAccordion === index ? (
                      <Minus className="w-4 h-4" style={{ color: "#1e6fd9" }} strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {openAccordion === index && (
                  <div className="px-5 pb-5 animate-slide-down">
                    <div
                      className="w-full h-[1px] mb-4"
                      style={{ background: "rgba(30,111,217,0.15)" }}
                    />
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {audience.description}
                    </p>
                    <ul className="space-y-2.5">
                      {audience.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ background: "#1e6fd9" }}
                          />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
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
