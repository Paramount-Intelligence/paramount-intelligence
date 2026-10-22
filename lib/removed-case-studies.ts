// Case studies taken off the website at Ali's request (20 Oct 2026): the 30 cards without a full case study page.
// Their cards are left out of lib/case-cards.ts (docs/website-redesign/data/generate-case-cards.mjs), their
// /case-studies/<slug> pages return 404, and the public case study API leaves them out. Their CaseStudy rows stay
// in the database and in /admin, so taking one off this list brings it back.

export const REMOVED_CASE_STUDIES: { card: string; slug: string }[] = [
  { card: "02", slug: "credit-risk-lifestyle-index-for-fintech" }, // Interpretable risk signals for digital finance
  { card: "03", slug: "multi-agent-ai-analytics-platform-for-enterprise-decision-intelligence" }, // Business questions answered across company data
  { card: "09", slug: "dynamic-marketplace-optimization-competitive-intelligence-platform" }, // Marketplace and competitor signals in one view
  { card: "10", slug: "ai-driven-investment-and-optimization-engine-for-short-term-rental-portfolios" }, // Property decisions informed by market and listing data
  { card: "11", slug: "ai-powered-hiring-and-candidate-assessment-system-for-automated-talent-lifecycle" }, // A connected workflow for hiring and onboarding
  { card: "13", slug: "hr-analytics-and-workforce-intelligence-dashboard" }, // A consistent workforce view across organizations
  { card: "14", slug: "enterprise-cost-allocation-and-profitability-analytics-platform" }, // Product and service costs traced to their drivers
  { card: "15", slug: "timesheet-analytics-and-workforce-productivity-dashboard" }, // Time and utilization across service lines
  { card: "16", slug: "unlocking-a-first-ever-pharmacy-launch-across-apac-with-ml-powered-catalog-automation" }, // Catalog automation for a pharmacy marketplace launch
  { card: "17", slug: "hospitality-profitability-intelligence-dashboard" }, // Portfolio profitability visible across hotel properties
  { card: "18", slug: "asset-management-intelligence-dashboard-for-hospitality-portfolio" }, // Asset condition and value across a hospitality portfolio
  { card: "20", slug: "multi-agent-backend-systems-for-healthcare-insurance-navigation" }, // Coordinated agents for healthcare insurance workflows
  { card: "21", slug: "real-time-commercial-performance-and-transaction-intelligence-platform" }, // Commercial performance visible as transactions happen
  { card: "24", slug: "advanced-conversion-rate-optimization-system-for-an-e-commerce-marketplace" }, // A stronger evidence base for product experiments
  { card: "27", slug: "voice-driven-ai-assistant-for-mobile-task-automation" }, // Voice commands connected to email and calendar work
  { card: "29", slug: "voice-enabled-3d-ai-customer-virtual-assistant-for-conversational-banking" }, // Conversational product guidance for a digital bank
  { card: "30", slug: "operational-bottleneck-diagnosis-and-ai-automation-for-workflow-efficiency" }, // Workflow diagnosis followed by targeted automation
  { card: "31", slug: "ai-voice-agents-for-sales-enablement-and-lead-qualification-automation" }, // Voice qualification connected to the sales workflow
  { card: "34", slug: "llm-powered-customer-support-chatbot" }, // Grounded customer support at telecom scale
  { card: "35", slug: "customer-pulse-sentiment-intelligence-dashboard" }, // Customer sentiment brought into an operating view
  { card: "36", slug: "predicting-4g-customer-churn-for-proactive-retention-using-machine-learning" }, // Earlier visibility into customer churn risk
  { card: "37", slug: "deploying-global-gender-analytics-at-scale-through-production-gender-inference" }, // Production delivery for demographic analytics
  { card: "38", slug: "credit-risk-lifestyle-index-for-alternative-financial-reliability-estimation" }, // Alternative signals for financial-reliability analysis
  { card: "39", slug: "geospatial-wealth-index-for-national-socioeconomic-segmentation" }, // Geospatial information made usable for market analysis
  { card: "41", slug: "customer-service-performance-cost-optimization" }, // Support effort connected to cost and service decisions
  { card: "42", slug: "real-time-delivery-operations-intelligence-platform" }, // Live delivery performance across cities and zones
  { card: "43", slug: "demand-forecasting-fulfillment-optimization" }, // Demand forecasts connected to supply decisions
  { card: "44", slug: "rfm-based-voucher-marketing-optimization" }, // Marketing incentives matched to customer behavior
  { card: "45", slug: "location-based-fraud-detection-system-for-mobility-operations" }, // Location anomalies surfaced before payouts
  { card: "46", slug: "dynamic-pricing-engine-for-personalized-fare-optimization" }, // Pricing decisions informed by marketplace conditions
];

/**
 * Cards taken off the website that a page still shows, as work in progress with no link (no case study page yet).
 * None at present: card 47 had been one until its page was added (22 Oct 2026).
 */
export const SHOWN_WITHOUT_LINK: string[] = [];

/** Slugs renamed when client names came off the site (20 Oct 2026): old → new. next.config.ts redirects the old ones. */
export const RENAMED_CASE_STUDY_SLUGS: [string, string][] = [
  ["truecontext-field-pulse", "field-submission-intelligence"],
  ["schneider-ai-initiative-tracker", "ai-idea-intake-and-governance"],
  ["flexagon-sow-automation", "sow-generation-and-update-automation"],
  ["flexagon-implementation-execution-portal", "implementation-execution-portal"],
];

/** Slugs the site and the public API never show: the removed case studies, and CaseStudy rows still stored under an
 * old slug (they name the client). */
export const HIDDEN_CASE_STUDY_SLUGS = [...REMOVED_CASE_STUDIES.map((c) => c.slug), ...RENAMED_CASE_STUDY_SLUGS.map(([from]) => from)];

const SLUGS = new Set(HIDDEN_CASE_STUDY_SLUGS);

/** True for a case study taken off the website, or a row still stored under a renamed slug. */
export const isRemovedCaseStudy = (slug: string | null | undefined) => !!slug && SLUGS.has(slug);
