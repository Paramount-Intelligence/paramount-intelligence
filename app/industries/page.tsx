import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import IndustriesOverview from "@/components/industries/pages/IndustriesOverview";

export const metadata: Metadata = {
  title: "Private Equity & Digital Natives | Paramount Intelligence",
  description:
    "AI and engineering support for private equity portfolios and digital businesses, from priority decisions to integrated production delivery.",
};

export default function IndustriesOverviewPage() {
  return (
    <SitePage>
      <IndustriesOverview />
    </SitePage>
  );
}
