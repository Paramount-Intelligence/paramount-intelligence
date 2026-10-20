import SitePage from "@/components/site/SitePage";
import IndustriesOverview from "@/components/industries/pages/IndustriesOverview";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Private Equity & Digital Natives | Paramount Intelligence",
  description:
    "AI and engineering support for private equity portfolios and digital businesses, from priority decisions to integrated production delivery.",
  path: "/industries",
});

export default function IndustriesOverviewPage() {
  return (
    <SitePage>
      <IndustriesOverview />
    </SitePage>
  );
}
