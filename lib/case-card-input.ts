// Checks and normalises a case card sent from /admin (app/api/admin/case-cards).

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CaseCardInput = {
  number: string;
  position: number;
  title: string;
  summary: string;
  org: string;
  industry: string;
  tags: string[];
  searchText: string;
  slug: string | null;
  fullCaseStudy: boolean;
  workInProgress: boolean;
  art: string;
  published: boolean;
};

// The drawing is rendered as inline SVG on public pages, so it may hold drawing markup and SMIL animation only:
// these elements, and no event handlers, links or external references.
const SVG_ELEMENTS = new Set(
  "svg g defs title desc path rect circle ellipse line polyline polygon text tspan animate animateMotion animateTransform set linearGradient radialGradient stop clipPath mask".split(" "),
);
const UNSAFE_SVG = /\son[a-z]+\s*=|javascript:|data:|href\s*=|@import|url\s*\(/i;
const svgProblem = (art: string) =>
  [...art.matchAll(/<\s*([a-zA-Z][\w:-]*)/g)].some((m) => !SVG_ELEMENTS.has(m[1])) || UNSAFE_SVG.test(art);

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** The card, or the list of problems to show the editor. */
export function parseCaseCard(body: Record<string, unknown>): { card: CaseCardInput } | { errors: string[] } {
  const errors: string[] = [];
  const number = text(body.number);
  const slug = text(body.slug).replace(/^\/?case-studies\//, "").replace(/^\/+|\/+$/g, "");
  const art = text(body.art);
  const tags = (Array.isArray(body.tags) ? body.tags : text(body.tags).split(","))
    .map(text)
    .filter(Boolean);
  const position = Number(body.position);
  const card: CaseCardInput = {
    number,
    position,
    title: text(body.title),
    summary: text(body.summary),
    org: text(body.org),
    industry: text(body.industry),
    tags,
    searchText: text(body.searchText),
    slug: slug || null,
    fullCaseStudy: body.fullCaseStudy === true,
    workInProgress: body.workInProgress === true,
    art,
    published: body.published !== false,
  };

  if (!/^\d{2,3}$/.test(number)) errors.push("Card number: two or three digits, such as 51.");
  if (!Number.isInteger(position) || position < 1) errors.push("Position: a whole number from 1.");
  if (!card.title) errors.push("Title is required.");
  if (!card.summary) errors.push("Summary is required.");
  if (!card.org) errors.push("Organisation is required.");
  if (!card.industry) errors.push("Industry is required.");
  if (slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push("Slug: lowercase letters, numbers and hyphens only.");
  if (!/^<svg[\s>][\s\S]*<\/svg>$/i.test(art)) errors.push("Drawing: an <svg> element.");
  else if (svgProblem(art)) errors.push("Drawing: only SVG shapes, text and animation; no scripts, event handlers, links or external references.");

  // A new card's search text defaults to what the card shows.
  if (!card.searchText) card.searchText = [card.title, card.summary, card.org, card.industry, ...tags].join(" ");
  return errors.length ? { errors } : { card };
}

/** The response when a card's number or slug is already taken, or null for any other error. */
export const conflict = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
    ? NextResponse.json(
        { errors: [`Another card already uses this ${(error.meta?.target as string[] | undefined)?.[0] ?? "value"}.`] },
        { status: 409 },
      )
    : null;

/**
 * Renumbers the cards 1, 2, 3… in their display order. With `place`, that card goes to its position first
 * (1 = first), so a saved position always means "this place in the list".
 */
export async function renumberCards(place?: { id: string; position: number }) {
  const cards = await prisma.caseCard.findMany({
    orderBy: [{ position: "asc" }, { number: "asc" }],
    select: { id: true, position: true },
  });
  const order = cards.map((c) => c.id).filter((id) => id !== place?.id);
  if (place) order.splice(Math.min(Math.max(place.position, 1), order.length + 1) - 1, 0, place.id);
  const was = new Map(cards.map((c) => [c.id, c.position]));
  await prisma.$transaction(
    order.flatMap((id, i) => (was.get(id) === i + 1 ? [] : [prisma.caseCard.update({ where: { id }, data: { position: i + 1 } })])),
  );
}
