import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface DeepDiveContent {
  overview: string;
  client: string;
  challenge: string;
  keyConstraints: string;
}

interface DeepDiveProps {
  content: DeepDiveContent;
}

export default function DeepDive({ content }: DeepDiveProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Deep Dive
        </h2>

        <div className="space-y-12">
          {/* Overview */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Overview
            </h3>
            <div className="text-gray-700 leading-relaxed text-lg">
              {formatBulletPoints(content.overview)}
            </div>
          </div>

          {/* Client Reference */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Client
            </h3>
            <div className="text-gray-700 leading-relaxed text-lg">
              {formatBulletPoints(content.client)}
            </div>
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Challenge
            </h3>
            <div className="text-gray-700 leading-relaxed text-lg">
              {formatBulletPoints(content.challenge)}
            </div>
          </div>

          {/* Key Constraints */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Key Constraints
            </h3>
            <div className="text-gray-700 leading-relaxed text-lg">
              {formatBulletPoints(content.keyConstraints)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
