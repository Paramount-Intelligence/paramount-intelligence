import Link from "next/link";
import Image from "next/image";

export default function LLMHero() {
  return (
    <section className="relative py-16 overflow-hidden min-h-[55vh] flex items-center">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              AI Workflow Automation
            </h1>
            <p className="text-sm text-black font-semibold leading-relaxed max-w-lg">
              We design intelligent, end-to-end workflows that reduce cost,
              accelerate execution, and improve decision quality.
            </p>
            <Link
              href="https://calendly.com/syedaliazzam"
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
