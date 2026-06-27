"use client";

import { useState } from "react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"engineering" | "consulting">("engineering");

  const tabs = [
    { id: "engineering" as const, label: "AI Engineering" },
    { id: "consulting" as const, label: "AI Consulting & Advisory" },
  ];

  const content = {
    engineering: {
      title: "AI Engineering",
      description:
        "We engineer and operationalize the complete system. Our teams build custom AI solutions, LLM applications, agentic systems, data platforms, and secure cloud infrastructure, implementing advanced RAG, LLMOps, and intelligent automation to deliver reliable, production-grade systems at scale.",
      image: "/images/Conversational-AI-1.jpg",
      features: ["LLM Applications", "Agentic Systems", "RAG Architectures", "MLOps & LLMOps", "Cloud Infrastructure"],
    },
    consulting: {
      title: "AI Consulting & Advisory",
      description:
        "We partner with leadership to define the technical vision and executable roadmap. Our advisory work establishes enterprise AI strategy, prioritizes high-impact use cases, and de-risks execution through readiness assessments, feasibility analysis, and governance design.",
      image: "/images/tendrils-czerwonego-dymu-1.jpg",
      features: ["AI Strategy", "Readiness Assessment", "Use Case Prioritization", "Governance Design", "ROI Frameworks"],
    },
  };

  const active = content[activeTab];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Geo grid overlay */}
      <div className="absolute inset-0 geo-grid opacity-25 pointer-events-none" />
      {/* Top glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(30,111,217,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              What We Do
            </span>
            <div className="accent-line" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#ffffff" }}
          >
            Technology Consulting
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center justify-center mb-10 reveal" data-delay="100">
          <div
            className="flex rounded-xl p-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(30,111,217,0.3)",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  color: activeTab === tab.id ? "#ffffff" : "#8fa4c4",
                  background: activeTab === tab.id
                    ? "linear-gradient(135deg, #1e6fd9, #1559b4)"
                    : "transparent",
                  boxShadow: activeTab === tab.id
                    ? "0 4px 20px rgba(30,111,217,0.5)"
                    : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div
          className="rounded-2xl overflow-hidden reveal"
          data-delay="200"
          style={{
            background: "#0d1f3c",
            border: "1px solid rgba(30,111,217,0.2)",
            boxShadow: "0 24px 80px rgba(6,13,26,0.35)",
          }}
        >
          <div key={activeTab} className="grid md:grid-cols-2 gap-0 animate-scale-in">
            {/* Left — Text */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                {active.title}
              </h3>
              <p
                className="leading-relaxed mb-8 text-base"
                style={{ color: "#b5c8e2" }}
              >
                {active.description}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {active.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(30,111,217,0.18)",
                      border: "1px solid rgba(30,111,217,0.3)",
                      color: "#6ba8ff",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <a
                href={activeTab === "engineering" ? "/services/ai-solutions-and-engineering" : "/services/ai-strategy-and-consulting"}
                className="btn-primary inline-flex self-start text-sm"
              >
                Explore service
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right — Image */}
            <div className="relative overflow-hidden min-h-[320px]">
              <img
                loading="lazy"
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: "brightness(0.75)" }}
              />
              {/* Blue gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(13,31,60,0.55) 0%, transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
