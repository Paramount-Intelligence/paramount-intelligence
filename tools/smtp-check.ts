// npm run smtp:check: tests the mail login the contact and careers forms use (lib/mailer.ts), without sending
// anything. Settings come from the environment, else .env.local / .env as in Next.js. Prints only "SMTP login OK" or
// the error code and message, never the password.
import { config } from "dotenv";
import { mailTransport, missingMailSettings } from "../lib/mailer";

config({ path: [".env.local", ".env"], quiet: true });

async function main() {
  // The login needs the server settings only; the recipient inboxes don't matter here.
  const missing = missingMailSettings();
  if (missing.length) {
    console.error(`SMTP login failed: MISSING_SETTINGS missing ${missing.join(", ")}`);
    process.exit(1);
  }
  try {
    await mailTransport().verify();
    console.log("SMTP login OK");
  } catch (err) {
    const e = err as { code?: string; message?: string };
    const pass = process.env.SMTP_PASSWORD!;
    const message = String(e.message ?? err).split(pass).join("***");
    console.error(`SMTP login failed: ${e.code ?? "ERROR"} ${message}`);
    process.exit(1);
  }
}

main();
