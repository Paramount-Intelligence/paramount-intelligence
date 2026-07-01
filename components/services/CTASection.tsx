import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#f1f3f6" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center gap-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Get Started
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold max-w-4xl" style={{ color: "#0d1f3c" }}>
            Book a Free Consultation
          </h2>
          
          <p className="max-w-2xl leading-relaxed text-gray-700">
            Ready to transform your business with technology that drives
            measurable results? Book a free, no-obligation consultation with our
            experts today. We’ll discuss your specific challenges, explore the
            potential of AI, data, and automation for your organization, and
            help you chart a clear path to success.
          </p>
          
          <div className="pt-2">
            <Link
              href="https://calendly.com/syedaliazzam/advisory?back=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm inline-flex"
            >
              Book a consultation
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}