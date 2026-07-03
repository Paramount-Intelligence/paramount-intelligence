import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { getPimsClient } from "@/lib/pims";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    verifyAdmin(req);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }
    
    const client = getPimsClient();
    const sessions = await client.$queryRaw<any[]>`
      SELECT * FROM attendance_sessions 
      WHERE user_id = ${userId}::uuid 
      ORDER BY check_in_at DESC 
      LIMIT 50
    `;
    
    return NextResponse.json(
      {
        records: sessions || [],
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
    const message = error instanceof Error ? error.message : "Failed to fetch attendance sessions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
