import { Cpu } from "lucide-react";

interface TechItem {
  title: string;
  description: string;
}

interface TechStackProps {
  techStack: TechItem[];
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Technology Stack
        </h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-[#011a43]/20 bg-[#17599d]  shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Cpu className="w-6 h-6 text-white mt-1" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {tech.title}
                  </h3>

                  <p className="text-white/85 leading-relaxed whitespace-pre-line">
                    {tech.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}