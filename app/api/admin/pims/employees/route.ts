import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { getPimsClient, normalizeEmployee } from "@/lib/pims";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
    const client = getPimsClient();
    
    const users = await client.$queryRawUnsafe<any[]>(
      `SELECT u.*, max_session.last_check_in
       FROM users u
       LEFT JOIN (
         SELECT user_id, MAX(check_in_at) as last_check_in
         FROM attendance_sessions
         GROUP BY user_id
       ) max_session ON u.id = max_session.user_id
       ORDER BY u.created_at DESC`
    );
    const employees = users
      .map(normalizeEmployee)
      .filter((e) => e.status.toLowerCase() !== "suspended");
    
    return NextResponse.json(
      {
        records: employees,
        syncedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch PIMS employees";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
