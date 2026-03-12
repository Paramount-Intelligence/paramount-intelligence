import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    throw new Error("Unauthorized: Invalid or expired token");
  }
}