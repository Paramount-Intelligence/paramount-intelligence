export default function TeamLife() {
  const activities = [
    {
      title: "Flexible Work Environment",
      description:
        "Choose where and when you work best. Remote-first with optional co-working spaces.",
      emoji: "🏠",
    },
    {
      title: "Learning Fridays",
      description:
        "Dedicate time every week to learn new technologies, attend workshops, or work on passion projects.",
      emoji: "📚",
    },
    {
      title: "Team Offsites",
      description:
        "Quarterly team gatherings to connect, collaborate, and celebrate our achievements together.",
      emoji: "✈️",
    },
    {
      title: "Wellness Programs",
      description:
        "Mental health support, fitness reimbursements, and wellness activities to keep you at your best.",
      emoji: "🧘",
    },
    {
      title: "Innovation Hours",
      description:
        "Dedicated time to experiment with new ideas, technologies, and contribute to open-source projects.",
      emoji: "💡",
    },
    {
      title: "Social Events",
      description:
        "Virtual game nights, coffee chats, and celebrations to build connections beyond work.",
      emoji: "🎉",
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
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              Everyday Life
            </span>
            <div className="accent-line" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A Day in the Life
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: "#b5c8e2" }}>
            What it's really like to work at Paramount Intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="glass-dark rounded-2xl p-8 border border-[rgba(30,111,217,0.18)] hover-glow-blue flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-5">{activity.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-3">
                {activity.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
