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
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              Archive
            </span>
            <div className="accent-line" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent Issues
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: "#b5c8e2" }}>
            Browse our archive of recent newsletters to get a taste of what you'll receive.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="glass-dark rounded-2xl p-6 md:p-8 border border-[rgba(30,111,217,0.18)] hover-glow-blue transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-[#1e6fd9]/10 text-[#6ba8ff] text-xs font-bold tracking-wider uppercase rounded-md border border-[rgba(30,111,217,0.25)]">
                    Issue {issue.issue}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#b5c8e2" }}>{issue.date}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{issue.readTime}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {issue.title}
              </h3>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "#b5c8e2" }}>
                {issue.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {issue.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(30,111,217,0.15)",
                      color: "#6ba8ff",
                      border: "1px solid rgba(30,111,217,0.25)",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#subscribe"
            className="btn-primary text-sm inline-flex"
          >
            Subscribe to Get Future Issues
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
