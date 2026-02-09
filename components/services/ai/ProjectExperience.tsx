"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getApiUrl } from "@/lib/api";

export default function ProjectExperience() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/api/case-studies`);
        const caseStudiesData = await response.json();

        // Filter for all LLM-related case studies
        const langModelTitles = [
          "AI-First Operations Transformation",
          "Operational Bottleneck Diagnosis and AI Automation",
        ];

        const filteredCaseStudies = caseStudiesData.filter((cs: any) =>
          langModelTitles.includes(cs.title)
        );

        const projectData = filteredCaseStudies.map(
          (caseStudy: any, index: number) => ({
            title: caseStudy.title,
            description: caseStudy.subtitle,
            fullDescription: caseStudy.description.substring(0, 200) + "...",
            imageSrc: caseStudy.heroImage,
            imagePosition: index % 2 === 0 ? "right" : "left",
            link: `/case-studies/${caseStudy.slug}`,
          })
        );

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          Some of our project experience:
        </h2>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading case studies...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  project.imagePosition === "left" ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Text Content */}
                <div
                  className={`space-y-4 ${
                    project.imagePosition === "left" ? "md:col-start-2" : ""
                  }`}
                >
                  <h3 className="text-2xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                  {project.fullDescription && (
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {project.fullDescription}
                    </p>
                  )}
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-[#17599d] font-medium hover:text-[#144a75] transition-colors"
                  >
                    <span className="mr-2">/</span>
                    Read more
                  </Link>
                </div>

                {/* Image */}
                <div
                  className={`relative h-64 md:h-80 rounded-2xl overflow-hidden ${
                    project.imagePosition === "left"
                      ? "md:col-start-1 md:row-start-1"
                      : ""
                  }`}
                >
                  <Image src={project.imageSrc} alt={project.title} fill />
                </div>
              </div>
            ))}

            {/* See More Button */}
            {projects.length > 0 && (
              <div className="mt-12 text-center">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  See More Case Studies
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
