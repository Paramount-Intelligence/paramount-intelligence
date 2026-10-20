import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";

// Settings the form can't send without (Vercel → Project → Settings → Environment Variables).
const REQUIRED = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "CAREERS_EMAIL"] as const;

export async function POST(request: NextRequest) {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`send-contact-email: missing settings ${missing.join(", ")}`);
    return NextResponse.json({ success: false }, { status: 500 });
  }
  // Without a sender address, send from the SMTP account itself.
  const from = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

  try {
    const data = await request.json();
    // Form input placed in the email HTML is escaped.
    const h = Object.fromEntries(
      ["name", "email", "company", "phone", "subject", "message"].map((k) => [k, escapeHtml(data[k])]),
    ) as Record<string, string>;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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
      to: process.env.CAREERS_EMAIL,
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
          <div style="margin-top:16px;color:#999;font-size:12px">If you need immediate assistance, email ${process.env.CAREERS_EMAIL}</div>
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
