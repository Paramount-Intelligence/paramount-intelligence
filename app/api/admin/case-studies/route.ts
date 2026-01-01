import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET all case studies
export async function GET() {
  try {
    // Dynamic import to avoid Turbopack issues
    const { prisma } = await import('@/lib/prisma');
    
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

// POST - Create new case study
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Dynamic import to avoid Turbopack issues
    const { prisma } = await import('@/lib/prisma');
    
    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug: body.slug,
        title: body.title,
        subtitle: body.subtitle,
        image: body.image,
        heroImage: body.heroImage,
        industry: body.industry,
        businessFunction: body.businessFunction,
        description: body.description,
        clientName: body.clientName,
        clientIndustry: body.clientIndustry,
        clientMarket: body.clientMarket,
        clientTechnology: body.clientTechnology,
        challenge: body.challenge,
        solution: body.solution,
        benefits: body.benefits,
      }
    });
    
    return NextResponse.json(
      { 
        message: 'Case study created successfully',
        data: caseStudy 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating case study:', error);
    return NextResponse.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    );
  }
}
