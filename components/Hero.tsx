"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-hero-gradient">
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div
        className="animate-float absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #1e6fd9 0%, transparent 70%)" }}
      />
      <div
        className="animate-float-reverse absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #6ba8ff 0%, transparent 70%)" }}
      />

      {/* Video background */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] scale-x-[-1] pointer-events-none"
      >
        <source src="/videos/background-video.webm" type="video/webm" />
      </video>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-24 pb-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="min-w-0">
              {/* Badge */}
              <div className="animate-fade-in mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(30,111,217,0.3)] bg-[rgba(30,111,217,0.1)] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#3b88f5] animate-pulse" />
                <span className="text-[#6ba8ff] text-xs font-semibold tracking-wider uppercase">
                  Technology Consulting &amp; Engineering
                </span>
              </div>

              {/* Headline */}
              <h1
                className="animate-fade-in-up delay-100 font-bold leading-[1.05] mb-6 text-white"
                style={{ fontSize: "clamp(38px, 5vw, 72px)" }}
              >
                AI Strategy,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6ba8ff 0%, #3b88f5 50%, #1e6fd9 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Advisory
                </span>
                {" "}&amp; Engineering
              </h1>

              {/* Description */}
              <p className="animate-fade-in-up delay-200 text-[#b5c8e2] text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Paramount Intelligence designs, builds, and operationalizes intelligent systems for
                organizations. We apply AI, Data &amp; Analytics, Cloud, and Automation to solve
                core business challenges — delivering production-ready solutions that improve
                efficiency, strengthen decision-making, and scale with growth.
              </p>

              {/* CTA buttons */}
              <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4 mb-14">
                <a
                  href="https://calendly.com/syedaliazzam/advisory?back=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Book a free consultation
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-all duration-200 hover:bg-[rgba(30,111,217,0.12)] hover:border-[rgba(30,111,217,0.5)]"
                  style={{ color: "#b5c8e2", borderColor: "rgba(143,164,196,0.3)" }}
                >
                  View Case Studies
                </a>
              </div>

              {/* Stats row */}
              <div
                className="animate-fade-in-up delay-400 grid grid-cols-3 gap-4 pt-8 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {[
                  { value: 50, suffix: "+", label: "Projects Delivered" },
                  { value: 8, suffix: "+", label: "Industries Served" },
                  { value: 100, suffix: "%", label: "Production-Ready" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-3xl font-black mb-1"
                      style={{
                        background: "linear-gradient(135deg, #ffffff 0%, #6ba8ff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[#8fa4c4] text-xs font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Feature card panel ── */}
            <div className="hidden lg:block">
              {/* Container that clips overflowing badges */}
              <div className="relative w-full" style={{ height: "420px" }}>

                {/* Glow ring behind card */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(30,111,217,0.18) 0%, transparent 70%)",
                    animation: "pulseGlow 4s ease-in-out infinite",
                  }}
                />

                {/* Main feature card — centered */}
                <div
                  className="glass-dark rounded-2xl p-6 absolute animate-scale-in delay-300"
                  style={{ top: "18%", left: "18%", transform: "translate(-50%, -50%)", width: "300px" }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(30,111,217,0.3)] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6ba8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">AI Engineering</div>
                      <div className="text-[#8fa4c4] text-xs">Production-grade systems</div>
                    </div>
                  </div>

                  {/* Capability list */}
                  <div className="space-y-2.5">
                    {["LLM Applications", "Agentic Systems", "RAG Architectures", "MLOps Platforms"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg"
                        style={{ background: "rgba(30,111,217,0.1)", border: "1px solid rgba(30,111,217,0.18)" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3b88f5] flex-shrink-0" />
                        <span className="text-[#b5c8e2] text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badge — top right, inset from edge */}
                <div
                  className="glass-dark rounded-xl px-3 py-2.5 absolute animate-float delay-200 text-center"
                  style={{ top: "16px", right: "16px" }}
                >
                  <div className="text-[#6ba8ff] font-black text-lg leading-none">50+</div>
                  <div className="text-[#8fa4c4] text-xs mt-0.5">Projects</div>
                </div>

                {/* Badge — bottom left, inset from edge */}
                <div
                  className="glass-dark rounded-xl px-3 py-2.5 absolute animate-float-reverse delay-400"
                  style={{ bottom: "16px", left: "16px" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-[#b5c8e2] text-xs font-medium whitespace-nowrap">Global Delivery</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(240,246,255,0.04))" }}
      />
    </div>
  );
}
