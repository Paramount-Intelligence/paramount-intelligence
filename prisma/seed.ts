import { PrismaClient } from '@prisma/client';
import { caseStudiesData } from '../lib/caseStudiesData';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  await prisma.caseStudy.deleteMany({});
  console.log('Deleted existing case studies');

  // Transform and seed case studies
  for (const caseStudy of caseStudiesData) {
    const data = {
      id: caseStudy.id,
      slug: caseStudy.slug,
      title: caseStudy.title,
      subtitle: caseStudy.subtitle,
      image: caseStudy.image,
      heroImage: caseStudy.heroImage,
      industry: caseStudy.industry,
      businessFunction: caseStudy.businessFunction,
      description: caseStudy.description,
      clientName: caseStudy.clientInfo.name,
      clientIndustry: caseStudy.clientInfo.industry,
      clientMarket: caseStudy.clientInfo.market,
      clientTechnology: caseStudy.clientInfo.technology,
      challenge: caseStudy.nutshell.challenge,
      solution: caseStudy.nutshell.solution,
      benefits: caseStudy.nutshell.benefits,
    };

    await prisma.caseStudy.create({
      data,
    });
    console.log(`✓ Created case study: ${caseStudy.title}`);
  }

  console.log(`\nSeeding finished. Created ${caseStudiesData.length} case studies.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
