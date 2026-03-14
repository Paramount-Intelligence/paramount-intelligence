"use client";

import { useState } from "react";
import Image from "next/image";

interface CaseStudiesHeroProps {
  onIndustryChange: (industry: string) => void;
  onBusinessFunctionChange: (businessFunction: string) => void;
}

export default function CaseStudiesHero({
  onIndustryChange,
  onBusinessFunctionChange,
}: CaseStudiesHeroProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedBusinessFunction, setSelectedBusinessFunction] =
    useState("All");

  const industries = [
  "Financial Data & Investment Intelligence",
  "Fintech & Digital Financial Services",
  "Telecommunications",
  "E-Commerce & Retail Technology",
  "Staffing, Recruitment & Professional Services",
  "Global Marketing & Advertising",
  "AI & Productivity Software",
  "Ride-Hailing & Mobility",
  "Ride-Hailing & Delivery",
  "Telecommunications & Digital Services",
  "Professional Services & Consulting",
  "B2B Services & Sales Operations",
  "Professional Services & Operations",
  "Professional Services & Technology",
  "Digital Banking & Financial Services",
  "Real Estate Analytics & Short Term Rentals",
  "E-Commerce",
  "Healthcare Technology",
  "Industrial Manufacturing & Distribution"
];

  const businessFunctions = [
  "CRM Automation",
  "Email Processing",
  "Investor Relations",
  "Data Structuring",
  "Legal Review",
  "Contract Management",
  "Risk Analysis",
  "Procurement",
  "Customer Support",
  "Infrastructure Engineering",
  "AI Operations",
  "Marketing Analytics",
  "Product Analytics",
  "A/B Testing",
  "Data Engineering",
  "Recruitment",
  "Operations",
  "AI Training",
  "Workflow Automation",
  "Marketing",
  "Content Production",
  "Creative Automation",
  "Personal Productivity",
  "Email Management",
  "Calendar Management",
  "Pricing Strategy",
  "Revenue Management",
  "Marketplace Operations",
  "Fraud Prevention",
  "Risk Management",
  "Customer Segmentation",
  "Promotional Strategy",
  "Supply Planning",
  "Demand Management",
  "Customer Experience",
  "Real-Time Analytics",
  "Cost Management",
  "Engineering",
  "Market Research",
  "Financial Inclusion",
  "Credit Risk",
  "Lending",
  "Customer Retention",
  "Brand Management",
  "Cost Reduction",
  "Self-Service",
  "Email Automation",
  "Ticket Management",
  "Staffing",
  "Workforce Planning",
  "Sales Operations",
  "Lead Generation",
  "Revenue Growth",
  "Process Improvement",
  "HR Operations",
  "Onboarding",
  "Customer Engagement",
  "Digital Banking",
  "Product Discovery",
  "Investment Strategy",
  "Property Management",
  "Listing Optimization",
  "Business Intelligence",
  "Executive Reporting",
  "Competitive Intelligence",
  "Patient Advocacy",
  "Insurance Navigation",
  "Healthcare Operations"
];
  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    onIndustryChange(value);
  };

  const handleBusinessFunctionChange = (value: string) => {
    setSelectedBusinessFunction(value);
    onBusinessFunctionChange(value);
  };

  const clearIndustry = () => {
    setSelectedIndustry("All");
    onIndustryChange("All");
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background with dotted pattern */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-600 to-gray-700">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size-[20px_20px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-12">
          Case Studies
        </h1>

        {/* Filter Section */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Industries Dropdown */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Industries
            </label>
            <div className="relative">
              <select
                title="Select Industry"
                value={selectedIndustry}
                onChange={(e) => handleIndustryChange(e.target.value)}
                className="w-full bg-white text-gray-900 px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {selectedIndustry !== "All" && (
                <button
                  onClick={clearIndustry}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Business Functions Dropdown */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Business Functions
            </label>
            <div className="relative">
              <select
                title="Select Business Function"
                value={selectedBusinessFunction}
                onChange={(e) => handleBusinessFunctionChange(e.target.value)}
                className="w-full bg-white text-gray-900 px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {businessFunctions.map((func) => (
                  <option key={func} value={func}>
                    {func}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
