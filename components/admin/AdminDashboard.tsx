"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
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
import { PimsEmployee } from "@/lib/pims";
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

type PimsSummary = {
  syncedAt: string;
  employees: {
    total: number;
    active: number;
    inactive: number;
    roles: Record<string, number>;
    departments: Record<string, number>;
    recent: PimsEmployee[];
  };
};

type Tab = "overview" | "case-studies" | "employees" | "inactive-users";

const pageSize = 10;
const caseStudyPageSize = 5;

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "case-studies", label: "Case Studies" },
  { id: "employees", label: "PIMS Employees" },
  { id: "inactive-users", label: "Inactive (3+ Days)" },
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
  if (!value) return "Not connected";
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
  const [employees, setEmployees] = useState<PimsEmployee[]>([]);
  const [summary, setSummary] = useState<PimsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [pimsLoading, setPimsLoading] = useState(true);
  const [caseStudyError, setCaseStudyError] = useState("");
  const [pimsError, setPimsError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(
    null,
  );
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeRole, setEmployeeRole] = useState("all");
  const [employeeStatus, setEmployeeStatus] = useState("all");
  const [caseStudyPage, setCaseStudyPage] = useState(1);
  const [employeePage, setEmployeePage] = useState(1);
  const [inactivePage, setInactivePage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<PimsEmployee | null>(
    null,
  );

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
    setCaseStudyPage(1);
    setCaseStudyError("");
  };

  const refreshPims = async () => {
    setPimsLoading(true);
    setPimsError("");

    try {
      const [employeesResult, summaryResult] = await Promise.allSettled([
        fetch(`/api/admin/pims/employees?t=${Date.now()}`, { 
          credentials: "include",
          cache: "no-store"
        }),
        fetch(`/api/admin/pims/summary?t=${Date.now()}`, { 
          credentials: "include",
          cache: "no-store"
        }),
      ]);

      if (employeesResult.status === "fulfilled" && employeesResult.value.ok) {
        const payload = await employeesResult.value.json();
        setEmployees(payload.records);
      } else {
        setPimsError("Employees could not be loaded from PIMS.");
      }

      if (summaryResult.status === "fulfilled" && summaryResult.value.ok) {
        const payload = await summaryResult.value.json();
        setSummary(payload);
      } else {
        setPimsError("PIMS summary could not be loaded.");
      }
    } catch {
      setPimsError("Failed to connect to PIMS database.");
    } finally {
      setPimsLoading(false);
    }
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCaseStudies().catch(() => {
          setCaseStudyError("Case studies could not be loaded.");
        }),
        refreshPims(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(
        `${getApiUrl()}/api/admin/case-studies/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
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

  const roleOptions = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(employees.map((item) => item.role).filter(Boolean)),
      ),
    ],
    [employees],
  );

  const statusOptions = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(employees.map((item) => item.status).filter(Boolean)),
      ),
    ],
    [employees],
  );

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (emp) =>
          statusMatches(emp.role, employeeRole) &&
          statusMatches(emp.status, employeeStatus) &&
          includesText(
            [
              emp.fullName,
              emp.email,
              emp.designation || "",
              emp.department || "",
            ],
            employeeSearch,
          ),
      ),
    [employees, employeeRole, employeeStatus, employeeSearch],
  );

  const filteredInactiveEmployees = useMemo(() => {
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    return employees.filter(
      (emp) => {
        // Exclude accounts that are status = 'inactive'
        if (emp.status.toLowerCase() === "inactive") return false;

        if (emp.lastCheckIn) {
          const lastCheckInTime = new Date(emp.lastCheckIn).getTime();
          if (lastCheckInTime >= threeDaysAgo) return false;
        }
        return (
          statusMatches(emp.role, employeeRole) &&
          statusMatches(emp.status, employeeStatus) &&
          includesText(
            [
              emp.fullName,
              emp.email,
              emp.designation || "",
              emp.department || "",
            ],
            employeeSearch,
          )
        );
      }
    );
  }, [employees, employeeRole, employeeStatus, employeeSearch]);

  const pagedEmployees = filteredEmployees.slice(
    (employeePage - 1) * pageSize,
    employeePage * pageSize,
  );

  const pagedInactiveEmployees = filteredInactiveEmployees.slice(
    (inactivePage - 1) * pageSize,
    inactivePage * pageSize,
  );

  const pagedCaseStudies = caseStudies.slice(
    (caseStudyPage - 1) * caseStudyPageSize,
    caseStudyPage * caseStudyPageSize,
  );

  const employeeColumns: DataTableColumn<PimsEmployee>[] = [
    {
      key: "name",
      header: "Employee Name",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.fullName}</p>
          <p className="mt-1 text-xs text-slate-500">
            {row.email || "No email"}
          </p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <span className="capitalize">{row.role || "Not set"}</span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      render: (row) => row.designation || "Not provided",
    },
    {
      key: "department",
      header: "Department",
      render: (row) => row.department || "Not provided",
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "created",
      header: "Joining Date",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "details",
      header: "Details",
      render: (row) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedEmployee(row);
          }}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#17599d] hover:bg-slate-50"
        >
          View
        </button>
      ),
    },
  ];

  const inactiveColumns: DataTableColumn<PimsEmployee>[] = [
    {
      key: "name",
      header: "Employee Name",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-950">{row.fullName}</p>
          <p className="mt-1 text-xs text-slate-500">
            {row.email || "No email"}
          </p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <span className="capitalize">{row.role || "Not set"}</span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      render: (row) => row.designation || "Not provided",
    },
    {
      key: "lastCheckIn",
      header: "Last Checked In",
      render: (row) => row.lastCheckIn ? (
        <span className="text-slate-700 font-medium">{formatDateTime(row.lastCheckIn)}</span>
      ) : (
        <span className="text-rose-600 font-semibold bg-rose-50 border border-rose-100 rounded px-2 py-0.5">Never checked in</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "details",
      header: "Details",
      render: (row) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedEmployee(row);
          }}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#17599d] hover:bg-slate-50"
        >
          View
        </button>
      ),
    },
  ];

  const caseStudyColumns: DataTableColumn<CaseStudy>[] = [
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <div className="max-w-sm">
          <p className="font-semibold text-slate-950">{row.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
            {row.subtitle}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => row.industry || "Uncategorized",
    },
    {
      key: "function",
      header: "Business Function",
      render: (row) => row.businessFunction || "Not set",
    },
    {
      key: "status",
      header: "Status",
      render: () => <StatusBadge status="Published" />,
    },
    {
      key: "created",
      header: "Created",
      render: (row) => formatDate(row.createdAt),
    },
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
                Manage company content and monitor employees/users directly synced from
                the Paramount Intelligence Monitoring System (PIMS) database.
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
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id
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
            <CaseStudyForm
              caseStudy={editingCaseStudy}
              onClose={handleFormClose}
            />
          </div>
        )}

        <div className="mt-6 space-y-6">
          {activeTab === "overview" && (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                label="Total Employees"
                value={employees.length}
                helper="All registered users in PIMS"
                icon={<Users className="h-5 w-5" />}
              />
              <KpiCard
                label="Active Employees"
                value={summary?.employees.active || 0}
                helper="Users with active status"
                icon={<UserCheck className="h-5 w-5" />}
              />
              <KpiCard
                label="Inactive Employees"
                value={summary?.employees.inactive || 0}
                helper="Users with inactive status"
                icon={<XCircle className="h-5 w-5" />}
              />
              <KpiCard
                label="Total Case Studies"
                value={caseStudies.length}
                helper="Published company stories"
                icon={<FileText className="h-5 w-5" />}
              />
              <KpiCard
                label="Managers"
                value={summary?.employees.roles.manager || 0}
                helper="PIMS Manager accounts"
                icon={<ShieldCheck className="h-5 w-5" />}
              />
              <KpiCard
                label="Admins"
                value={summary?.employees.roles.admin || 0}
                helper="PIMS Admin accounts"
                icon={<ShieldCheck className="h-5 w-5" />}
              />
              <KpiCard
                label="Interns"
                value={summary?.employees.roles.intern || 0}
                helper="PIMS Intern accounts"
                icon={<BriefcaseBusiness className="h-5 w-5" />}
              />
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
                <div className="p-5 pt-0">
                  <ErrorState
                    title="Case studies unavailable"
                    description={caseStudyError}
                  />
                </div>
              ) : caseStudies.length === 0 ? (
                <div className="p-5 pt-0">
                  <EmptyState
                    title="No case studies found"
                    description="Create a case study to begin building the company library."
                  />
                </div>
              ) : (
                <>
                  <DataTable
                    columns={caseStudyColumns}
                    rows={pagedCaseStudies}
                    getRowKey={(row) => row.id}
                  />
                  <Pagination
                    page={caseStudyPage}
                    total={caseStudies.length}
                    pageSize={caseStudyPageSize}
                    onPageChange={setCaseStudyPage}
                  />
                </>
              )}
            </DataPanel>
          )}

          {activeTab === "employees" && (
            <RecordsSection
              title="PIMS Employees"
              description="Search and filter employee user profiles directly from the PIMS database."
              searchValue={employeeSearch}
              onSearch={(value) => {
                setEmployeeSearch(value);
                setEmployeePage(1);
              }}
              statusValue={employeeStatus}
              onStatus={(value) => {
                setEmployeeStatus(value);
                setEmployeePage(1);
              }}
              statusOptions={statusOptions}
              secondaryFilterLabel="Role"
              secondaryFilterValue={employeeRole}
              onSecondaryFilter={(value) => {
                setEmployeeRole(value);
                setEmployeePage(1);
              }}
              secondaryFilterOptions={roleOptions}
              count={filteredEmployees.length}
              onRefresh={refreshPims}
            >
              {pimsLoading ? (
                <LoadingSkeleton />
              ) : pimsError ? (
                <ErrorState
                  title="PIMS data unavailable"
                  description={pimsError}
                />
              ) : filteredEmployees.length === 0 ? (
                <EmptyState
                  title="No employees match this view"
                  description="Try a different search term, role, or status filter."
                />
              ) : (
                <>
                  <DataTable
                    columns={employeeColumns}
                    rows={pagedEmployees}
                    getRowKey={(row) => row.id}
                  />
                  <Pagination
                    page={employeePage}
                    total={filteredEmployees.length}
                    onPageChange={setEmployeePage}
                  />
                </>
              )}
            </RecordsSection>
          )}

          {activeTab === "inactive-users" && (
            <RecordsSection
              title="Inactive Employees (3+ Days)"
              description="Employees who have not logged in or shown activity within the last 3 days."
              searchValue={employeeSearch}
              onSearch={(value) => {
                setEmployeeSearch(value);
                setInactivePage(1);
              }}
              statusValue={employeeStatus}
              onStatus={(value) => {
                setEmployeeStatus(value);
                setInactivePage(1);
              }}
              statusOptions={statusOptions}
              secondaryFilterLabel="Role"
              secondaryFilterValue={employeeRole}
              onSecondaryFilter={(value) => {
                setEmployeeRole(value);
                setInactivePage(1);
              }}
              secondaryFilterOptions={roleOptions}
              count={filteredInactiveEmployees.length}
              onRefresh={refreshPims}
            >
              {pimsLoading ? (
                <LoadingSkeleton />
              ) : pimsError ? (
                <ErrorState
                  title="PIMS data unavailable"
                  description={pimsError}
                />
              ) : filteredInactiveEmployees.length === 0 ? (
                <EmptyState
                  title="No inactive employees match this view"
                  description="All employees have been active recently."
                />
              ) : (
                <>
                  <DataTable
                    columns={inactiveColumns}
                    rows={pagedInactiveEmployees}
                    getRowKey={(row) => row.id}
                  />
                  <Pagination
                    page={inactivePage}
                    total={filteredInactiveEmployees.length}
                    onPageChange={setInactivePage}
                  />
                </>
              )}
            </RecordsSection>
          )}
        </div>
      </div>
      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
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
          eyebrow="PIMS DB"
          title={title}
          description={description}
          action={
            <span className="text-sm font-semibold text-slate-500">
              {count} records
            </span>
          }
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
  pageSize = 10,
  onPageChange,
}: {
  page: number;
  total: number;
  pageSize?: number;
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

function EmployeeDetails({
  employee,
  onClose,
}: {
  employee: PimsEmployee;
  onClose: () => void;
}) {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAttendance() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `/api/admin/pims/attendance?userId=${employee.id}&t=${Date.now()}`,
          { credentials: "include", cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to load attendance details");
        const data = await response.json();
        setAttendance(data.records || []);
      } catch (err: any) {
        setError(err.message || "Could not retrieve attendance logs.");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, [employee.id]);

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="border-b border-slate-200 bg-[#06172d] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                PIMS Employee Record
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {employee.fullName}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {employee.designation || "Designation not set"} |{" "}
                {employee.email || "Email not set"}
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

        <div className="overflow-y-auto p-5 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={employee.status} />
            {employee.phone && (
              <span className="text-sm text-slate-500 font-medium">
                <strong>Phone:</strong> {employee.phone}
              </span>
            )}
          </div>

          <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-950">
              Employee Profile Details
            </h3>
            <dl className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Full Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800">
                  {employee.fullName}
                </dd>
              </div>
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Email
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800">
                  {employee.email}
                </dd>
              </div>
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Role
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800 capitalize">
                  {employee.role}
                </dd>
              </div>
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Designation
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800">
                  {employee.designation || <span className="text-slate-400">-</span>}
                </dd>
              </div>
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Department
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800">
                  {employee.department || <span className="text-slate-400">-</span>}
                </dd>
              </div>
              <div className="rounded-md bg-white p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Joining Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-800">
                  {formatDate(employee.createdAt)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-semibold text-slate-950">
                Recent Attendance Logs
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Last 50 sessions
              </span>
            </div>

            <div className="mt-4 overflow-x-auto">
              {loading ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  <RefreshCw className="h-5 w-5 animate-spin mx-auto text-slate-400 mb-2" />
                  Loading attendance records...
                </div>
              ) : error ? (
                <div className="py-8 text-center text-sm text-rose-600">
                  {error}
                </div>
              ) : attendance.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No attendance records found for this employee.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <th className="py-2 px-3">Check In</th>
                      <th className="py-2 px-3">Check Out</th>
                      <th className="py-2 px-3">Mode</th>
                      <th className="py-2 px-3">Hours</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((session) => {
                      const hours = session.total_hours
                        ? Number(session.total_hours).toFixed(2)
                        : "-";
                      const mode = session.work_mode === "wfh" ? "WFH" : "Office";
                      
                      let classificationColor = "bg-slate-100 text-slate-800 border-slate-200";
                      if (session.attendance_classification === "full_day") {
                        classificationColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                      } else if (session.attendance_classification === "half_day") {
                        classificationColor = "bg-amber-50 text-amber-700 border-amber-200";
                      } else if (session.attendance_classification === "insufficient") {
                        classificationColor = "bg-rose-50 text-rose-700 border-rose-200";
                      }

                      return (
                        <tr key={session.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-3 whitespace-nowrap text-slate-900">
                            {formatDateTime(session.check_in_at)}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-slate-900">
                            {session.check_out_at
                              ? formatDateTime(session.check_out_at)
                              : <span className="font-semibold text-emerald-600">Active (Checked In)</span>}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-slate-700 capitalize">
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                              session.work_mode === "wfh" 
                                ? "bg-blue-50 text-blue-700 border-blue-200" 
                                : "bg-indigo-50 text-indigo-700 border-indigo-200"
                            }`}>
                              {mode}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-900">
                            {hours} hrs
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${classificationColor}`}>
                              {session.attendance_classification ? session.attendance_classification.replace("_", " ") : "Normal"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
