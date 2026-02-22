import Link from "next/link";
import Image from "next/image";
import IndustriesHeader from "@/components/industries/Header";

export default function IndustriesHero() {
  return (
    <section className="relative py-16 overflow-hidden min-h-[55vh] items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        >
          <source src="/videos/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0"></div>
      <IndustriesHeader />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Industries We Serve
            </h1>
            <p className="text-sm text-black font-semibold leading-relaxed max-w-2xl">
              At Paramount Intelligence, we specialize in delivering tailored
              technology solutions across various industries. Our deep expertise
              in AI, data analytics, cloud services, and automation allows us to
              help organizations across sectors drive operational efficiency,
              scale, and growth. Whether you're looking to improve
              decision-making, enhance automation, or modernize legacy systems,
              we offer industry-specific solutions that create lasting impact.
            </p>
            <Link
              href="/contact-us"
              className="inline-block text-xs bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
