/* Shapes for each page's background forms (artifact v37). Each list is the order the forms cycle through;
 * the first shape is the one the page's first section (its hero) opens with.
 * Shape ids are defined in public/pi/ambient-forms.js (see the list at the end of this file). */

const CONNECTED = [24, 1, 3, 26, 17, 5, 27]; // connected systems: rings, knot, infinity

export const PAGE_SHAPES: Record<string, number[]> = {
  "/": CONNECTED,
  "/about-us": [22, 24, 7, 20, 0],
  "/services": [24, 5, 13, 3, 22, 6],
  "/services/ai-strategy-and-consulting": [22, 7, 25, 19, 21],
  "/services/ai-solutions-and-engineering": [14, 1, 15, 16, 5],
  "/services/software-product-engineering": [5, 12, 28, 13, 1],
  "/services/data-and-analytics": [13, 10, 12, 11, 6],
  "/services/cloud-services": [2, 8, 7, 22, 19],
  "/services/ai-workflow-automation": [3, 17, 4, 9, 26],
  "/services/ai-studio-and-platform-engineering": [6, 10, 9, 27, 25],
  "/industries": [20, 24, 8, 0, 22],
  "/industries/private-equity": [24, 20, 22, 26, 3],
  "/industries/digital-natives": [6, 10, 27, 12, 9],
  "/industries/telecommunications": [24, 26, 3, 17, 13],
  "/industries/fintech-and-digital-payments": [3, 17, 4, 9, 14],
  "/industries/manufacturing-industrial-and-energy": [26, 13, 5, 28, 15],
  "/industries/mobility-ride-hailing-and-delivery": [3, 12, 4, 28, 9],
  "/industries/e-commerce-and-marketplaces": [0, 8, 20, 2, 7],
  "/industries/technology-and-enterprise-software": [14, 15, 1, 16, 5],
  "/industries/b2b-enterprise-solutions": [24, 22, 17, 26, 7],
  "/industries/digital-lifestyle-and-entertainment": [6, 10, 27, 25, 0],
  "/case-studies": [21, 5, 1, 24, 6, 13],
  "/contact-us": [24, 3, 20],
  "/faq": [22, 7, 19],
  "/for-candidates": [20, 8, 0, 24],
  "/careers/apply-now": [20, 8, 0, 24, 19],
  "/careers/life-at-pi": [20, 8, 0, 24, 19],
  "/careers/open-positions": [20, 8, 0, 24, 19],
};

/** Case studies: shapes by what the system does (matched against the slug). */
export const CASE_SHAPES: Array<[string[], number[]]> = [
  [["assistant", "copilot", "email-response", "shopping", "rag-co-pilot"], [10, 6, 27, 3, 4]],
  [["contract", "sow", "investor-email"], [9, 4, 10, 12, 25]],
  [["governance", "idea-intake", "execution-portal"], [22, 24, 7, 26, 19]],
  [["infrastructure", "platform-intelligence", "video-generation"], [14, 15, 5, 13, 28]],
  [["talent", "staffing", "edtech"], [20, 8, 0, 24, 2]],
  [["pricing"], [11, 25, 13, 12, 3]],
];

/** No background on these routes. */
const NO_BACKGROUND = ["/privacy-policy", "/newsletter"];
const NO_BACKGROUND_PREFIXES = ["/admin", "/api", "/careers/open-positions/"];

export function shapesFor(pathname: string): number[] | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (NO_BACKGROUND.includes(p) || NO_BACKGROUND_PREFIXES.some((x) => p.startsWith(x))) return null;
  if (PAGE_SHAPES[p]) return PAGE_SHAPES[p];
  if (p.startsWith("/case-studies/")) {
    for (const [keys, shapes] of CASE_SHAPES) if (keys.some((k) => p.includes(k))) return shapes;
    return [1, 24, 3, 26, 5];
  }
  return null; // any other route (for example a 404): no background
}

/* Shape ids: 0 bean lobes, 1 trefoil knot, 2 breathing blob, 3 infinity loop, 4 twisted band, 5 bulging tube, 6 twisted fin, 7 dimpled sphere, 8 peanut, 9 wide twisted band, 10 silk ribbon, 11 saddle, 12 S-tube, 13 helix coil, 14 torus knot (2,5), 15 torus knot (3,4), 16 figure-eight knot, 17 twisted torus, 19 breathing sphere, 20 two spheres merging, 21 sphere shedding dust, 22 core inside a shell, 24 interlocked rings, 25 twisted bowl, 26 three-fold ring, 27 '&' band, 28 bent tube. */
