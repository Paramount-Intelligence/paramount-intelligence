import { escapeHtml } from "@/lib/escape-html";
import { SITE_URL } from "@/lib/metadata";
import { CAREER_ROLES, EXPRESSION_OF_INTEREST, isCareerRoleId, type CareerRole } from "@/lib/careers-roles";
import { EMAIL_LOGO_PNG_BASE64, EMAIL_LOGO_SIZE } from "@/lib/email-logo";

/**
 * The email a candidate receives after applying (app/api/send-application-email).
 *
 * It is built only from the site's own text: the page id the form sends is looked up in lib/careers-roles.ts, and
 * nothing the applicant typed goes into it, so the form cannot be used to send someone else a message of the
 * sender's choosing. An unknown or missing id (for example the older /careers/apply-now form) gets the general
 * version.
 */
export type Confirmation = {
  subject: string;
  text: string;
  html: string;
  /** The logo, embedded in the email (shown by `cid:` in the header) so it appears without loading remote images. */
  attachments: { filename: string; content: Buffer; cid: string; contentType: string; contentDisposition: "inline" }[];
};

const LOGO_CID = "pi-logo@paramountintelligence.co";

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
      const heading = b.heading ? `<p style="margin:8px 0 6px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${ROYAL};">${escapeHtml(b.heading)}</p>` : "";
      const link = b.link ? ` <a href="${escapeHtml(b.link)}" style="color:${ROYAL};font-weight:700;text-decoration:none;">${escapeHtml(b.link.replace(/^https?:\/\//, ""))}</a>` : "";
      return heading + p(escapeHtml(b.text) + link);
    })
    .join("");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Paramount Intelligence</title></head>
<body style="margin:0;padding:0;background:#F3F5F9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F5F9;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-top:4px solid ${ROYAL};font-family:Arial,Helvetica,sans-serif;">
<tr><td style="background:#FFFFFF;padding:22px 28px;border-bottom:1px solid #D9DBE0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:12px;vertical-align:middle;"><img src="cid:${LOGO_CID}" width="${EMAIL_LOGO_SIZE.width}" height="${EMAIL_LOGO_SIZE.height}" alt="Paramount Intelligence logo" style="display:block;border:0;"></td>
<td style="vertical-align:middle;font-size:19px;font-weight:700;line-height:1.15;color:${NAVY};">Paramount<br><span style="font-weight:400;color:${ROYAL};">Intelligence</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:32px 28px 12px;">
${p("Hello,")}
${body}
${p(`Kind regards,<br><strong style="color:${NAVY};">The Paramount Intelligence Team</strong><br><a href="${SITE_URL}" style="color:${ROYAL};text-decoration:none;">${SITE}</a>`, "margin-top:24px;")}
</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #D9DBE0;">
<p style="margin:0;font-size:12px;line-height:1.5;color:${MUTED};">${FOOTER}</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export function applicationConfirmation(pageId: string, withResume: boolean): Confirmation {
  const { subject, blocks } = content(pageId, withResume);
  return {
    subject,
    text: plain(blocks),
    html: html(blocks),
    attachments: [
      { filename: "paramount-intelligence.png", content: Buffer.from(EMAIL_LOGO_PNG_BASE64, "base64"), cid: LOGO_CID, contentType: "image/png", contentDisposition: "inline" },
    ],
  };
}
