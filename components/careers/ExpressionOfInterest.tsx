import JobPage from "@/components/careers/JobPage";

// Expressions of Interest page from docs/website-redesign/reference/careers-revamp/ (reference/content.md, the copy).
export default function ExpressionOfInterest() {
  return (
    <JobPage
      id="expression-of-interest"
      title="Expressions of Interest"
      details={[
        ["Status", "Open to profiles"],
        ["Priority areas", "Forward-deployed AI engineering, Applied AI engineering"],
      ]}
      overview={
        <>
          <p>Expressions of interest are welcome from professionals with relevant delivery experience. Submissions should include technical expertise and examples of systems developed or improved.</p>
          <h2>Priority areas</h2>
          <ul>
            <li>Forward-deployed AI engineering</li>
            <li>Applied AI engineering</li>
          </ul>
          <h2>What happens next</h2>
          <p>The team will review the submission and follow up if a relevant opportunity becomes available.</p>
        </>
      }
    />
  );
}
