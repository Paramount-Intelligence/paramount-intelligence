import { prisma } from "@/lib/prisma";
import { HIDDEN_CASE_STUDY_SLUGS } from "@/lib/removed-case-studies";

export type ProjectExperienceItem = {
  title: string;
  description: string;
  fullDescription: string;
  imageSrc: string;
  imagePosition: "left" | "right";
  link: string;
};

/**
 * "Some of our project experience" on the older industry and service pages: the named case studies from the
 * CaseStudy table (managed in /admin), newest first and without hidden slugs, exactly as GET /api/case-studies
 * returned them to these components. Read on the server, so the cards are part of the page's HTML.
 * If the table can't be read, the list is empty, as before.
 */
export async function getProjectExperience(titles: string[]): Promise<ProjectExperienceItem[]> {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { slug: { notIn: HIDDEN_CASE_STUDY_SLUGS }, title: { in: titles } },
      orderBy: { createdAt: "desc" },
      select: { title: true, subtitle: true, description: true, heroImage: true, slug: true },
    });
    return caseStudies.map((caseStudy, index) => ({
      title: caseStudy.title,
      description: caseStudy.subtitle,
      fullDescription: caseStudy.description.substring(0, 200) + "...",
      imageSrc: caseStudy.heroImage,
      imagePosition: index % 2 === 0 ? "right" : "left",
      link: `/case-studies/${caseStudy.slug}`,
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}
