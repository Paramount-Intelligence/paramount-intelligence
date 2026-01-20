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
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hear From Our Team
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Real stories from the people who make PI special
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-purple-200">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              <p className="text-gray-200 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
