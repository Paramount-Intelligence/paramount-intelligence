export default function NewsletterHero() {
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
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#6ba8ff] bg-[#1e6fd9]/10 border border-[#1e6fd9]/25 backdrop-blur-sm">
              📧 Weekly AI Insights
            </span>
          </div>

          <h1
            className="font-bold leading-[1.1] text-white"
            style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
          >
            The AI Intelligence{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Newsletter
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-[#b5c8e2]">
            Get the latest AI trends, case studies, and actionable insights
            delivered to your inbox every week. Join thousands of business
            leaders staying ahead of the AI revolution.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-semibold uppercase tracking-wider text-white">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Weekly Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-[#6ba8ff]">✓</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
