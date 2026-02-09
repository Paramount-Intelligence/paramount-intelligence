export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "75%",
      title: "Executives Cite Automation as a Competitive Advantage",
      description:
        "Automation is no longer operational hygiene; it is a defining factor in competitive performance.",
    },
    {
      percentage: "200–300%",
      title: "Average ROI in the First Year",
      description:
        "Organizations implementing intelligent document and workflow automation consistently achieve outsized early returns.",
    },
    {
      percentage: "60–70%",
      title: "Reduction in Processing Time",
      description:
        "AI-driven document and workflow automation significantly shortens cycle times across core operations.",
    },
    {
      percentage: "35% / 45%",
      title: "Operational Gains from Workflow Intelligence",
      description:
        "Enterprises integrating AI into workflows report faster decision-making and materially reduced redundancy.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why is AI-powered workflow automation becoming a core capability for
          modern enterprises?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Automation has moved beyond task execution. While traditional
          automation reduces manual effort, AI-powered workflows introduce
          decision-making, learning, and continuous improvement into business
          processes. Organizations that adopt intelligent, end-to-end automation
          gain speed, consistency, and resilience while those that rely on
          fragmented tools struggle with complexity, rework, and stalled ROI.
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
