import Link from "next/link";

export default function JoinCTA() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Explore our open positions and become part of a team that's shaping
            the future of AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers/open-positions"
              className="inline-block bg-white text-purple-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              View Open Positions
            </Link>
            <Link
              href="/careers/apply-now"
              className="inline-block bg-purple-800 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-900 transition-all shadow-lg hover:shadow-xl border-2 border-white/30"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
