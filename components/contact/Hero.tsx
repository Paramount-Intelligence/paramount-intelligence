import ContactHeader from "@/components/contact/Header";

export default function ContactHero() {
  return (
    <section className="relative py-8 bg-linear-to-r from-[#17599d] to-[#0c3a6a] overflow-hidden">
      {/* Dotted pattern overlay */}
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
      <ContactHeader />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-900 leading-relaxed">
            Ready to take the next step toward transforming your business? Let’s
            discuss how we can help you apply intelligent systems, data
            analytics, cloud solutions, and automation to drive real, measurable
            business outcomes. Our team is equipped and eager to support your
            organization's journey.
          </p>
        </div>
      </div>
    </section>
  );
}
