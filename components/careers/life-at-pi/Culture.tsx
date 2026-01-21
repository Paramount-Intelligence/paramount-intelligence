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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Culture & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide how we work, collaborate, and grow
            together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-purple-300"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
