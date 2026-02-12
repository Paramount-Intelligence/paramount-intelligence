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
              Running secure, high-speed financial systems
            </h2>
          </div>

          {/* Right Side - Key Benefits */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed">
                Organizations operating in highly regulated financial
                environments rely on us to integrate intelligent capabilities
                into their financial systems. Our consulting and engineering
                approach integrates into existing payment infrastructure, data
                platforms, and security controls, ensuring intelligent
                capabilities are deployed responsibly. By focusing on production
                readiness and governance, we help teams deliver systems that
                scale securely and support long-term financial operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
