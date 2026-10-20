import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getCaseCards } from "@/lib/case-cards-db";
import { SITE_URL } from "@/lib/metadata";
import { INDUSTRIES, ROUTES, SERVICES } from "@/lib/site-nav";

// Refreshed hourly, so case studies added in /admin appear without a deploy.
export const revalidate = 3600;

/**
 * The redesigned site: its pages, the two open roles, the full case study pages, and the other case study cards
 * whose slug is in the CaseStudy table. The older routes that are kept but no longer linked are left out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    ROUTES.home,
    ROUTES.services,
    ...SERVICES.map((s) => s.href),
    ROUTES.industries,
    ...INDUSTRIES.map((i) => i.href),
    ROUTES.caseStudies,
    ROUTES.about,
    ROUTES.careers,
    `${ROUTES.careers}/ai-engineer`,
    `${ROUTES.careers}/full-stack-engineer`,
    ROUTES.contact,
  ];
  let inDb = new Set<string>();
  try {
    const rows = await prisma.caseStudy.findMany({ select: { slug: true } });
    inDb = new Set(rows.flatMap((r) => (r.slug ? [`/case-studies/${r.slug}`] : [])));
  } catch (error) {
    console.error("sitemap: could not read case study slugs", error);
  }
  const caseStudies = (await getCaseCards()).flatMap((c) => (c.route && (c.fullCaseStudy || inDb.has(c.route)) ? [c.route] : []));
  return [...pages, ...caseStudies].map((p) => ({ url: SITE_URL + (p === "/" ? "" : p) }));
}
