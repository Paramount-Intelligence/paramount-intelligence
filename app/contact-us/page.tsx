import SitePage from "@/components/site/SitePage";
import ContactUs from "@/components/contact/pages/ContactUs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Paramount Intelligence | Project Enquiries",
  description:
    "Discuss an AI, software, data, cloud, or automation requirement with Paramount, from a specialist assignment to a managed engineering engagement.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <SitePage>
      <ContactUs />
    </SitePage>
  );
}
