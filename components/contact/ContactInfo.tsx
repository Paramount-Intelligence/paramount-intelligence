import { Clock, Globe, Users } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Paramount Intelligence?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine AI strategy, advisory, and hands-on engineering to design
            and build production-ready systems that improve operational
            efficiency and scale with your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-[#17599d]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Expert Team
            </h3>
            <p className="text-gray-600">
              Our team of AI specialists and engineers brings years of
              experience in delivering production-ready AI solutions across
              industries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-[#17599d]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Global Reach
            </h3>
            <p className="text-gray-600">
              We work with organizations worldwide, from startups to Fortune
              1000 companies, delivering impactful AI and automation solutions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-[#17599d]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Rapid Response
            </h3>
            <p className="text-gray-600">
              We understand time is critical. Our team responds quickly to
              inquiries and works efficiently to deliver results on schedule.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-linear-to-r from-[#17599d] to-[#144a75] rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Let's work together to apply AI and automation to drive measurable
            business outcomes for your organization.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-[#17599d] px-8 py-4 font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
