import Image from "next/image";
import Link from "next/link";

export default function ClientSuccess() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #1e6fd9 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#6ba8ff" }}
              >
                Our Track Record
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Proven, Production-Grade Impact
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#b5c8e2" }}>
              We help organizations turn strategic goals into scalable,
              intelligent systems. Our partnerships deliver measurable ROI
              through automated efficiency, data-driven insight, secure cloud
              foundations, and production-ready AI accelerating growth and
              strengthening decision-making across the business.
            </p>
            <div className="pt-2">
              <Link
                href="/case-studies"
                className="btn-primary text-sm inline-flex"
              >
                Explore our case studies
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Image - Dashboard Graphics */}
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden group border border-[rgba(30,111,217,0.2)] shadow-2xl" style={{ background: "rgba(13,31,60,0.5)" }}>
            <Image
              src="/images/about/case.png"
              alt="Custom AI and LLMs applications dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(30,111,217,0.1) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}