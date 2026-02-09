import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function MissionStatement() {
  return (
    <section className="pt-16 min-h-screen bg-gray-50 items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Founders Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/aliazzam-s.png"
                alt="Paramount Intelligence Founders"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />

              <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md rounded-tl-lg">
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
                    <p className="text-sm font-semibold text-gray-900">
                      Syed Ali Azzam
                    </p>
                    <p className="text-xs text-gray-600">
                      CEO & Founding Partner at Paramount Intelligence
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Left Badge */}
              {/* <div className="absolute top-6 left-6">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
                  <p className="text-[10px] text-gray-500 mb-1">Nominated by</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">
                        EY
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-900">
                        EY Entrepreneur
                      </p>
                      <p className="text-[9px] text-gray-600">Of The Year</p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Bottom Right Recognition */}
              {/* <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
                <p className="text-[10px] text-gray-500 mb-1">Recognized by</p>
                <p className="text-sm font-bold text-gray-900">Forbes</p>
                <p className="text-3xl font-bold text-gray-300">30</p>
                <p className="text-3xl font-bold text-gray-300 -mt-2">30</p>
              </div> */}
            </div>
          </div>

          {/* Right Side - Quote and Mission */}
          <div className="space-y-8">
            {/* Quote */}
            <div>
              <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-gray-900 italic leading-tight mt-2">
                <span className="text-4xl -left-8.75 text-[#17599d] font-serif leading-none">
                  “
                </span>
                True transformation happens when technology stops being a
                project and starts being the engine of your business. We partner
                with you to build that engine.
                <span className="text-4xl text-[#17599d] font-serif leading-none">
                  ”
                </span>
              </h2>
            </div>

            {/* Mission Description */}
            <div className="border-l-4 border-[#17599d] pl-6">
              <p className="text-gray-700 leading-relaxed">
                In today’s environment, competitive advantage is built on
                technology, but the path from strategy to secure, scalable
                execution is rarely straightforward. That is why we are
                laser-focused on one thing: helping organizations translate
                strategic ambition into technical reality. We partner with you
                to architect and operationalize the full technology stack,
                integrating AI strategy, data and analytics, cloud
                infrastructure directly into mission-critical processes to
                deliver measurable outcomes and lasting operational impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
