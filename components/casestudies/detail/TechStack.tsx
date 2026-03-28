// TechStack.tsx
import { Cpu } from "lucide-react";
import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface TechItem {
  title: string;
  description: string;
}

interface TechStackProps {
  techStack: TechItem[];
}

export default function TechStack({ techStack }: TechStackProps) {
  const validTech = (techStack || []).filter(
    (tech) =>
      tech.title &&
      tech.title.trim().toUpperCase() !== "N/A" &&
      tech.description &&
      tech.description.trim().toUpperCase() !== "N/A",
  );

  if (validTech.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Technology Stack
        </h2>

        <div className="flex flex-col gap-3">
          {validTech.map((tech, index) => (
            // TechStack.tsx - same card changes
            <div
              key={index}
              className="flex items-start gap-4 bg-[#6a8ee4] rounded-xl border border-white/25 px-5 py-4 hover:border-white/40 hover:bg-[#5c80da] transition-all duration-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mt-0.5">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {tech.title}
                </h3>
                <div className="text-lg text-blue-50 leading-relaxed [&_p]:mb-0 [&_p]:text-lg [&_p]:text-blue-50 [&_ul]:mb-0 [&_ul]:text-lg [&_ul]:space-y-1 [&_ul]:text-blue-50 [&_ul]:marker:text-white/90">
                  {formatBulletPoints(tech.description)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
