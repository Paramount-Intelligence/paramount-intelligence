"use client";
import Link from "next/link";

export default function AboutHeader() {
  return (
    <header className="w-full py-4 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm" style={{ color: "#8fa4c4" }}>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-white font-medium">
            About Us
          </span>
        </nav>
      </div>
    </header>
  );
}
