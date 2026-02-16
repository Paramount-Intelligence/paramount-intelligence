import FAQHeader from "@/components/faq/Header";

export default function FAQHero() {
  return (
    <section className="relative py-16 mt-12 overflow-hidden min-h-[40vh] items-center">
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
      <FAQHeader />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-black font-semibold leading-relaxed">
            Find answers to common questions about joining Paramount
            Intelligence and working with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
