type AirtableAttachment = {
  url?: string;
  filename?: string;
};

type AirtableRecord = {
  id: string;
  createdTime?: string;
  fields: Record<string, unknown>;
};

type AirtableListResponse = {
  records?: AirtableRecord[];
  offset?: string;
  error?: {
    type?: string;
    message?: string;
  };
};

type AirtableMetaResponse = {
  tables?: Array<{
    id: string;
    name: string;
    fields?: Array<{
      id: string;
      name: string;
      type: string;
    }>;
  }>;
  error?: {
    type?: string;
    message?: string;
  };
};

export type AirtableApplicant = {
  id: string;
  candidateName: string;
  university: string;
  email: string;
  phone: string;
  roleAppliedFor: string;
  degree: string;
  education: string;
  semester: string;
  gpa: string;
  experience: string;
  skills: string;
  resumeLink: string;
  resume: string;
  coverLetter: string;
  applicationStatus: string;
  location: string;
  notes: string;
  source: string;
  interviewDate: string;
  interviewer: string;
  interviewNotes: string;
  interviewResult: string;
  positionGranted: string;
  parsedName: string;
  contactInformation: string;
  educationSummary: string;
  workExperience: string;
  emailSent: string;
  emailSentTime: string;
  assessmentSubmission: string;
  submissionDate: string;
  applicationReceivedDate: string;
  submissionReminderEmail: string;
  submissionReminderEmailDate: string;
  created: string;
  notForUs: string;
  createdDate: string;
  lastUpdatedDate: string;
  fields: Record<string, string>;
};

export type AirtableMember = {
  id: string;
  memberName: string;
  email: string;
  role: string;
  department: string;
  status: string;
  joiningDate: string;
  notes: string;
  createdDate: string;
  lastUpdatedDate: string;
};

const getAirtableToken = () =>
  process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;

export const getAirtableConfig = () => {
  const token = getAirtableToken();
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    throw new Error(
      "Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN or AIRTABLE_API_KEY, plus AIRTABLE_BASE_ID.",
    );
  }

  return { token, baseId };
};

const getTableName = (primary: string | undefined, fallback?: string) => {
  const tableName = primary || fallback;
  if (!tableName) {
    throw new Error("Airtable table name is not configured.");
  }

  return tableName;
};

export const getApplicantsTableName = () =>
  getTableName(
    process.env.AIRTABLE_APPLICANTS_TABLE_NAME,
    process.env.AIRTABLE_TABLE_NAME,
  );

export const getApplicantsViewName = () =>
  process.env.AIRTABLE_APPLICANTS_VIEW_NAME ||
  process.env.AIRTABLE_VIEW_NAME ||
  "Grid view";

export const getPermanentMembersTableName = () =>
  getTableName(process.env.AIRTABLE_PERMANENT_MEMBERS_TABLE_NAME);

export const getOptionalPermanentMembersTableName = () =>
  process.env.AIRTABLE_PERMANENT_MEMBERS_TABLE_NAME?.trim() || "";

const stringifyField = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "number" || typeof item === "boolean") return String(item);
        if (item && typeof item === "object") {
          const attachment = item as AirtableAttachment;
          return attachment.filename || attachment.url || "";
        }
        return "";
      })
      .filter(Boolean)
      .join(", ");
  }

  return "";
};

const getField = (fields: Record<string, unknown>, names: string[]) => {
  for (const name of names) {
    const value = fields[name];
    const normalized = stringifyField(value);
    if (normalized) return normalized;
  }

  return "";
};

const getAttachmentUrl = (fields: Record<string, unknown>, names: string[]) => {
  for (const name of names) {
    const value = fields[name];
    if (Array.isArray(value)) {
      const attachment = value.find(
        (item): item is AirtableAttachment =>
          Boolean(item && typeof item === "object" && "url" in item),
      );
      if (attachment?.url) return attachment.url;
    }

    const normalized = stringifyField(value);
    if (normalized.startsWith("http")) return normalized;
    const urlMatch = normalized.match(/\((https?:\/\/[^)]+)\)/);
    if (urlMatch?.[1]) return urlMatch[1];
  }

  return "";
};

export const applicantFieldNames = [
  "Full Name",
  "University",
  "Position Applied for",
  "Degree",
  "Education",
  "Semester",
  "GPA",
  "Resume",
  "Cover Letter",
  "Stage",
  "Email",
  "Phone Number",
  "Location",
  "Notes",
  "Source",
  "Interview Date",
  "Interviewer",
  "Interview Notes",
  "Interview Result",
  "Position Granted",
  "Name",
  "Contact Information",
  "Education 2",
  "Work Experience",
  "Skills",
  "Email Sent",
  "Email Sent Time",
  "Assessment Submission",
  "Submission Date",
  "Application Received date",
  "Submission Reminder Email",
  "Submission Reminder Email Date",
  "Created",
  "Not For Us",
];

const normalizeFields = (fields: Record<string, unknown>, names: string[]) => {
  const orderedNames = [
    ...names,
    ...Object.keys(fields).filter((name) => !names.includes(name)),
  ];

  return orderedNames.reduce<Record<string, string>>((acc, name) => {
    acc[name] = stringifyField(fields[name]);
    return acc;
  }, {});
};

export const getAirtableFieldColumns = (records: AirtableRecord[]) => {
  const liveFields = new Set<string>();

  records.forEach((record) => {
    Object.keys(record.fields || {}).forEach((field) => liveFields.add(field));
  });

  return [
    ...applicantFieldNames,
    ...Array.from(liveFields).filter((field) => !applicantFieldNames.includes(field)),
  ];
};

export const fetchAirtableTableFields = async (
  tableName: string,
): Promise<string[]> => {
  const { token, baseId } = getAirtableConfig();
  const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const payload = (await response.json()) as AirtableMetaResponse;

  if (!response.ok) {
    throw new Error(
      payload.error?.message ||
        `Airtable metadata request failed with status ${response.status}`,
    );
  }

  const table = payload.tables?.find(
    (item) => item.name === tableName || item.id === tableName,
  );

  if (!table) {
    throw new Error(`Airtable table "${tableName}" was not found in metadata.`);
  }

  return table.fields?.map((field) => field.name) || [];
};

export const fetchAirtableRecords = async (
  tableName: string,
  options: { viewName?: string } = {},
): Promise<AirtableRecord[]> => {
  const { token, baseId } = getAirtableConfig();
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    );
    url.searchParams.set("pageSize", "100");
    if (options.viewName) url.searchParams.set("view", options.viewName);
    if (offset) url.searchParams.set("offset", offset);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const payload = (await response.json()) as AirtableListResponse;

    if (!response.ok) {
      throw new Error(
        payload.error?.message ||
          `Airtable request failed with status ${response.status}`,
      );
    }

    records.push(...(payload.records || []));
    offset = payload.offset;
  } while (offset);

  return records;
};

export const normalizeApplicant = (
  record: AirtableRecord,
  columns = applicantFieldNames,
): AirtableApplicant => {
  const fields = record.fields;

  return {
    id: record.id,
    candidateName:
      getField(fields, ["Candidate Name", "Full Name", "Name"]) || "Unnamed candidate",
    university: getField(fields, ["University"]),
    email: getField(fields, ["Email", "Email Address"]),
    phone: getField(fields, ["Phone", "Phone Number", "Mobile"]),
    roleAppliedFor: getField(fields, ["Role Applied For", "Position Applied for", "Position", "Role"]),
    degree: getField(fields, ["Degree"]),
    education: getField(fields, ["Education"]),
    semester: getField(fields, ["Semester"]),
    gpa: getField(fields, ["GPA"]),
    experience: getField(fields, ["Experience", "Years of Experience"]),
    skills: getField(fields, ["Skills", "Skill Set", "Technical Skills"]),
    resumeLink: getAttachmentUrl(fields, ["Resume Link", "Resume", "CV"]),
    resume: getField(fields, ["Resume"]),
    coverLetter: getField(fields, ["Cover Letter"]),
    applicationStatus: getField(fields, ["Application Status", "Stage", "Status"]) || "Pending",
    location: getField(fields, ["Location"]),
    notes: getField(fields, ["Notes"]),
    source: getField(fields, ["Source"]),
    interviewDate: getField(fields, ["Interview Date"]),
    interviewer: getField(fields, ["Interviewer"]),
    interviewNotes: getField(fields, ["Interview Notes"]),
    interviewResult: getField(fields, ["Interview Result"]),
    positionGranted: getField(fields, ["Position Granted"]),
    parsedName: getField(fields, ["Name"]),
    contactInformation: getField(fields, ["Contact Information"]),
    educationSummary: getField(fields, ["Education 2"]),
    workExperience: getField(fields, ["Work Experience"]),
    emailSent: getField(fields, ["Email Sent"]),
    emailSentTime: getField(fields, ["Email Sent Time"]),
    assessmentSubmission: getField(fields, ["Assessment Submission"]),
    submissionDate: getField(fields, ["Submission Date"]),
    applicationReceivedDate: getField(fields, ["Application Received date"]),
    submissionReminderEmail: getField(fields, ["Submission Reminder Email"]),
    submissionReminderEmailDate: getField(fields, ["Submission Reminder Email Date"]),
    created: getField(fields, ["Created"]),
    notForUs: getField(fields, ["Not For Us"]),
    createdDate:
      getField(fields, ["Created", "Created Date", "Submitted At", "Application Received date"]) ||
      record.createdTime ||
      "",
    lastUpdatedDate:
      getField(fields, ["Last Updated Date", "Updated At", "Last Modified"]) ||
      record.createdTime ||
      "",
    fields: normalizeFields(fields, columns),
  };
};

export const normalizeMember = (record: AirtableRecord): AirtableMember => {
  const fields = record.fields;

  return {
    id: record.id,
    memberName: getField(fields, ["Member Name", "Full Name", "Name"]) || "Unnamed member",
    email: getField(fields, ["Email", "Email Address"]),
    role: getField(fields, ["Role", "Title", "Position"]),
    department: getField(fields, ["Department", "Team", "Function"]),
    status: getField(fields, ["Status", "Member Status"]) || "Active",
    joiningDate: getField(fields, ["Joining Date", "Start Date", "Joined"]),
    notes: getField(fields, ["Notes", "Remarks", "Comments"]),
    createdDate: getField(fields, ["Created Date"]) || record.createdTime || "",
    lastUpdatedDate:
      getField(fields, ["Last Updated Date", "Updated At", "Last Modified"]) ||
      record.createdTime ||
      "",
  };
};

export const normalizeHiredApplicantAsMember = (
  record: AirtableRecord,
): AirtableMember | null => {
  const applicant = normalizeApplicant(record);
  const stage = applicant.applicationStatus.trim().toLowerCase();

  if (stage !== "hired") {
    return null;
  }

  return {
    id: applicant.id,
    memberName: applicant.candidateName,
    email: applicant.email,
    role: applicant.positionGranted || applicant.roleAppliedFor,
    department: applicant.roleAppliedFor,
    status: applicant.applicationStatus,
    joiningDate:
      applicant.applicationReceivedDate ||
      applicant.interviewDate ||
      applicant.createdDate,
    notes: applicant.notes || applicant.coverLetter,
    createdDate: applicant.createdDate,
    lastUpdatedDate: applicant.lastUpdatedDate,
  };
};

export const getAdditionalAirtableTableNames = () =>
  (process.env.AIRTABLE_ADDITIONAL_TABLE_NAMES || "")
    .split(",")
    .map((table) => table.trim())
    .filter(Boolean);
