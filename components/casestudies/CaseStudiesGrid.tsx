"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CaseStudiesGridProps {
  searchQuery: string;
}

const featuredCaseStudyTitles = [
  "Multi Agent Shopping Intelligence on AWS Bedrock AgentCore",
  "LLM-Powered Customer Support Chatbot",
  "AI-Powered Support Copilot for Enterprise DevOps Platform",
];

const normalizeCaseStudyTitle = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const featuredCaseStudyOrder = new Map(
  featuredCaseStudyTitles.map((title, index) => [
    normalizeCaseStudyTitle(title),
    index,
  ]),
);

export default function CaseStudiesGrid({
  searchQuery,
}: CaseStudiesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [caseStudiesData, setCaseStudiesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  // Fetch case studies from database
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`api/admin/case-studies`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCaseStudiesData(data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const orderedCaseStudies = [...caseStudiesData].sort((first, second) => {
    const firstPriority =
      featuredCaseStudyOrder.get(normalizeCaseStudyTitle(first.title)) ??
      Number.POSITIVE_INFINITY;
    const secondPriority =
      featuredCaseStudyOrder.get(normalizeCaseStudyTitle(second.title)) ??
      Number.POSITIVE_INFINITY;

    return firstPriority - secondPriority;
  });

  const filteredCaseStudies = orderedCaseStudies.filter((caseStudy) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const titleMatch = caseStudy.title?.toLowerCase().includes(query);
    const descriptionMatch = caseStudy.description?.toLowerCase().includes(query);
    const industryMatch = caseStudy.industry?.toLowerCase().includes(query);
    const businessFunctionMatch = caseStudy.businessFunction?.toLowerCase().includes(query);

    return titleMatch || descriptionMatch || industryMatch || businessFunctionMatch;
  });

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCaseStudies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCaseStudies = filteredCaseStudies.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f1f3f6" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg font-medium">Loading case studies...</p>
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg font-medium">
              No case studies found matching your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCaseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                    {caseStudy.image &&
                      typeof caseStudy.image === "string" &&
                      caseStudy.image.trim() !== "" &&
                      caseStudy.image !== "nil" &&
                      (caseStudy.image.startsWith("http") ||
                        caseStudy.image.startsWith("/")) ? (
                      <Image
                        src={caseStudy.image.trim()}
                        alt={caseStudy.title || "Case Study"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 p-6">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          No Image available
                        </span>
                      </div>
                    )}
                    {/* Tiny badge inside image container */}
                    {caseStudy.industry && (
                      <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#0d1f3c]/90 text-[#6ba8ff] text-[10px] font-bold tracking-wider uppercase rounded-md backdrop-blur-sm border border-[rgba(30,111,217,0.2)]">
                        {caseStudy.industry}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-3 mb-2" style={{ color: "#0d1f3c" }}>
                        {caseStudy.title}
                      </h3>
                      {caseStudy.description && (
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                          {caseStudy.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/case-studies/${caseStudy.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1e6fd9] hover:text-[#1559b4] transition-all group/link"
                      >
                        Read case study
                        <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl border border-[rgba(30,111,217,0.15)] text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-bold transition-all shadow-sm"
                        style={{
                          color: currentPage === page ? "#ffffff" : "#5a7399",
                          background: currentPage === page
                            ? "linear-gradient(135deg, #1e6fd9, #1559b4)"
                            : "#ffffff",
                          borderColor: currentPage === page
                            ? "#1e6fd9"
                            : "rgba(30,111,217,0.15)",
                        }}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl border border-[rgba(30,111,217,0.15)] text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
