export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "$12.9M",
      title: "Annual Cost of Poor Data Quality",
      description:
        "Organizations lose millions each year through inefficiencies, rework, and missed opportunities driven by unreliable data.",
    },
    {
      percentage: "10x",
      title: "Faster Insight Generation",
      description:
        "Well-architected data platforms reduce the time from raw data to actionable insight from months to days.",
    },
    {
      percentage: "63%",
      title: "Productivity Gain from Data-Driven Decisions",
      description:
        "Teams that prioritize data-backed decisions over intuition consistently outperform in operational efficiency.",
    },
    {
      percentage: "80%",
      title: "Operational Efficiency with Business Intelligence ",
      description:
        "Embedded analytics and BI transform reporting into real-time, decision-oriented execution.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why is a robust data and analytics foundation the critical
          differentiator for modern businesses?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Data is abundant but often unreliable. While most enterprises collect
          vast amounts of data, many fail to convert it into consistent insight
          due to fragmented architectures, weak governance, and poor data
          quality. A robust data and analytics foundation grounded in
          engineering, governance, and analytics separates organizations that
          merely store data from those that use it to optimize operations,
          anticipate change, and unlock new sources of value.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
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
