import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { conflict, parseCaseCard, renumberCards } from "@/lib/case-card-input";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// PUT: replace a card's fields.
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    verifyAdmin(req);
  } catch {
    return unauthorized();
  }
  const { id } = await params;
  const parsed = parseCaseCard(await req.json());
  if ("errors" in parsed) return NextResponse.json({ errors: parsed.errors }, { status: 400 });
  try {
    const card = await prisma.caseCard.update({ where: { id }, data: parsed.card });
    await renumberCards({ id: card.id, position: card.position });
    revalidatePath("/", "layout");
    return NextResponse.json(card);
  } catch (error) {
    const taken = conflict(error);
    if (taken) return taken;
    console.error("case cards: update failed", error);
    return NextResponse.json({ errors: ["The card could not be saved."] }, { status: 500 });
  }
}

// DELETE: remove a card (to hide it but keep it, unpublish it instead).
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    verifyAdmin(req);
  } catch {
    return unauthorized();
  }
  const { id } = await params;
  try {
    await prisma.caseCard.delete({ where: { id } });
    await renumberCards();
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("case cards: delete failed", error);
    return NextResponse.json({ errors: ["The card could not be deleted."] }, { status: 500 });
  }
}
