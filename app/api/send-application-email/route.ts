import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Support both JSON and multipart/form-data (for file upload)
    const contentType = request.headers.get("content-type") || "";
    let formData: any = {};
    let resumeAttachment: { filename: string; content: Buffer } | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      formData = {
        firstName: (form.get("firstName") as FormDataEntryValue) || "",
        lastName: (form.get("lastName") as FormDataEntryValue) || "",
        email: (form.get("email") as FormDataEntryValue) || "",
        phone: (form.get("phone") as FormDataEntryValue) || "",
        position: (form.get("position") as FormDataEntryValue) || "",
        experience: (form.get("experience") as FormDataEntryValue) || "",
        linkedIn: (form.get("linkedIn") as FormDataEntryValue) || "",
        portfolio: (form.get("portfolio") as FormDataEntryValue) || "",
        coverLetter: (form.get("coverLetter") as FormDataEntryValue) || "",
      };

      const resume = form.get("resume") as any;
      if (resume && typeof resume.arrayBuffer === "function") {
        const arrayBuffer = await resume.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = resume.name || "resume";
        resumeAttachment = { filename, content: buffer };
      }
    } else {
      formData = await request.json();
    }

    // Configure your SMTP settings here
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    // Prepare email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #17599d;">New Job Application Received</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Applicant Information</h3>
          
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Position Applied For:</strong> ${formData.position}</p>
          <p><strong>Years of Experience:</strong> ${formData.experience}</p>
          
          ${formData.linkedIn ? `<p><strong>LinkedIn Profile:</strong> <a href="${formData.linkedIn}">${formData.linkedIn}</a></p>` : ""}
          ${formData.portfolio ? `<p><strong>Portfolio/GitHub:</strong> <a href="${formData.portfolio}">${formData.portfolio}</a></p>` : ""}
          
          <h3 style="margin-top: 20px; color: #333;">Cover Letter</h3>
          <p style="white-space: pre-wrap; color: #555;">${formData.coverLetter}</p>
          
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            <em>Resume/CV was attached to this application.</em>
          </p>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          This is an automated email from the Paramount Intelligence careers portal.
        </p>
      </div>
    `;

    // Email to company (include resume attachment if present)
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CAREERS_EMAIL,
      subject: `New Application: ${formData.firstName} ${formData.lastName} - ${formData.position}`,
      html: emailHTML,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    // Confirmation email to applicant
    const confirmationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #17599d;">Application Received</h2>
        
        <p>Dear ${formData.firstName},</p>
        
        <p>Thank you for your interest in Paramount Intelligence and for submitting your application for the <strong>${formData.position}</strong> position.</p>
        
        <p>We have successfully received your application and resume. Our hiring team will review your qualifications and get back to you within 3-5 business days.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Your Application Details</h3>
          <p><strong>Position:</strong> ${formData.position}</p>
          <p><strong>Experience Level:</strong> ${formData.experience}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>In the meantime, feel free to explore more about Paramount Intelligence on our <a href="https://paramountintelligence.co/">website</a>.</p>
        
        <p>Best regards,<br/>
        <strong>Paramount Intelligence Recruitment Team</strong></p>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          If you have any questions, please contact us at ${process.env.CAREERS_EMAIL}
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: formData.email,
      subject: "Application Confirmation - Paramount Intelligence",
      html: confirmationHTML,
    });

    return NextResponse.json(
      { success: true, message: "Application submitted and email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
