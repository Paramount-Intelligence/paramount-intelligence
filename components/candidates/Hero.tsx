import CandidatesHeader from "@/components/candidates/Header";

export default function CandidatesHero() {
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

      <div className="relative z-10 w-full animate-fade-in-up">
        {/* Breadcrumb banner */}
        <div className="mb-10 -mt-8">
          <CandidatesHeader />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
          <div className="max-w-4xl">
            <h1
              className="font-bold leading-[1.1] text-white mb-6"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
            >
              Join Paramount{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Intelligence
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white">
              Empower Your Career with Cutting-Edge Technology
            </p>
            
            <p className="text-base leading-relaxed text-[#b5c8e2]">
              At Paramount Intelligence, we are more than a company; we are a
              community of innovators and engineers committed to transforming
              businesses through intelligent technology. As a Technology
              Consulting and Engineering firm, we specialize in AI Strategy, Cloud
              Services, Data Analytics, AI Workflow Automation, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
