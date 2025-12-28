import Image from "next/image";

export default function MissionStatement() {
  return (
    <section className="pt-32 min-h-screen bg-gray-50 items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Founders Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/download.png"
                alt="Paramount Intelligence Founders"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Top Left Label */}
              <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md rounded-br-lg">
                <p className="text-sm font-semibold text-gray-900">
                  CEO, Syed Ali Azzam
                </p>
                <p className="text-xs text-gray-600">
                  Founder at Paramount Intelligence
                </p>
              </div>

              {/* Bottom Right Label */}
              <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md rounded-tl-lg">
                <p className="text-sm font-semibold text-gray-900">
                  CTO, Co-founder
                </p>
                <p className="text-xs text-gray-600">
                  Co-founder at Paramount Intelligence
                </p>
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
                We strive to lead the field and we will not stop until we are
                the best at what we do
                <span className="text-4xl text-[#17599d] font-serif leading-none">
                  ”
                </span>
              </h2>
            </div>

            {/* Mission Description */}
            <div className="border-l-4 border-[#17599d] pl-6">
              <p className="text-gray-700 leading-relaxed">
                At Paramount Intelligence, our mission isn’t corporate rhetoric;
                it is a deeply personal commitment. As an independent consulting
                firm, we know that technology is only transformative when it
                solves real business problems. That is why we are laser-focused
                on one thing: helping organizations design and implement AI,
                GenAI, LLM, and agent-based systems, along with automation, in
                mission-critical processes and operational pain points, enabling
                people and teams to focus on what truly matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
