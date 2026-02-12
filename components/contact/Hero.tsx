export default function ContactHero() {
  return (
    <section className="relative py-8 bg-linear-to-r from-[#17599d] to-[#0c3a6a] overflow-hidden">
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size[20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Let's discuss how we can help you apply AI and automation to drive
            real business outcomes. Our team is ready to support your
            organization's transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
