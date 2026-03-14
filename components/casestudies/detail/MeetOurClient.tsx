import { User, TrendingUp, Globe, Code } from "lucide-react";

interface ClientInfo {
  name: string | null;
  industry: string | null;
  market: string | null;
  technology: string | null;
}

interface MeetOurClientProps {
  clientInfo: ClientInfo;
}

export default function MeetOurClient({ clientInfo }: MeetOurClientProps) {
  // Helper to check if string is valid and not "N/A"
  const isValid = (value: string | null | undefined) => {
    return value && value.trim() !== "" && value.trim().toUpperCase() !== "N/A";
  };

  // Check if any field has actual data to show the whole section
  const hasData = isValid(clientInfo.name) || 
                  isValid(clientInfo.industry) || 
                  isValid(clientInfo.market) || 
                  isValid(clientInfo.technology);

  if (!hasData) return null;

  return (
    <section className="py-6 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Meet our client
        </h2>

        <div className="space-y-6">
          {/* Client */}
          {isValid(clientInfo.name) && (
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <User className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <span className="font-semibold text-gray-900">Client: </span>
                <span className="text-gray-700">{clientInfo.name}</span>
              </div>
            </div>
          )}

          {/* Industry */}
          {isValid(clientInfo.industry) && (
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <TrendingUp className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <span className="font-semibold text-gray-900">Industry: </span>
                <span className="text-gray-700">{clientInfo.industry}</span>
              </div>
            </div>
          )}

          {/* Market */}
          {isValid(clientInfo.market) && (
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <Globe className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <span className="font-semibold text-gray-900">Market: </span>
                <span className="text-gray-700">{clientInfo.market}</span>
              </div>
            </div>
          )}

          {/* Technology */}
          {isValid(clientInfo.technology) && (
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <Code className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <span className="font-semibold text-gray-900">
                  Technology:{" "}
                </span>
                <span className="text-gray-700">{clientInfo.technology}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}