import { prisma } from './prisma';

export interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientInfo: {
    name: string | null;
    industry: string | null;
    market: string | null;
    technology: string | null;
  };
  nutshell: {
    challenge: string;
    solution: string;
    benefits: string;
  };
}

export async function getAllCaseStudies(): Promise<CaseStudyData[]> {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return caseStudies.map((cs) => ({
    id: cs.id,
    slug: cs.slug,
    title: cs.title,
    subtitle: cs.subtitle,
    image: cs.image,
    heroImage: cs.heroImage,
    industry: cs.industry,
    businessFunction: cs.businessFunction,
    description: cs.description,
    clientInfo: {
      name: cs.clientName,
      industry: cs.clientIndustry,
      market: cs.clientMarket,
      technology: cs.clientTechnology,
    },
    nutshell: {
      challenge: cs.challenges,
      solution: cs.solution,
      benefits: cs.benefits,
    },
  }));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyData | null> {
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!caseStudy) return null;

  return {
    id: caseStudy.id,
    slug: caseStudy.slug,
    title: caseStudy.title,
    subtitle: caseStudy.subtitle,
    image: caseStudy.image,
    heroImage: caseStudy.heroImage,
    industry: caseStudy.industry,
    businessFunction: caseStudy.businessFunction,
    description: caseStudy.description,
    clientInfo: {
      name: caseStudy.clientName,
      industry: caseStudy.clientIndustry,
      market: caseStudy.clientMarket,
      technology: caseStudy.clientTechnology,
    },
    nutshell: {
      challenge: caseStudy.challenges,
      solution: caseStudy.solution,
      benefits: caseStudy.benefits,
    },
  };
}

export async function getAllCaseSlugs(): Promise<string[]> {
  const caseStudies = await prisma.caseStudy.findMany({
    select: {
      slug: true,
    },
  });

  return caseStudies.map((cs) => cs.slug);
}
