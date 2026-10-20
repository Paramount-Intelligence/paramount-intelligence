import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PUT { ids: [...] }: the display order; each card's position becomes its place in the list (from 1).
export async function PUT(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { ids } = await req.json();
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string") || new Set(ids).size !== ids.length) {
    return NextResponse.json({ errors: ["Send the card ids in their new order."] }, { status: 400 });
  }
  try {
    await prisma.$transaction(ids.map((id: string, i: number) => prisma.caseCard.update({ where: { id }, data: { position: i + 1 } })));
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("case cards: reorder failed", error);
    return NextResponse.json({ errors: ["The order could not be saved."] }, { status: 500 });
  }
}
