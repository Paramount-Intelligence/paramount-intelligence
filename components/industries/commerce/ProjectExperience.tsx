import Image from "next/image";
import Link from "next/link";
import { getProjectExperience } from "@/lib/project-experience";

// Rendered on the server, so the cards are part of the page's HTML (lib/project-experience.ts).
export default async function ProjectExperience() {
  const projects = await getProjectExperience([
    "Real-Time Commercial Performance & Transaction Intelligence Platform for a Global E-Commerce Marketplace",
    "RFM-Based Voucher and Marketing Optimization",
    "AI-Driven Investment and Optimization Engine for Short-Term Rentals",
  ]);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-16">
          Some of our project experience
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
                    className="pi-tap inline-flex items-center text-[#17599d] font-medium hover:text-[#144a75] transition-colors"
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
                  <Image src={project.imageSrc} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}