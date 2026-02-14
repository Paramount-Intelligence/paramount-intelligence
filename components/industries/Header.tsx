"use client";
import Link from "next/link";

export default function IndustriesHeader() {
  return (
    <header className="w-full bg-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/industries" className="hover:text-gray-900 transition-colors">
            Industries
          </Link>
        </nav>
      </div>
    </header>
  );
}
