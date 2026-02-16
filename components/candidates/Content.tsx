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
        "At Paramount Intelligence, we believe in results, not just location. While we prefer an on-site collaborative environment, we offer flexibility for exceptional candidates who demonstrate the ability to drive innovation and results. Enjoy the opportunity to contribute to impactful projects while finding a work-life balance that suits you, all while being part of a dynamic and forward-thinking team.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth and Learning",
      description:
        "With over a decade of experience, we are leaders in AI and technology consulting. Joining us means you'll work alongside experts who are constantly pushing the limits of what's possible. Whether it's through mentorship, hands-on project involvement, or training programs, you will always be learning and growing in a dynamic, ever-evolving field.",
    },
    {
      icon: Target,
      title: "Real Impact from Day One",
      description:
        "You won't just be a part of a team—you will be part of the driving force behind transforming industries. At Paramount Intelligence, we empower you to take on real responsibilities early on, contribute to high-impact projects, and develop solutions that solve some of the most complex challenges facing businesses today.",
    },
    {
      icon: Users,
      title: "Collaborative and Inclusive Culture",
      description:
        "We believe in working as one team, regardless of where we are located. Our collaborative approach allows you to engage with colleagues and clients from around the world. Every voice is valued, and diverse perspectives lead to better ideas and stronger solutions. We focus on creating a positive, inclusive environment where everyone's ideas are heard.",
    },
    {
      icon: Heart,
      title: "Work-Life Balance, Reimagined",
      description:
        "At Paramount Intelligence, your well-being is a top priority. We foster a culture that values not only your professional growth but your personal life as well. Enjoy a flexible schedule, a healthy work-life balance, and the freedom to manage your time in a way that supports both your career and your life outside of work.",
    },
  ];

  const whyChoose = [
    {
      icon: Rocket,
      title: "Impactful Projects",
      description:
        "Tackle innovative, cutting-edge projects in AI, automation, and data analytics that shape the future of business.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Work with diverse teams across the globe, collaborating with top-tier organizations and thought leaders in the industry.",
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
        "Thrive in a culture that supports not only your career ambitions but also your mental, emotional, and physical well-being.",
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
            Ready to Join a Community of Innovators?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            At Paramount Intelligence, we're building the future of AI and
            automation—and we want you to be a part of it. If you're looking for
            a place where your ideas matter, where you can collaborate with
            bright minds, and where you can grow at the forefront of technology,
            you've found the right place.
          </p>
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-900">
              Let's work together to shape the future.
            </p>
            <Link
              href="/careers/open-positions"
              className="inline-block bg-[#17599d] text-white px-12 py-4 text-lg font-semibold rounded hover:bg-[#144a75] transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Career Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
