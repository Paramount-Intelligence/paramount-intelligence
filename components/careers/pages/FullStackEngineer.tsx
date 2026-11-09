import JobPage from "@/components/careers/JobPage";

// Full Stack Engineer job description (supplied by Paramount, Nov 2026). Location, hours and how to apply are unchanged.
export default function FullStackEngineer() {
  return (
    <JobPage
      id="full-stack-engineer"
      title="Full Stack Engineer"
      area="Software engineering"
      details={[
        ["Employment Type", "Full-Time"],
        ["Experience", "3+ Years"],
        ["Location", "Remote, US only"],
        ["Location Type", "Remote"],
        ["Team", "Software & Product Engineering"],
        ["Working hours", "Overlap with client teams as agreed for each engagement"],
      ]}
      overview={
        <>
          <h2>About the Role</h2>
          <p>We are seeking a skilled <b>Full Stack Engineer</b> to develop and maintain scalable, high-performance web applications. The ideal candidate should have strong experience in frontend and backend development, modern JavaScript frameworks, API development, databases, and cloud deployment.</p>
          <h2>Key Responsibilities</h2>
          <ul>
            <li>Design, develop, and maintain responsive web applications using React, Next.js, and TypeScript.</li>
            <li>Build scalable backend services and REST APIs using Node.js and/or Python (FastAPI).</li>
            <li>Develop reusable UI components and integrate frontend applications with backend services.</li>
            <li>Design and manage relational and NoSQL databases.</li>
            <li>Implement authentication, authorization, and secure application workflows.</li>
            <li>Integrate third-party APIs, cloud services, and AI-powered features.</li>
            <li>Optimize application performance, scalability, and reliability.</li>
            <li>Write clean, maintainable code and participate in testing, code reviews, and deployments.</li>
            <li>Collaborate with product, design, and engineering teams to deliver end-to-end solutions.</li>
          </ul>
          <h2>Required Skills &amp; Qualifications</h2>
          <ul>
            <li>3+ years of professional full-stack development experience.</li>
            <li>Strong proficiency in <b>JavaScript, TypeScript, React.js, and Next.js</b>.</li>
            <li>Backend experience with <b>Node.js (Express/NestJS) and/or Python (FastAPI)</b>.</li>
            <li>Experience building and integrating REST APIs.</li>
            <li>Knowledge of PostgreSQL, MySQL, MongoDB, or similar databases.</li>
            <li>Familiarity with authentication protocols, including JWT and OAuth.</li>
            <li>Experience with Git, Docker, CI/CD, and cloud deployments.</li>
            <li>Understanding of modern software architecture, testing, and security practices.</li>
          </ul>
          <h2>Preferred Qualifications</h2>
          <ul>
            <li>Experience with AWS, Azure, or GCP.</li>
            <li>Familiarity with Tailwind CSS, Redis, and real-time applications.</li>
            <li>Experience integrating AI/LLM APIs into web applications.</li>
            <li>Exposure to enterprise applications and SaaS platforms.</li>
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
