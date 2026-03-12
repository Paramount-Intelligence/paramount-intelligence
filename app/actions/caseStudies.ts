"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllCaseStudies() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return { success: false, error: "Failed to fetch case studies" };
  }
}

export async function getCaseStudyById(id: string) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      return { success: false, error: "Case study not found" };
    }

    return { success: true, data: caseStudy };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return { success: false, error: "Failed to fetch case study" };
  }
}

export async function createCaseStudy(data: {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientName: string;
  clientIndustry: string;
  clientMarket: string;
  clientTechnology: string;
  challenges: string;
  solution: string;
  benefits: string;
}) {
  try {
    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        heroImage: data.heroImage,
        industry: data.industry,
        businessFunction: data.businessFunction,
        description: data.description,
        clientName: data.clientName,
        clientIndustry: data.clientIndustry,
        clientMarket: data.clientMarket,
        clientTechnology: data.clientTechnology,
        challenges: data.challenges,
        solution: data.solution,
        benefits: data.benefits,
      },
    });

    revalidatePath("/admin");
    return { success: true, data: caseStudy };
  } catch (error) {
    console.error("Error creating case study:", error);
    return { success: false, error: "Failed to create case study" };
  }
}

export async function updateCaseStudy(
  id: string,
  data: {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    heroImage: string;
    industry: string;
    businessFunction: string;
    description: string;
    clientName: string;
    clientIndustry: string;
    clientMarket: string;
    clientTechnology: string;
    challenges: string;
    solution: string;
    benefits: string;
  }
) {
  try {
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        heroImage: data.heroImage,
        industry: data.industry,
        businessFunction: data.businessFunction,
        description: data.description,
        clientName: data.clientName,
        clientIndustry: data.clientIndustry,
        clientMarket: data.clientMarket,
        clientTechnology: data.clientTechnology,
        challenges: data.challenges,
        solution: data.solution,
        benefits: data.benefits,
      },
    });

    revalidatePath("/admin");
    return { success: true, data: caseStudy };
  } catch (error) {
    console.error("Error updating case study:", error);
    return { success: false, error: "Failed to update case study" };
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    await prisma.caseStudy.delete({
      where: { id },
    });

    revalidatePath("/admin");
    return { success: true, message: "Case study deleted successfully" };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { success: false, error: "Failed to delete case study" };
  }
}
