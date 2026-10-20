import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import CaseStudiesPage from "@/components/casestudies/listing/CaseStudiesPage";

export const metadata: Metadata = {
  title: "AI & Engineering Case Studies | Paramount Intelligence",
  description:
    "Explore AI, software, data, and automation work, including the business challenge, delivered capability, and evidence behind each result.",
};

export default function CaseStudies() {
  return (
    <SitePage>
      <CaseStudiesPage />
    </SitePage>
  );
}
