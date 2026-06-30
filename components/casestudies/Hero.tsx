"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface CaseStudiesHeroProps {
  onSearchChange: (query: string) => void;
}

export default function CaseStudiesHero({
  onSearchChange,
}: CaseStudiesHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setQuery(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearchChange("");
  };

  return (
    <section className="relative py-24 overflow-hidden min-h-[45vh] flex items-center bg-hero-gradient">
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-35 pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #1e6fd9 0%, transparent 70%)",
        }}
      />

      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-x-[-1]"
        >
          <source src="/videos/background-video.webm" type="video/webm" />
        </video>
      </div>

      <div className="relative z-10 w-full animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
          <h1
            className="font-bold leading-[1.1] text-white mb-8"
            style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
          >
            Case{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Studies
            </span>
          </h1>

          {/* Search Input Container */}
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search case studies by title, description, or domain..."
              className="w-full bg-white text-gray-900 pl-12 pr-12 py-3.5 rounded-xl border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent text-base transition-all duration-200"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
