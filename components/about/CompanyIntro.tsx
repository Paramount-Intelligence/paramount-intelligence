export default function CompanyIntro() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="accent-line" style={{ background: "#1e6fd9" }} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#1e6fd9" }}
          >
            Who We Are
          </span>
          <div className="accent-line" style={{ background: "#1e6fd9" }} />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8" style={{ color: "#0d1f3c" }}>
          From Strategy to Production-Ready Systems
        </h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-center leading-relaxed text-base sm:text-lg text-gray-700">
            We build production-grade intelligent systems designed to operate at
            the core of real businesses. Our work integrates AI, data and
            analytics, cloud, and automation directly into critical workflows
            enabling smarter decision-making, scalable execution, and sustained
            operational efficiency. From strategic advisory through hands-on
            engineering, we help organizations reduce friction, modernize legacy
            environments, and operationalize technology in ways that support
            long-term growth.
          </p>
        </div>
      </div>
    </section>
  );
}
