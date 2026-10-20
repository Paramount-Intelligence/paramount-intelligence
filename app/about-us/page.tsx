import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import AboutUs from "@/components/about/pages/AboutUs";

export const metadata: Metadata = {
  title: "About Paramount Intelligence | AI Engineering & Consulting",
  description:
    "Meet Paramount Intelligence, a US-registered AI engineering and consulting firm focused on useful capabilities, direct collaboration, and delivery ownership.",
};

export default function AboutUsPage() {
  return (
    <SitePage>
      <AboutUs />
    </SitePage>
  );
}
