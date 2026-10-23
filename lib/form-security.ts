// Server-side checks on the visitor input the contact and careers routes put into emails
// (app/api/send-contact-email, app/api/send-application-email).

export const EMAIL_ERROR = "Please enter one valid email address.";

/** Characters a plain address never needs that the mail library reads as address syntax: list separators,
 *  display-name brackets, quotes, comments, groups and whitespace (which includes CR and LF). */
const NOT_IN_A_PLAIN_ADDRESS = /[\s,;<>"()\\:[\]]/;

/**
 * The visitor's email as exactly one plain address (trimmed), or null when it isn't one: not a string, empty,
 * longer than 254 characters, containing any character above, not exactly one @, or a domain without a dot.
 */
export function oneEmailAddress(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (!email || email.length > 254 || NOT_IN_A_PLAIN_ADDRESS.test(email)) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (!local || !domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) return null;
  return email;
}

/** The 400 answer for an email that isn't one plain address; nothing has been sent at that point. */
export const emailRejected = () => Response.json({ success: false, field: "email", error: EMAIL_ERROR }, { status: 400 });

/** A visitor value placed in an email subject line: on one line (CR and LF removed) and at most 150 characters. */
export const subjectPart = (value: unknown): string =>
  (typeof value === "string" ? value : "").replace(/[\r\n]+/g, " ").trim().slice(0, 150);
