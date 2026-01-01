import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudiesHeader from "@/components/casestudies/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "@/components/casestudies/detail/CaseStudyHero";
import ProjectDescription from "@/components/casestudies/detail/ProjectDescription";
import MeetOurClient from "@/components/casestudies/detail/MeetOurClient";
import InANutshell from "@/components/casestudies/detail/InANutshell";

// Enable dynamic rendering for this route
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

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Transform database format to component format
  const clientInfo = {
    name: caseStudy.clientName,
    industry: caseStudy.clientIndustry,
    market: caseStudy.clientMarket,
    technology: caseStudy.clientTechnology,
  };

  const nutshell = {
    challenge: caseStudy.challenge,
    solution: caseStudy.solution,
    benefits: caseStudy.benefits,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <CaseStudiesHeader />

      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        heroImage={caseStudy.heroImage}
      />

      <ProjectDescription description={caseStudy.description} />

      <MeetOurClient clientInfo={clientInfo} />

      <InANutshell content={nutshell} />

      <Footer />
    </div>
  );
}
