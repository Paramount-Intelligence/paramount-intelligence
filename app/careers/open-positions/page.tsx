import SitePage from "@/components/site/SitePage";
import Careers from "@/components/careers/pages/Careers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Careers & Engineering Opportunities | Paramount Intelligence",
  description:
    "Explore opportunities to work on AI, software, data, and cloud engagements with Paramount Intelligence and register interest in future roles.",
  path: "/careers/open-positions",
});

export default function OpenPositionsPage() {
  return (
    <SitePage>
      <Careers />
    </SitePage>
  );
}
