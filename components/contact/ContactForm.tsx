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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="ai-engineering">
                    AI Engineering Services
                  </option>
                  <option value="ai-consulting">
                    AI Consulting & Advisory
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
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17599d] focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">
                  Sorry, there was an error submitting your message. Please try
                  again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#17599d] text-white px-8 py-4 font-semibold hover:bg-[#144a75] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#17599d]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:contact@paramountintelligence.com"
                    className="text-gray-600 hover:text-[#17599d] transition-colors"
                  >
                    paramountintelligence.central@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#17599d]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+16059712580"
                    className="text-gray-600 hover:text-[#17599d] transition-colors"
                  >
                    +1 (605) 971-2580
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#17599d]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Office
                  </h3>
                  <p className="text-gray-600">
                    9838 57th Ave, Corona,
                    <br />
                    New York (NY), 11373
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Book a Free Consultation
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a complimentary 30-minute consultation to discuss your
                AI and automation needs. Our experts will help you understand
                the opportunities and create a roadmap for success.
              </p>
              <a
                href="https://calendly.com/syedaliazzam/advisory?back=1"
                className="inline-block bg-[#17599d] text-white px-6 py-3 font-semibold hover:bg-[#144a75] transition-colors"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
