"use client";
import Link from "next/link";

export default function CandidatesHeader() {
  return (
    <header className="relative w-full py-6 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center space-x-2 text-sm text-gray-900 font-bold">
          <Link href="/" className="hover:text-[#17599d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/for-candidates"
            className="hover:text-[#17599d] transition-colors"
          >
            For Candidates
          </Link>
        </nav>
      </div>
    </header>
  );
}
