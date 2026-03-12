import { CheckCircle } from "lucide-react";

interface SolutionAgent {
  title: string;
  description: string;
}

interface SolutionAgentsProps {
  agents: SolutionAgent[];
}

export default function SolutionAgents({ agents }: SolutionAgentsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Solution Architecture
        </h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-[#011a43]/20 bg-[#17599d] text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white mt-1" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {agent.title}
                  </h3>

                  <p className="text-white/85 leading-relaxed whitespace-pre-line">
                    {agent.description}
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