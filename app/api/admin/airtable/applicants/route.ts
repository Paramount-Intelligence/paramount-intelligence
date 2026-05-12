import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import {
  fetchAirtableRecords,
  fetchAirtableTableFields,
  getAirtableFieldColumns,
  getApplicantsTableName,
  getApplicantsViewName,
  normalizeApplicant,
} from "@/lib/airtable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
    const tableName = getApplicantsTableName();
    const viewName = getApplicantsViewName();
    const records = await fetchAirtableRecords(tableName, { viewName });
    let columns = getAirtableFieldColumns(records);
    let schemaSource = "records";

    try {
      const metadataColumns = await fetchAirtableTableFields(tableName);
      if (metadataColumns.length > 0) {
        columns = metadataColumns;
        schemaSource = "metadata";
      }
    } catch (metadataError) {
      console.warn("Airtable metadata fields unavailable, using record fields.", metadataError);
    }

    return NextResponse.json({
      records: records.map((record) => normalizeApplicant(record, columns)),
      columns,
      schemaSource,
      viewName,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch applicants";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
