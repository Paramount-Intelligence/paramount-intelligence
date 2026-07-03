import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { getPimsClient, normalizeEmployee } from "@/lib/pims";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
    const client = getPimsClient();
    
    // Fetch summary metrics
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
    
    const total = employees.length;
    const active = employees.filter((e) => e.status.toLowerCase() === "active").length;
    const inactive = employees.filter((e) => e.status.toLowerCase() === "inactive").length;
    
    const roleCounts = employees.reduce<Record<string, number>>((acc, emp) => {
      const r = emp.role || "unknown";
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});

    const departmentCounts = employees.reduce<Record<string, number>>((acc, emp) => {
      const d = emp.department || "Unassigned";
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
    
    return NextResponse.json(
      {
        syncedAt: new Date().toISOString(),
        employees: {
          total,
          active,
          inactive,
          roles: roleCounts,
          departments: departmentCounts,
          recent: employees.slice(0, 5),
        },
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
    const message = error instanceof Error ? error.message : "Failed to fetch PIMS summary";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
