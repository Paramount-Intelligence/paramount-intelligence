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
        "Mid-market and enterprise teams planning their AI and automation initiatives who need to align vision with execution reality",
      description:
        "We help decision makers gain clarity on goals, scope, and expectations for their initial deployments. We work across startups, mid-sized teams, and enterprise functions, supporting both advisory and hands-on implementation from first use case through production. Our team can assist you in:",
      points: [
        "AI consulting and advisory for leadership and delivery teams on practical Gen AI and LLM use cases",
        "Designing and building LLM applications aligned to real workflows",
        "Developing AI agents for internal operations, customer-facing processes, and knowledge work",
        "Advanced RAG engineering to connect LLM systems to business data and documents",
        "LangChain development for agent workflows and orchestration",
        "PoC and MVP delivery with a clear path to production readiness",
      ],
    },
    {
      title:
        "Organizations that have implemented AI or automation but struggle to reach reliable adoption due to fragmented systems, unclear ownership, or weak data foundations",
      description:
        "We diagnose why existing AI, Gen AI, LLM, and automation initiatives fail to deliver in practice. Our work focuses on identifying breakdowns across data availability, system design, and operating ownership, then restructuring deployments so they can function reliably in real-world conditions. Our experience includes:",
      points: [
        "Independent advisory combined with hands-on engineering to reset stalled initiatives",
        "Advanced RAG and agent system redesign to align with actual data and workflow constraints",
        "LLMOps services to stabilize deployments, improve reliability, and support controlled iteration",
        "Business process automation using Airtable, Zapier, and n8n to remove manual workarounds",
        "Web scraping and data extraction pipelines where data gaps block AI and automation outcomes",
        "Knowledge transfer and documentation to restore ownership within internal teams",
      ],
    },
    {
      title:
        "Enterprises and fast-growing teams seeking to accelerate existing AI, Gen AI, LLM, agent, and automation initiatives with senior consulting and engineering support",
      description:
        "Many organizations have direction, internal teams, and active initiatives, but face capacity and execution constraints. We help accelerate progress by working as a senior extension of leadership and delivery teams, taking ownership of defined workstreams and delivering production-grade components at speed. We help teams accelerate by: We help teams accelerate by:",
      points: [
        "Advising on sequencing, prioritization, and execution tradeoffs for AI and automation programs",
        "Designing and delivering AI agents, LLM applications, and automation across business functions",
        "Integrating AI and agent systems across siloed legacy and modern platforms",
        "Supporting productivity and operational acceleration across consulting, manufacturing, telecom, and ecommerce environments",
        "Acting as an extension of existing product, data, and operations teams",
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
              We proudly support startups, mid-market teams, and enterprises in
              applying AI and automation as a reliable end-to-end consulting
              partner
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Paramount Intelligence supports organizations across the US and
              global markets in identifying high-impact AI, GenAI, LLM, agent,
              and automation opportunities. We work from strategy through
              execution, helping teams solve operational pain points, reduce
              friction across workflows, and unlock measurable productivity and
              business outcomes through practical, production-ready systems.
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
                            <span className="text-gray-900 font-bold mt-0.5">
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
