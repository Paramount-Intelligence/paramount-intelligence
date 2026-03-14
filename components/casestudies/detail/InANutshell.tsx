import { formatBulletPoints } from "@/lib/formatBulletPoints";

interface NutshellContent {
  challenge: string;
  solution: string;
  benefits: string;
}

interface InANutshellProps {
  content: NutshellContent;
}

export default function InANutshell({ content }: InANutshellProps) {
  // Helper to check if string is valid and not "N/A"
  const isValid = (value: string | null | undefined) => {
    return value && value.trim() !== "" && value.trim().toUpperCase() !== "N/A";
  };

  // Check if any field has actual data
  const hasData = isValid(content.challenge) || 
                  isValid(content.solution) || 
                  isValid(content.benefits);

  // Agar kuch bhi nahi hai dikhane ko, to component hi render mat karo
  if (!hasData) return null;

  return (
    <section className="py-6 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          In a Nutshell
        </h2>

        <div className="space-y-12">
          {/* Client's Challenge */}
          {isValid(content.challenge) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Client's Challenge
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.challenge)}
              </div>
            </div>
          )}

          {/* Our Solution */}
          {isValid(content.solution) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Solution
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.solution)}
              </div>
            </div>
          )}

          {/* Client's Benefits */}
          {isValid(content.benefits) && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Client's Benefits
              </h3>
              <div className="text-gray-700 leading-relaxed text-lg">
                {formatBulletPoints(content.benefits)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}