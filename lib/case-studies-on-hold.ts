// Full case study pages whose content is held back while the work is in progress (Ali, 27 Oct 2026). Their cards
// stay on the site; the page shows a "Work in progress" notice instead of the content (components/casestudies/full/
// CaseStudyOnHold.tsx) and is left out of the sitemap and search results. The content stays in
// content/case-studies/<key>, so taking a route off this list publishes the page again.

export const CASE_STUDIES_ON_HOLD: string[] = [
  "/case-studies/field-submission-intelligence", // Field submissions turned into answers managers can trust
];

const ROUTES = new Set(CASE_STUDIES_ON_HOLD);

/** True for a case study page whose content is held back (its card still shows). */
export const isCaseStudyOnHold = (route: string | null | undefined) => !!route && ROUTES.has(route);
