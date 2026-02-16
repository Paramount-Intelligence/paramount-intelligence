"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of roles are available at Paramount Intelligence?",
      answer:
        "At Paramount Intelligence, we offer a range of roles across multiple service areas, including AI Solutions & Engineering, AI Strategy & Consulting, Data Analytics, Cloud Services, and Workflow Automation. Positions range from technical experts to consulting roles and leadership opportunities. Check our Careers page for the latest available positions.",
      link: "/careers/open-positions",
      linkText: "View Open Positions",
    },
    {
      question:
        "Is it mandatory to have experience in AI, data, or automation to apply?",
      answer:
        "While experience in AI, data analytics, or automation can be helpful, we value diverse perspectives and skill sets. We welcome candidates from different industries who are passionate about solving complex problems with technology. We provide opportunities for skill development and growth in emerging technologies.",
    },
    {
      question: "What is the company culture like at Paramount Intelligence?",
      answer:
        "Our culture is dynamic, innovative, and deeply collaborative. At Paramount Intelligence, we focus on driving results, delivering high-impact solutions for our clients, and maintaining a flexible, inclusive work environment. We value learning, accountability, and work-life balance, with the opportunity to work on diverse and challenging projects across different industries.",
    },
    {
      question:
        "How can I grow and develop my career at Paramount Intelligence?",
      answer:
        "At Paramount Intelligence, we are committed to your continuous learning and growth. You'll work alongside experts in AI, data analytics, cloud, and automation, and have access to a variety of training resources, mentorship opportunities, and challenging projects. Whether through formal training or hands-on project experience, we ensure that our team members have the tools they need to thrive.",
    },
    {
      question: "What kind of projects will I work on?",
      answer:
        "Our projects span across a wide range of industries including technology, finance, healthcare, manufacturing, and retail. You'll work on impactful initiatives such as AI-driven solutions, cloud-based automation, data infrastructure, and more. You'll help shape innovative, high-performing systems for companies at the forefront of their industries.",
    },
    {
      question: "How do I apply to join Paramount Intelligence?",
      answer:
        "To apply, visit our Careers page, where you can submit your resume and cover letter for the role you're interested in. If no roles align with your skills, you can also send a general inquiry. We're always open to connecting with talented professionals who share our passion for innovation and technology.",
      link: "/careers/open-positions",
      linkText: "Apply Now",
    },
    {
      question: "What is the interview process like?",
      answer:
        "The process typically involves an initial screening call, followed by interviews with team members or hiring managers. We may include a technical assessment for relevant roles and discussions around how your skills and experiences align with the needs of Paramount Intelligence. We focus on your approach to problem-solving and understanding of the role, as well as how you fit within our company culture.",
    },
    {
      question: "Can I work on projects across multiple industries?",
      answer:
        "Yes! Our team works across diverse industries, and we encourage cross-industry collaboration. You'll have the chance to engage in projects across sectors like healthcare, finance, e-commerce, manufacturing, and more. This breadth of experience will expand your knowledge base and provide you with a well-rounded career.",
    },
    {
      question: "Do you provide training and development for employees?",
      answer:
        "Yes, we provide ample opportunities for continuous development. Whether it's through specialized training in AI, cloud services, or data analytics, or by working on cutting-edge projects, we ensure you have the tools and resources you need to excel. We also offer mentorship programs to help you grow and advance in your career.",
    },
    {
      question: "How long is the hiring process?",
      answer:
        "Our hiring process typically takes 2-4 weeks, but it may vary depending on the role and number of candidates. We ensure clear communication throughout the process, keeping you informed every step of the way.",
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
