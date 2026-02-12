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
              Delivering personalized digital experiences at scale
            </h2>
          </div>

          {/* Right Side - Key Benefits */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed">
                Organizations delivering always-on digital experiences to large,
                diverse audiences rely on us to integrate intelligent
                capabilities into their platforms. Our consulting and
                engineering approach integrates into existing platforms and
                infrastructure, ensuring intelligent capabilities scale cleanly
                and perform reliably during traffic spikes. By focusing on
                production readiness, we help teams deliver systems that support
                sustained engagement and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
