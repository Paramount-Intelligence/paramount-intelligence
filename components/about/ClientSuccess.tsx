import Image from "next/image";
import Link from "next/link";

export default function ClientSuccess() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-4xl text-black font-bold leading-tight">
              Proven, Production-Grade Impact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We help organizations turn strategic goals into scalable,
              intelligent systems. Our partnerships deliver measurable ROI
              through automated efficiency, data-driven insight, secure cloud
              foundations, and production-ready AI accelerating growth and
              strengthening decision-making across the business.
            </p>
            <Link
              href="/case-studies"
              className="inline-block bg-[#17599d] text-white px-8 py-3 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Explore our case studies
            </Link>
          </div>

          {/* Right Image - Dashboard Graphics */}
          <div className="relative h-100 lg:h-125">
            <Image
              src="/images/about/case.png"
              alt="Custom AI and LLMs applications dashboard"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
