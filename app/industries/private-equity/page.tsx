import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import PrivateEquity from "@/components/industries/pages/PrivateEquity";

export const metadata: Metadata = {
  title: "AI Engineering for Private Equity | Paramount Intelligence",
  description:
    "Turn portfolio priorities into working AI and engineering capabilities with discovery, implementation, integration, and accountable delivery.",
};

export default function PrivateEquityPage() {
  return (
    <SitePage>
      <PrivateEquity />
    </SitePage>
  );
}
