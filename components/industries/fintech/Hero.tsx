import Link from "next/link";
import Image from "next/image";
import FintechHeader from "@/components/industries/fintech/Header";

export default function FintechHero() {
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
      <FintechHeader />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Secure, High-Performance <br />
              Financial Systems at Scale
            </h1>
            <p className="text-sm text-black font-semibold leading-relaxed max-w-lg">
              Financial platforms require systems built for speed, accuracy, and
              trust. We help organizations engineer them to operate securely at
              scale.
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
