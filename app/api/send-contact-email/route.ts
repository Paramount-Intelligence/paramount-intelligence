import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { emailRejected, oneEmailAddress, subjectPart } from "@/lib/form-security";
import { contactInbox, mailFrom, mailTransport, missingMailSettings } from "@/lib/mailer";

// Settings are listed in lib/mailer.ts. Enquiries go to CONTACT_EMAIL, or CAREERS_EMAIL when it isn't set, and
// nowhere else: the visitor gets the on-screen confirmation, not an email.
export async function POST(request: NextRequest) {
  const missing = missingMailSettings(["CONTACT_EMAIL", "CAREERS_EMAIL"]);
  if (missing.length) {
    console.error(`send-contact-email: missing settings ${missing.join(", ")}`);
    return NextResponse.json({ success: false }, { status: 500 });
  }
  const from = mailFrom();
  const inbox = contactInbox();

  try {
    const data = (await request.json()) ?? {};
    // One plain address, checked before anything is sent.
    const email = oneEmailAddress(data.email);
    if (!email) return emailRejected();
    // Form input placed in the email HTML is escaped.
    const h = Object.fromEntries(
      ["name", "company", "phone", "subject", "message"].map((k) => [k, escapeHtml(data[k])]),
    ) as Record<string, string>;
    h.email = escapeHtml(email);

    const transporter = mailTransport();

    await transporter.verify();

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #17599d;">New Contact Form Submission</h2>
        <div style="background:#f7fafc; padding:16px; border-radius:8px;">
          <p><strong>Name:</strong> ${h.name || "-"}</p>
          <p><strong>Email:</strong> ${h.email || "-"}</p>
          <p><strong>Company:</strong> ${h.company || "-"}</p>
          <p><strong>Phone:</strong> ${h.phone || "-"}</p>
          <p><strong>Subject:</strong> ${h.subject || "-"}</p>
          <h4>Message</h4>
          <p style="white-space: pre-wrap;">${h.message || "-"}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: inbox,
      subject: `Contact: ${subjectPart(data.subject)} - ${subjectPart(data.name)}`,
      html: emailHTML,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // The mail server's error goes to the server log only.
    console.error("send-contact-email error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
