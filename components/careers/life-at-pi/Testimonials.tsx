export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Joining PI was the best career decision I've made. The team is brilliant, the problems are challenging, and the culture is genuinely supportive. I've grown more in one year here than in three years at my previous company.",
      author: "Muhammad Ammar",
      role: "AI Automation Expert",
      avatar: "MA",
    },
    {
      quote:
        "What I love most is the autonomy and trust. We're given complex problems to solve and the freedom to explore innovative solutions. The learning opportunities are endless.",
      author: "Zia u din",
      role: "Machine Learning Engineer",
      avatar: "ZD",
    },
    {
      quote:
        "The work-life balance here is real, not just a buzzword. I can pick my kids up from school and still deliver excellent work. The team respects boundaries and focuses on output, not hours.",
      author: "Mohsin Behzad",
      role: "AI Automation Intern",
      avatar: "MB",
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
              Testimonials
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0d1f3c" }}>
            Hear From Our Team
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Real stories from the people who make PI special.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
            >
              <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base bg-gradient-to-br from-[#1e6fd9] to-[#1559b4] shadow-md shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: "#0d1f3c" }}>
                    {testimonial.author}
                  </h4>
                  <p className="text-xs font-semibold" style={{ color: "#1e6fd9" }}>
                    {testimonial.role}
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
