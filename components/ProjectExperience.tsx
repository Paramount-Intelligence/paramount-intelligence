"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const specificTitles = [
  "Multi Agent Shopping Intelligence on AWS Bedrock AgentCore",
  "LLM-Powered Customer Support Chatbot",
  "AI-Powered Support Copilot for Enterprise DevOps Platform",
];

const normalizeTitle = (title: string) => title.trim().toLowerCase();

const titleOrder = new Map(
  specificTitles.map((title, index) => [normalizeTitle(title), index])
);

export default function ProjectExperience() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const titleQuery = specificTitles
          .map((title) => `title=${encodeURIComponent(title)}`)
          .join("&");
        const response = await fetch(`/api/case-studies?${titleQuery}`);
        if (!response.ok) throw new Error("Failed to fetch case studies");

        const caseStudiesData = await response.json();

        const filteredCaseStudies = caseStudiesData
          .filter((cs: any) => titleOrder.has(normalizeTitle(cs.title)))
          .sort(
            (first: any, second: any) =>
              titleOrder.get(normalizeTitle(first.title))! -
              titleOrder.get(normalizeTitle(second.title))!
          );

        const projectData = filteredCaseStudies.map(
          (caseStudy: any, index: number) => ({
            title: caseStudy.title.trim(),
            description: caseStudy.subtitle,
            fullDescription: caseStudy.description
              ? caseStudy.description.substring(0, 220) + "..."
              : "",
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
        // Small delay so the fade-in feels intentional
        setTimeout(() => setVisible(true), 80);
      }
    };

    fetchCaseStudies();
  }, []);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 geo-grid opacity-25 pointer-events-none" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(30,111,217,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header — static, safe for scroll reveal */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              Project Experience
            </span>
            <div className="accent-line" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#ffffff" }}
          >
            Some of our project experience
          </h2>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-20">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grid md:grid-cols-2 gap-10 items-center animate-pulse"
              >
                <div
                  className="space-y-4"
                  style={{ order: i % 2 === 0 ? 1 : 2 }}
                >
                  <div
                    className="h-16 w-16 rounded-lg"
                    style={{ background: "rgba(30,111,217,0.12)" }}
                  />
                  <div
                    className="h-8 rounded-lg w-3/4"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <div
                    className="h-4 rounded w-full"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                  <div
                    className="h-4 rounded w-5/6"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                  <div
                    className="h-4 rounded w-2/3"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                </div>
                <div
                  className="h-64 md:h-80 rounded-2xl"
                  style={{
                    background: "rgba(30,111,217,0.08)",
                    border: "1px solid rgba(30,111,217,0.15)",
                    order: i % 2 === 0 ? 2 : 1,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Loaded projects — use direct CSS animation, NOT scroll-reveal */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: "#8fa4c4" }}>
              Case studies are currently unavailable. Check back soon.
            </p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-10 items-center ${project.imagePosition === "left" ? "md:grid-flow-dense" : ""
                  }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * 150}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * 150}ms`,
                }}
              >
                {/* Text Content */}
                <div
                  className={`space-y-5 ${project.imagePosition === "left" ? "md:col-start-2" : ""
                    }`}
                >
                  {/* Large index number */}
                  <div
                    className="text-6xl font-black leading-none select-none"
                    style={{
                      color: "rgba(107, 168, 255, 0.35)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold leading-snug"
                    style={{ color: "#ffffff" }}
                  >
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="leading-relaxed" style={{ color: "#b5c8e2" }}>
                      {project.description}
                    </p>
                  )}

                  {project.fullDescription && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#8fa4c4" }}
                    >
                      {project.fullDescription}
                    </p>
                  )}

                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold group/link transition-colors"
                    style={{ color: "#3b88f5" }}
                  >
                    Read case study
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover/link:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Image */}
                <div
                  className={`relative h-64 md:h-80 rounded-2xl overflow-hidden group/img ${project.imagePosition === "left"
                      ? "md:col-start-1 md:row-start-1"
                      : ""
                    }`}
                  style={{
                    border: "1px solid rgba(30,111,217,0.2)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  {project.imageSrc ? (
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    /* Fallback placeholder when no image */
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(30,111,217,0.15) 0%, rgba(13,31,60,0.8) 100%)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(30,111,217,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/img:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(30,111,217,0.3) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && (
          <div
            className="text-center mt-16"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.65s ease 500ms",
            }}
          >
            <Link href="/case-studies" className="btn-primary inline-flex text-sm">
              View All Case Studies
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
