export default function HiringProcess() {
  const steps = [
    {
      number: "1",
      title: "Application Review",
      description:
        "Our team reviews your application and resume within 3-5 business days.",
      time: "3-5 days",
    },
    {
      number: "2",
      title: "Initial Screening",
      description:
        "A brief conversation with our HR team to discuss your background and interests.",
      time: "30 minutes",
    },
    {
      number: "3",
      title: "Technical Interview",
      description:
        "Deep dive into your technical skills and problem-solving approach with our engineers.",
      time: "1-2 hours",
    },
    {
      number: "4",
      title: "Team Meet",
      description:
        "Meet potential team members and learn more about our culture and projects.",
      time: "1 hour",
    },
    {
      number: "5",
      title: "Final Decision",
      description:
        "We'll make our decision and extend an offer if you're the right fit!",
      time: "2-3 days",
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
            A transparent, efficient process designed to find the perfect match
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
            💡 <strong>Pro Tip:</strong> The entire process typically takes 2-3
            weeks from application to offer
          </p>
        </div>
      </div>
    </section>
  );
}
