import { Sparkles } from "lucide-react";
import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface UniqueSolutionProps {
  content: string;
}

export default function UniqueSolution({ content }: UniqueSolutionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6  xl:px-12">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Made the Solution Unique
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed">
              {formatBulletPoints(content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
