export default function LifeAtPIHero() {
  return (
    <section className="relative py-24 overflow-hidden min-h-[50vh] flex items-center bg-hero-gradient">
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-35 pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #1e6fd9 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-bold leading-[1.1] text-white mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
          >
            Life at{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Paramount Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-[#b5c8e2]">
            More than just a workplace — it's a community of innovators,
            thinkers, and problem-solvers shaping the future of AI together.
          </p>
        </div>
      </div>
    </section>
  );
}
