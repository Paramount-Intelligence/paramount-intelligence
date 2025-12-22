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
        "Mid-market tech adopters planning their Agentic AI transformation who need to align their vision with tech reality",
      description:
        "We help decision makers gain clarity of goals and expectations for their initial AI deployments. Our team can assist you in:",
      points: [
        "Applied AI Consulting for C-level and teams in Agentic AI system capabilities",
        "PoC and MVP development of custom LLM-based software",
        "Thorough goals vs tech possibilities mapping and analysis",
        "Ensure the MVP is well-structured and continuously updated",
        "AI readiness assessment workshops",
        "Agentic AI opportunity discovery",
      ],
    },
    {
      title:
        "Companies that have tried but struggle to adopt AI Agent solutions due to lack of top AI capabilities on board",
      description:
        "We diagnose and fix problems in ongoing AI deployments with our expertise in Machine Learning, RAG and LLMs. Our experience includes:",
      points: [
        "Seasoned technical talent on board",
        "Merging AI Agent consultation with engineering",
        "Flexibility to adapt to pre-existing elements of initiated AI projects",
        "End-to-end RAG enhanced AI Agents system architecture and deployment that integrates with existing infrastructure",
        "Comprehensive knowledge transfer to internal IT teams for ongoing operations and maintenance",
      ],
    },
    {
      title:
        "Enterprises that seek to accelerate existing Agentic AI projects needing consultancy and engineering support",
      description:
        "Many companies are still in the process of building their AI teams. We help them accelerate their ongoing AI projects by:",
      points: [
        "“Tech Consulting” on AI architecture patterns, production-grade deployment strategies, and AI-powered acceleration",
        "Offering senior advice and expertise on the visioning and execution of AI Projects and AI strategy development",
        "Enterprise architecture advisory for agentic AI integration across siloed legacy systems, combining engineering knowledge with the AI consulting firms’ focus on the client’s business",
        "Engineering support as an extension of existing software teams",
        "Ownership of sub-projects distinguished by the most ambitious goals",
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
              We proudly support mid-market challengers in their Agentic AI
              transformation as a reliable end-to-end partner
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Paramount Intelligence supports companies from the US to Europe
              and the Middle East in spotting transformation opportunities and
              high ROI projects using the proven TriStorm approach, solving pain
              points, reducing bottlenecks, and unblocking company potential.
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
