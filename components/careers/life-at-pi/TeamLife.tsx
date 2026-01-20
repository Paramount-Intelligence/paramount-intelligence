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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            A Day in the Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What it's really like to work at Paramount Intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-indigo-300"
            >
              <div className="text-6xl mb-4 text-center">{activity.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {activity.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
