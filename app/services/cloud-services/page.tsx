import SitePage from "@/components/site/SitePage";
import CloudServices from "@/components/services/pages/CloudServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cloud & Production Engineering | Paramount Intelligence",
  description:
    "Resolve deployment blockers and establish cloud infrastructure, access controls, monitoring, and release processes for AI and software applications.",
  path: "/services/cloud-services",
});

export default function CloudServicesPage() {
  return (
    <SitePage>
      <CloudServices />
    </SitePage>
  );
}
