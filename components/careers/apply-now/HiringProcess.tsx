export default function HiringProcess() {
  const steps = [
    {
      number: "1",
      title: "Application Review",
      description:
        "We review your background, experience, and problem-solving exposure to understand how your skills align with our consulting and engineering work.",
      time: "3–5 Business Days",
    },
    {
      number: "2",
      title: "Initial Conversation",
      description:
        "A focused discussion to understand your experience, career goals, and expectations, and to provide clarity on our work, standards, and environment.",
      time: "15–30 Minutes",
    },
    {
      number: "3",
      title: "Practical or Technical Assessment",
      description:
        "Depending on the role, you will complete a structured assessment reflecting real-world scenarios across AI, data, cloud, automation, or platform engineering.",
      time: "1-2 hours",
    },
    {
      number: "4",
      title: "Technical or Strategy Interview",
      description:
        "A deep discussion with senior engineers or consultants to evaluate structured thinking, technical depth, and problem-solving approach.",
      time: "30–60 Minutes",
    },
    {
      number: "5",
      title: "Team Interaction",
      description:
        "Meet potential team members and discuss how you collaborate, communicate, and operate within high-impact project environments.",
      time: "45–60 Minutes",
    },
    {
      number: "6",
      title: "Final Decision",
      description:
        "We provide clear feedback and extend an offer if there is strong mutual alignment.",
      time: "2–3 Business Days",
    },
  ];

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
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              The Journey
            </span>
            <div className="accent-line" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Hiring Process
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: "#b5c8e2" }}>
            A structured, transparent process designed to assess capability,
            alignment, and long-term potential.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-dark rounded-2xl p-6 md:p-8 border border-[rgba(30,111,217,0.18)] hover-glow-blue transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md" style={{ background: "linear-gradient(135deg, #1e6fd9, #1559b4)" }}>
                  {step.number}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {step.title}
                    </h3>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold self-start sm:self-center"
                      style={{
                        background: "rgba(30,111,217,0.15)",
                        color: "#6ba8ff",
                        border: "1px solid rgba(30,111,217,0.25)",
                      }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-pulse">
          <p className="text-sm" style={{ color: "#b5c8e2" }}>
            💡 <strong>Note:</strong> The full process typically spans 2–3
            weeks from application to final decision.
          </p>
        </div>
      </div>
    </section>
  );
}
