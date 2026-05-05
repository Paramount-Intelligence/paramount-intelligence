"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Database,
  Edit,
  FileText,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import CaseStudyForm from "./CaseStudyForm";
import { getApiUrl } from "@/lib/api";
import {
  DataPanel,
  EmptyState,
  ErrorState,
  KpiCard,
  LoadingSkeleton,
  SectionHeader,
  StatusBadge,
} from "./dashboard/AdminUi";
import DataTable, { DataTableColumn } from "./dashboard/DataTable";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientName: string | null;
  clientIndustry: string | null;
  clientMarket: string | null;
  clientTechnology: string | null;
  challenges: string;
  solution: string;
  benefits: string;
  overview: string | null;
  client: string | null;
  challenge: string | null;
  keyConstraints: string | null;
  solutionAgents: { title: string; description: string }[] | null;
  uniqueSolution: string | null;
  tech: { title: string; description: string }[] | null;
  results: string | null;
  summary: string | null;
  createdAt: string;
  updatedAt: string;
}

type Applicant = {
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

type Member = {
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

type AirtableSummary = {
  syncedAt: string;
  applicants: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    recent: Applicant[];
    statusCounts: Record<string, number>;
  };
  members: {
    total: number;
    configured: boolean;
  };
  additionalTables: Array<{ name: string; configured: boolean }>;
};

type RecordsResponse<T> = {
  records: T[];
  syncedAt: string;
  configured?: boolean;
  message?: string;
  columns?: string[];
};

type Tab = "overview" | "case-studies" | "applicants" | "members" | "airtable";

const pageSize = 10;

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "case-studies", label: "Case Studies" },
  { id: "applicants", label: "Applicants" },
  { id: "members", label: "Permanent Members" },
  { id: "airtable", label: "Airtable Records" },
];

const formatDate = (value?: string) => {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value?: string) => {
  if (!value) return "Not synced yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const includesText = (values: string[], query: string) =>
  values.join(" ").toLowerCase().includes(query.trim().toLowerCase());

const statusMatches = (status: string, filter: string) =>
  filter === "all" || status.toLowerCase() === filter.toLowerCase();

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [applicantFieldColumns, setApplicantFieldColumns] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [summary, setSummary] = useState<AirtableSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [airtableLoading, setAirtableLoading] = useState(true);
  const [caseStudyError, setCaseStudyError] = useState("");
  const [applicantError, setApplicantError] = useState("");
  const [memberError, setMemberError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [applicantStatus, setApplicantStatus] = useState("all");
  const [applicantPositionGranted, setApplicantPositionGranted] = useState("all");
  const [memberStatus, setMemberStatus] = useState("all");
  const [applicantPage, setApplicantPage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    refreshDashboard();
  }, []);

  const fetchCaseStudies = async () => {
    const response = await fetch("/api/admin/case-studies", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch case studies");
    const data = (await response.json()) as CaseStudy[];
    setCaseStudies(data);
    setCaseStudyError("");
  };

  const refreshAirtable = async () => {
    setAirtableLoading(true);
    setApplicantError("");
    setMemberError("");
    setSummaryError("");

    const [applicantResult, memberResult, summaryResult] = await Promise.allSettled([
      fetch("/api/admin/airtable/applicants", { credentials: "include" }),
      fetch("/api/admin/airtable/permanent-members", { credentials: "include" }),
      fetch("/api/admin/airtable/summary", { credentials: "include" }),
    ]);

    if (applicantResult.status === "fulfilled" && applicantResult.value.ok) {
      const payload = (await applicantResult.value.json()) as RecordsResponse<Applicant>;
      setApplicants(payload.records);
      setApplicantFieldColumns(
        payload.columns?.length
          ? payload.columns
          : Array.from(new Set(payload.records.flatMap((record) => Object.keys(record.fields || {})))),
      );
    } else {
      setApplicantError("Applicants could not be loaded from Airtable.");
    }

    if (memberResult.status === "fulfilled" && memberResult.value.ok) {
      const payload = (await memberResult.value.json()) as RecordsResponse<Member>;
      setMembers(payload.records);
      if (payload.configured === false) {
        setMemberError(payload.message || "Permanent members table is not configured yet.");
      }
    } else {
      setMemberError("Permanent members could not be loaded. Check the Airtable members table configuration.");
    }

    if (summaryResult.status === "fulfilled" && summaryResult.value.ok) {
      const payload = (await summaryResult.value.json()) as AirtableSummary;
      setSummary(payload);
    } else {
      setSummaryError("Airtable summary could not be loaded.");
    }

    setAirtableLoading(false);
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCaseStudies().catch(() => {
          setCaseStudyError("Case studies could not be loaded.");
        }),
        refreshAirtable(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(`${getApiUrl()}/api/admin/case-studies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete");
      fetchCaseStudies();
    } catch (error) {
      console.error("Error deleting case study:", error);
      alert("Failed to delete case study");
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCaseStudy(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCaseStudy(null);
    fetchCaseStudies();
  };

  const applicantStatusOptions = useMemo(
    () => ["all", ...Array.from(new Set(applicants.map((item) => item.applicationStatus).filter(Boolean)))],
    [applicants],
  );

  const memberStatusOptions = useMemo(
    () => ["all", ...Array.from(new Set(members.map((item) => item.status).filter(Boolean)))],
    [members],
  );

  const positionGrantedOptions = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(
          applicants
            .map((item) => item.fields?.["Position Granted"] || item.positionGranted)
            .filter(Boolean),
        ),
      ),
    ],
    [applicants],
  );

  const filteredApplicants = useMemo(
    () =>
      applicants.filter(
        (applicant) =>
          statusMatches(applicant.applicationStatus, applicantStatus) &&
          statusMatches(
            applicant.fields?.["Position Granted"] || applicant.positionGranted,
            applicantPositionGranted,
          ) &&
          includesText(Object.values(applicant.fields || {}), applicantSearch),
      ),
    [applicants, applicantPositionGranted, applicantSearch, applicantStatus],
  );

  const filteredMembers = useMemo(
    () =>
      members.filter(
        (member) =>
          statusMatches(member.status, memberStatus) &&
          includesText(
            [member.memberName, member.email, member.role, member.department, member.notes],
            memberSearch,
          ),
      ),
    [members, memberSearch, memberStatus],
  );

  const pagedApplicants = filteredApplicants.slice(
    (applicantPage - 1) * pageSize,
    applicantPage * pageSize,
  );
  const pagedMembers = filteredMembers.slice(
    (memberPage - 1) * pageSize,
    memberPage * pageSize,
  );

  const pendingApplicants = applicants.filter((item) =>
    item.applicationStatus.toLowerCase().includes("pending"),
  ).length;
  const approvedApplicants = applicants.filter((item) =>
    item.applicationStatus.toLowerCase().includes("approved"),
  ).length;
  const rejectedApplicants = applicants.filter((item) =>
    item.applicationStatus.toLowerCase().includes("reject"),
  ).length;

  const applicantColumns: DataTableColumn<Applicant>[] = useMemo(
    () => [
      ...applicantFieldColumns.map((field) => ({
        key: field,
        header: field,
        render: (row: Applicant) => {
          const value = row.fields?.[field] || "";

          if (field === "Resume" && row.resumeLink) {
            return (
              <a
                href={row.resumeLink}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="font-semibold text-[#17599d] hover:text-[#0f3f70]"
              >
                View resume
              </a>
            );
          }

          if (field === "Stage") {
            return <StatusBadge status={value || row.applicationStatus} />;
          }

          return value ? (
            <span className="line-clamp-3 min-w-32 max-w-xs whitespace-pre-wrap">
              {value}
            </span>
          ) : (
            <span className="text-slate-400">-</span>
          );
        },
      })),
      {
        key: "details",
        header: "Details",
        render: (row: Applicant) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedApplicant(row);
            }}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#17599d] hover:bg-slate-50"
          >
            View
          </button>
        ),
      },
    ],
    [applicantFieldColumns],
  );

  const memberColumns: DataTableColumn<Member>[] = [
    {
      key: "member",
      header: "Member",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.memberName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.email || "No email"}</p>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (row) => row.role || "Not provided" },
    { key: "department", header: "Department", render: (row) => row.department || "Not provided" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "joining", header: "Joining Date", render: (row) => formatDate(row.joiningDate) },
    { key: "notes", header: "Notes", render: (row) => row.notes || "No notes" },
  ];

  const caseStudyColumns: DataTableColumn<CaseStudy>[] = [
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <div className="max-w-sm">
          <p className="font-semibold text-slate-950">{row.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">{row.subtitle}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (row) => row.industry || "Uncategorized" },
    { key: "function", header: "Business Function", render: (row) => row.businessFunction || "Not set" },
    { key: "status", header: "Status", render: () => <StatusBadge status="Published" /> },
    { key: "created", header: "Created", render: (row) => formatDate(row.createdAt) },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="rounded-md border border-slate-200 p-2 text-[#17599d] hover:bg-slate-50"
            title="Edit case study"
            aria-label="Edit case study"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="rounded-md border border-rose-200 p-2 text-rose-600 hover:bg-rose-50"
            title="Delete case study"
            aria-label="Delete case study"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <main className="mx-auto mt-20 max-w-7xl px-6 py-12">
        <LoadingSkeleton />
      </main>
    );
  }

  return (
    <main className="mt-20 min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-[#dbe4ef] bg-[#06172d] p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                Paramount Intelligence
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Manage company content, applicants, members, and Airtable records
                from a protected enterprise control center.
              </p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 lg:ml-auto lg:justify-end">
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[#06172d] hover:bg-slate-100"
              >
                <Plus className="h-4 w-4" />
                Add Case Study
              </button>
              <button
                onClick={refreshDashboard}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </section>

        <nav className="mt-8 flex gap-2 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-[#17599d] text-[#17599d]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {showForm && (
          <div className="mt-6">
            <CaseStudyForm caseStudy={editingCaseStudy} onClose={handleFormClose} />
          </div>
        )}

        <div className="mt-6 space-y-6">
          {activeTab === "overview" && (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard label="Total Applicants" value={applicants.length} helper="Airtable applicant records" icon={<Users className="h-5 w-5" />} />
              <KpiCard label="Permanent Members" value={members.length} helper={memberError || "Hired members"} icon={<UserCheck className="h-5 w-5" />} />
              <KpiCard label="Pending Applicants" value={pendingApplicants} helper="Awaiting review" icon={<Clock3 className="h-5 w-5" />} />
              <KpiCard label="Approved Applicants" value={approvedApplicants} helper="Marked approved in Airtable" icon={<CheckCircle2 className="h-5 w-5" />} />
              <KpiCard label="Rejected Applicants" value={rejectedApplicants} helper="Marked rejected in Airtable" icon={<XCircle className="h-5 w-5" />} />
              <KpiCard label="Total Case Studies" value={caseStudies.length} helper="Published company stories" icon={<FileText className="h-5 w-5" />} />
              <KpiCard label="Recent Applications" value={summary?.applicants.recent.length || Math.min(applicants.length, 5)} helper="Latest Airtable records loaded" icon={<BriefcaseBusiness className="h-5 w-5" />} />
              <KpiCard label="Last Airtable Sync" value={formatDateTime(summary?.syncedAt)} helper={summaryError || "Server-side Airtable fetch"} icon={<Database className="h-5 w-5" />} />
            </section>
          )}

          {activeTab === "case-studies" && (
            <DataPanel>
              <div className="p-5">
                <SectionHeader
                  eyebrow="Company Content"
                  title="Company case studies"
                  description="Review, add, edit, and delete the company case studies without changing the public content workflow."
                  action={
                    <button
                      onClick={handleAdd}
                      className="inline-flex items-center gap-2 rounded-md bg-[#17599d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3f70]"
                    >
                      <Plus className="h-4 w-4" />
                      Add Case Study
                    </button>
                  }
                />
              </div>
              {caseStudyError ? (
                <div className="p-5 pt-0"><ErrorState title="Case studies unavailable" description={caseStudyError} /></div>
              ) : caseStudies.length === 0 ? (
                <div className="p-5 pt-0"><EmptyState title="No case studies found" description="Create a case study to begin building the company library." /></div>
              ) : (
                <DataTable columns={caseStudyColumns} rows={caseStudies} getRowKey={(row) => row.id} />
              )}
            </DataPanel>
          )}

          {activeTab === "applicants" && (
            <RecordsSection
              title="Airtable applicants"
              description="Search and filter candidate applications synced from Airtable."
              searchValue={applicantSearch}
              onSearch={(value) => {
                setApplicantSearch(value);
                setApplicantPage(1);
              }}
              statusValue={applicantStatus}
              onStatus={(value) => {
                setApplicantStatus(value);
                setApplicantPage(1);
              }}
              statusOptions={applicantStatusOptions}
              secondaryFilterLabel="Position granted"
              secondaryFilterValue={applicantPositionGranted}
              onSecondaryFilter={(value) => {
                setApplicantPositionGranted(value);
                setApplicantPage(1);
              }}
              secondaryFilterOptions={positionGrantedOptions}
              count={filteredApplicants.length}
              onRefresh={refreshAirtable}
            >
              {airtableLoading ? (
                <LoadingSkeleton />
              ) : applicantError ? (
                <ErrorState title="Applicants unavailable" description={applicantError} />
              ) : filteredApplicants.length === 0 ? (
                <EmptyState title="No applicants match this view" description="Try a different search term or status filter." />
              ) : (
                <>
                  <DataTable
                    columns={applicantColumns}
                    rows={pagedApplicants}
                    getRowKey={(row) => row.id}
                    onRowClick={setSelectedApplicant}
                  />
                  <Pagination
                    page={applicantPage}
                    total={filteredApplicants.length}
                    onPageChange={setApplicantPage}
                  />
                </>
              )}
            </RecordsSection>
          )}

          {activeTab === "members" && (
            <RecordsSection
              title="Permanent members"
              description="Applicants from Airtable whose Stage field is Hired."
              searchValue={memberSearch}
              onSearch={(value) => {
                setMemberSearch(value);
                setMemberPage(1);
              }}
              statusValue={memberStatus}
              onStatus={(value) => {
                setMemberStatus(value);
                setMemberPage(1);
              }}
              statusOptions={memberStatusOptions}
              count={filteredMembers.length}
              onRefresh={refreshAirtable}
            >
              {airtableLoading ? (
                <LoadingSkeleton />
              ) : memberError ? (
                <ErrorState title="Permanent members unavailable" description={memberError} />
              ) : filteredMembers.length === 0 ? (
                <EmptyState title="No members match this view" description="Try a different search term or status filter." />
              ) : (
                <>
                  <DataTable columns={memberColumns} rows={pagedMembers} getRowKey={(row) => row.id} />
                  <Pagination page={memberPage} total={filteredMembers.length} onPageChange={setMemberPage} />
                </>
              )}
            </RecordsSection>
          )}

          {activeTab === "airtable" && (
            <DataPanel>
              <div className="p-5">
                <SectionHeader
                  eyebrow="Airtable Operations"
                  title="Airtable records"
                  description="Server-side Airtable integrations currently visible to the admin dashboard."
                  action={
                    <button
                      onClick={refreshAirtable}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh Airtable
                    </button>
                  }
                />
              </div>
              <div className="grid gap-4 p-5 pt-0 md:grid-cols-2">
                <AirtableRecordCard title="Applicants" count={applicants.length} status={applicantError ? "Needs attention" : "Connected"} />
                <AirtableRecordCard title="Permanent Members" count={members.length} status={memberError ? "Needs attention" : "Stage = Hired"} />
              </div>
              {summaryError && (
                <div className="p-5 pt-0">
                  <ErrorState title="Summary unavailable" description={summaryError} />
                </div>
              )}
            </DataPanel>
          )}
        </div>
      </div>
      {selectedApplicant && (
        <ApplicantDetails
          applicant={selectedApplicant}
          columns={applicantFieldColumns}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </main>
  );
}

function RecordsSection({
  title,
  description,
  searchValue,
  onSearch,
  statusValue,
  onStatus,
  statusOptions,
  secondaryFilterLabel,
  secondaryFilterValue,
  onSecondaryFilter,
  secondaryFilterOptions,
  count,
  onRefresh,
  children,
}: {
  title: string;
  description: string;
  searchValue: string;
  onSearch: (value: string) => void;
  statusValue: string;
  onStatus: (value: string) => void;
  statusOptions: string[];
  secondaryFilterLabel?: string;
  secondaryFilterValue?: string;
  onSecondaryFilter?: (value: string) => void;
  secondaryFilterOptions?: string[];
  count: number;
  onRefresh: () => void;
  children: ReactNode;
}) {
  return (
    <DataPanel>
      <div className="space-y-5 p-5">
        <SectionHeader
          eyebrow="Airtable"
          title={title}
          description={description}
          action={<span className="text-sm font-semibold text-slate-500">{count} records</span>}
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchValue}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search records"
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-[#17599d] focus:ring-2 focus:ring-[#17599d]/15"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusValue}
              onChange={(event) => onStatus(event.target.value)}
              className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#17599d] focus:ring-2 focus:ring-[#17599d]/15"
              aria-label="Filter by status"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All statuses" : status}
                </option>
              ))}
            </select>
            {secondaryFilterValue !== undefined &&
              onSecondaryFilter &&
              secondaryFilterOptions && (
                <select
                  value={secondaryFilterValue}
                  onChange={(event) => onSecondaryFilter(event.target.value)}
                  className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#17599d] focus:ring-2 focus:ring-[#17599d]/15"
                  aria-label={secondaryFilterLabel || "Secondary filter"}
                >
                  {secondaryFilterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === "all"
                        ? `All ${secondaryFilterLabel || "options"}`
                        : option}
                    </option>
                  ))}
                </select>
              )}
            <button
              onClick={onRefresh}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </DataPanel>
  );
}

function Pagination({
  page,
  total,
  onPageChange,
}: {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ApplicantDetails({
  applicant,
  columns,
  onClose,
}: {
  applicant: Applicant;
  columns: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="border-b border-slate-200 bg-[#06172d] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                Applicant Record
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{applicant.candidateName}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {applicant.roleAppliedFor || "Role not set"} |{" "}
                {applicant.email || "Email not set"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <StatusBadge status={applicant.applicationStatus} />
            {applicant.resumeLink && (
              <a
                href={applicant.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#17599d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0f3f70]"
              >
                Open Resume
              </a>
            )}
          </div>

          <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-950">
              Complete Airtable record
            </h3>
            <dl className="mt-4 grid gap-4 lg:grid-cols-2">
              {columns.map((field) => {
                const value = String(applicant.fields?.[field] || "").trim();

                return (
                  <div key={field} className="rounded-md bg-white p-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {field}
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                      {value || <span className="text-slate-400">-</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

function AirtableRecordCard({
  title,
  count,
  status,
}: {
  title: string;
  count: number;
  status: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{count}</p>
        </div>
        <ShieldCheck className="h-5 w-5 text-[#17599d]" />
      </div>
      <p className="mt-4 text-sm text-slate-500">{status}</p>
    </article>
  );
}
