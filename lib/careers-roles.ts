/**
 * The careers pages' open roles, with the wording of the confirmation email a candidate receives after applying
 * (lib/application-confirmation.ts).
 *
 * Every job page is listed here by its URL slug. The job page registry (app/careers/open-positions/[slug]/page.tsx)
 * and JobPage's `id` are typed against these keys, so a new role cannot be published without an entry here, and
 * its candidates always get the standard confirmation email. Only `title` is required: `review`, `nextStep` and
 * `notes` tailor the email to the role, and fall back to general wording when left out.
 */
export type CareerRole = {
  /** The role's title, as on its job page. */
  title: string;
  /** What the team reviews, completing "Our team will review …". */
  review?: string;
  /** The next stages, completing "… we will contact you to arrange …". */
  nextStep?: string;
  /** Extra paragraphs for this role only. */
  notes?: string[];
  /** The closing paragraphs (default: the timelines line and a general thank-you). */
  closing?: string[];
};

export const CAREER_ROLES = {
  "ai-engineer": {
    title: "AI Engineer",
    review: "your experience with LLM applications, RAG, AI agents and production AI systems against the requirements of the role",
    nextStep: "an initial discussion, followed by a technical interview or practical assessment",
    closing: [
      "Timelines vary by position, and we will keep you informed of next steps.",
      "Thank you for your interest in building production-grade AI with us.",
    ],
  },
  "full-stack-engineer": {
    title: "Full Stack Engineer",
    review:
      "your frontend and backend experience, including React, Next.js, TypeScript, APIs and cloud deployment, against the requirements of the role",
    nextStep: "an initial discussion, followed by a technical interview or practical assessment",
  },
  "personal-branding-ai-content-specialist": {
    title: "Personal Branding & AI Content Specialist",
    review:
      "your experience in personal branding, LinkedIn content and AI-generated video, along with any portfolio or content samples you shared",
    nextStep: "an initial discussion, followed by a practical assessment",
    notes: [
      "If you haven't already included links to LinkedIn content you have created or AI videos you have produced (for example with Higgsfield AI), please have them ready, as we will ask for them at the next stage.",
      "As a reminder, this is an on-site role with working hours of 5:00 PM to 2:00 AM PKT.",
    ],
    closing: [],
  },
} satisfies Record<string, CareerRole>;

export type CareerRoleId = keyof typeof CAREER_ROLES;

/** The careers page that takes a profile without a specific role. */
export const EXPRESSION_OF_INTEREST = "expression-of-interest";

/** Every page with an application form: the roles plus Expressions of Interest. */
export type CareerPageId = CareerRoleId | typeof EXPRESSION_OF_INTEREST;

export const isCareerRoleId = (id: string): id is CareerRoleId => Object.prototype.hasOwnProperty.call(CAREER_ROLES, id);
