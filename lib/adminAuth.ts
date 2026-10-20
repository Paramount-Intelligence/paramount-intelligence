import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

/** Checks an admin session token (the adminToken cookie set by /api/admin/case-studies/login). */
export function verifyAdminToken(token: string | undefined) {
  if (!token) {
    throw new Error("Unauthorized: No token");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error("Unauthorized: Invalid or expired token");
  }
}

export function verifyAdmin(req: NextRequest) {
  return verifyAdminToken(req.cookies.get("adminToken")?.value);
}
