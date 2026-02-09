import Link from "next/link";
import Image from "next/image";

export default function LLMHero() {
  return (
    <section className="relative py-16 overflow-hidden min-h-[65vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/rb_24303-e1734364372674.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Cloud Services
            </h1>
            <p className="text-sm text-white font-semibold leading-relaxed max-w-lg">
              We architect and operate secure, high-performance cloud platforms
              that power intelligent, scalable growth.
            </p>
            <Link
              href="/contact"
              className="inline-block text-xs bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
