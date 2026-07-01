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
    <section className="py-24 relative overflow-hidden" style={{ background: "#f1f3f6" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Benefits
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0d1f3c" }}>
            What You'll Get
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Every week, we deliver valuable AI insights directly to your inbox.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0d1f3c" }}>
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-navy rounded-2xl p-10 md:p-12 text-center text-white border border-[rgba(30,111,217,0.25)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-base mb-8 max-w-2xl mx-auto text-[#b5c8e2]">
            Join CTOs, Product Managers, and Business Leaders from Fortune 500
            companies who rely on our insights to make informed AI decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-xs font-semibold tracking-wider uppercase mt-2 text-[#6ba8ff]">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-xs font-semibold tracking-wider uppercase mt-2 text-[#6ba8ff]">Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-xs font-semibold tracking-wider uppercase mt-2 text-[#6ba8ff]">Reader Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
