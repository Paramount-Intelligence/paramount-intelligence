"use client";
import Link from "next/link";

export default function AboutHeader() {
  return (
    <header className="w-full bg-white py-4 sm:py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <nav className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/about-us"
            className="hover:text-gray-900 transition-colors"
          >
            About us
          </Link>
        </nav>
      </div>
    </header>
  );
}
