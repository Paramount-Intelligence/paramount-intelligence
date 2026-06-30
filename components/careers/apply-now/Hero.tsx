export default function ApplyNowHero() {
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

      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-x-[-1]"
        >
          <source src="/videos/background-video.webm" type="video/webm" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1
            className="font-bold leading-[1.1] text-white mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
          >
            Apply{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Now
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-[#b5c8e2]">
            Take the next step toward building production-grade technology
            systems that power real businesses. Whether you are an experienced
            professional or an ambitious learner ready to grow, we value people
            who are committed to mastering their craft and contributing
            meaningfully to real-world impact.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-semibold uppercase tracking-wider text-white">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Quick Application</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Structured Review</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Join Our Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
