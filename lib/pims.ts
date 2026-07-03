import { PrismaClient } from "@prisma/client";

export interface PimsEmployee {
  id: string;
  fullName: string;
  email: string;
  role: string;
  managerId: string | null;
  department: string | null;
  designation: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  avatarUrl: string | null;
  presenceStatus: string | null;
  lastSeenAt: string | null;
  lastCheckIn: string | null;
}

let pimsPrisma: PrismaClient | null = null;

export function getPimsClient(): PrismaClient {
  if (!pimsPrisma) {
    const url = process.env.PIMS_DATABASE_URL;
    if (!url) {
      throw new Error("PIMS_DATABASE_URL is not configured in environment variables");
    }
    pimsPrisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });
  }
  return pimsPrisma;
}

export function normalizeEmployee(row: any): PimsEmployee {
  return {
    id: row.id,
    fullName: row.full_name || "",
    email: row.email || "",
    role: row.role || "",
    managerId: row.manager_id || null,
    department: row.department || null,
    designation: row.designation || null,
    status: row.status || "",
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    phone: row.phone || null,
    avatarUrl: row.avatar_url || null,
    presenceStatus: row.presence_status || null,
    lastSeenAt: row.last_seen_at ? new Date(row.last_seen_at).toISOString() : null,
    lastCheckIn: row.last_check_in ? new Date(row.last_check_in).toISOString() : null,
  };
}
