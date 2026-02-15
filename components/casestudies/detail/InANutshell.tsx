interface NutshellContent {
  challenge: string;
  solution: string;
  benefits: string;
}

interface InANutshellProps {
  content: NutshellContent;
}

export default function InANutshell({ content }: InANutshellProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          In a Nutshell
        </h2>

        <div className="space-y-12">
          {/* Client's Challenge */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Client's Challenge
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {content.challenge}
            </p>
          </div>

          {/* Our Solution */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Solution
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {content.solution}
            </p>
          </div>

          {/* Client's Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Client's Benefits
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {content.benefits}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
