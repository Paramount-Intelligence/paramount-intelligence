import { PrismaClient } from '@prisma/client';
import { caseStudiesData } from '../lib/caseStudiesData';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Start seeding...');
  
  try {
    await prisma.caseStudy.deleteMany({});
    await prisma.admin.deleteMany({}); 
    console.log('🗑️  Deleted existing data (CaseStudies and Admins)');
  } catch (err) {
    console.log('⚠️  Note: Tables could not be cleared or were already empty.');
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  try {
    await prisma.admin.upsert({
      where: { username: 'admin' },
      update: { password: hashedPassword },
      create: {
        username: 'admin',
        password: hashedPassword,
      },
    });
    console.log('👤 Created/Updated Admin User: admin / admin123');
  } catch (err) {
    console.error('❌ Failed to seed Admin.');
    throw err;
  }

  // --- Updated seed.ts loop block ---
for (const caseStudy of caseStudiesData) {
  try {
    await prisma.caseStudy.create({
      data: {
        id: caseStudy.id,
        slug: caseStudy.slug,
        title: caseStudy.title,
        subtitle: caseStudy.subtitle,
        image: caseStudy.image,
        heroImage: caseStudy.heroImage,
        industry: caseStudy.industry,
        businessFunction: caseStudy.businessFunction,
        description: caseStudy.description,

        // --- Client Info ---
        clientName: caseStudy.clientInfo.name,
        clientIndustry: caseStudy.clientInfo.industry,
        clientMarket: caseStudy.clientInfo.market,
        clientTechnology: caseStudy.clientInfo.technology,

        // -- NutShell (FIXED: Added missing commas and lowercase 'benefits') -- 
        challenges: caseStudy.nutshell.challenge, // added comma
        solution: caseStudy.nutshell.solution,     // added comma
        benefits: caseStudy.nutshell.benefits,     // lowercase 'b'

        // --- Deep Dive ---
        overview: caseStudy.clientInfo.description || "N/A",
        client: caseStudy.clientInfo.name || "N/A",
        challenge: caseStudy.nutshell.challenge, 
        keyConstraints: "N/A", // Fixed spelling (added 'r')

        // --- Solution JSON ---
        solutionAgents: caseStudy.solutionAgents || [],

        // --- Tech Stack ---
        tech: caseStudy.techStack || [],

        // -- Unique Solution (FIXED: camelCase) --
        uniqueSolution: "N/A",

        // --- Final Notes (FIXED: lowercase) ---
        results: "N/A",
        summary: caseStudy.subtitle,
      },
    });
    console.log(`📄 Created case study: ${caseStudy.title}`);
  } catch (err) {
    console.error(`❌ Failed to create case study: ${caseStudy.title}`, err);
  }
}

  console.log(`\n✅ Seeding finished successfully.`);
}

main()
  .then(async () => { 
    await prisma.$disconnect(); 
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });