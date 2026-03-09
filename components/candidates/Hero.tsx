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
          <source src="/videos/background-video.webm" type="video/webm" />
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
            Empower Your Career with Cutting-Edge Technology
          </p>
          <p className="text-lg text-black leading-relaxed">
            At Paramount Intelligence, we are more than a company; we are a
            community of innovators and engineers committed to transforming
            businesses through intelligent technology. As a leading Technology
            Consulting and Engineering firm, we specialize in AI Strategy, Cloud
            Services, Data Analytics, AI Workflow Automation, and more. We work
            with companies across industries to turn complex problems into
            actionable, scalable solutions that drive operational excellence and
            innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
