"use client";

export default function SubscriptionForm() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Newsletter
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0d1f3c" }}>
            Subscribe Now
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Join our community of AI-forward leaders and innovators.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-xl flex justify-center">
          <iframe
            src="https://subscribe-forms.beehiiv.com/863d5a7c-8bdf-4413-b666-e8d872164b61"
            className="beehiiv-embed"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
            style={{
              width: "100%",
              height: "320px",
              margin: 0,
              borderRadius: "12px",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
}
