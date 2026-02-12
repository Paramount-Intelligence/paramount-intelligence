import Link from "next/link";
import Image from "next/image";

export default function TelecomHero() {
  return (
    <section className="relative py-16 overflow-hidden min-h-[65vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/hero.png"
          alt="Background"
          fill
          className="object-cover scale-x-[-1]"
          priority
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Engineering Software-Driven, Real-Time Networks
            </h1>
            <p className="text-sm text-black font-semibold leading-relaxed max-w-lg">
              Telecommunication networks are becoming software-defined and
              data-driven. We help operators engineer them to perform in real
              time at scale.
            </p>
            <Link
              href="/contact"
              className="inline-block text-xs bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
