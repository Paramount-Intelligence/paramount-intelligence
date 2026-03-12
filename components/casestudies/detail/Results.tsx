import { TrendingUp } from "lucide-react";
import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface ResultsProps {
  content: string;
}

export default function Results({ content }: ResultsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-12">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Results 
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
