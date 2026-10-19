import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import AiSolutionsAndEngineering from "@/components/services/pages/AiSolutionsAndEngineering";

export const metadata: Metadata = {
  title: "AI & Agentic Engineering | Paramount Intelligence",
  description:
    "Build AI agents, copilots, and custom AI features integrated with existing systems, with evaluation, human review, and production delivery.",
};

export default function AiSolutionsAndEngineeringPage() {
  return (
    <SitePage>
      <AiSolutionsAndEngineering />
    </SitePage>
  );
}
