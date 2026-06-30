"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What roles are available at Paramount Intelligence?",
      answer:
        "We offer roles in AI strategy, data analytics, cloud services, AI solutions engineering, and workflow automation. Check our Careers page for the latest available positions.",
      link: "/careers/open-positions",
      linkText: "View Open Positions",
    },
    {
      question:
        "Do I need prior experience in AI, data, or automation to apply?",
      answer:
        "While experience in AI or data analytics is valuable, we also encourage candidates from diverse backgrounds who are passionate about technology and eager to learn. We provide extensive training and mentorship.",
    },
    {
      question: "What is the company culture like?",
      answer:
        "Paramount Intelligence fosters a dynamic, innovative, and collaborative culture. We prioritize results while maintaining work-life balance and providing opportunities for growth and development.",
    },
    {
      question: "What kind of projects will I work on?",
      answer:
        "You’ll work on high-impact, real-world projects in AI, data analytics, cloud solutions, and automation. Projects span across diverse industries, enabling you to tackle complex challenges and contribute to innovative business solutions.",
    },
    {
      question: "How can I grow my career at Paramount Intelligence?",
      answer:
        "We offer continuous learning and career development opportunities, including mentorship from senior leaders, specialized training, and the chance to work on cutting-edge technology projects.",
    },
    {
      question: "How do I apply?",
      answer:
        "Visit our Careers page to submit your resume and cover letter for available roles. We’re always open to connecting with talented professionals passionate about technology and innovation.",
      link: "/careers/open-positions",
      linkText: "Apply Now",
    },
    {
      question: "What is the interview process like?",
      answer:
        "Our process typically includes a screening call, followed by interviews with team members or hiring managers. Depending on the role, there may be a technical assessment or case study.",
    },
    {
      question: "Can I work across multiple industries?",
      answer:
        "Yes! We work across various industries, including technology, fintech, e-commerce, manufacturing, and more. You’ll have the chance to gain cross-industry experience and expand your skill set.",
    },
    {
      question: "Do you offer training and development opportunities?",
      answer:
        "Yes, we prioritize continuous learning. You'll have access to a variety of resources, mentorship, and hands-on projects to support your professional growth.",
    },
    {
      question: "How long does the hiring process take?",
      answer:
        "The process typically takes 2-4 weeks, but may vary depending on the role and number of candidates. We will keep you informed throughout the process.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
      <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-base sm:text-lg font-bold pr-4" style={{ color: "#0d1f3c" }}>
                  {index + 1}. {faq.question}
                </span>
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: openIndex === index ? "rgba(30,111,217,0.1)" : "rgba(0,0,0,0.04)",
                  }}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-[#1e6fd9]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 animate-slide-down">
                  <div
                    className="w-full h-px mb-4"
                    style={{ background: "rgba(30,111,217,0.1)" }}
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  {faq.link && (
                    <Link
                      href={faq.link}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6fd9] hover:underline"
                    >
                      {faq.linkText} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 bg-gradient-navy rounded-2xl p-10 md:p-12 text-center border border-[rgba(30,111,217,0.25)] shadow-2xl relative overflow-hidden text-white">
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-sm mb-8 max-w-2xl mx-auto" style={{ color: "#b5c8e2" }}>
            Can't find the answer you're looking for? Our team is here to help.
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div>
            <Link
              href="/contact-us"
              className="btn-primary text-sm inline-flex"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
