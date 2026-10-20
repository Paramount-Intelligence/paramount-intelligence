import SitePage from "@/components/site/SitePage";
import PrivateEquity from "@/components/industries/pages/PrivateEquity";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Engineering for Private Equity | Paramount Intelligence",
  description:
    "Turn portfolio priorities into working AI and engineering capabilities with discovery, implementation, integration, and accountable delivery.",
  path: "/industries/private-equity",
});

export default function PrivateEquityPage() {
  return (
    <SitePage>
      <PrivateEquity />
    </SitePage>
  );
}
