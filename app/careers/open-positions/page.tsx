import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import Careers from "@/components/careers/pages/Careers";

export const metadata: Metadata = {
  title: "Careers & Engineering Opportunities | Paramount Intelligence",
  description:
    "Explore opportunities to work on AI, software, data, and cloud engagements with Paramount Intelligence and register interest in future roles.",
};

export default function OpenPositionsPage() {
  return (
    <SitePage>
      <Careers />
    </SitePage>
  );
}
