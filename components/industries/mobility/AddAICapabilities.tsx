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
              Coordinating real-time mobility and delivery operations
            </h2>
          </div>

          {/* Right Side - Key Benefits */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed">
                Mobility and delivery platforms operating at high transaction
                volumes and tight latency constraints rely on us to engineer
                systems that perform reliably at scale. Our consulting and
                engineering approach integrates into existing platforms and
                infrastructure, ensuring intelligent capabilities scale cleanly
                and operate reliably. By focusing on production readiness, we
                help teams deliver systems that support sustained growth and
                operational resilience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
