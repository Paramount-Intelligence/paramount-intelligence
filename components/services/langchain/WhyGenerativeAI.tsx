export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "70%",
      title: "CEOs expect business transformation",
      description:
        "Seven of ten CEOs say that AI will significantly change the way their company creates, delivers, and captures value over the next three years (PwC's 28th CEO Survey)",
    },
    {
      percentage: "3-5x",
      title: "Delivering ROI on automation",
      description:
        "On average, Agentic Process Automation delivers a 3- to 6-fold return on investment within months",
    },
    {
      percentage: "80%+",
      title: "Projects fail without proper expertise",
      description:
        "Most AI initiatives fail due to implementation challenges, underscoring the critical need for experienced transformation partners (by RAND)",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why leading companies automate processes with Generative AI?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Generative AI is a category of artificial intelligence that creates
          new, original content by learning patterns from vast datasets and
          generating human-like text, images, code, audio, and other media
          formats. Rather than simply analyzing or categorizing existing
          information, Generative AI produces novel outputs that didn't
          previously exist, enabling organizations to automate creative
          processes, accelerate content production, and unlock new forms of
          value creation across business functions
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-2 border-red-500 rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-5xl font-bold text-red-500">
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
