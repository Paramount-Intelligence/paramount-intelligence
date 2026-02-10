export default function Values() {
  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Mission & Vision Section */}
        <div className="mb-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To translate strategic business ambition into scalable technical
                reality.
              </p>
            </div>

            {/* Vision */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the most trusted partner for organizations building
                intelligent, future-ready operations.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <h2 className="text-4xl md:text-5xl text-black font-bold text-center mb-10">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Own the Outcome */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">
                Own the Outcome
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We partner end-to-end, taking shared accountability for moving
                initiatives from strategy to production-scale impact.
              </p>
            </div>

            {/* Engineer for Reality */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">
                Engineer for Reality
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We design for security, integration, and scalability from day
                one—solving the practical constraints that cause projects to
                fail.
              </p>
            </div>

            {/* Lead with Expertise */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">
                Lead with Expertise
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We engage as senior practitioners, combining enterprise
                leadership perspective with deep engineering capability.
              </p>
            </div>

            {/* Partner with Transparency */}
            <div className="border-2 border-[#17599d] rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">
                Partner with Transparency
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe clarity and direct communication are essential for
                trust in complex, high-stakes transformations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
