import SitePage from "@/components/site/SitePage";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/site-nav";

export const metadata = pageMetadata({
  title: "Privacy Policy | Paramount Intelligence",
  description: "How Paramount Intelligence collects, uses, and protects personal data.",
  path: ROUTES.privacyPolicy,
});

export default function PrivacyPolicyPage() {
  return (
    <SitePage>
      <PrivacyPolicy />
    </SitePage>
  );
}
