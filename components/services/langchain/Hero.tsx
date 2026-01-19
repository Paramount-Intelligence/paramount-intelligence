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
              LangChain Development Experts
            </h1>
            <p className="text-sm text-white font-semibold leading-relaxed max-w-lg">
              Let's make LLMs simple! Get better integration, performance and
              scalability with the help of a LangChain Development Consultant.
            </p>
            <Link
              href="/contact"
              className="inline-block text-xs bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Estimate your project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
