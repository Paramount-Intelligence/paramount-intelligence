// Site navigation from the redesign reference (docs/website-redesign/reference).
// Reference file names map to routes as in docs/website-redesign/PORT-PLAN.md, section 1.

export type NavLink = { label: string; href: string; blurb?: string };

export const SERVICES: NavLink[] = [
  {
    label: "AI & Technology Consulting",
    href: "/services/ai-strategy-and-consulting",
    blurb: "Clear decisions on what to build, adopt, or improve.",
  },
  {
    label: "AI & Agentic Engineering",
    href: "/services/ai-solutions-and-engineering",
    blurb: "AI capabilities connected to client products and operations.",
  },
  {
    label: "Software & Product Engineering",
    href: "/services/software-product-engineering",
    blurb: "Applications customers and business teams can use.",
  },
  {
    label: "Data Engineering & Intelligence",
    href: "/services/data-and-analytics",
    blurb: "Reliable data for decisions and AI.",
  },
  {
    label: "Cloud & Production Engineering",
    href: "/services/cloud-services",
    blurb: "Systems client teams can deploy, operate, and extend.",
  },
  {
    label: "Workflow Automation",
    href: "/services/ai-workflow-automation",
    blurb: "Less repetitive work across connected systems.",
  },
];

export const INDUSTRIES: NavLink[] = [
  {
    label: "Private Equity",
    href: "/industries/private-equity",
    blurb: "AI and engineering delivery for sponsors and portfolio companies.",
  },
  {
    label: "Digital Natives",
    href: "/industries/digital-natives",
    blurb: "AI features and engineering support for software and digital businesses.",
  },
];

export const ROUTES = {
  home: "/",
  services: "/services",
  forwardDeployed: "/services#forward-deployed-engineering",
  industries: "/industries",
  caseStudies: "/case-studies",
  about: "/about-us",
  careers: "/careers/open-positions",
  contact: "/contact-us",
  privacyPolicy: "/privacy-policy",
} as const;

export const CONTACT_EMAIL = "marty@paramountintelligence.co";
export const LINKEDIN_URL = "https://www.linkedin.com/company/paramount-intelligence-co/";
