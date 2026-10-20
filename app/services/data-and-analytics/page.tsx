import SitePage from "@/components/site/SitePage";
import DataAndAnalytics from "@/components/services/pages/DataAndAnalytics";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Data Engineering & Intelligence | Paramount Intelligence",
  description:
    "Improve data quality, connect fragmented systems, and build reporting and AI data foundations client teams can use with confidence.",
  path: "/services/data-and-analytics",
});

export default function DataAndAnalyticsPage() {
  return (
    <SitePage>
      <DataAndAnalytics />
    </SitePage>
  );
}
