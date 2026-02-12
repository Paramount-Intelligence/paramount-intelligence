import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

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
          <p><strong>Name:</strong> ${data.name || "-"}</p>
          <p><strong>Email:</strong> ${data.email || "-"}</p>
          <p><strong>Company:</strong> ${data.company || "-"}</p>
          <p><strong>Phone:</strong> ${data.phone || "-"}</p>
          <p><strong>Subject:</strong> ${data.subject || "-"}</p>
          <h4>Message</h4>
          <p style="white-space: pre-wrap;">${data.message || "-"}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CAREERS_EMAIL,
      subject: `Contact: ${data.subject} - ${data.name}`,
      html: emailHTML,
    });

    // optional confirmation email to user
    if (data.email) {
      const confirmationHTML = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
          <h2 style="color:#17599d">Thanks for contacting Paramount Intelligence</h2>
          <p>Hi ${data.name || ""},</p>
          <p>Thanks for reaching out regarding <strong>${data.subject}</strong>. We received your message and will get back to you shortly.</p>
          <div style="margin-top:16px;color:#999;font-size:12px">If you need immediate assistance, email ${process.env.CAREERS_EMAIL}</div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: data.email,
        subject: "We received your message - Paramount Intelligence",
        html: confirmationHTML,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-contact-email error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
