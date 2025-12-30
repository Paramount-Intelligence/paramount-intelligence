import Image from "next/image";

export default function Mission() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl md:text-5xl text-black font-bold text-center mb-16">
          Leadership
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Ali helps organizations unlock real business value from AI by
              translating advanced technical capabilities into systems teams
              depend on every day. As Founding Partner of Paramount
              Intelligence, he works closely with startups, scaleups, and
              Fortune 1000 companies to design and deliver GenAI, LLM, RAG, and
              AI agent solutions that drive impact across operations,
              automation, and decision-making. He brings hands-on experience
              building and deploying end-to-end AI systems, spanning data
              orchestration, model integration, cloud infrastructure, and
              workflow automation, with a strong emphasis on reliability,
              security, and scalability. Ali has led multiple enterprise-grade
              engagements through platforms such as Catalant, partnering
              directly with Fortune 1000 stakeholders to move initiatives from
              strategy to production. His focus is on building systems that
              integrate seamlessly into existing organizations and continue
              delivering value well beyond initial deployment.
            </p>
            <div className="pt-4">
              <p className="font-bold text-gray-900">
                Ali Azzam, Founding Partner
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-110 lg:h-135">
            <Image
              src="/images/aliazzam.png"
              alt="Ali Azzam, Founding Partner"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
