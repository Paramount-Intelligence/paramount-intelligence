import SitePage from "@/components/site/SitePage";
import DigitalNatives from "@/components/industries/pages/DigitalNatives";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Engineering for Digital Businesses | Paramount Intelligence",
  description:
    "Add useful AI to the product, strengthen integrations, and move prototypes into production with Paramount's forward-deployed engineering.",
  path: "/industries/digital-natives",
});

export default function DigitalNativesPage() {
  return (
    <SitePage>
      <DigitalNatives />
    </SitePage>
  );
}
