import Link from "next/link";
import Image from "next/image";
import B2BHeader from "@/components/industries/b2b/Header";

export default function B2bHero() {
  return (
    <section className="relative py-16 mt-12 overflow-hidden min-h-[55vh] items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        >
          <source src="/videos/background-video.webm" type="video/webm" />
        </video>
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0"></div>
      <B2BHeader />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Connecting Enterprise Systems <br />
              Into Intelligent Workflows
            </h1>
            <p className="text-sm text-black font-semibold leading-relaxed max-w-lg">
              B2B enterprise solutions are becoming more interconnected and
              workflow-driven. We help organizations engineer systems that
              operate reliably across the enterprise.
            </p>
            <Link
              href="https://calendly.com/syedaliazzam/advisory?back=1"
              className="inline-block text-xs bg-[#17599d] text-white px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
