import SitePage from "@/components/site/SitePage";
import ServicesOverview from "@/components/services/pages/ServicesOverview";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI & Engineering Services | Paramount Intelligence",
  description:
    "Explore AI agents, consulting, software, data, cloud, and automation services, delivered through specialist assignments or managed Paramount engagements.",
  path: "/services",
});

export default function ServicesOverviewPage() {
  return (
    <SitePage>
      <ServicesOverview />
    </SitePage>
  );
}
