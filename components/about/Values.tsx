export default function Values() {
  return (
    <section className="py-6 sm:py-10 md:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Mission & Vision Section */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Mission */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-4">
                Mission
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To translate strategic business ambition into scalable technical
                reality.
              </p>
            </div>

            {/* Vision */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-4">
                Vision
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To be the most trusted partner for organizations building
                intelligent, future-ready operations.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold text-center mt-10 sm:mt-16 mb-8 sm:mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Own the Outcome */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">
                Own the Outcome
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We partner end-to-end, taking shared accountability for moving
                initiatives from strategy to production-scale impact.
              </p>
            </div>

            {/* Engineer for Reality */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">
                Engineer for Reality
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We design for security, integration, and scalability from day
                one—solving the practical constraints that cause projects to
                fail.
              </p>
            </div>

            {/* Lead with Expertise */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">
                Lead with Expertise
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We engage as senior practitioners, combining enterprise
                leadership perspective with deep engineering capability.
              </p>
            </div>

            {/* Partner with Transparency */}
            <div className="border-2 border-[#17599d] text-center rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">
                Partner with Transparency
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
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
