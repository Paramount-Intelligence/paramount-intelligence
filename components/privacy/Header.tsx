"use client";
import Link from "next/link";

export default function PrivacyHeader() {
  return (
    <header className="relative w-full py-4 mt-20 z-10" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-medium" style={{ color: "#8fa4c4" }}>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-white">
            Privacy Policy
          </span>
        </nav>
      </div>
    </header>
  );
}
