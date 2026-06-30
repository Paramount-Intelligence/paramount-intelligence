"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Contact form error:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#0d1f3c" }}>
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="ai-engineering">
                    AI Engineering Services
                  </option>
                  <option value="ai-consulting">
                    AI Consulting &amp; Advisory
                  </option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e6fd9] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-semibold">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-semibold">
                  Sorry, there was an error submitting your message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8 flex flex-col justify-between py-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0d1f3c" }}>
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-[rgba(30,111,217,0.15)] shadow-md">
                    <Mail className="w-5 h-5 text-[#1e6fd9]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1" style={{ color: "#0d1f3c" }}>
                      Email
                    </h3>
                    <a
                      href="mailto:contact@paramountintelligence.com"
                      className="text-sm text-gray-600 hover:text-[#1e6fd9] transition-colors font-medium"
                    >
                      paramountintelligence.central@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-[rgba(30,111,217,0.15)] shadow-md">
                    <Phone className="w-5 h-5 text-[#1e6fd9]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1" style={{ color: "#0d1f3c" }}>
                      Phone
                    </h3>
                    <a
                      href="tel:+16059712580"
                      className="text-sm text-gray-600 hover:text-[#1e6fd9] transition-colors font-medium"
                    >
                      +1 (605) 971-2580
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-[rgba(30,111,217,0.15)] shadow-md">
                    <MapPin className="w-5 h-5 text-[#1e6fd9]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1" style={{ color: "#0d1f3c" }}>
                      Office
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      9838 57th Ave, Corona,
                      <br />
                      New York (NY), 11373
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-lg space-y-4">
              <h3 className="text-lg font-bold" style={{ color: "#0d1f3c" }}>
                Book a Free Consultation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Schedule a 30-minute consultation to explore how intelligent
                systems, data analytics, cloud solutions, and automation can
                benefit your organization.
              </p>
              <div>
                <a
                  href="https://calendly.com/syedaliazzam/advisory?back=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-6 py-3 inline-flex"
                >
                  Schedule Consultation
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
