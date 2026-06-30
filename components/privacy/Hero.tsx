import PrivacyHeader from "@/components/privacy/Header";

export default function PrivacyHero() {
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
          <PrivacyHeader />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
          <div className="max-w-4xl">
            <h1
              className="font-bold leading-[1.1] text-white mb-6"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
            >
              Privacy{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Policy
              </span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#b5c8e2] max-w-xl">
              At Paramount Intelligence, your privacy is important to us. This
              policy explains how we collect, use, and protect your personal data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
