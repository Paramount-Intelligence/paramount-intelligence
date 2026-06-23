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
    <section className="relative py-16 overflow-hidden">
      {/* Background with dotted pattern */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-600 to-gray-700">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size-[20px_20px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-12">
          Case Studies
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
            className="w-full bg-white text-gray-900 pl-12 pr-12 py-3.5 rounded-xl border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all duration-200"
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
    </section>
  );
}

