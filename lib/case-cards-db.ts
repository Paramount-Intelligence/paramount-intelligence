import { cache } from "react";
import type { CaseCard } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CASE_CARDS, type CaseCardData } from "@/lib/case-cards";
import { isRemovedCaseStudy } from "@/lib/removed-case-studies";

/** A CaseCard row in the shape the card components use. */
export const toCardData = (c: CaseCard): CaseCardData => ({
  n: c.number,
  route: c.slug ? `/case-studies/${c.slug}` : null,
  title: c.title,
  summary: c.summary,
  org: c.org,
  industry: c.industry,
  tags: c.tags,
  fullCaseStudy: c.fullCaseStudy,
  workInProgress: c.workInProgress,
  search: c.searchText,
  art: c.art,
});

/**
 * The published case cards in display order, from the CaseCard table (edited in /admin).
 * If the database can't be read, or the table is still empty, the site falls back to the cards built into
 * the code (lib/case-cards.ts), so a page never renders without its cards.
 */
export const getCaseCards = cache(async (): Promise<CaseCardData[]> => {
  try {
    const rows = await prisma.caseCard.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { number: "asc" }],
    });
    // Case studies taken off the website (lib/removed-case-studies.ts) stay off, even if their card is published.
    const cards = rows.filter((c) => !isRemovedCaseStudy(c.slug));
    if (cards.length) return cards.map(toCardData);
  } catch (error) {
    console.error("case cards: could not read the CaseCard table, using the built-in cards", error);
  }
  return CASE_CARDS;
});

/** One published card by number ("07"), or null. */
export async function getCaseCard(n: string): Promise<CaseCardData | null> {
  return (await getCaseCards()).find((c) => c.n === n) ?? null;
}

/** The published card that opens a route ("/case-studies/<slug>"), or null. */
export async function getCaseCardByRoute(route: string): Promise<CaseCardData | null> {
  return (await getCaseCards()).find((c) => c.route === route) ?? null;
}
