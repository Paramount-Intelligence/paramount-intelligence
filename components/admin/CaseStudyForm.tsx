"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Upload, Image as ImageIcon, ChevronDown, Check } from "lucide-react";
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
  industry: string | string[];
  businessFunction: string | string[];
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
  industry: string[];
  businessFunction: string[];
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
  "Industrial Manufacturing & Distribution",
];

const businessFunctions = [
  "CRM Automation", "Email Processing", "Investor Relations", "Data Structuring",
  "Legal Review", "Contract Management", "Risk Analysis", "Procurement",
  "Customer Support", "Infrastructure Engineering", "AI Operations", "Marketing Analytics",
  "Product Analytics", "A/B Testing", "Data Engineering", "Recruitment", "Operations",
  "AI Training", "Workflow Automation", "Marketing", "Content Production",
  "Creative Automation", "Personal Productivity", "Email Management", "Calendar Management",
  "Pricing Strategy", "Revenue Management", "Marketplace Operations", "Fraud Prevention",
  "Risk Management", "Customer Segmentation", "Promotional Strategy", "Supply Planning",
  "Demand Management", "Customer Experience", "Real-Time Analytics", "Cost Management",
  "Engineering", "Market Research", "Financial Inclusion", "Credit Risk", "Lending",
  "Customer Retention", "Brand Management", "Cost Reduction", "Self-Service",
  "Email Automation", "Ticket Management", "Staffing", "Workforce Planning",
  "Sales Operations", "Lead Generation", "Revenue Growth", "Process Improvement",
  "HR Operations", "Onboarding", "Customer Engagement", "Digital Banking",
  "Product Discovery", "Investment Strategy", "Property Management", "Listing Optimization",
  "Business Intelligence", "Executive Reporting", "Competitive Intelligence",
  "Patient Advocacy", "Insurance Navigation", "Healthcare Operations",
];

// ─── Multi-Select Dropdown Component ───────────────────────────────────────

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}

function MultiSelect({ label, options, selected, onChange, required }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeTag = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label} {required && "*"}
      </label>

      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map((val) => (
            <span
              key={val}
              className="inline-flex items-center gap-1 bg-[#17599d] text-white text-xs px-2.5 py-1 rounded-full"
            >
              {val}
              <button
                type="button"
                onClick={() => removeTag(val)}
                className="hover:text-red-200 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-[#17599d] focus:outline-none focus:ring-2 focus:ring-[#17599d] transition-all duration-200 text-sm text-gray-700"
      >
        <span className={selected.length === 0 ? "text-gray-400" : ""}>
          {selected.length === 0
            ? `Select ${label}`
            : `${selected.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 flex flex-col">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#17599d]"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-4">No results found</p>
            ) : (
              filtered.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-blue-50 transition-colors ${
                      isSelected ? "bg-blue-50 text-[#17599d] font-medium" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#17599d] border-[#17599d]"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </span>
                    {option}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">{selected.length} selected</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-[#17599d] font-medium hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Click-outside overlay */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const toArray = (value: string | string[] | null | undefined): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};

// ─── Main Form ───────────────────────────────────────────────────────────────

interface CaseStudyFormProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyForm({ caseStudy, onClose }: CaseStudyFormProps) {
  const [formData, setFormData] = useState<FormState>({
    slug: "",
    title: "",
    subtitle: "",
    image: "",
    heroImage: "",
    industry: [],
    businessFunction: [],
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
  const [uploadingField, setUploadingField] = useState<"image" | "heroImage" | null>(null);

  useEffect(() => {
    if (caseStudy) {
      setSlugManuallyEdited(false);
      setFormData({
        ...caseStudy,
        industry: toArray(caseStudy.industry),
        businessFunction: toArray(caseStudy.businessFunction),
        clientName: caseStudy.clientName ?? "",
        clientIndustry: caseStudy.clientIndustry ?? "",
        clientMarket: caseStudy.clientMarket ?? "",
        clientTechnology: caseStudy.clientTechnology ?? "",
        overview: caseStudy.overview ?? "",
        client: caseStudy.client ?? "",
        challenge: caseStudy.challenge ?? "",
        keyConstraints: caseStudy.keyConstraints ?? "N/A",
        solutionAgents: caseStudy.solutionAgents ?? [{ title: "", description: "" }],
        uniqueSolution: caseStudy.uniqueSolution ?? "N/A",
        tech: caseStudy.tech ?? [{ title: "", description: "" }],
        results: caseStudy.results ?? "N/A",
        summary: caseStudy.summary ?? "",
      });
    }
  }, [caseStudy]);

  useEffect(() => {
    if (document.getElementById("cloudinary-upload-widget")) return;
    const script = document.createElement("script");
    script.id = "cloudinary-upload-widget";
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "slug") setSlugManuallyEdited(true);
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !slugManuallyEdited) updated.slug = generateSlug(value);
      return updated;
    });
  };

  const handleMultiSelect = (field: "industry" | "businessFunction", values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleJsonChange = (
    index: number,
    field: string,
    value: string,
    type: "solutionAgents" | "tech"
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });
      if (!signatureRes.ok) throw new Error("Failed to get upload signature");
      const { signature, apiKey, cloudName, folder } = await signatureRes.json();

      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName, apiKey, folder,
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
            setFormData((prev) => ({ ...prev, [field]: result.info.secure_url }));
            setUploadingField(null);
          }
          if (result?.event === "close") setUploadingField(null);
        }
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
      const payload = {
      ...formData,
      industry: formData.industry.join(", "),
      businessFunction: formData.businessFunction.join(", "),
    };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  const renderImageField = (label: string, field: "image" | "heroImage", value: string) => (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-2 block">{label} *</label>
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
        {value && (
          <div className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4" /> Preview
            </div>
            <img src={value} alt={label} className="w-full h-40 object-cover rounded-md border" />
          </div>
        )}
      </div>
    </div>
  );

  const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-all duration-200 bg-white";
  const textareaCls = `${inputCls} resize-none`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b sticky top-0 bg-gradient-to-r from-[#17599d] to-[#0f3a5f] z-10 rounded-t-xl">
          <h2 className="text-3xl font-bold text-white">
            {caseStudy ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 max-h-[80vh] overflow-y-auto space-y-8">

          {/* Basic Information */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputCls} />
              </div>
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Slug *</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className={`${inputCls} bg-gray-100`} />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Subtitle *</label>
                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required className={inputCls} />
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                {renderImageField("Image", "image", formData.image)}
                {renderImageField("Hero Image", "heroImage", formData.heroImage)}
              </div>

              {/* ── Multi-Select Dropdowns ── */}
              <div>
                <MultiSelect
                  label="Industry"
                  options={industries}
                  selected={formData.industry}
                  onChange={(v) => handleMultiSelect("industry", v)}
                  required
                />
              </div>
              <div>
                <MultiSelect
                  label="Business Function"
                  options={businessFunctions}
                  selected={formData.businessFunction}
                  onChange={(v) => handleMultiSelect("businessFunction", v)}
                  required
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className={textareaCls} />
              </div>
            </div>
          </section>

          {/* Client Info */}
          <section className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">Client Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(["clientName", "clientIndustry", "clientMarket", "clientTechnology"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block capitalize">
                    {field.replace("client", "").replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input type="text" name={field} value={formData[field]} onChange={handleChange} className={inputCls} />
                </div>
              ))}
            </div>
          </section>

          {/* NutShell */}
          <section className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">NutShell</h3>
            <div className="space-y-5">
              {(["challenges", "solution", "benefits"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block capitalize">{field}</label>
                  <textarea name={field} value={formData[field]} onChange={handleChange} rows={4} className={textareaCls} />
                </div>
              ))}
            </div>
          </section>

          {/* Deep Dive */}
          <section className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">Deep Dive</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(["overview", "client"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block capitalize">{field}</label>
                    <textarea name={field} value={formData[field]} onChange={handleChange} rows={4} className={textareaCls} />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Challenge</label>
                <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows={4} className={textareaCls} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Key Constraints</label>
                <textarea name="keyConstraints" value={formData.keyConstraints} onChange={handleChange} rows={5} className={textareaCls} placeholder="- First constraint&#10;- Second constraint" />
              </div>
            </div>
          </section>

          {/* Solution Agents */}
          <section className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-lg border border-red-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-[#17599d]">
              <h3 className="text-xl font-bold text-[#17599d]">Solution Agents</h3>
              <button type="button" onClick={() => addJsonItem("solutionAgents")} className="flex items-center gap-2 text-sm bg-[#17599d] text-white px-4 py-2 rounded-lg hover:bg-[#12467d] transition-all duration-200 shadow-md">
                <Plus className="w-5 h-5" /> Add Agent
              </button>
            </div>
            <div className="space-y-4">
              {formData.solutionAgents.map((agent, index) => (
                <div key={index} className="p-5 border-2 border-gray-300 rounded-lg bg-white hover:border-[#17599d] transition-all duration-200 relative group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">Agent {index + 1}</span>
                    <button type="button" onClick={() => removeJsonItem(index, "solutionAgents")} className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input type="text" placeholder="Agent Title" value={agent.title} onChange={(e) => handleJsonChange(index, "title", e.target.value, "solutionAgents")} className={`${inputCls} mb-3`} />
                  <textarea placeholder="Agent Description" value={agent.description} onChange={(e) => handleJsonChange(index, "description", e.target.value, "solutionAgents")} rows={3} className={textareaCls} />
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-[#17599d]">
              <h3 className="text-xl font-bold text-[#17599d]">Tech Stack</h3>
              <button type="button" onClick={() => addJsonItem("tech")} className="flex items-center gap-2 text-sm bg-[#17599d] text-white px-4 py-2 rounded-lg hover:bg-[#12467d] transition-all duration-200 shadow-md">
                <Plus className="w-5 h-5" /> Add Tech Item
              </button>
            </div>
            <div className="space-y-4">
              {formData.tech.map((item, index) => (
                <div key={index} className="p-5 border-2 border-gray-300 rounded-lg bg-white hover:border-[#17599d] transition-all duration-200 relative group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">Tech {index + 1}</span>
                    <button type="button" onClick={() => removeJsonItem(index, "tech")} className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input type="text" placeholder="Tech Title (e.g. Backend)" value={item.title} onChange={(e) => handleJsonChange(index, "title", e.target.value, "tech")} className={`${inputCls} mb-3`} />
                  <textarea placeholder="Tech Details (e.g. Node.js, Prisma)" value={item.description} onChange={(e) => handleJsonChange(index, "description", e.target.value, "tech")} rows={3} className={textareaCls} />
                </div>
              ))}
            </div>
          </section>

          {/* What Made the Solution Unique */}
          <section className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">What Made the Solution Unique</h3>
            <textarea name="uniqueSolution" value={formData.uniqueSolution} onChange={handleChange} rows={5} className={textareaCls} />
          </section>

          {/* Results & Summary */}
          <section className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-lg border border-teal-200">
            <h3 className="text-xl font-bold text-[#17599d] mb-5 pb-3 border-b-2 border-[#17599d]">Results & Summary</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Results</label>
                <textarea name="results" value={formData.results} onChange={handleChange} rows={5} className={textareaCls} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Summary</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} rows={4} className={textareaCls} />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-[#17599d] text-white rounded-lg hover:bg-[#12467d] disabled:opacity-50 transition-all duration-200 font-medium shadow-md">
              {loading ? "Saving..." : caseStudy ? "Update Case Study" : "Create Case Study"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}