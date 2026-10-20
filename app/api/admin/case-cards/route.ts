import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { conflict, parseCaseCard, renumberCards } from "@/lib/case-card-input";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// GET: every card, published or not, in display order.
export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return unauthorized();
  }
  const cards = await prisma.caseCard.findMany({ orderBy: [{ position: "asc" }, { number: "asc" }] });
  return NextResponse.json(cards);
}

// POST: a new card.
export async function POST(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return unauthorized();
  }
  const parsed = parseCaseCard(await req.json());
  if ("errors" in parsed) return NextResponse.json({ errors: parsed.errors }, { status: 400 });
  try {
    const card = await prisma.caseCard.create({ data: parsed.card });
    await renumberCards({ id: card.id, position: card.position });
    // The cards appear on the listing, the service and industry pages and in the sitemap.
    revalidatePath("/", "layout");
    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    const taken = conflict(error);
    if (taken) return taken;
    console.error("case cards: create failed", error);
    return NextResponse.json({ errors: ["The card could not be saved."] }, { status: 500 });
  }
}
