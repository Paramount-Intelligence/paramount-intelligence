import { Clock, Globe, Users } from "lucide-react";

export default function ContactInfo() {
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
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6ba8ff" }}
            >
              Why Paramount Intelligence
            </span>
            <div className="accent-line" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Partnering For Success
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "#b5c8e2" }}>
            We specialize in transforming businesses through advanced technology. Here’s why partnering with us is the right choice for your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-dark p-8 rounded-2xl border border-[rgba(30,111,217,0.18)] hover-glow-blue">
            <div className="w-12 h-12 bg-[rgba(30,111,217,0.15)] rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#6ba8ff]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              Proven Expertise
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
              We combine strategy, advisory, and hands-on engineering to design
              and implement production-ready solutions that optimize operations.
            </p>
          </div>

          <div className="glass-dark p-8 rounded-2xl border border-[rgba(30,111,217,0.18)] hover-glow-blue">
            <div className="w-12 h-12 bg-[rgba(30,111,217,0.15)] rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-[#6ba8ff]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              Global Experience
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
              From startups to Fortune 1000 companies, we have a track record of
              delivering impactful solutions across industries globally.
            </p>
          </div>

          <div className="glass-dark p-8 rounded-2xl border border-[rgba(30,111,217,0.18)] hover-glow-blue">
            <div className="w-12 h-12 bg-[rgba(30,111,217,0.15)] rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-[#6ba8ff]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              Strategic, Hands-On Support
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
              Our approach isn’t just theoretical, we execute. We work closely
              with you from strategy through to implementation.
            </p>
          </div>
        </div>

        <div className="mt-20 glass-dark rounded-2xl p-10 md:p-12 text-center border border-[rgba(30,111,217,0.25)] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to Transform Your Business?
          </h3>
          <p className="text-base mb-8 max-w-2xl mx-auto" style={{ color: "#b5c8e2" }}>
            Let’s work together to apply intelligent systems, data-driven
            insights, cloud solutions, and automation that will drive
            sustainable and scalable business outcomes.
          </p>
          <div>
            <a
              href="https://calendly.com/syedaliazzam/advisory?back=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm inline-flex"
            >
              Get Started Today
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
