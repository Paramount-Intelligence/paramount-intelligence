import Image from "next/image";
import Link from "next/link";
import { caseStudiesData } from "@/lib/caseStudiesData";

export default function ProjectExperience() {
  // Get 4 random case studies
  const getRandomCaseStudies = () => {
    const shuffled = [...caseStudiesData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const projects = getRandomCaseStudies().map((caseStudy, index) => ({
    title: caseStudy.title,
    description: caseStudy.subtitle,
    fullDescription: caseStudy.description.substring(0, 200) + "...",
    imageSrc: caseStudy.heroImage,
    imagePosition: index % 2 === 0 ? "right" : "left",
    link: `/case-studies/${caseStudy.slug}`,
  }));

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
                  className="inline-flex items-center text-[#17599d] font-medium hover:text-[#144a75] transition-colors"
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
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
