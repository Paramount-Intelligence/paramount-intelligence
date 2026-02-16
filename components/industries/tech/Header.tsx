"use client";
import Link from "next/link";

export default function TechHeader() {
  return (
    <header className="relative w-full py-6 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center font-bold space-x-2 text-sm text-gray-900">
          <Link href="/" className="hover:text-[#17599d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/industries"
            className="hover:text-[#17599d] transition-colors"
          >
            Industries
          </Link>
          <span>/</span>
          <Link
            href="/industries/technology-and-enterprise-software"
            className="hover:text-[#17599d] transition-colors"
          >
            Technology & Enterprise Software
          </Link>
        </nav>
      </div>
    </header>
  );
}
