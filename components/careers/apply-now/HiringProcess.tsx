export default function HiringProcess() {
  const steps = [
    {
      number: "1",
      title: "Application Review",
      description:
        "We review your background, experience, and problem-solving exposure to understand how your skills align with our consulting and engineering work.",
      time: "3–5 Business Days",
    },
    {
      number: "2",
      title: " Initial Conversation",
      description:
        "A focused discussion to understand your experience, career goals, and expectations, and to provide clarity on our work, standards, and environment.",
      time: "15–30 Minutes",
    },
    {
      number: "3",
      title: "Practical or Technical Assessment",
      description:
        "Depending on the role, you will complete a structured assessment reflecting real-world scenarios across AI, data, cloud, automation, or platform engineering.",
      time: "1-2 hours",
    },
    {
      number: "4",
      title: "Technical or Strategy Interview",
      description:
        "A deep discussion with senior engineers or consultants to evaluate structured thinking, technical depth, and problem-solving approach.",
      time: "30–60 Minutes",
    },
    {
      number: "4",
      title: "Team Interaction",
      description:
        "Meet potential team members and discuss how you collaborate, communicate, and operate within high-impact project environments.",
      time: "45–60 Minutes",
    },
    {
      number: "5",
      title: "Final Decision",
      description:
        "We provide clear feedback and extend an offer if there is strong mutual alignment.",
      time: "2–3 Business Days",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Hiring Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured, transparent process designed to assess capability,
            alignment, and long-term potential.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-teal-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            💡 <strong>Note:</strong> The full process typically spans 2–3
            weeks from application to final decision.
          </p>
        </div>
      </div>
    </section>
  );
}
