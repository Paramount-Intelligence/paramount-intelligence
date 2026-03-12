import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

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

type AirtableCreateResponse = {
  records?: Array<{
    id?: string;
    createdTime?: string;
  }>;
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

const saveApplicationToAirtable = async (
  formData: ApplicationFormData,
  resumeAttachment?: ResumeAttachment,
): Promise<{ recordId: string }> => {
  const personalAccessToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!personalAccessToken || !baseId || !tableName) {
    throw new Error(
      "Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME.",
    );
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const fields: Record<string, string | number> = {
    "Full Name": fullName,
    Email: formData.email,
    "Phone Number": formData.phone,
    "Position Applied for": formData.position,
    "Cover Letter": formData.coverLetter,
    
  };

  if (formData.university) {
    fields.University = formData.university;
  }

  if (formData.degree) {
    fields.Degree = formData.degree;
  }

  if (formData.education) {
    fields.Education = formData.education;
  }

  if (formData.semester) {
    const parsedSemester = Number(formData.semester);
    fields.Semester = Number.isNaN(parsedSemester) ? formData.semester : parsedSemester;
  }

  // Resume is handled via email attachment. Airtable Attachment fields require objects
  // with publicly accessible URLs, so we do not send Resume here.

  const airtableEndpoint = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const postRecord = async (recordFields: Record<string, string | number>) => {
    const response = await fetch(airtableEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${personalAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: recordFields }],
      }),
    });

    const responseText = await response.text();
    let responseJson: AirtableCreateResponse | null = null;
    try {
      responseJson = responseText ? (JSON.parse(responseText) as AirtableCreateResponse) : null;
    } catch {
      responseJson = null;
    }

    return { response, responseText, responseJson };
  };

  let airtableResult = await postRecord(fields);
  if (airtableResult.response.ok) {
    const recordId = airtableResult.responseJson?.records?.[0]?.id;
    if (!recordId) {
      throw new Error("Airtable request succeeded but no record ID was returned.");
    }

    return { recordId };
  }

  const airtableErrorText = airtableResult.responseText;

  // Some Airtable select fields reject unknown options when token lacks schema-write permissions.
  // Retry once without select-like fields to keep submission flow working.
  if (
    airtableResult.response.status === 422 &&
    airtableErrorText.includes("INVALID_MULTIPLE_CHOICE_OPTIONS")
  ) {
    const fallbackFields = { ...fields };
    delete fallbackFields["Position Applied for"];
    delete fallbackFields.Education;

    airtableResult = await postRecord(fallbackFields);
    if (airtableResult.response.ok) {
      const recordId = airtableResult.responseJson?.records?.[0]?.id;
      if (!recordId) {
        throw new Error("Airtable fallback request succeeded but no record ID was returned.");
      }

      return { recordId };
    }

    throw new Error(
      `Airtable request failed (${airtableResult.response.status}): ${airtableResult.responseText}`,
    );
  }

  throw new Error(`Airtable request failed (${airtableResult.response.status}): ${airtableErrorText}`);
};

export async function POST(request: NextRequest) {
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

    const airtableResult = await saveApplicationToAirtable(formData, resumeAttachment);
    console.info("Airtable record created", {
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME,
      recordId: airtableResult.recordId,
      applicantEmail: formData.email,
    });

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
      {
        success: true,
        message: "Application submitted and email sent successfully",
        airtableRecordId: airtableResult.recordId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
