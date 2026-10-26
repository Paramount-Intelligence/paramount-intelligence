"use client";
import Link from "next/link";

export default function FintechHeader() {
  return (
    <header className="relative w-full py-6 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-bold text-sm text-gray-900">
          <Link href="/" className="pi-tap hover:text-[#17599d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/industries"
            className="pi-tap hover:text-[#17599d] transition-colors"
          >
            Industries
          </Link>
          <span>/</span>
          <Link
            href="/industries/fintech-and-digital-payments"
            className="pi-tap hover:text-[#17599d] transition-colors"
          >
            Fintech & Digital Payments
          </Link>
        </nav>
      </div>
    </header>
  );
}
