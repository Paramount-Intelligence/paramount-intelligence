import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import AiWorkflowAutomation from "@/components/services/pages/AiWorkflowAutomation";

export const metadata: Metadata = {
  title: "Workflow Automation Services | Paramount Intelligence",
  description:
    "Reduce repetitive handling with integrated workflows for documents, approvals, support, and business systems, with clear exception paths.",
};

export default function AiWorkflowAutomationPage() {
  return (
    <SitePage>
      <AiWorkflowAutomation />
    </SitePage>
  );
}
