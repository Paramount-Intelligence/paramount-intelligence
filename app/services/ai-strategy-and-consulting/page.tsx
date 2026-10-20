import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import AiStrategyAndConsulting from "@/components/services/pages/AiStrategyAndConsulting";

export const metadata: Metadata = {
  title: "AI & Technology Consulting | Paramount Intelligence",
  description:
    "Assess AI opportunities, evaluate technologies, and define architecture and delivery plans that fit business priorities and existing systems.",
};

export default function AiStrategyAndConsultingPage() {
  return (
    <SitePage>
      <AiStrategyAndConsulting />
    </SitePage>
  );
}
