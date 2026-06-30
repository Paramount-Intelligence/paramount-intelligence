export default function Values() {
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
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        
        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission */}
          <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.25)] flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#6ba8ff" }}>
              Our Purpose
            </span>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Mission
            </h3>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#b5c8e2" }}>
              To translate strategic business ambition into scalable technical reality.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.25)] flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#6ba8ff" }}>
              Our Goal
            </span>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Vision
            </h3>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#b5c8e2" }}>
              To be the most trusted partner for organizations building intelligent, future-ready operations.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="accent-line" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#6ba8ff" }}
              >
                Principles
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Own the Outcome */}
            <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.18)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(30,111,217,0.2)] flex items-center justify-center mb-5">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Own the Outcome
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                We partner end-to-end, taking shared accountability for moving
                initiatives from strategy to production-scale impact.
              </p>
            </div>

            {/* Engineer for Reality */}
            <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.18)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(30,111,217,0.2)] flex items-center justify-center mb-5">
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Engineer for Reality
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                We design for security, integration, and scalability from day
                one—solving the practical constraints that cause projects to
                fail.
              </p>
            </div>

            {/* Lead with Expertise */}
            <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.18)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(30,111,217,0.2)] flex items-center justify-center mb-5">
                <span className="text-lg">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Lead with Expertise
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                We engage as senior practitioners, combining enterprise
                leadership perspective with deep engineering capability.
              </p>
            </div>

            {/* Partner with Transparency */}
            <div className="glass-dark rounded-2xl p-8 hover-glow-blue border border-[rgba(30,111,217,0.18)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(30,111,217,0.2)] flex items-center justify-center mb-5">
                <span className="text-lg">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Partner with Transparency
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                We believe clarity and direct communication are essential for
                trust in complex, high-stakes transformations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
