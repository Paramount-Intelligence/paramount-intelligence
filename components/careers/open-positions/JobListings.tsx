"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobListings() {
  const [filter, setFilter] = useState("All");

  const jobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Lead the development of cutting-edge AI solutions using LLMs, RAG systems, and advanced ML techniques.",
      requirements: [
        "5+ years in AI/ML",
        "Experience with LLMs",
        "Python expertise",
      ],
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      description:
        "Design and implement machine learning models for production systems at scale.",
      requirements: [
        "3+ years ML experience",
        "TensorFlow/PyTorch",
        "Cloud platforms",
      ],
    },
    {
      id: 3,
      title: "AI Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "Define product strategy and roadmap for AI-powered solutions, working closely with clients and engineering teams.",
      requirements: [
        "4+ years product management",
        "AI/ML knowledge",
        "B2B experience",
      ],
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      description:
        "Extract insights from complex datasets and build predictive models to drive business decisions.",
      requirements: [
        "3+ years data science",
        "Statistical modeling",
        "SQL & Python",
      ],
    },
    {
      id: 5,
      title: "AI Solutions Architect",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      description:
        "Design end-to-end AI solutions for enterprise clients, ensuring scalability and reliability.",
      requirements: [
        "6+ years solution architecture",
        "Cloud platforms",
        "AI/ML systems",
      ],
    },
    {
      id: 6,
      title: "AI Research Intern",
      department: "Research",
      location: "Remote",
      type: "Internship",
      description:
        "Work on cutting-edge AI research projects alongside our research team.",
      requirements: [
        "Currently pursuing MS/PhD",
        "Strong ML fundamentals",
        "Research experience",
      ],
    },
  ];

  const departments = [
    "All",
    "Engineering",
    "Product",
    "Data Science",
    "Research",
  ];

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.department === filter);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Current Openings
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === dept
                    ? "bg-blue-600 text-white shadow-lg"
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
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {job.department}
                    </span>
                    <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-300">
                      📍 {job.location}
                    </span>
                    <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-300">
                      ⏰ {job.type}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {job.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Key Requirements:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <Link
                href="/careers/apply-now"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Apply Now
              </Link>
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
