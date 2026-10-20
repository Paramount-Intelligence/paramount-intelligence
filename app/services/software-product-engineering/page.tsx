import SitePage from "@/components/site/SitePage";
import SoftwareProductEngineering from "@/components/services/pages/SoftwareProductEngineering";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Software & Product Engineering | Paramount Intelligence",
  description:
    "Build custom applications, integrate AI into existing software, and repair prototypes with product engineering, testing, and production handover.",
  path: "/services/software-product-engineering",
});

export default function SoftwareProductEngineeringPage() {
  return (
    <SitePage>
      <SoftwareProductEngineering />
    </SitePage>
  );
}
