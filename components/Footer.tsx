import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    company: [
      { name: "About us", href: "/about-us" },
      { name: "Blog", href: "https://transformwithtechnology.beehiiv.com/" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Contact us", href: "/contact-us" },
    ],
    candidates: [
      { name: "For Candidates", href: "/for-candidates" },
      { name: "Candidates: Frequently Asked Questions", href: "/faq" },
      // {
      //   name: "Remote practices for better work-life balance",
      //   href: "#",
      // },
    ],
    business: [
      { name: "Industries", href: "/industries" },
      { name: "Services", href: "/services" },
      { name: "Case studies", href: "/case-studies" },
      {
        name: "Hire Us through Toptal",
        href: "https://www.toptal.com/developers/resume/syed-ali-azzam#M5nb10",
      },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/paramount-intelligence-co/",
        icon: Linkedin,
      },
    ],
  };

  return (
    <footer className="bg-[#0a1628] text-gray-400 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-4 gap-8 mb-4">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For candidates */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              For candidates
            </h3>
            <ul className="space-y-3">
              {footerLinks.candidates.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For business */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              For business
            </h3>
            <ul className="space-y-3">
              {footerLinks.business.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Social Media
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <Icon size={18} />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500 text-center">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
