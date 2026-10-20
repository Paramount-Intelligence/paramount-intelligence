import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Direct database call
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(caseStudies);
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    
    // Destructure to remove 'id' if the form sent it as an empty string
    const { id,  ...dataToSave } = body;

    const newCaseStudy = await prisma.caseStudy.create({
      data: {
        ...dataToSave,
        // Ensure JSON fields are handled correctly
        solutionAgents: dataToSave.solutionAgents || [],
      },
    });

    return NextResponse.json(newCaseStudy, { status: 201 });
  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ 
      error: "Failed to save to database", 
      details: error.message 
    }, { status: 500 });
  }
}