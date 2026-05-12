"use client";

export default function Hero() {
  return (
    <div className="relative mt-20 min-h-[70vh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      >
        <source src="/videos/background-video.webm" type="video/webm" />
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
                AI Strategy, Advisory
                <br />& Engineering
              </h1>

              {/* Features List */}
              <div className="mb-8">
                <div className="flex items-start p-0 m-0">
                  <p className="text-black text-sm">
                    Paramount Intelligence is a Technology Consulting &
                    Engineering firm that designs, builds, and operationalizes
                    intelligent systems for organizations. We apply AI, Data &
                    Analytics, Cloud, and Automation to solve core business
                    challenges, delivering production-ready solutions that
                    improve efficiency, strengthen decision-making, and scale
                    with growth.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="https://calendly.com/syedaliazzam/advisory?back=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#17599d] text-sm text-white px-4 py-2 font-semibold hover:bg-gray-800 rounded-sm transition-colors text-center"
                >
                  Book a free consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
