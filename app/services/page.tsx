import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import ServicesOverview from "@/components/services/pages/ServicesOverview";

export const metadata: Metadata = {
  title: "AI & Engineering Services | Paramount Intelligence",
  description:
    "Explore AI agents, consulting, software, data, cloud, and automation services, delivered through specialist assignments or managed Paramount engagements.",
};

export default function ServicesOverviewPage() {
  return (
    <SitePage>
      <ServicesOverview />
    </SitePage>
  );
}
