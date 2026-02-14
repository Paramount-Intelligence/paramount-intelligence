import Image from "next/image";

export default function OpenPositionsHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div> */}

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

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Open
            <span className="block bg-clip-text text-[#17599d]">Positions</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed mb-8">
            Join a team of innovators building the future of AI. We're looking
            for talented individuals who are passionate about pushing the
            boundaries of what's possible.
          </p>
        </div>
      </div>
    </section>
  );
}
