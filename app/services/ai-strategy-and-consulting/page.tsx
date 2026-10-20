import SitePage from "@/components/site/SitePage";
import AiStrategyAndConsulting from "@/components/services/pages/AiStrategyAndConsulting";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI & Technology Consulting | Paramount Intelligence",
  description:
    "Assess AI opportunities, evaluate technologies, and define architecture and delivery plans that fit business priorities and existing systems.",
  path: "/services/ai-strategy-and-consulting",
});

export default function AiStrategyAndConsultingPage() {
  return (
    <SitePage>
      <AiStrategyAndConsulting />
    </SitePage>
  );
}
