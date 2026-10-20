import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import ContactUs from "@/components/contact/pages/ContactUs";

export const metadata: Metadata = {
  title: "Contact Paramount Intelligence | Project Enquiries",
  description:
    "Discuss an AI, software, data, cloud, or automation requirement with Paramount, from a specialist assignment to a managed engineering engagement.",
};

export default function ContactUsPage() {
  return (
    <SitePage>
      <ContactUs />
    </SitePage>
  );
}
