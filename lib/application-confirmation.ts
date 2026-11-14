import { escapeHtml } from "@/lib/escape-html";
import { SITE_URL } from "@/lib/metadata";
import { CAREER_ROLES, EXPRESSION_OF_INTEREST, isCareerRoleId, type CareerRole } from "@/lib/careers-roles";

/**
 * The email a candidate receives after applying (app/api/send-application-email).
 *
 * It is built only from the site's own text: the page id the form sends is looked up in lib/careers-roles.ts, and
 * nothing the applicant typed goes into it, so the form cannot be used to send someone else a message of the
 * sender's choosing. An unknown or missing id (for example the older /careers/apply-now form) gets the general
 * version.
 */
export type Confirmation = { subject: string; text: string; html: string };

// A simple, mostly-text email, like what the sending (Gmail) account normally sends: the company name as text instead
// of a logo image, and addresses written out as text rather than links. Branded images and links from an account
// whose domain mail providers cannot match to the brand are a common reason for messages to land in spam.

const NAVY = "#0F256E";
const ROYAL = "#204ECF";
const TEXT = "#2B3245";
const MUTED = "#646C7E";
const SITE = SITE_URL.replace(/^https?:\/\//, "");
const OPEN_POSITIONS = `${SITE_URL}/careers/open-positions`;
const FOOTER = "This is an automated confirmation. Please do not share confidential client information in your application.";

type Block = { heading?: string; text: string; link?: string };

const DEFAULT_CLOSING = ["Timelines vary by position, and we will keep you informed of next steps.", "Thank you for your interest in Paramount Intelligence."];

function content(pageId: string, withResume: boolean): { subject: string; blocks: Block[] } {
  const received = withResume ? "your application and resume" : "your application";

  if (pageId === EXPRESSION_OF_INTEREST) {
    return {
      subject: "Profile received: Paramount Intelligence",
      blocks: [
        { text: `Thank you for sharing your profile with Paramount Intelligence. We have received your details${withResume ? " and resume" : ""}.` },
        {
          text: "We will keep your profile on file and contact you when an opportunity matching your experience becomes available. Current openings are always listed on our Careers page:",
          link: OPEN_POSITIONS,
        },
        { text: "Thank you for your interest in working with us." },
      ],
    };
  }

  const role: CareerRole | undefined = isCareerRoleId(pageId) ? CAREER_ROLES[pageId] : undefined;
  const review = role?.review ?? "your experience against the requirements of the role";
  const nextStep = role?.nextStep ?? "an initial discussion, followed by an interview or practical assessment";
  return {
    subject: role ? `Application received: ${role.title}, Paramount Intelligence` : "Application received: Paramount Intelligence",
    blocks: [
      {
        text: role
          ? `Thank you for applying for the ${role.title} role at Paramount Intelligence. We have received ${received}.`
          : `Thank you for applying to Paramount Intelligence. We have received ${received}.`,
      },
      {
        heading: "What happens next",
        text: `Our team will review ${review}. If your profile is a match, we will contact you to arrange ${nextStep}.`,
      },
      ...(role?.notes ?? []).map((text) => ({ text })),
      ...(role?.closing ?? DEFAULT_CLOSING).map((text) => ({ text })),
    ],
  };
}

const plain = (blocks: Block[]) =>
  [
    "Hello,",
    ...blocks.map((b) => [b.heading, b.text, b.link].filter(Boolean).join("\n")),
    `Kind regards,\nThe Paramount Intelligence Team\n${SITE}`,
    FOOTER,
  ].join("\n\n");

const p = (inner: string, extra = "") => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${TEXT};${extra}">${inner}</p>`;

function html(blocks: Block[]): string {
  const body = blocks
    .map((b) => {
      const heading = b.heading ? `<p style="margin:8px 0 4px;font-size:15px;font-weight:700;color:${NAVY};">${escapeHtml(b.heading)}</p>` : "";
      const addr = b.link ? ` ${escapeHtml(b.link.replace(/^https?:\/\//, ""))}` : "";
      return heading + p(escapeHtml(b.text) + addr);
    })
    .join("");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:24px 20px;font-family:Arial,Helvetica,sans-serif;">
<p style="margin:0 0 24px;padding-bottom:14px;border-bottom:2px solid ${ROYAL};font-size:20px;line-height:1.2;color:${NAVY};"><strong>Paramount</strong> <span style="color:${ROYAL};">Intelligence</span></p>
${p("Hello,")}
${body}
${p(`Kind regards,<br><strong>The Paramount Intelligence Team</strong><br>${SITE}`, "margin-top:24px;")}
<p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:${MUTED};">${FOOTER}</p>
</div>
</body></html>`;
}

export function applicationConfirmation(pageId: string, withResume: boolean): Confirmation {
  const { subject, blocks } = content(pageId, withResume);
  return { subject, text: plain(blocks), html: html(blocks) };
}
