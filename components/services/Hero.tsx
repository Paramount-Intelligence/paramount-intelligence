import Link from "next/link";
import ServicesHeader from "@/components/services/Header";

export default function ServicesHero() {
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

      <div className="relative z-10 w-full">
        {/* Render ServicesHeader breadcrumbs internally at top of hero */}
        <div className="mb-10 -mt-8">
          <ServicesHeader />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h1
                className="font-bold leading-[1.1] text-white"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
              >
                Technology Consulting{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  &amp; Engineering
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "#b5c8e2" }}>
                At Paramount Intelligence, we bridge the gap between strategy and
                execution. Our tailored services in AI strategy, data analytics,
                cloud solutions, and automation help businesses build scalable,
                production-ready systems that drive operational efficiency,
                innovation, and measurable ROI.
              </p>
              <div className="pt-2">
                <Link
                  href="https://calendly.com/syedaliazzam/advisory?back=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm inline-flex"
                >
                  Book a free consultation
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
