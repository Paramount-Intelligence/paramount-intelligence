export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "65%",
      title: "Organizations Regularly Use Generative AI",
      description:
        "Adoption has more than doubled year-over-year, reflecting rapid mainstream integration across industries.",
    },
    {
      percentage: "2.6x",
      title: "Higher Likelihood of Revenue Growth",
      description:
        "Organizations successfully scaling AI platforms significantly outperform peers financially.",
    },
    {
      percentage: "70%",
      title: "Digital Transformations Fall Short",
      description:
        "Execution complexity and fragmented systems remain the primary causes, reinforcing the need for structured platform engineering.",
    },
    // {
    //   percentage: "35% / 45%",
    //   title: "Operational Gains from Workflow Intelligence",
    //   description:
    //     "Enterprises integrating AI into workflows report faster decision-making and materially reduced redundancy.",
    // },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why are AI studio and platform engineering becoming critical
          differentiators for modern organizations?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Generative AI adoption is accelerating rapidly, yet most organizations
          lack the structured platforms required to move from experimentation to
          scalable production. While advanced models for video, image, voice,
          and agentic AI are widely available, integrating them into governed,
          secure, and cost-controlled environments remains complex. AI studio
          platforms address this challenge by combining multimodal APIs,
          structured workflows, Oracle Cloud Infrastructure, AI databases, and
          automation systems into cohesive production environments that support
          scale, reliability, and long-term operational control.
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
