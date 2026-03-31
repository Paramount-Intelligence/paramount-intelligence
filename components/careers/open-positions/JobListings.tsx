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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl text-center font-bold text-gray-900 mb-6">
            Current Openings
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === dept
                    ? "bg-[#17599d] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-[#17599d] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {job.department}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      📍 {job.location}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      ⏰ {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {job.openPositions} Open{" "}
                      {job.openPositions === 1 ? "Position" : "Positions"}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {job.briefDescription}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/careers/open-positions/${job.id}`}
                  className="inline-block bg-[#17599d] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#144a75] transition-all"
                >
                  View Details →
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
