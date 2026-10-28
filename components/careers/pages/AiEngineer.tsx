import JobPage from "@/components/careers/JobPage";

// Job page from docs/website-redesign/reference/careers-revamp/ (reference/content.md, the copy).
export default function AiEngineer() {
  return (
    <JobPage
      id="ai-engineer"
      title="AI Engineer"
      area="Forward-deployed AI engineering"
      details={[
        ["Location", "Remote, US only"],
        ["Location Type", "Remote"],
        ["Team", "Applied AI"],
        ["Working hours", "Overlap with client teams as agreed for each engagement"],
      ]}
      overview={
        <>
          <p>Work with Paramount on a defined client or internal engineering priority. The listing describes the team, work, and capabilities required for the role.</p>
          <h2>The role</h2>
          <p>AI Engineer, Applied AI team.</p>
          <h2>What the role will work on</h2>
          <p>AI agents, retrieval, evaluation, and enterprise AI applications delivered with client teams.</p>
          <h2>Responsibilities</h2>
          <ul>
            <li>Design and build AI agents, copilots, and retrieval workflows connected to client systems.</li>
            <li>Define evaluation sets and quality checks, and use the results to guide each release.</li>
            <li>Work directly with client users and technical owners from discovery through deployment.</li>
            <li>Integrate models and tools with APIs, data sources, permissions, and monitoring.</li>
            <li>Document decisions and hand over systems that client teams can operate and extend.</li>
          </ul>
          <h2>Relevant experience</h2>
          <ul>
            <li>Production experience with LLM applications, retrieval-augmented generation, or agent frameworks.</li>
            <li>Strong Python, plus experience with APIs and cloud services such as AWS.</li>
            <li>Experience evaluating model outputs and handling failure cases and uncertainty.</li>
            <li>Clear communication with both technical colleagues and business users.</li>
          </ul>
          <h2>Location and working hours</h2>
          <p>Remote, US only. Working hours overlap with client teams as agreed for each engagement.</p>
          <h2>How to apply</h2>
          <p>Submit your profile through the register-interest form with examples of systems you have built or improved. Please exclude confidential client information.</p>
        </>
      }
    />
  );
}
