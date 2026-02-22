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
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {index + 1}. {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="shrink-0 w-6 h-6 text-[#17599d]" />
                ) : (
                  <ChevronDown className="shrink-0 w-6 h-6 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  {faq.link && (
                    <Link
                      href={faq.link}
                      className="inline-flex items-center text-[#17599d] font-semibold hover:underline"
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
        <div className="mt-16 bg-linear-to-r from-[#17599d] to-[#0c3a6a] p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help.
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-white text-[#17599d] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
