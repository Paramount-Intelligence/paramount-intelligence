"use client";

import Link from "next/link";
import Image from "next/image";
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
      { name: "FAQ for Candidates", href: "/faq" },
    ],
    business: [
      { name: "Industries", href: "/industries" },
      { name: "Services", href: "/services" },
      { name: "Case Studies", href: "/case-studies" },
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
    <footer
      className="relative overflow-hidden"
      style={{ background: "#060d1a" }}
    >
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(30,111,217,0.5), rgba(59,136,245,0.5), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(30,111,217,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-16 pb-6">
        {/* Top row: brand + tagline */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image
                src="/images/logo.png"
                alt="Paramount Intelligence"
                width={40}
                height={40}
                className="rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="text-white font-bold text-lg tracking-tight">
                Paramount Intelligence
              </span>
            </Link>
            <p style={{ color: "#8fa4c4" }} className="text-sm leading-relaxed">
              A Technology Consulting &amp; Engineering firm delivering AI, Data,
              Cloud, and Automation solutions that drive measurable business
              impact.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {footerLinks.social.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                  aria-label={link.name}
                >
                  <Icon size={18} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#3b88f5" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    prefetch={link.href.startsWith("/") ? false : undefined}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "#8fa4c4" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For candidates */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#3b88f5" }}
            >
              For Candidates
            </h3>
            <ul className="space-y-3">
              {footerLinks.candidates.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "#8fa4c4" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For business */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#3b88f5" }}
            >
              For Business
            </h3>
            <ul className="space-y-3">
              {footerLinks.business.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    prefetch={link.href.startsWith("/") ? false : undefined}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "#8fa4c4" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(30,111,217,0.3), transparent)",
          }}
        />

        {/* Social hover CSS */}
        <style>{`
          .footer-social-btn {
            background: rgba(30,111,217,0.12);
            border: 1px solid rgba(30,111,217,0.25);
            color: #8fa4c4;
          }
          .footer-social-btn:hover {
            background: rgba(30,111,217,0.3);
            color: #ffffff;
          }
        `}</style>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#4a6080" }}>
            © {new Date().getFullYear()} Paramount Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e6fd9]" />
            <p className="text-xs" style={{ color: "#4a6080" }}>
              Technology Consulting &amp; Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
