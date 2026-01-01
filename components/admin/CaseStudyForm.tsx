"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getApiUrl } from "@/lib/api";

interface CaseStudy {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientName: string;
  clientIndustry: string;
  clientMarket: string;
  clientTechnology: string;
  challenge: string;
  solution: string;
  benefits: string;
}

interface CaseStudyFormProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyForm({
  caseStudy,
  onClose,
}: CaseStudyFormProps) {
  const [formData, setFormData] = useState<CaseStudy>({
    slug: "",
    title: "",
    subtitle: "",
    image: "",
    heroImage: "",
    industry: "",
    businessFunction: "",
    description: "",
    clientName: "",
    clientIndustry: "",
    clientMarket: "",
    clientTechnology: "",
    challenge: "",
    solution: "",
    benefits: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (caseStudy) {
      setFormData(caseStudy);
    }
  }, [caseStudy]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug when title changes
      if (name === "title" && !caseStudy) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = caseStudy
        ? `${getApiUrl()}/api/admin/case-studies/${caseStudy.id}`
        : `${getApiUrl()}/api/admin/case-studies`;
      const method = caseStudy ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save case study");
      }

      alert(`Case study ${caseStudy ? "updated" : "created"} successfully!`);
      onClose();
    } catch (error) {
      console.error("Error saving case study:", error);
      alert("Failed to save case study");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {caseStudy ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 max-h-[70vh] overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <input
                    id="slug"
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    id="subtitle"
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="businessFunction" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Function
                  </label>
                  <input
                    id="businessFunction"
                    type="text"
                    name="businessFunction"
                    value={formData.businessFunction}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                    placeholder="/images/case-studies/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                    placeholder="/images/case-studies/..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="clientIndustry" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Industry
                  </label>
                  <input
                    id="clientIndustry"
                    type="text"
                    name="clientIndustry"
                    value={formData.clientIndustry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="clientMarket" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Market
                  </label>
                  <input
                    id="clientMarket"
                    type="text"
                    name="clientMarket"
                    value={formData.clientMarket}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="clientTechnology" className="block text-sm font-medium text-gray-700 mb-2">
                    Technology
                  </label>
                  <input
                    id="clientTechnology"
                    type="text"
                    name="clientTechnology"
                    value={formData.clientTechnology}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Nutshell */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                In a Nutshell
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                    Challenge
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-2">
                    Solution
                  </label>
                  <textarea
                    id="solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17599d] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#17599d] text-white rounded-lg hover:bg-[#144a75] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : caseStudy ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
