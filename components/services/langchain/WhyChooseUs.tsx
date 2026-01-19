import { Handshake, Lightbulb, Settings } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Handshake,
      title: "Experience in AI, LLMs, ML projects",
      description:
        "Over 90 projects have been completed since 2017, specializing in enterprise transformation with LLMs, AI, ML models. Our 25 AI specialists deliver custom, scalable solutions tailored to business needs.",
    },
    {
      icon: Lightbulb,
      title: "Specialized tech stack",
      description:
        "We leverage a range of specialized tools designed for AI, LLMs, ML, ensuring efficient, innovative, and tailored solutions for every project.",
    },
    {
      icon: Settings,
      title: "End-to-end support",
      description:
        "We provide full support from consultation and proof of concept to deployment and maintenance, ensuring scalable, secure, and future-ready solutions.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Why choose us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-500" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
