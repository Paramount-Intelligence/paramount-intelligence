import { User, TrendingUp, Globe, Code } from "lucide-react";

interface ClientInfo {
  name: string;
  industry: string;
  market: string;
  technology: string;
}

interface MeetOurClientProps {
  clientInfo: ClientInfo;
}

export default function MeetOurClient({ clientInfo }: MeetOurClientProps) {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Meet our client
        </h2>

        <div className="space-y-6">
          {/* Client */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <User className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Client: </span>
              <span className="text-gray-700">{clientInfo.name}</span>
            </div>
          </div>

          {/* Industry */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <TrendingUp className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Industry: </span>
              <span className="text-gray-700">{clientInfo.industry}</span>
            </div>
          </div>

          {/* Market */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <Globe className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Market: </span>
              <span className="text-gray-700">{clientInfo.market}</span>
            </div>
          </div>

          {/* Technology */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <Code className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Technology: </span>
              <span className="text-gray-700">{clientInfo.technology}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
