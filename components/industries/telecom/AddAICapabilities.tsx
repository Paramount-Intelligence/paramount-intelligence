"use client";

import { Zap, TrendingUp, Rocket } from "lucide-react";

export default function AddAICapabilities() {

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Heading and Description */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
              Partnering with operators running real-time network systems
            </h2>
          </div>

          {/* Right Side - Key Benefits */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed">
                Telecom operators running mission-critical systems at national
                and global scale partner with us to integrate intelligence
                across network, IT, and cloud environments. Our consulting and
                engineering approach ensures these capabilities are deployed
                safely and sustainably within existing network, IT, and cloud
                environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
