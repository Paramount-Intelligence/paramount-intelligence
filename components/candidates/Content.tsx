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
        " Collaborate with top-tier companies globally, gaining exposure to diverse markets and business challenges. You'll work with experts from around the world, expanding your knowledge base and growing your network.",
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
    <div className="bg-white">
      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              Whether you're developing next-gen AI systems or streamlining
              enterprise automation, every project you take on has the potential
              to transform industries.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Expect Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            What You Can Expect Working with Us
          </h2>
          <div className="w-24 h-1 bg-[#17599d] mx-auto mb-16"></div>

          <div className="space-y-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-[#17599d] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white   " />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
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
      <section className="py-20 bg-linear-to-br from-[#17599d] to-[#0c3a6a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Why Choose Paramount Intelligence?
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-[#17599d] bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-900 leading-relaxed">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            At Paramount Intelligence, we're building the future of technology,
            and we want you to be a part of it. If you're passionate about
            solving complex problems, collaborating with brilliant minds, and
            making a real impact, join us in shaping the future of intelligent
            technology.
          </p>
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-900">
              Let’s work together to innovate and transform industries.
            </p>
            <Link
              href="/careers/open-positions"
              className="inline-block bg-[#17599d] text-white px-12 py-4 text-lg font-semibold rounded hover:bg-[#144a75] transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
