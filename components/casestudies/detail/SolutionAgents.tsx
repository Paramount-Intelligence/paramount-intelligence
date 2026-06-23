import { CheckCircle } from "lucide-react";
import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface SolutionAgent {
  title: string;
  description: string;
}

interface SolutionAgentsProps {
  agents: SolutionAgent[];
}

export default function SolutionAgents({ agents }: SolutionAgentsProps) {
  const validAgents = (agents || []).filter(
    (agent) =>
      agent.title &&
      agent.title.trim().toUpperCase() !== "N/A" &&
      agent.description &&
      agent.description.trim().toUpperCase() !== "N/A",
  );

  if (validAgents.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Solution Architecture
        </h2>

        <div className="flex flex-col gap-3">
          {validAgents.map((agent, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-white/15 px-5 py-4 transition-all duration-200 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] hover:border-white/30 hover:to-[#2563eb]"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {agent.title}
                </h3>
                <div className="text-lg leading-relaxed [&_p]:mb-0 [&_p]:text-lg [&_ul]:mb-0 [&_ul]:text-lg [&_ul]:space-y-1 text-slate-200 [&_p]:text-slate-200 [&_ul]:text-slate-200 [&_ul]:marker:text-slate-300">
                  {formatBulletPoints(agent.description)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

