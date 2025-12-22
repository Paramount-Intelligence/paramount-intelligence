import Image from "next/image";
import Link from "next/link";

export default function ProjectExperience() {
  const projects = [
    {
      title:
        "Multi-channel AI Agent for personalized appointments in Healthcare",
      description:
        "A U.S. healthcare provider serving 120,000+ members across multiple states uses advanced technology to deliver high-quality, affordable care.",
      fullDescription:
        "By deploying a multi-channel, pre-appointment AI Agent, such doctor-new users tactic that first hours a week, while patient engagement has climbed over 25% thanks to personalized, accessible communication.",
      imageSrc: "/images/health.png",
      imagePosition: "right",
      link: "#healthcare-project",
    },
    {
      title: "Advanced RAG Engineering for real estate due diligence AI Agent",
      description:
        "US-based startup on a mission to transform how real estate developers conduct due diligence. By utilizing the power of artificial intelligence.",
      fullDescription:
        "AI Agent takes what used to be weeks of due diligence and gets it done in minutes, saving developers thousands of dollars per project while keeping the accuracy spot-on.",
      imageSrc: "/images/Mapline-cover-2.jpg",
      imagePosition: "left",
      link: "#real-estate-project",
    },
    {
      title:
        "Intelligent automation with actionable AI Agents for the US telecommunication company",
      description:
        "This US-based telecommunication provider with over 45 years of industry experience delivers fiber-powered Internet and video services to 150,000+ households in 200+ communities.",
      fullDescription:
        "The client based in Miami the right partner for their long-term transformation journey – one who helps them think big, test early, while staying grounded in a culture of continuous improvement. With tailored data-driven, coherent transformation without compromising on quality and inventiveness.",
      imageSrc: "/images/engineering.png",
      imagePosition: "right",
      link: "#telecom-project",
    },
    {
      title:
        "Swapping iron: making AI code designed from Nvidia run on Intel Gaudi",
      description:
        "Migrating Machine Learning and LLM solutions designed to run on Nvidia hardware to a different architecture - Intel Gaudi in accelerators.",
      fullDescription: "",
      imageSrc: "/images/Swap-Icon-cover.png",
      imagePosition: "left",
      link: "#migration-project",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          Some of our project experience:
        </h2>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                project.imagePosition === "left" ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div
                className={`space-y-4 ${
                  project.imagePosition === "left" ? "md:col-start-2" : ""
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
                {project.fullDescription && (
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {project.fullDescription}
                  </p>
                )}
                <Link
                  href={project.link}
                  className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  <span className="mr-2">/</span>
                  Read more
                </Link>
              </div>

              {/* Image */}
              <div
                className={`relative h-64 md:h-80 rounded-2xl overflow-hidden ${
                  project.imagePosition === "left"
                    ? "md:col-start-1 md:row-start-1"
                    : ""
                }`}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
