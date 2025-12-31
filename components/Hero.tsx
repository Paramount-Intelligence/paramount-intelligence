"use client";

export default function Hero() {
  return (
    <div className="relative mt-16 min-h-[70vh] overflow-hidden">
      {/* Video Background */}
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
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-black">
              <h1 className="text-3xl md:text-3xl lg:text-[50px] font-bold mb-3 leading-tight">
                Applied AI & Automation
              </h1>

              <p className="text-[28.5px] md:text-shadow-md mb-3 leading-relaxed text-gray-800 font-light">
                AI Strategy, Advisory & Engineering
              </p>

              {/* Features List */}
              <div className="mb-8">
                <div className="flex items-start p-0 m-0">
                  <p className="text-black text-sm">
                    Paramount Intelligence is an independent consulting firm
                    that supports organizations in applying AI and automation to
                    drive real business outcomes. We combine AI strategy,
                    advisory, and hands-on engineering to design and build
                    production-ready systems that improve operational
                    efficiency, support decision-making, and scale with the
                    business.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <button className="bg-[#17599d] text-sm text-white px-4 py-2 font-semibold hover:bg-gray-800 rounded-sm transition-colors">
                  Book a free consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
