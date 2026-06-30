"use client";
import Link from "next/link";
import {
  Lightbulb,
  TrendingUp,
  Target,
  Users,
  Heart,
  Rocket,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

export default function CandidatesContent() {
  const benefits = [
    {
      icon: Lightbulb,
      title: "Freedom to Innovate",
      description:
        "We believe in results, not just location. While we prioritize on-site collaboration for effective communication and team cohesion, we offer flexibility for exceptional candidates who prove they can drive innovation and deliver impact. Whether it's designing cutting-edge AI systems or architecting scalable data solutions, you'll have the freedom to innovate and experiment while contributing to transformative projects.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth & Development",
      description:
        "At Paramount Intelligence, you'll work alongside experts in AI, data, and technology. With over a decade of experience leading complex transformations, we provide an environment where you can grow your skills through hands-on work, mentorship, and training. Every project will challenge you, push your boundaries, and allow you to thrive in a fast-paced, ever-evolving field.",
    },
    {
      icon: Target,
      title: "Real Impact from Day One",
      description:
        "As part of our team, you'll immediately take on meaningful projects that shape industries. You won’t just be another cog in the machine; you'll be an integral part of our mission to solve real-world business challenges. Whether it's optimizing AI workflows or improving data architectures, your contributions will drive lasting operational impact.",
    },
    {
      icon: Users,
      title: "Collaborative and Inclusive Culture",
      description:
        "We foster a culture of collaboration, where every voice is heard. Working with diverse, cross-functional teams, you will engage with colleagues and clients from across the globe. We value different perspectives and believe that diversity drives innovation. Our inclusive environment is built on transparency, respect, and a shared commitment to delivering excellence.",
    },
    {
      icon: Heart,
      title: "Work-Life Balance, Reimagined",
      description:
        "While our work is challenging and rewarding, we also understand the importance of balance. At Paramount Intelligence, we offer flexible schedules, health and wellness support, and the ability to manage your career and personal life in a way that suits you.",
    },
  ];

  const whyChoose = [
    {
      icon: Rocket,
      title: "Impactful Projects",
      description:
        "Work on high-impact projects across industries such as technology, finance, healthcare, manufacturing, and e-commerce. Help businesses leverage AI, data, and cloud solutions to drive sustainable growth and efficiency.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        " Collaborate with top-tier companies globally, gaining exposure to diverse markets and business challenges. You'll work with experts from around the world, expanding your network.",
    },
    {
      icon: Award,
      title: "Career Advancement",
      description:
        "Gain unparalleled experience in the tech space while being mentored by seasoned professionals dedicated to your growth.",
    },
    {
      icon: Sparkles,
      title: "Human-Centered Culture",
      description:
        "Thrive in a workplace that supports your professional ambitions and personal well-being. Paramount Intelligence is committed to fostering a healthy, positive work environment where everyone can thrive.",
    },
  ];

  return (
    <div className="w-full">
      {/* Introduction & Expectation Section */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
        <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
              Whether you're developing next-gen AI systems or streamlining
              enterprise automation, every project you take on has the potential
              to transform industries.
            </p>
          </div>

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="accent-line" style={{ background: "#1e6fd9" }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#1e6fd9" }}
              >
                Benefits
              </span>
              <div className="accent-line" style={{ background: "#1e6fd9" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#0d1f3c" }}>
              What You Can Expect Working with Us
            </h2>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 items-start bg-white p-6 md:p-8 rounded-2xl border border-[rgba(30,111,217,0.15)] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,111,217,0.1)" }}>
                      <Icon className="w-6 h-6 text-[#1e6fd9]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold" style={{ color: "#0d1f3c" }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #060d1a 0%, #0d1f3c 40%, #152d56 80%, #0d1f3c 100%)",
        }}
      >
        <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #1e6fd9 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="accent-line" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#6ba8ff" }}
              >
                Why Us
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Why Choose Paramount Intelligence?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-dark p-8 rounded-2xl border border-[rgba(30,111,217,0.18)] hover-glow-blue"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-[rgba(30,111,217,0.15)] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#6ba8ff]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#b5c8e2" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#cbced1" }}>
        <div className="absolute inset-0 geo-dots opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1e6fd9" }}
            >
              Get In Touch
            </span>
            <div className="accent-line" style={{ background: "#1e6fd9" }} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#0d1f3c" }}>
            Ready to Make an Impact?
          </h2>
          
          <p className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
            At Paramount Intelligence, we're building the future of technology,
            and we want you to be a part of it. If you're passionate about
            solving complex problems, collaborating with brilliant minds, and
            making a real impact, join us in shaping the future of intelligent
            technology.
          </p>

          <div className="pt-4 space-y-4">
            <p className="text-xl font-bold" style={{ color: "#0d1f3c" }}>
              Let’s work together to innovate and transform industries.
            </p>
            <div>
              <Link
                href="/careers/open-positions"
                className="btn-primary text-sm inline-flex"
              >
                Apply Now
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
