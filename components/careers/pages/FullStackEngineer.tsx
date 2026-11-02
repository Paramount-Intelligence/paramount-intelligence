import JobPage from "@/components/careers/JobPage";

// Job page from docs/website-redesign/reference/careers-revamp/ (reference/content.md, the copy).
export default function FullStackEngineer() {
  return (
    <JobPage
      id="full-stack-engineer"
      title="Full Stack Engineer"
      area="Software engineering"
      details={[
        ["Location", "Remote, US only"],
        ["Location Type", "Remote"],
        ["Team", "Software & Product Engineering"],
        ["Working hours", "Overlap with client teams as agreed for each engagement"],
      ]}
      overview={
        <>
          <p>Work with Paramount on a defined client or internal engineering priority. The listing describes the team, work, and capabilities required for the role.</p>
          <h2>The role</h2>
          <p>Full Stack Engineer, Software &amp; Product Engineering team.</p>
          <h2>What the role will work on</h2>
          <p>Web applications, APIs, integrations, and AI features inside client products.</p>
          <h2>Responsibilities</h2>
          <ul>
            <li>Build web applications, internal tools, and customer portals with the workflows and permissions users need.</li>
            <li>Develop APIs and integrations that connect business tools, customer data, and external platforms.</li>
            <li>Add AI features such as search, copilots, and document workflows to existing products.</li>
            <li>Write tests, set up deployment pipelines, and document the system for handover.</li>
            <li>Demonstrate working increments and resolve feedback with client product owners.</li>
          </ul>
          <h2>Relevant experience</h2>
          <ul>
            <li>Production experience with TypeScript or JavaScript, React or Next.js, and a backend such as Node.js or Python.</li>
            <li>Experience with relational databases, REST APIs, and cloud deployment.</li>
            <li>Familiarity with integrating AI services into applications.</li>
            <li>Ownership of features from requirements through release.</li>
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
