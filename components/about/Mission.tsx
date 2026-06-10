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
              Ali works with organizations to unlock real business value from
              intelligent technology by translating strategic vision into
              production systems teams depend on every day. As Founding Partner
              of Paramount Intelligence, Ali Azzam partners closely with startups,
              scale-ups, and Fortune 1000 organizations to design and deliver
              integrated solutions across AI, data, cloud, and automation.
              <br />
              <br />
              Ali Azzam as a technical leader brings hands-on experience building and operationalizing
              end-to-end systems from AI model integration and data architecture
              to cloud platforms and intelligent workflow automation with a
              strong emphasis on reliability, security, and scalability. Ali has
              led enterprise-grade engagements in close collaboration with
              leadership teams, helping organizations move initiatives from
              strategy through execution and into sustained operation.
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
              Marty has held commercial, growth, strategy, and consulting leadership roles at boutique firms and several of the world's largest professional services organizations. Across these experiences, he has helped dozens of strategy, management, and AI consulting firms drive sustained growth, strengthen client relationships, and sharpen the alignment between client needs and practical technology solutions. He is passionate about helping organizations integrate AI, data, cloud, and automation in ways that accelerate performance while managing risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
