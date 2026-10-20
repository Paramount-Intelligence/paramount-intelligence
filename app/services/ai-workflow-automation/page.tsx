import SitePage from "@/components/site/SitePage";
import AiWorkflowAutomation from "@/components/services/pages/AiWorkflowAutomation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Workflow Automation Services | Paramount Intelligence",
  description:
    "Reduce repetitive handling with integrated workflows for documents, approvals, support, and business systems, with clear exception paths.",
  path: "/services/ai-workflow-automation",
});

export default function AiWorkflowAutomationPage() {
  return (
    <SitePage>
      <AiWorkflowAutomation />
    </SitePage>
  );
}
