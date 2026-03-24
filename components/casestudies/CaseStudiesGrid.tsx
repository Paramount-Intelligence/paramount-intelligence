"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getApiUrl } from "@/lib/api";

interface CaseStudiesGridProps {
  selectedIndustry: string;
  selectedBusinessFunction: string;
}

export default function CaseStudiesGrid({
  selectedIndustry,
  selectedBusinessFunction,
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

  const filteredCaseStudies = caseStudiesData.filter((caseStudy) => {
    const industryMatch =
      selectedIndustry === "All" ||
      caseStudy.industry.includes(selectedIndustry);
    const functionMatch =
      selectedBusinessFunction === "All" ||
      caseStudy.businessFunction.includes(selectedBusinessFunction);
    return industryMatch && functionMatch;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndustry, selectedBusinessFunction]);

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Loading case studies...</p>
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No case studies found matching your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCaseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="group bg-gray-100 rounded-4xl overflow-hidden transition-transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
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
                        className="object-cover transition-transform group-hover:scale-105"
                        unoptimized // Adding this ensures Next.js doesn't try to pre-parse the URL on the server
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          No Image available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                      {caseStudy.title}
                    </h3>
                    <Link
                      href={`/case-studies/${caseStudy.slug}`}
                      className="inline-flex items-center text-[#17599d] font-semibold hover:text-[#144a75] transition-colors"
                    >
                      / Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 border transition-colors ${
                          currentPage === page
                            ? "bg-[#17599d] text-white border-[#17599d]"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
