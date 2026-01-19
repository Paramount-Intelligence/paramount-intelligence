import Link from "next/link";

export default function PastIssues() {
  const issues = [
    {
      issue: "#47",
      date: "January 10, 2026",
      title: "The Rise of Multimodal AI: What It Means for Enterprise",
      description:
        "Exploring how companies are leveraging vision-language models to create more intelligent applications and workflows.",
      topics: ["Multimodal AI", "Enterprise Strategy", "Case Study"],
      readTime: "8 min read",
    },
    {
      issue: "#46",
      date: "January 3, 2026",
      title: "AI ROI in 2025: Real Numbers from Real Companies",
      description:
        "A comprehensive analysis of AI implementation outcomes, featuring data from 50+ enterprise deployments.",
      topics: ["ROI Analysis", "Implementation", "Data"],
      readTime: "12 min read",
    },
    {
      issue: "#45",
      date: "December 27, 2025",
      title: "Building RAG Systems That Actually Work",
      description:
        "Practical insights on creating Retrieval-Augmented Generation systems that deliver accurate, reliable results.",
      topics: ["RAG", "LLMs", "Best Practices"],
      readTime: "10 min read",
    },
    {
      issue: "#44",
      date: "December 20, 2025",
      title: "Fine-Tuning vs. Prompt Engineering: When to Use Each",
      description:
        "A decision framework for choosing the right approach to customize LLMs for your specific use case.",
      topics: ["LLM Customization", "Framework", "Strategy"],
      readTime: "7 min read",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recent Issues
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our archive of recent newsletters to get a taste of what
            you'll receive
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    {issue.issue}
                  </span>
                  <span className="text-gray-600 text-sm">{issue.date}</span>
                </div>
                <span className="text-gray-500 text-sm">{issue.readTime}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {issue.title}
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                {issue.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {issue.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#subscribe"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Subscribe to Get Future Issues
          </Link>
        </div>
      </div>
    </section>
  );
}
