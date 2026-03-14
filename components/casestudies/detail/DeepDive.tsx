import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface DeepDiveContent {
  overview: string | null;
  client: string | null;
  challenge: string | null;
  keyConstraints: string | null;
}

interface DeepDiveProps {
  content: DeepDiveContent;
}

export default function DeepDive({ content }: DeepDiveProps) {
  // Helper function to check if a field is valid and not "N/A"
  const isValid = (value: string | null) => {
    return value && value.trim() !== "" && value.trim().toUpperCase() !== "N/A";
  };

  // Agar saari fields hi N/A hain, to poora section hi hide kar dete hain
  const hasData = isValid(content.overview) || 
                  isValid(content.client) || 
                  isValid(content.challenge) || 
                  isValid(content.keyConstraints);

  if (!hasData) return null;

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Deep Dive</h2>

        <div className="space-y-12">
          {/* Overview */}
          {isValid(content.overview) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Overview
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.overview!)}
              </div>
            </div>
          )}

          {/* Client Reference */}
          {isValid(content.client) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client</h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.client!)}
              </div>
            </div>
          )}

          {/* Challenge */}
          {isValid(content.challenge) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Challenge
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.challenge!)}
              </div>
            </div>
          )}

          {/* Key Constraints */}
          {isValid(content.keyConstraints) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Key Constraints
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.keyConstraints!)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}