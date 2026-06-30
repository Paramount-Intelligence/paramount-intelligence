import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function MissionStatement() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Geo grid overlay */}
      <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,111,217,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(27,58,107,0.28) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side — Founder Image */}
          <div className="reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/aliazzam-s.png"
                alt="Paramount Intelligence Founders"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Blue gradient overlay at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(6,13,26,0.6) 0%, transparent 50%)",
                }}
              />

              {/* CEO Badge */}
              <div
                className="glass-light absolute bottom-4 right-4 px-4 py-3 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/syedaliazzam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Ali Azzam</p>
                    <p className="text-xs text-gray-600">
                      CEO &amp; Founding Partner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side — Quote & Mission */}
          <div className="space-y-8 reveal-right">
            {/* Accent */}
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#6ba8ff" }}
              >
                Our Mission
              </span>
            </div>

            {/* Quote */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold italic leading-tight"
                style={{ color: "#ffffff" }}
              >
                <span
                  className="text-5xl font-serif leading-none align-top"
                  style={{ color: "#3b88f5" }}
                >
                  "
                </span>
                True transformation happens when technology stops being a
                project and starts being the{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  engine
                </span>{" "}
                of your business.
                <span
                  className="text-5xl font-serif leading-none"
                  style={{ color: "#3b88f5" }}
                >
                  "
                </span>
              </h2>
            </div>

            {/* Mission Description */}
            <div
              className="border-l-4 pl-6 py-1"
              style={{ borderColor: "#1e6fd9" }}
            >
              <p
                className="leading-relaxed text-base"
                style={{ color: "#b5c8e2" }}
              >
                In today's environment, competitive advantage is built on
                technology, but the path from strategy to secure, scalable
                execution is rarely straightforward. That is why we are
                laser-focused on one thing: helping organizations translate
                strategic ambition into technical reality. We partner with you
                to architect and operationalize the full technology stack,
                integrating AI strategy, data and analytics, cloud
                infrastructure directly into mission-critical processes to
                deliver measurable outcomes and lasting operational impact.
              </p>
            </div>

            {/* CTA */}
            <a href="/about-us" className="btn-primary inline-flex text-sm">
              Learn About Us
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
