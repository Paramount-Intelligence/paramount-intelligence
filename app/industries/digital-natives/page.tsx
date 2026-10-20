import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import DigitalNatives from "@/components/industries/pages/DigitalNatives";

export const metadata: Metadata = {
  title: "AI Engineering for Digital Businesses | Paramount Intelligence",
  description:
    "Add useful AI to the product, strengthen integrations, and move prototypes into production with Paramount's forward-deployed engineering.",
};

export default function DigitalNativesPage() {
  return (
    <SitePage>
      <DigitalNatives />
    </SitePage>
  );
}
