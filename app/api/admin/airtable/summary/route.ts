import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import {
  fetchAirtableRecords,
  getAdditionalAirtableTableNames,
  getApplicantsTableName,
  getApplicantsViewName,
  normalizeApplicant,
  normalizeHiredApplicantAsMember,
} from "@/lib/airtable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);

    const viewName = getApplicantsViewName();
    const applicants = await fetchAirtableRecords(getApplicantsTableName(), { viewName });
    const membersCount = applicants
      .map(normalizeHiredApplicantAsMember)
      .filter(Boolean).length;

    const normalizedApplicants = applicants.map((record) => normalizeApplicant(record));
    const statusCounts = normalizedApplicants.reduce<Record<string, number>>(
      (acc, applicant) => {
        const status = applicant.applicationStatus || "Pending";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {},
    );

    return NextResponse.json({
      syncedAt: new Date().toISOString(),
      applicants: {
        total: applicants.length,
        pending: statusCounts.Pending || statusCounts.pending || 0,
        approved: statusCounts.Approved || statusCounts.approved || 0,
        rejected: statusCounts.Rejected || statusCounts.rejected || 0,
        recent: normalizedApplicants.slice(0, 5),
        statusCounts,
      },
      members: {
        total: membersCount,
        configured: true,
        source: "Job Applications",
        filter: "Stage = Hired",
        viewName,
      },
      additionalTables: getAdditionalAirtableTableNames().map((name) => ({
        name,
        configured: true,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch Airtable summary";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
