"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { getApiUrl } from "@/lib/api";

declare global {
  interface Window {
    cloudinary: any;
  }
}

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

  clientName: string | null;
  clientIndustry: string | null;
  clientMarket: string | null;
  clientTechnology: string | null;

  challenges: string;
  solution: string;
  benefits: string;

  overview: string | null;
  client: string | null;
  challenge: string | null;
  keyConstraints: string | null;

  solutionAgents: { title: string; description: string }[] | null;
  uniqueSolution: string | null;

  tech: { title: string; description: string }[] | null;

  results: string | null;
  summary: string | null;
}

interface FormState {
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
  challenges: string;
  solution: string;
  benefits: string;
  overview: string;
  client: string;
  challenge: string;
  keyConstraints: string;
  solutionAgents: { title: string; description: string }[];
  uniqueSolution: string;
  tech: { title: string; description: string }[];
  results: string;
  summary: string;
}

interface CaseStudyFormProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyForm({
  caseStudy,
  onClose,
}: CaseStudyFormProps) {
  const [formData, setFormData] = useState<FormState>({
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

    challenges: "",
    solution: "",
    benefits: "",

    overview: "",
    client: "",
    challenge: "",
    keyConstraints: "N/A",

    solutionAgents: [{ title: "", description: "" }],
    uniqueSolution: "N/A",

    tech: [{ title: "", description: "" }],

    results: "N/A",
    summary: "",
  });

  const [loading, setLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [uploadingField, setUploadingField] = useState<
    "image" | "heroImage" | null
  >(null);

  useEffect(() => {
    if (caseStudy) {
      setSlugManuallyEdited(false);
      setFormData({
        ...caseStudy,
        clientName: caseStudy.clientName ?? "",
        clientIndustry: caseStudy.clientIndustry ?? "",
        clientMarket: caseStudy.clientMarket ?? "",
        clientTechnology: caseStudy.clientTechnology ?? "",
        overview: caseStudy.overview ?? "",
        client: caseStudy.client ?? "",
        challenge: caseStudy.challenge ?? "",
        keyConstraints: caseStudy.keyConstraints ?? "N/A",
        solutionAgents: caseStudy.solutionAgents ?? [
          { title: "", description: "" },
        ],
        uniqueSolution: caseStudy.uniqueSolution ?? "N/A",
        tech: caseStudy.tech ?? [{ title: "", description: "" }],
        results: caseStudy.results ?? "N/A",
        summary: caseStudy.summary ?? "",
      });
    }
  }, [caseStudy]);

  useEffect(() => {
    const existingScript = document.getElementById("cloudinary-upload-widget");

    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "cloudinary-upload-widget";
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {};
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "slug") {
      setSlugManuallyEdited(true);
    }
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !slugManuallyEdited) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleJsonChange = (
    index: number,
    field: string,
    value: string,
    type: "solutionAgents" | "tech",
  ) => {
    setFormData((prev) => {
      const updatedList = [...(prev[type] || [])];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return { ...prev, [type]: updatedList };
    });
  };

  const addJsonItem = (type: "solutionAgents" | "tech") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), { title: "", description: "" }],
    }));
  };

  const removeJsonItem = (index: number, type: "solutionAgents" | "tech") => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((_, i) => i !== index),
    }));
  };

  const openCloudinaryWidget = async (field: "image" | "heroImage") => {
    try {
      setUploadingField(field);

      if (!window.cloudinary) {
        alert("Cloudinary widget is not loaded yet. Please try again.");
        return;
      }

      const timestamp = Math.floor(Date.now() / 1000);

      const signatureRes = await fetch("/api/cloudinary-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp }),
      });

      if (!signatureRes.ok) {
        throw new Error("Failed to get upload signature");
      }

      const { signature, apiKey, cloudName, folder } =
        await signatureRes.json();

      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          apiKey,
          folder,
          uploadSignature: signature,
          uploadSignatureTimestamp: timestamp,
          sources: ["local", "url", "camera", "google_drive"],
          multiple: false,
          resourceType: "image",
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
          maxFileSize: 5_000_000,
          cropping: false,
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary error:", error);
            alert("Image upload failed");
            setUploadingField(null);
            return;
          }

          if (result?.event === "success") {
            const secureUrl = result.info.secure_url;

            setFormData((prev) => ({
              ...prev,
              [field]: secureUrl,
            }));

            setUploadingField(null);
          }

          if (result?.event === "close") {
            setUploadingField(null);
          }
        },
      );

      widget.open();
    } catch (error) {
      console.error(error);
      alert("Unable to open Cloudinary upload");
      setUploadingField(null);
    }
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      alert("Success!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving case study");
    } finally {
      setLoading(false);
    }
  };

  const renderImageField = (
    label: string,
    field: "image" | "heroImage",
    value: string,
  ) => {
    return (
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          {label} *
        </label>

        <div className="space-y-3">
          <input
            type="text"
            name={field}
            value={value}
            onChange={handleChange}
            required
            placeholder={`Uploaded ${label.toLowerCase()} URL will appear here`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
          />

          <button
            type="button"
            onClick={() => openCloudinaryWidget(field)}
            disabled={uploadingField === field}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#17599d] text-white hover:bg-[#12467d] disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploadingField === field ? "Uploading..." : `Upload ${label}`}
          </button>

          {value ? (
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4" />
                Preview
              </div>
              <img
                src={value}
                alt={label}
                className="w-full h-40 object-cover rounded-md border"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-8">
        <div className="flex justify-between items-center px-8 py-6 border-b sticky top-0 bg-gradient-to-r from-[#17599d] to-[#0f3a5f] z-10 rounded-t-xl">
          <h2 className="text-3xl font-bold text-white">
            {caseStudy ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 py-8 max-h-[80vh] overflow-y-auto space-y-8"
        >
          <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-gray-100"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Subtitle *
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                {renderImageField("Image", "image", formData.image)}
                {renderImageField(
                  "Hero Image",
                  "heroImage",
                  formData.heroImage,
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Industry *
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Healthcare"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Business Function *
                </label>
                <input
                  type="text"
                  name="businessFunction"
                  value={formData.businessFunction}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Operations"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
            </div>
          </section>

          {/* --- Client Info --- */}
          <section className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              Client Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Industry
                </label>
                <input
                  type="text"
                  name="clientIndustry"
                  value={formData.clientIndustry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Market
                </label>
                <input
                  type="text"
                  name="clientMarket"
                  value={formData.clientMarket}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Technology
                </label>
                <input
                  type="text"
                  name="clientTechnology"
                  value={formData.clientTechnology}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </section>

          {/* --- NutShell --- */}
          <section className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              NutShell
            </h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Challenges
                </label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Solution
                </label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
            </div>
          </section>

          {/* --- Deep Dive --- */}
          <section className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              Deep Dive
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Overview
                  </label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Client
                  </label>
                  <textarea
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Challenge
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Key Constraints
                </label>
                <textarea
                  name="keyConstraints"
                  value={formData.keyConstraints}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                  placeholder="- First constraint&#10;- Second constraint&#10;- Third constraint"
                />
              </div>
            </div>
          </section>

          {/* --- Solution (JSON) --- */}
          <section className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-lg border border-red-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-[#17599d]">
              <h3 className="text-xl font-bold text-[#17599d]">
                Solution Agents
              </h3>
              <button
                type="button"
                onClick={() => addJsonItem("solutionAgents")}
                className="flex items-center gap-2 text-sm bg-[#17599d] text-white px-4 py-2 rounded-lg hover:bg-[#12467d] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" /> Add Agent
              </button>
            </div>
            <div className="space-y-4">
              {formData.solutionAgents.map((agent, index) => (
                <div
                  key={index}
                  className="p-5 border-2 border-gray-300 rounded-lg bg-white hover:border-[#17599d] transition-all duration-200 relative group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                      Agent {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeJsonItem(index, "solutionAgents")}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete Agent"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Agent Title"
                    value={agent.title}
                    onChange={(e) =>
                      handleJsonChange(
                        index,
                        "title",
                        e.target.value,
                        "solutionAgents",
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 mb-3 bg-white"
                  />
                  <textarea
                    placeholder="Agent Description"
                    value={agent.description}
                    onChange={(e) =>
                      handleJsonChange(
                        index,
                        "description",
                        e.target.value,
                        "solutionAgents",
                      )
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* --- Tech Stack (JSON) --- */}
          <section className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-[#17599d]">
              <h3 className="text-xl font-bold text-[#17599d]">Tech Stack</h3>
              <button
                type="button"
                onClick={() => addJsonItem("tech")}
                className="flex items-center gap-2 text-sm bg-[#17599d] text-white px-4 py-2 rounded-lg hover:bg-[#12467d] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" /> Add Tech Item
              </button>
            </div>
            <div className="space-y-4">
              {formData.tech.map((item, index) => (
                <div
                  key={index}
                  className="p-5 border-2 border-gray-300 rounded-lg bg-white hover:border-[#17599d] transition-all duration-200 relative group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                      Tech {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeJsonItem(index, "tech")}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete Tech Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Tech Title (e.g. Backend)"
                    value={item.title}
                    onChange={(e) =>
                      handleJsonChange(index, "title", e.target.value, "tech")
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 mb-3 bg-white"
                  />
                  <textarea
                    placeholder="Tech Details (e.g. Node.js, Prisma)"
                    value={item.description}
                    onChange={(e) =>
                      handleJsonChange(
                        index,
                        "description",
                        e.target.value,
                        "tech",
                      )
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* --- What Made the Solution Unique --- */}
          <section className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              What Made the Solution Unique
            </h3>
            <div>
              <textarea
                name="uniqueSolution"
                value={formData.uniqueSolution}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                placeholder="- Unique feature 1&#10;- Unique feature 2&#10;- Unique feature 3"
              />
            </div>
          </section>

          {/* --- Results --- */}
          <section className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-lg border border-teal-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              Results
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Final Results
                </label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
            </div>
          </section>

          {/* --- Summary --- */}
          <section className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-6 rounded-lg border border-pink-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">
              Summary
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  SEO Summary / Footer Brief
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 sticky bottom-0 bg-gradient-to-r from-gray-50 to-white py-6 px-8 border-t-2 border-gray-300 z-10 rounded-lg shadow-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-500 font-semibold transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-[#17599d] to-[#12467d] text-white rounded-lg hover:from-[#12467d] hover:to-[#0f3a5f] disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading
                ? "Saving..."
                : caseStudy
                  ? "Update Case Study"
                  : "Create Case Study"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
