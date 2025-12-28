import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta.png"
          alt="CTA Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
            Contact our AI & LLMs experts to estimate your project
          </h2>
          <Link
            href="/contact"
            className="bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors whitespace-nowrap"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
