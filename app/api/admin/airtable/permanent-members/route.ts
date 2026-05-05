import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import {
  AirtableMember,
  fetchAirtableRecords,
  getApplicantsTableName,
  getApplicantsViewName,
  normalizeHiredApplicantAsMember,
} from "@/lib/airtable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
    const viewName = getApplicantsViewName();
    const records = await fetchAirtableRecords(getApplicantsTableName(), { viewName });
    const members = records
      .map(normalizeHiredApplicantAsMember)
      .filter((record): record is AirtableMember => Boolean(record));

    return NextResponse.json({
      records: members,
      configured: true,
      source: "Job Applications",
      filter: "Stage = Hired",
      viewName,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch permanent members";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
