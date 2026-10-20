import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import DataAndAnalytics from "@/components/services/pages/DataAndAnalytics";

export const metadata: Metadata = {
  title: "Data Engineering & Intelligence | Paramount Intelligence",
  description:
    "Improve data quality, connect fragmented systems, and build reporting and AI data foundations client teams can use with confidence.",
};

export default function DataAndAnalyticsPage() {
  return (
    <SitePage>
      <DataAndAnalytics />
    </SitePage>
  );
}
