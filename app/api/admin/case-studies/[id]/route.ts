import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

// Helper to check the cookie manually if verifyAdmin isn't working as expected
function getAuth(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) throw new Error("Unauthorized");
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw new Error("Unauthorized: Invalid Token");
  }
}

// GET single case study by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    getAuth(req); // 🔐 Protect route using the cookie
    const { id } = await params;

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error: any) {
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

// PUT - Update case study
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    getAuth(req);
    const { id } = await params;
    const body = await req.json();

    // Remove 'id' and any invalid fields before updating
    const { id: _, ...dataToUpdate } = body;

    const updated = await prisma.caseStudy.update({
      where: { id },
      data: { ...dataToUpdate },
    });

    return NextResponse.json({ message: "Case study updated", data: updated });
  } catch (error: any) {
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

// DELETE - Delete case study


export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate
    getAuth(req);

    // 2. Await params (Required in Next.js 15+)
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // 3. Direct DB Delete
    await prisma.caseStudy.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE ERROR:", error.message);
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Delete failed" }, 
      { status }
    );
  }
}

// Add PUT here as well following the same fetch pattern...