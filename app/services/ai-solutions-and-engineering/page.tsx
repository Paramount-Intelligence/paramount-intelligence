import SitePage from "@/components/site/SitePage";
import AiSolutionsAndEngineering from "@/components/services/pages/AiSolutionsAndEngineering";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI & Agentic Engineering | Paramount Intelligence",
  description:
    "Build AI agents, copilots, and custom AI features integrated with existing systems, with evaluation, human review, and production delivery.",
  path: "/services/ai-solutions-and-engineering",
});

export default function AiSolutionsAndEngineeringPage() {
  return (
    <SitePage>
      <AiSolutionsAndEngineering />
    </SitePage>
  );
}
