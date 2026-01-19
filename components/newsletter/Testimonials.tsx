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
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Readers Say
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join thousands of satisfied subscribers who rely on our insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-blue-200">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-300">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              <p className="text-gray-200 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
