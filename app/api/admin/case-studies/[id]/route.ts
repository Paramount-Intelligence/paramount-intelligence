import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET single case study by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Dynamic import to avoid Turbopack issues
    const { prisma } = await import('@/lib/prisma');
    
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id }
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case study' },
      { status: 500 }
    );
  }
}

// PUT - Update case study
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Dynamic import to avoid Turbopack issues
    const { prisma } = await import('@/lib/prisma');
    
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
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
    
    return NextResponse.json({
      message: 'Case study updated successfully',
      data: caseStudy
    });
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    );
  }
}

// DELETE case study
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Dynamic import to avoid Turbopack issues
    const { prisma } = await import('@/lib/prisma');
    
    await prisma.caseStudy.delete({
      where: { id }
    });
    
    return NextResponse.json({ 
      message: 'Case study deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    );
  }
}
