import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { mailFrom, mailTransport, missingMailSettings, safeHref } from "@/lib/mailer";

export const runtime = "nodejs";

type ApplicationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  linkedIn: string;
  portfolio: string;
  coverLetter: string;
  university: string;
  degree: string;
  education: string;
  semester: string;
};

type ResumeAttachment = {
  filename: string;
  content: Buffer;
};

const getStringValue = (value: unknown): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  return "";
};

const parseMultipartFormData = async (
  request: NextRequest,
): Promise<{ formData: ApplicationFormData; resumeAttachment?: ResumeAttachment }> => {
  const form = await request.formData();

  const formData: ApplicationFormData = {
    firstName: getStringValue(form.get("firstName")),
    lastName: getStringValue(form.get("lastName")),
    email: getStringValue(form.get("email")),
    phone: getStringValue(form.get("phone")),
    position: getStringValue(form.get("position")),
    experience: getStringValue(form.get("experience")),
    linkedIn: getStringValue(form.get("linkedIn")),
    portfolio: getStringValue(form.get("portfolio")),
    coverLetter: getStringValue(form.get("coverLetter")),
    university: getStringValue(form.get("university")),
    degree: getStringValue(form.get("degree")),
    education: getStringValue(form.get("education")),
    semester: getStringValue(form.get("semester")),
  };

  const resume = form.get("resume");
  if (resume && typeof resume !== "string" && typeof resume.arrayBuffer === "function") {
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = resume.name || "resume";
    return { formData, resumeAttachment: { filename, content: buffer } };
  }

  return { formData };
};

const parseJsonFormData = async (request: NextRequest): Promise<ApplicationFormData> => {
  const body = await request.json();
  return {
    firstName: getStringValue(body.firstName),
    lastName: getStringValue(body.lastName),
    email: getStringValue(body.email),
    phone: getStringValue(body.phone),
    position: getStringValue(body.position),
    experience: getStringValue(body.experience),
    linkedIn: getStringValue(body.linkedIn),
    portfolio: getStringValue(body.portfolio),
    coverLetter: getStringValue(body.coverLetter),
    university: getStringValue(body.university),
    degree: getStringValue(body.degree),
    education: getStringValue(body.education),
    semester: getStringValue(body.semester),
  };
};

// An applicant's link in the email: clickable only when it is an http(s) address, otherwise shown as text.
const link = (url: string) => {
  const href = safeHref(url);
  return href ? `<a href="${escapeHtml(href)}">${escapeHtml(url)}</a>` : escapeHtml(url);
};

// Mail settings are listed in lib/mailer.ts; applications go to CAREERS_EMAIL.
export async function POST(request: NextRequest) {
  const missing = missingMailSettings(["CAREERS_EMAIL"]);
  if (missing.length) {
    console.error(`send-application-email: missing settings ${missing.join(", ")}`);
    return NextResponse.json(
      { success: false, message: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
  const from = mailFrom();

  try {
    // Support both JSON and multipart/form-data (for file upload)
    const contentType = request.headers.get("content-type") || "";
    let formData: ApplicationFormData;
    let resumeAttachment: ResumeAttachment | undefined;

    if (contentType.includes("multipart/form-data")) {
      const multipartData = await parseMultipartFormData(request);
      formData = multipartData.formData;
      resumeAttachment = multipartData.resumeAttachment;
    } else {
      formData = await parseJsonFormData(request);
    }

    const transporter = mailTransport();

    // Verify connection
    await transporter.verify();

    // Prepare email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #17599d;">New Job Application Received</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Applicant Information</h3>
          
          <p><strong>Name:</strong> ${escapeHtml(formData.firstName)} ${escapeHtml(formData.lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
          <p><strong>Position Applied For:</strong> ${escapeHtml(formData.position)}</p>
          <p><strong>Years of Experience:</strong> ${escapeHtml(formData.experience)}</p>
          
          ${formData.linkedIn ? `<p><strong>LinkedIn Profile:</strong> ${link(formData.linkedIn)}</p>` : ""}
          ${formData.portfolio ? `<p><strong>Portfolio/GitHub:</strong> ${link(formData.portfolio)}</p>` : ""}
          
          <h3 style="margin-top: 20px; color: #333;">Cover Letter</h3>
          <p style="white-space: pre-wrap; color: #555;">${escapeHtml(formData.coverLetter)}</p>
          
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
      from,
      to: process.env.CAREERS_EMAIL,
      subject: `New Application: ${formData.firstName} ${formData.lastName} - ${formData.position}`,
      html: emailHTML,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    // Confirmation email to applicant
    const confirmationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #17599d;">Application Received</h2>
        
        <p>Dear ${escapeHtml(formData.firstName)},</p>
        
        <p>Thank you for your interest in Paramount Intelligence and for submitting your application for the <strong>${escapeHtml(formData.position)}</strong> position.</p>
        
        <p>We have successfully received your application and resume. Our hiring team will review your qualifications and get back to you within 3-5 business days.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Your Application Details</h3>
          <p><strong>Position:</strong> ${escapeHtml(formData.position)}</p>
          <p><strong>Experience Level:</strong> ${escapeHtml(formData.experience)}</p>
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

    // The application has been delivered by now: a confirmation the applicant's address refuses is logged,
    // not reported to the applicant as a failed application.
    try {
      await transporter.sendMail({
        from,
        to: formData.email,
        subject: "Application Confirmation - Paramount Intelligence",
        html: confirmationHTML,
      });
    } catch (error) {
      console.error("send-application-email: application sent, confirmation to the applicant failed:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted and email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // The underlying error (mail server) goes to the server log only.
    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
