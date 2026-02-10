export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "87%",
      title: " AI Projects Fail to Scale",
      description:
        "Most initiatives stall at the pilot stage, exposing the gap between experimentation and enterprise-grade execution.",
    },
    {
      percentage: "3x",
      title: "Better ROI Alignment",
      description:
        "Organizations with a formal AI strategy realize materially higher returns by focusing investment on the highest-value use cases.",
    },
    // {
    //   percentage: "70%",
    //   title: "Higher Success with Structured Strategy",
    //   description:
    //     "Companies that begin with a documented AI roadmap are significantly more likely to achieve their intended outcomes.",
    // },
    {
      percentage: "$3.7M",
      title: "Average Value per Strategic AI Use Case",
      description:
        "Well-prioritized and properly implemented AI initiatives consistently deliver substantial business impact.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why is a robust AI strategy the critical first step for business
          transformation?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          AI potential alone does not create impact. While most enterprises
          experiment with AI, many fail to scale beyond pilots due to unclear
          objectives, fragmented ownership, and weak ROI alignment. A robust AI
          strategy provides the operating blueprint prioritizing the right use
          cases, defining governance and architecture, and aligning talent and
          data so AI moves from isolated experiments into a repeatable driver of
          efficiency, innovation, and competitive advantage.
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
