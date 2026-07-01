"use client";
import Link from "next/link";

interface CaseStudiesHeaderProps {
  title?: string;
}

export default function CaseStudiesHeader({ title }: CaseStudiesHeaderProps) {
  // If title is present, we are on the Case Study detail page (light background).
  // Otherwise, we are on the Case Studies listing page (dark background).
  const isLight = !!title;

  return (
    <header className="relative w-full py-4 mt-20 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium"
          style={{ color: isLight ? "#5e708d" : "#8fa4c4" }}
        >
          <Link
            href="/"
            className={`transition-colors ${
              isLight ? "hover:text-[#1e6fd9] text-gray-700" : "hover:text-white text-gray-300"
            }`}
          >
            Home
          </Link>
          <span className="opacity-50">/</span>
          {title ? (
            <>
              <Link
                href="/case-studies"
                className={`transition-colors ${
                  isLight ? "hover:text-[#1e6fd9] text-gray-700" : "hover:text-white text-gray-300"
                }`}
              >
                Case Studies
              </Link>
              <span className="opacity-50">/</span>
              <span className={isLight ? "text-gray-900 font-semibold break-words" : "text-white font-semibold break-words"}>
                {title}
              </span>
            </>
          ) : (
            <span className={isLight ? "text-gray-900 font-semibold" : "text-white font-semibold"}>
              Case Studies
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
