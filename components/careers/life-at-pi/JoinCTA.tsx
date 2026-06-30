import Link from "next/link";

export default function JoinCTA() {
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
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="glass-dark rounded-2xl p-10 md:p-16 text-center border border-[rgba(30,111,217,0.25)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#b5c8e2" }}>
            Explore our open positions and become part of a team that's shaping
            the future of AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers/open-positions"
              className="btn-primary text-sm inline-flex justify-center"
            >
              View Open Positions
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/careers/apply-now"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold border-2 border-white/20 hover:border-white text-white hover:bg-white/[0.04] transition-all"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
