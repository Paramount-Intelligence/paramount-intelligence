import type { Metadata } from "next";

// The admin console stays out of search results (robots.ts also disallows /admin).
export const metadata: Metadata = {
  title: "Admin | Paramount Intelligence",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
