import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudiesHeader from "@/components/casestudies/Header";
import Footer from "@/components/Footer";
import CaseStudyHero from "@/components/casestudies/detail/CaseStudyHero";
import ProjectDescription from "@/components/casestudies/detail/ProjectDescription";
import MeetOurClient from "@/components/casestudies/detail/MeetOurClient";
import InANutshell from "@/components/casestudies/detail/InANutshell";
import { getCaseStudyBySlug, getAllCaseSlugs } from "@/lib/caseStudiesData";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <CaseStudiesHeader />

      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        image={caseStudy.heroImage}
      />

      <ProjectDescription description={caseStudy.description} />

      <MeetOurClient clientInfo={caseStudy.clientInfo} />

      <InANutshell content={caseStudy.nutshell} />

      <Footer />
    </div>
  );
}
