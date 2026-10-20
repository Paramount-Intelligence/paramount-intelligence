import SitePage from "@/components/site/SitePage";
import AboutUs from "@/components/about/pages/AboutUs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Paramount Intelligence | AI Engineering & Consulting",
  description:
    "Meet Paramount Intelligence, a US-registered AI engineering and consulting firm focused on useful capabilities, direct collaboration, and delivery ownership.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <SitePage>
      <AboutUs />
    </SitePage>
  );
}
