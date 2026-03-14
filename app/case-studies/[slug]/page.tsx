import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudiesHeader from "@/components/casestudies/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "@/components/casestudies/detail/CaseStudyHero";
import ProjectDescription from "@/components/casestudies/detail/ProjectDescription";
import MeetOurClient from "@/components/casestudies/detail/MeetOurClient";
import InANutshell from "@/components/casestudies/detail/InANutshell";
import DeepDive from "@/components/casestudies/detail/DeepDive";
import SolutionAgents from "@/components/casestudies/detail/SolutionAgents";
import TechStack from "@/components/casestudies/detail/TechStack";
import UniqueSolution from "@/components/casestudies/detail/UniqueSolution";
import Results from "@/components/casestudies/detail/Results";
import Summary from "@/components/casestudies/detail/Summary";

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
    challenge: caseStudy.challenges,
    solution: caseStudy.solution,
    benefits: caseStudy.benefits,
  };

  const deepDive = {
    overview: caseStudy.overview,
    client: caseStudy.client,
    challenge: caseStudy.challenge,
    keyConstraints: caseStudy.keyConstraints,
  };

  const solutionAgents = (caseStudy.solutionAgents || []) as Array<{
    title: string;
    description: string;
  }>;
  const techStack = (caseStudy.tech || []) as Array<{
    title: string;
    description: string;
  }>;
  const uniqueSolution = caseStudy.uniqueSolution || "";
  const results = caseStudy.results || "";
  const summary = caseStudy.summary || "";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <CaseStudiesHeader />

      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        heroImage={caseStudy.heroImage ?? ""}
      />

      <ProjectDescription description={caseStudy.description} />

      <MeetOurClient clientInfo={clientInfo} />

      <InANutshell content={nutshell} />

      <DeepDive content={deepDive} />

      <SolutionAgents agents={solutionAgents} />

      <TechStack techStack={techStack} />

      <UniqueSolution content={uniqueSolution} />

      <Results content={results} />

      <Summary content={summary} />

      <Footer />
    </div>
  );
}
