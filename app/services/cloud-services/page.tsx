import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import CloudServices from "@/components/services/pages/CloudServices";

export const metadata: Metadata = {
  title: "Cloud & Production Engineering | Paramount Intelligence",
  description:
    "Resolve deployment blockers and establish cloud infrastructure, access controls, monitoring, and release processes for AI and software applications.",
};

export default function CloudServicesPage() {
  return (
    <SitePage>
      <CloudServices />
    </SitePage>
  );
}
