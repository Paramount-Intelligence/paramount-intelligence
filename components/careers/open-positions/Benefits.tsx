export default function Benefits() {
  const benefits = [
    {
      icon: "💰",
      title: "Competitive Compensation",
      description:
        "Industry-leading salaries with performance bonuses and equity options.",
    },
    {
      icon: "🤖",
      title: "Cutting-Edge AI Tools",
      description:
        "Access to the latest AI technologies, GPUs, and premium API credits for your projects.",
    },
    {
      icon: "🏠",
      title: "Remote-First Culture",
      description:
        "Work from anywhere with flexible hours and home office stipend.",
    },
    {
      icon: "📚",
      title: "Learning & Development",
      description:
        "Continuous learning budget, conference attendance, and skill development programs.",
    },
    {
      icon: "⏰",
      title: "Work-Life Balance",
      description:
        "Generous PTO policy, paid holidays, and family leave programs.",
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description:
        "Clear career progression paths with mentorship and leadership opportunities.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Join Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We invest in our people because we believe great work comes from
            great teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
