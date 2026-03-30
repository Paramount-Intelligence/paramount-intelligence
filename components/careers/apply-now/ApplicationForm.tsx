"use client";

import { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Build FormData for multipart upload (to include resume file)
      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("position", formData.position);
      payload.append("experience", formData.experience);
      if (formData.linkedIn) payload.append("linkedIn", formData.linkedIn);
      if (formData.portfolio) payload.append("portfolio", formData.portfolio);
      payload.append("coverLetter", formData.coverLetter);
      if (formData.resume) {
        payload.append("resume", formData.resume as File);
      }

      const response = await fetch("/api/send-application-email", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "🎉 Application submitted successfully! We'll review your application and get back to you within 3-5 business days. A confirmation email has been sent to your email address.",
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          linkedIn: "",
          portfolio: "",
          experience: "",
          coverLetter: "",
          resume: null,
        });
      } else {
        setMessage(
          `❌ Error submitting application: ${data.message || "Please try again later."}`,
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("❌ Error submitting application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Application Form
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you soon
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="John"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Position & Experience */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Position Applied For *
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
              >
                <option value="">Select a position</option>
                <option value="Senior AI Engineer">Senior AI Engineer</option>
                <option value="Machine Learning Engineer">
                  Machine Learning Engineer
                </option>
                <option value="AI Product Manager">AI Product Manager</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="AI Solutions Architect">
                  AI Solutions Architect
                </option>
                <option value="AI & Automation Intern">
                  AI & Automation Intern
                </option>
                <option value="Business Consulting Intern">
                  Business Consulting Intern
                </option>
                <option value="Marketing & Personal Branding Intern">
                  Marketing & Personal Branding Intern
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Years of Experience *
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-7">5-7 years</option>
                <option value="7+">7+ years</option>
              </select>
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="linkedIn"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label
                  htmlFor="portfolio"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Portfolio/GitHub
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="https://github.com/yourprofile"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Resume/CV * (PDF, DOC, DOCX - Max 5MB)
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Letter / Why do you want to join us? *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Tell us about yourself and why you're interested in this position..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application"}
            </button>

            {message && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                {message}
              </div>
            )}

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and
              consent to be contacted regarding your application.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
