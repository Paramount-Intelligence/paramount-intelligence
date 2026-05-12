import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

type KpiCardProps = {
  label: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
};

type StatusBadgeProps = {
  status?: string;
};

type StateProps = {
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17599d]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-xl font-semibold text-slate-950">{title}</h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function KpiCard({ label, value, helper, icon }: KpiCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#17599d]/10 text-[#17599d]">
            {icon}
          </div>
        )}
      </div>
      {helper && <p className="mt-4 text-sm text-slate-500">{helper}</p>}
    </article>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = (status || "Unknown").toLowerCase();
  const tone = normalized.includes("approved") ||
    normalized.includes("active") ||
    normalized.includes("hired") ||
    normalized.includes("pass") ||
    normalized.includes("checked")
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : normalized.includes("reject") || normalized.includes("inactive")
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : normalized.includes("pending") || normalized.includes("review")
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      {status || "Unknown"}
    </span>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin text-[#17599d]" />
        Loading dashboard records...
      </div>
      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-md bg-slate-100"
          />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: StateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <Inbox className="mx-auto h-8 w-8 text-slate-400" />
      <h3 className="mt-3 text-sm font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
    </div>
  );
}

export function ErrorState({ title, description }: StateProps) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-800">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && <p className="mt-1 text-sm text-rose-700">{description}</p>}
        </div>
      </div>
    </div>
  );
}

export function DataPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}
