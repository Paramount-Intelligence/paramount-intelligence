export default function WhyChooseUs() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
      }}
    >
      {/* Geo grid */}
      <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #3b88f5 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              Why Partner With Us
            </span>
            <div className="accent-line" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Our Approach
          </h2>
          
          <p className="max-w-4xl text-center leading-relaxed text-base sm:text-lg text-justify md:text-center" style={{ color: "#b5c8e2" }}>
            At Paramount Intelligence, we take a results-driven approach to
            every project. We don’t just advise, we partner with you through
            every stage, from strategic planning to hands-on engineering. Our
            team blends deep industry expertise with cutting-edge technology to
            create custom solutions that seamlessly integrate AI, data
            analytics, cloud systems, and automation into your operations. Our
            focus is on delivering real, scalable outcomes that accelerate
            growth, improve decision-making, and drive sustainable impact.
            Whether you're modernizing legacy systems, building AI solutions, or
            optimizing workflows, we’re here to ensure your technology works
            harder for you.
          </p>
        </div>
      </div>
    </section>
  );
}
