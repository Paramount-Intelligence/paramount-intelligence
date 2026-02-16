import CandidatesHeader from "@/components/candidates/Header";

export default function CandidatesHero() {
  return (
    <section className="relative py-16 mt-12 overflow-hidden min-h-[55vh] items-center">
      {/* Background Video */}
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
      <CandidatesHeader />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Join Paramount Intelligence
          </h1>
          <p className="text-2xl md:text-3xl text-black font-semibold leading-tight mb-4">
            A Place to Grow, Innovate, and Make an Impact
          </p>
          <p className="text-lg text-black leading-relaxed">
            At Paramount Intelligence, we are more than just a company—we are a
            community of innovators, creators, and problem-solvers. We are
            committed to driving real business outcomes through AI, data,
            automation, and cloud solutions. But more importantly, we're
            passionate about your growth.
          </p>
        </div>
      </div>
    </section>
  );
}
