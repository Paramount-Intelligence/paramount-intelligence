"use client";

export default function SubscriptionForm() {

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Subscribe Now
            </h2>
            <p className="text-xl text-gray-600">
              Join our community of AI-forward leaders and innovators
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
            <script
                async
                src="https://subscribe-forms.beehiiv.com/embed.js"
                ></script>
                <iframe
                src="https://subscribe-forms.beehiiv.com/863d5a7c-8bdf-4413-b666-e8d872164b61"
                className="beehiiv-embed"
                data-test-id="beehiiv-embed"
                frameBorder="0"
                scrolling="no"
                style={{
                    width: "963px",
                    height: "339px",
                    margin: 0,
                    borderRadius: "15px",
                    // backgroundColor: "transparent",
                    boxShadow: "0 0 #0000",
                    maxWidth: "100%",
                }}
                ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
