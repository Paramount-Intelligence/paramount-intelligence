import Link from "next/link";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden min-h-[55vh] sm:min-h-[65vh] flex items-center">
      {/* Background Image */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Building Technology That Scales in the Real World
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed max-w-lg">
              Paramount Intelligence partners with startups, scale-ups, and
              enterprises to translate strategic ambition into technical
              reality.
            </p>
            <Link
              href="/contact-us"
              className="inline-block text-xs sm:text-sm bg-[#17599d] text-white px-8 sm:px-16 py-2 font-semibold hover:bg-[#144a75] transition-colors text-center"
            >
              Let's work together!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
