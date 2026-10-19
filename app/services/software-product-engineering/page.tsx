import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import SoftwareProductEngineering from "@/components/services/pages/SoftwareProductEngineering";

export const metadata: Metadata = {
  title: "Software & Product Engineering | Paramount Intelligence",
  description:
    "Build custom applications, integrate AI into existing software, and repair prototypes with product engineering, testing, and production handover.",
};

export default function SoftwareProductEngineeringPage() {
  return (
    <SitePage>
      <SoftwareProductEngineering />
    </SitePage>
  );
}
