import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/cta.jpg"
          alt="CTA Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black max-w-4xl">
            Book a Free Consultation
          </h2>
          <p className="text-gray-900 max-w-4xl leading-relaxed">
            Ready to transform your business with technology that drives
            measurable results? Book a free, no-obligation consultation with our
            experts today. We’ll discuss your specific challenges, explore the
            potential of AI, data, and automation for your organization, and
            help you chart a clear path to success. Let’s work together to build
            systems that scale and create lasting impact.
          </p>
          <Link
            href="/contact-us"
            className="bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors whitespace-nowrap"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}