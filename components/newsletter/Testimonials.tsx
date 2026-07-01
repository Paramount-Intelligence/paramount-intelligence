export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The AI Intelligence Newsletter has become my go-to source for understanding how to actually implement AI in enterprise settings. The case studies are particularly valuable.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechCorp",
      avatar: "SC",
    },
    {
      quote:
        "Finally, an AI newsletter that cuts through the hype and delivers actionable insights. It's helped our team make smarter decisions about our AI strategy.",
      author: "Michael Rodriguez",
      role: "Chief Technology Officer",
      company: "Innovation Labs",
      avatar: "MR",
    },
    {
      quote:
        "I forward this newsletter to my entire leadership team every week. It's that good. The balance of strategic thinking and practical implementation is perfect.",
      author: "Jennifer Walsh",
      role: "Product Director",
      company: "Global Solutions Inc.",
      avatar: "JW",
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
              Feedback
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0d1f3c" }}>
            What Readers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Join thousands of satisfied subscribers who rely on our insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base bg-gradient-to-br from-[#1e6fd9] to-[#1559b4] shadow-md shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: "#0d1f3c" }}>
                    {testimonial.author}
                  </h4>
                  <p className="text-xs font-semibold" style={{ color: "#1e6fd9" }}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
