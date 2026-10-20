import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "@/components/site/SitePage";
import CaseStudyDetail from "@/components/casestudies/detail/CaseStudyDetail";
import { pageMetadata } from "@/lib/metadata";

// Case studies without a full page come from the CaseStudy table (managed in /admin).
// The full case study pages have their own routes (app/case-studies/<slug>/page.tsx).
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCaseStudyBySlug(slug: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug },
    });
    return caseStudy;
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug((await params).slug);
  if (!caseStudy) return {};
  return pageMetadata({
    title: `${caseStudy.title} | Paramount Intelligence`,
    description: caseStudy.subtitle || undefined,
    path: `/case-studies/${caseStudy.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <SitePage>
      <CaseStudyDetail cs={caseStudy} />
    </SitePage>
  );
}
