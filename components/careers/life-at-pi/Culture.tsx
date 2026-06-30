export default function Culture() {
  const values = [
    {
      icon: "🎯",
      title: "Mission-Driven",
      description:
        "We're passionate about using AI to solve real-world problems and create meaningful impact for our clients.",
    },
    {
      icon: "🤝",
      title: "Collaborative Spirit",
      description:
        "We believe the best solutions come from diverse perspectives working together in an open, inclusive environment.",
    },
    {
      icon: "🚀",
      title: "Innovation First",
      description:
        "We encourage experimentation, embrace failure as learning, and constantly push the boundaries of what's possible.",
    },
    {
      icon: "🌱",
      title: "Continuous Growth",
      description:
        "We invest in our people's development through mentorship, training, and opportunities to learn from industry experts.",
    },
    {
      icon: "⚖️",
      title: "Work-Life Harmony",
      description:
        "We respect your time and believe sustainable excellence comes from balanced, fulfilled team members.",
    },
    {
      icon: "🌍",
      title: "Global Mindset",
      description:
        "We're a distributed team working across time zones, celebrating diverse backgrounds and perspectives.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Our Core
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0d1f3c" }}>
            Our Culture &amp; Values
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            The principles that guide how we work, collaborate, and grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0d1f3c" }}>
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
