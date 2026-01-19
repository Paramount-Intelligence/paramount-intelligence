export default function NewsletterBenefits() {
  const benefits = [
    {
      icon: "🧠",
      title: "AI Strategy Insights",
      description:
        "Learn how leading companies are implementing AI to transform their business operations and drive growth.",
    },
    {
      icon: "📊",
      title: "Case Studies & Results",
      description:
        "Real-world examples of AI implementations with measurable ROI and practical takeaways you can apply.",
    },
    {
      icon: "🚀",
      title: "Latest AI Trends",
      description:
        "Stay updated on emerging AI technologies, tools, and methodologies shaping the future of business.",
    },
    {
      icon: "💡",
      title: "Expert Commentary",
      description:
        "Deep-dive analyses from our AI experts on industry developments, challenges, and opportunities.",
    },
    {
      icon: "🎯",
      title: "Actionable Frameworks",
      description:
        "Step-by-step guides and frameworks to help you evaluate and implement AI solutions in your organization.",
    },
    {
      icon: "🔗",
      title: "Curated Resources",
      description:
        "Hand-picked articles, tools, and research papers to deepen your AI knowledge and capabilities.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What You'll Get
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every week, we deliver valuable AI insights directly to your inbox
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

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            Join CTOs, Product Managers, and Business Leaders from Fortune 500
            companies who rely on our insights to make informed AI decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-blue-200 mt-2">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-blue-200 mt-2">Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">4.9/5</div>
              <div className="text-blue-200 mt-2">Reader Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
