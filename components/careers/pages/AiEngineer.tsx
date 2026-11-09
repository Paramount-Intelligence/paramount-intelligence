import JobPage from "@/components/careers/JobPage";

// AI Engineer job description (supplied by Paramount, Nov 2026). Location, hours and how to apply are unchanged.
export default function AiEngineer() {
  return (
    <JobPage
      id="ai-engineer"
      title="AI Engineer"
      area="Forward-deployed AI engineering"
      details={[
        ["Employment Type", "Full-Time"],
        ["Experience", "3+ Years"],
        ["Location", "Remote, US only"],
        ["Location Type", "Remote"],
        ["Team", "Applied AI"],
        ["Working hours", "Overlap with client teams as agreed for each engagement"],
      ]}
      overview={
        <>
          <h2>About the Role</h2>
          <p>We are looking for an experienced <b>AI Engineer</b> to design, develop, and deploy production-grade AI applications. The ideal candidate should have strong Python development skills and hands-on experience with Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI agents, and cloud-based AI solutions.</p>
          <h2>Key Responsibilities</h2>
          <ul>
            <li>Design and develop LLM-powered applications, AI assistants, and agentic workflows.</li>
            <li>Build and optimize RAG pipelines, embeddings, and vector-based retrieval systems.</li>
            <li>Develop AI agents and multi-agent workflows using LangChain, LangGraph, or similar frameworks.</li>
            <li>Integrate LLM APIs, including OpenAI, Anthropic Claude, and Google Gemini.</li>
            <li>Develop scalable backend services and REST APIs using Python and FastAPI.</li>
            <li>Work with vector databases, cloud services, and third-party integrations.</li>
            <li>Deploy, monitor, and optimize AI applications for performance, security, and reliability.</li>
            <li>Collaborate with cross-functional teams to deliver production-ready AI solutions.</li>
          </ul>
          <h2>Required Skills &amp; Qualifications</h2>
          <ul>
            <li>3+ years of software engineering experience, including hands-on AI/LLM development.</li>
            <li>Strong proficiency in <b>Python, FastAPI, and REST APIs</b>.</li>
            <li>Practical experience with <b>LLMs, RAG, prompt engineering, and AI agents</b>.</li>
            <li>Familiarity with <b>LangChain, LangGraph, or LlamaIndex</b>.</li>
            <li>Experience with vector databases such as Pinecone, Qdrant, or pgvector.</li>
            <li>Knowledge of PostgreSQL, MongoDB, or other relevant databases.</li>
            <li>Experience with AWS, Azure, or GCP.</li>
            <li>Familiarity with Docker, Git, CI/CD, and production deployment.</li>
          </ul>
          <h2>Preferred Qualifications</h2>
          <ul>
            <li>Experience with AWS Bedrock, Azure AI Foundry, or Google Vertex AI.</li>
            <li>Knowledge of MCP, agent orchestration, and LLM evaluation frameworks.</li>
            <li>Experience delivering enterprise-grade AI applications.</li>
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
