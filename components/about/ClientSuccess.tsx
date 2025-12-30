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
              We've helped our clients develop custom AI and LLMs applications
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Thanks to our hands-on experience, we’ve helped them deploy AI
              agents, LLM and RAG systems, and automation that drive measurable
              ROI through improved efficiency, reduced operational friction, and
              stronger decision-making across core workflows.
            </p>
            <Link
              href="/case-studies"
              className="inline-block bg-[#17599d] text-white px-8 py-3 font-semibold hover:bg-[#144a75] transition-colors"
            >
              See more case studies
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
