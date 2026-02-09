export default function WhyGenerativeAI() {
  const stats = [
    {
      percentage: "82%",
      title: "Sales Teams Freed for Strategic Work",
      description:
        "Cloud-based automation eliminates manual effort, allowing teams to focus on higher-value customer engagement and revenue generation.",
    },
    {
      percentage: "84%",
      title: "Faster Financial Decision-Making",
      description:
        "Finance organizations leveraging cloud automation make critical decisions significantly faster, improving business agility.",
    },
    {
      percentage: "$20B+",
      title: "Rapidly Expanding Automation Market",
      description:
        "The accelerating growth of cloud-driven automation reflects a structural shift toward intelligent, scalable operations.",
    },
    {
      percentage: "30%",
      title: "Enterprises Automating Core Networks",
      description:
        "A growing share of enterprises are automating the majority of network operations, signaling cloud as a strategic imperative rather than an IT upgrade.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Why is a strategic cloud foundation critical for business
          transformation?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-5xl">
          Cloud is no longer an infrastructure decision; it is the operating
          backbone of modern business. While many organizations have migrated
          workloads to the cloud, far fewer realize its full value due to
          fragmented architectures, security gaps, and unmanaged complexity. A
          strategic cloud foundation designed for automation, security, and
          integration enables organizations to reduce technical debt, accelerate
          innovation, and operate with the speed and resilience required to
          compete.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-5xl font-bold text-[#17599d]">
                {stat.percentage}
              </h3>
              <h4 className="text-xl font-bold text-gray-900">{stat.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
