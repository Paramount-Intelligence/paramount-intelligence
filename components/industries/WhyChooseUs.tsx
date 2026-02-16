import { Handshake, Lightbulb, Settings } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Handshake,
      title: "Proven AI Experience",
      description:
        "Since 2024, we've successfully completed over 50 projects, delivering tangible results for Fortune 1000 and fast-growing companies. Our team of former enterprise leaders and specialized engineers architect, build, and operationalize integrated solutions across AI, data, cloud, and automation, turning strategic ambition into technical reality.",
    },
    {
      icon: Lightbulb,
      title: "Specialized Tech Stack",
      description:
        "We bridge the gap between strategy and reliable implementation by moving initiatives from pilot to production. Our expertise ensures systems are engineered for real-world security, scalability, and integration, overcoming the technical challenges that often stall AI projects and prevent ROI.",
    },
    {
      icon: Settings,
      title: "Full-Cycle Partnership",
      description:
        "We act as an extension of your team, providing continuity from strategy through optimization. This ensures that solutions remain technically sound and continuously aligned with your evolving business goals, maximizing long-term impact and success.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
            Why choose us?
          </h2>
          <p className="max-w-4xl text-center text-gray-700 mb-12">
            In a landscape crowded with advisors who don't build and builders
            who don't strategize, we offer a fundamentally different
            partnership.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300 border border-gray-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#17599d]" strokeWidth={2} />
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