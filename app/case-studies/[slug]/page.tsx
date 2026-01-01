import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudiesHeader from "@/components/casestudies/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "@/components/casestudies/detail/CaseStudyHero";
import ProjectDescription from "@/components/casestudies/detail/ProjectDescription";
import MeetOurClient from "@/components/casestudies/detail/MeetOurClient";
import InANutshell from "@/components/casestudies/detail/InANutshell";
import { getApiUrl } from "@/lib/api";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCaseStudyBySlug(slug: string) {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/admin/case-studies`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const caseStudies = await response.json();
    return caseStudies.find((cs: any) => cs.slug === slug);
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}

async function getAllCaseSlugs() {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/admin/case-studies`, {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const caseStudies = await response.json();
    return caseStudies.map((cs: any) => cs.slug);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs();
  return slugs.map((slug: string) => ({
    slug: slug,
  }));
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
