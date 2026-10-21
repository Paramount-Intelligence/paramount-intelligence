import nodemailer from "nodemailer";

/*
 * Mail settings for the contact and careers forms, read from the environment (Vercel → Project → Settings →
 * Environment Variables; locally .env.local). Documented in README.md and .env.example; `npm run smtp:check`
 * tests the login with the same settings.
 *
 *   SMTP_HOST        mail server, for example smtp.gmail.com                       required
 *   SMTP_PORT        465 (TLS) or 587 (STARTTLS); default 587
 *   SMTP_SECURE      "true" for port 465, "false" for 587; if unset, true only on port 465
 *   SMTP_USER        login, usually the full email address                          required
 *   SMTP_PASSWORD    password; for Gmail an app password                            required
 *   SMTP_FROM_EMAIL  sender address; if unset, SMTP_USER
 *   CAREERS_EMAIL    inbox for careers submissions (and contact enquiries when CONTACT_EMAIL is unset)
 *   CONTACT_EMAIL    inbox for contact enquiries; if unset, CAREERS_EMAIL
 */

const SMTP_REQUIRED = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"] as const;

/** Names (never values) of missing settings: the SMTP login, and the inbox (`recipient` lists its alternatives). */
export function missingMailSettings(recipient: string[] = []): string[] {
  const missing: string[] = SMTP_REQUIRED.filter((k) => !process.env[k]);
  if (recipient.length && !recipient.some((k) => process.env[k])) missing.push(recipient.join(" or "));
  return missing;
}

export function mailTransport() {
  const port = parseInt(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
}

/** Sender address: SMTP_FROM_EMAIL, else the SMTP account itself. */
export const mailFrom = () => process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

/** Inbox for contact enquiries: CONTACT_EMAIL, else CAREERS_EMAIL. */
export const contactInbox = () => process.env.CONTACT_EMAIL || process.env.CAREERS_EMAIL;

/** A user-supplied link for an email href: http(s) only, otherwise null (shown as text instead). */
export const safeHref = (url: string | undefined) => (url && /^https?:\/\//i.test(url.trim()) ? url.trim() : null);
