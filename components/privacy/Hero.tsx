import PrivacyHeader from "@/components/privacy/Header";

export default function PrivacyHero() {
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
          <source src="/videos/background-video.webm" type="video/webm" />
        </video>
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0"></div>
      <PrivacyHeader />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-black font-semibold leading-relaxed">
            At Paramount Intelligence, your privacy is important to us. This
            policy explains how we collect, use, and protect your personal data.
          </p>
        </div>
      </div>
    </section>
  );
}
