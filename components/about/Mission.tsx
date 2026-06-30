import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function Mission() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Our Leadership
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0d1f3c" }}>
            The Founders of Paramount Intelligence
          </h2>
        </div>

        {/* Profile 1 - Syed Ali Azzam */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white/70 p-6 md:p-8 rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-xl">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#0d1f3c" }}>
                Syed Ali Azzam
              </h3>
              <a
                href="https://www.linkedin.com/in/syedaliazzam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(30,111,217,0.08)] hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#1e6fd9" }}>
              CEO &amp; Founding Partner
            </p>

            <p className="text-base text-gray-700 leading-relaxed text-justify">
              Ali helps organizations unlock measurable business value from intelligent technology by translating strategic vision into production-ready systems teams rely on every day. As Founding Partner of Paramount Intelligence, he partners with startups, scale-ups, and Fortune 1000 organizations to design and deliver integrated solutions across AI, data, cloud, automation, intelligent agents, chatbots, and workflow orchestration.
              <br />
              <br />
              Combining strategic leadership with hands-on technical expertise, his work spans AI model integration, data architecture, cloud platforms, agentic workflows, and enterprise automation. He has led enterprise-grade engagements with leadership teams, helping organizations move from strategy and design through execution, adoption, and sustained operation, with a strong focus on reliability, security, and scalability.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-square max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[rgba(30,111,217,0.2)]">
              <Image
                src="/images/aliazzam-s.png"
                alt="Syed Ali Azzam"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile 2 - Marty Kaufman */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/70 p-6 md:p-8 rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-xl">
          {/* Left Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[rgba(30,111,217,0.2)]">
              <Image
                src="/images/marty.png"
                alt="Marty Kaufman"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#0d1f3c" }}>
                Marty Kaufman
              </h3>
              <a
                href="https://www.linkedin.com/in/martykaufman/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(30,111,217,0.08)] hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#1e6fd9" }}>
              Co-founder &amp; Chief Commercial Officer
            </p>

            <p className="text-base text-gray-700 leading-relaxed text-justify">
              Marty works with organizations to align business objectives with practical AI, data, cloud, and automation solutions that address real operational needs. As Co-founder and Chief Commercial Officer, Marty partners closely with client executives to understand their priorities and guide technology initiatives with clarity, purpose, and a focus on measurable business value rather than technology followership.
              <br />
              <br />
              As a commercial leader, Marty brings extensive experience leading client and growth functions across professional services organizations, from boutique consultancies to some of the world's largest firms. He has supported dozens of strategy, management, and AI consulting firms through periods of sustained growth and improved client retention. His expertise in building long-term client relationships and aligning business challenges with relevant service offerings helps organizations move confidently from strategy to successful execution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
