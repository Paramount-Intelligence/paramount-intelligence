"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobListings() {
  const [filter, setFilter] = useState("All");

  const jobs = [
    {
      id: "senior-ai-engineer",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      openPositions: 1,
      briefDescription:
        "Lead the design, architecture, and deployment of enterprise-grade AI systems across client environments.",
      overview:
        "We are seeking a Senior AI Engineer to lead the design, architecture, and deployment of enterprise-grade AI systems across client environments. This role goes beyond experimentation. You will build production-ready LLM applications, Retrieval-Augmented Generation systems, agentic architectures, and advanced machine learning pipelines that integrate directly into business-critical workflows.",
    },
    {
      id: "machine-learning-engineer",
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      openPositions: 1,
      briefDescription:
        "Design, develop, and deploy scalable ML models that operate reliably in production environments.",
      overview:
        "We are looking for a Machine Learning Engineer to design, develop, and deploy scalable ML models that operate reliably in production environments. This role focuses on translating structured and unstructured data into intelligent systems that power enterprise workflows across industries.",
    },
    {
      id: "ai-product-manager",
      title: "AI Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      openPositions: 1,
      briefDescription:
        "Define and drive the strategy, roadmap, and execution of AI-enabled solutions across client engagements.",
      overview:
        "We are seeking an AI Product Manager to define and drive the strategy, roadmap, and execution of AI-enabled solutions across client engagements. This role operates at the intersection of business strategy, engineering capability, and client objectives.",
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      openPositions: 1,
      briefDescription:
        "Extract structured insight from complex datasets and build predictive models that support strategic decision-making.",
      overview:
        "We are seeking a Data Scientist to extract structured insight from complex datasets and build predictive models that directly support strategic and operational decision-making. This role sits at the intersection of Data & Analytics, AI Strategy, and client-facing consulting engagements.",
    },
    {
      id: "ai-solutions-architect",
      title: "AI Solutions Architect",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      openPositions: 1,
      briefDescription:
        "Design end-to-end intelligent systems for enterprise clients across AI, data, cloud, and automation.",
      overview:
        "We are seeking an AI Solutions Architect to design end-to-end intelligent systems for enterprise clients. This role is responsible for translating strategic requirements into scalable, secure, and production-grade architectures across AI, data, cloud, automation, and AI Studio & Platform Engineering initiatives.",
    },
    {
      id: "ai-automation-intern",
      title: "AI & Automation Intern",
      department: "Engineering",
      location: "On-site Preferred",
      type: "Internship",
      openPositions: 3,
      briefDescription:
        "Support engineering and consulting teams on real-world AI, data, and workflow automation initiatives.",
      overview:
        "We are seeking highly motivated AI & Automation Interns to support engineering and consulting teams on real-world AI, data, and workflow automation initiatives. This is not a shadow role. You will contribute to structured experimentation, prototyping, automation workflows, and research initiatives across active client engagements and internal AI Studio & Platform Engineering efforts.",
    },
    {
      id: "business-consulting-intern",
      title: "Business Consulting Intern",
      department: "Consulting",
      location: "On-site Preferred",
      type: "Internship",
      openPositions: 1,
      briefDescription:
        "Support live consulting engagements across strategy, analytics, digital transformation, and technology-enabled execution.",
      overview:
        "Paramount Intelligence is a technology consulting and engineering firm delivering data-driven and technology-enabled transformation programs to global clients, including Fortune 1000 organizations. The Business Consulting Intern will support live engagements across strategy, analytics, digital transformation, and technology-enabled execution initiatives.",
    },
    {
      id: "marketing-personal-branding-intern",
      title: "Marketing & Personal Branding Intern",
      department: "Marketing",
      location: "On-site Preferred",
      type: "Internship",
      openPositions: 1,
      briefDescription:
        "Build leadership thought leadership and executive personal brands across LinkedIn, video, and digital storytelling.",
      overview:
        "We are seeking a creative and high-energy Marketing & Personal Branding Intern to bridge the gap between corporate identity and executive presence. You will be responsible for crafting and amplifying the personal brands of our key leadership and technical experts through reputation management, thought leadership, and digital storytelling.",
    },
    {
      id: "strategy-consultant",
      title: "Strategy Consultant",
      department: "Consulting",
      location: "Onsite - B-17 Multi Gardens",
      type: "Full-Time Contract",
      openPositions: 1,
      briefDescription:
        "Ideal for early-career professionals seeking practical experience in market research, business strategy, client coordination, and growth initiatives.",
      overview:
        "We are hiring a Strategy Consultant for a key contractual position within our growing team. This role is ideal for ambitious early-career professionals seeking practical experience in market research, business strategy, client coordination, and commercial growth initiatives.",
    },
  ];

  const departments = [
    "All",
    "Engineering",
    "Product",
    "Data Science",
    "Consulting",
    "Marketing",
  ];

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.department === filter);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f1f3f6" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Careers
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: "#0d1f3c" }}>
            Current Openings
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  color: filter === dept ? "#ffffff" : "#5a7399",
                  background: filter === dept
                    ? "linear-gradient(135deg, #1e6fd9, #1559b4)"
                    : "rgba(255, 255, 255, 0.4)",
                  border: filter === dept
                    ? "1px solid #1e6fd9"
                    : "1px solid rgba(30,111,217,0.15)",
                  boxShadow: filter === dept
                    ? "0 4px 16px rgba(30,111,217,0.25)"
                    : "none",
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(30,111,217,0.1)",
                      color: "#1e6fd9",
                      border: "1px solid rgba(30,111,217,0.2)",
                    }}
                  >
                    {job.department}
                  </span>
                  <span className="text-gray-500 text-xs font-medium flex items-center gap-1">
                    📍 {job.location}
                  </span>
                  <span className="text-gray-500 text-xs font-medium flex items-center gap-1">
                    ⏰ {job.type}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold" style={{ color: "#0d1f3c" }}>
                  {job.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                  {job.briefDescription}
                </p>
              </div>

              <div className="flex md:self-center shrink-0">
                <Link
                  href={`/careers/open-positions/${job.id}`}
                  className="btn-primary text-xs px-6 py-3 inline-flex whitespace-nowrap"
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No positions found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
