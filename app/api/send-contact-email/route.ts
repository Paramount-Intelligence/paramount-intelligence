import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { contactInbox, mailFrom, mailTransport, missingMailSettings } from "@/lib/mailer";

// Settings are listed in lib/mailer.ts. Enquiries go to CONTACT_EMAIL, or CAREERS_EMAIL when it isn't set.
export async function POST(request: NextRequest) {
  const missing = missingMailSettings(["CONTACT_EMAIL", "CAREERS_EMAIL"]);
  if (missing.length) {
    console.error(`send-contact-email: missing settings ${missing.join(", ")}`);
    return NextResponse.json({ success: false }, { status: 500 });
  }
  const from = mailFrom();
  const inbox = contactInbox();

  try {
    const data = await request.json();
    // Form input placed in the email HTML is escaped.
    const h = Object.fromEntries(
      ["name", "email", "company", "phone", "subject", "message"].map((k) => [k, escapeHtml(data[k])]),
    ) as Record<string, string>;

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
      subject: `Contact: ${data.subject} - ${data.name}`,
      html: emailHTML,
    });

    // optional confirmation email to user
    if (data.email) {
      const confirmationHTML = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
          <h2 style="color:#17599d">Thanks for contacting Paramount Intelligence</h2>
          <p>Hi ${h.name || ""},</p>
          <p>Thanks for reaching out regarding <strong>${h.subject}</strong>. We received your message and will get back to you shortly.</p>
          <div style="margin-top:16px;color:#999;font-size:12px">If you need immediate assistance, email ${inbox}</div>
        </div>
      `;

      // The inquiry has been delivered by now: a confirmation the visitor's address refuses is logged, not reported
      // to the visitor as a failed inquiry.
      try {
        await transporter.sendMail({
          from,
          to: data.email,
          subject: "We received your message - Paramount Intelligence",
          html: confirmationHTML,
        });
      } catch (err) {
        console.error("send-contact-email: inquiry sent, confirmation to the visitor failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // The mail server's error goes to the server log only.
    console.error("send-contact-email error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
