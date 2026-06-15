import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function Mission() {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-black font-bold text-center mb-10 sm:mb-14 md:mb-16">
          Leadership
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              Ali helps organizations unlock measurable business value from intelligent technology by translating strategic vision into production-ready systems teams rely on every day. As Founding Partner of Paramount Intelligence, he partners with startups, scale-ups, and Fortune 1000 organizations to design and deliver integrated solutions across AI, data, cloud, automation, intelligent agents, chatbots, and workflow orchestration.
              <br />
              <br />
              Combining strategic leadership with hands-on technical expertise, his work spans AI model integration, data architecture, cloud platforms, agentic workflows, and enterprise automation. He has led enterprise-grade engagements with leadership teams, helping organizations move from strategy and design through execution, adoption, and sustained operation, with a strong focus on reliability, security, and scalability.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-115 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/aliazzam-s.png"
              alt="Paramount Intelligence Founders"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />

            <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 shadow-md rounded-tl-lg w-full sm:w-auto">
              <div className="flex items-start justify-between gap-3">
                <a
                  href="https://www.linkedin.com/in/syedaliazzam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#004182] transition-colors mt-2"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    Syed Ali Azzam
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    CEO & Founding Partner at Paramount Intelligence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Right Image */}
          <div className="relative h-64 sm:h-96 md:h-110 lg:h-135 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/marty.png"
              alt="Paramount Intelligence Founders"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />

            <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 shadow-md rounded-tl-lg w-full sm:w-auto">
              <div className="flex items-start justify-between gap-3">
                <a
                  href="https://www.linkedin.com/in/martykaufman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#004182] transition-colors mt-2"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    Marty Kaufman
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Co-founder & Chief Commercial Officer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
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
