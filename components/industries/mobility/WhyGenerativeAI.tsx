export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "95%",
      title: "Enterprise AI Deployments Fail",
      description:
        "Most enterprise AI initiatives collapse before reaching scale, commonly due to engineering complexity and weak operational foundations.",
    },
    {
      percentage: "70%+",
      title: "Reduction in Integration Complexity",
      description:
        "Specialized engineering significantly simplifies integration with legacy systems, data platforms, and enterprise workflows.",
    },
    {
      percentage: "3–5x",
      title: "Higher ROI on AI Investments",
      description:
        "Organizations that successfully operationalize AI achieve materially stronger returns by avoiding common scaling and deployment pitfalls.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why do successful AI initiatives require specialized engineering
          partners?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Moving from strategy to measurable ROI requires more than
          experimentation. While most large enterprises have adopted AI in some
          form, many struggle to scale pilots into production systems due to
          engineering complexity. Specialized partners bridge this gap by
          designing, integrating, and operationalizing AI systems, turning
          prototypes into reliable enterprise assets that deliver efficiency,
          innovation, and competitive advantage with built-in governance and
          security.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-5xl font-bold text-[#17599d]">
                {stat.percentage}
              </h3>
              <h4 className="text-xl font-bold text-gray-900">{stat.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
