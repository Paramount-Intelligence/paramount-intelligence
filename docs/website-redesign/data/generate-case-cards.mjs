// Generates lib/case-cards.ts from docs/website-redesign/data/case-cards.json.
// The card text comes from the JSON. Two values come from the reference listing
// (docs/website-redesign/reference/case-studies.html), because the JSON doesn't hold them in the form the
// reference shows: the industry label printed on the card and the card's search text (data-search).
// Run: node docs/website-redesign/data/generate-case-cards.mjs

import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const data = JSON.parse(read("docs/website-redesign/data/case-cards.json"));
const listing = read("docs/website-redesign/reference/case-studies.html");

const unescape = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const cards = [...listing.matchAll(/(<a class="ccard pc"[\s\S]*?<\/a>)(?=\s*<a class="ccard|\s*<\/div>)/g)].map((m) => m[1]);
if (cards.length !== 50 || data.length !== 50) throw new Error(`expected 50 cards, got ${cards.length} / ${data.length}`);

// Card 50 has no route on the current site; its page uses the slug PORT-PLAN.md (section 3) proposes.
const ROUTES = { "50": "/case-studies/flexagon-implementation-execution-portal" };

// Cards taken off the website (lib/removed-case-studies.ts) are left out.
const { REMOVED_CASE_STUDIES } = await import(new URL("lib/removed-case-studies.ts", root));
const REMOVED = new Set(REMOVED_CASE_STUDIES.map((c) => c.card));

const str = (s) => JSON.stringify(s);
const list = (a) => "[" + a.map(str).join(", ") + "]";

const entries = data.flatMap((e, i) => {
  if (REMOVED.has(e.n)) return [];
  const c = cards[i];
  const title = unescape(c.match(/<h3>(.*?)<\/h3>/)[1]);
  const meta = c.match(/<div class="meta"><b>(.*?)<\/b><span>(.*?)<\/span><\/div>/);
  const art = c.match(/<div class="art" aria-hidden="true">(<svg[\s\S]*?<\/svg>)/)[1];
  if (title !== e.title || unescape(meta[1]) !== e.org || art !== e.cardArtSvg) {
    throw new Error(`card ${e.n}: the listing and the JSON disagree`);
  }
  const search = unescape(c.match(/data-search="([^"]*)"/)[1]);
  return [
    "  {",
    `    n: ${str(e.n)},`,
    `    route: ${str(e.currentRoute ?? ROUTES[e.n] ?? null)},`,
    `    title: ${str(e.title)},`,
    `    summary: ${str(e.summary)},`,
    `    org: ${str(e.org)},`,
    `    industry: ${str(unescape(meta[2]))},`,
    `    tags: ${list(e.tags)},`,
    `    fullCaseStudy: ${!!e.fullCaseStudyPage},`,
    `    workInProgress: ${!!e.workInProgress},`,
    `    search: ${str(search)},`,
    `    art: ${str(e.cardArtSvg)},`,
    "  },",
  ].join("\n");
});

const src = `// Generated from docs/website-redesign/data/case-cards.json (PORT-PLAN.md, section 3).
// The site reads the cards from the CaseCard table (edited in /admin; lib/case-cards-db.ts). These are the cards on the
// website, and what the site shows if the table can't be read.
// The industry label and the search text are as the reference listing (case-studies.html) shows them.
// Don't edit by hand: change the JSON and run \`node docs/website-redesign/data/generate-case-cards.mjs\`.

export type CaseCardData = {
  /** Card number, "01" to "50". */
  n: string;
  /** /case-studies/<slug>; null until the card has a route. */
  route: string | null;
  title: string;
  summary: string;
  org: string;
  /** Industry label as printed on the card. */
  industry: string;
  tags: string[];
  /** Opens a full (redesigned) case study page. */
  fullCaseStudy: boolean;
  workInProgress: boolean;
  /** Text the Case Studies search matches against. */
  search: string;
  /** Card drawing: trusted static SVG markup from this repo. */
  art: string;
};

/** The cards on the website, in display order (cards taken off it are in lib/removed-case-studies.ts). */
export const CASE_CARDS: CaseCardData[] = [
${entries.join("\n")}
];

export function caseCard(n: string): CaseCardData {
  const card = CASE_CARDS.find((c) => c.n === n);
  if (!card) throw new Error(\`Unknown case card \${n}\`);
  return card;
}
`;

writeFileSync(new URL("lib/case-cards.ts", root), src);
console.log(`lib/case-cards.ts: ${entries.length} cards`);
