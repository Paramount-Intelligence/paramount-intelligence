import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/careers-ai-engineer.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function AiEngineer() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/careers/open-positions">Careers</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">AI Engineer</span>
              </nav>
              <div className="eyebrow">Careers · Applied AI</div>
              <h1>AI Engineer</h1>
              <p className="body">Work with Paramount on a defined client or internal engineering priority. The listing describes the team, work, and capabilities required for the role.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/careers/open-positions#register-interest">Apply for this opportunity <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/careers/open-positions#opportunities">All opportunities </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap rdetail">
          <div>
            <div className="rsec">
              <h2>Role</h2>
              <p>AI Engineer, Applied AI team.</p>
            </div>
            <div className="rsec">
              <h2>What the role will work on</h2>
              <p>AI agents, retrieval, evaluation, and enterprise AI applications delivered with client teams.</p>
            </div>
            <div className="rsec">
              <h2>Responsibilities</h2>
              <ul>
                <li>Design and build AI agents, copilots, and retrieval workflows connected to client systems.</li>
                <li>Define evaluation sets and quality checks, and use the results to guide each release.</li>
                <li>Work directly with client users and technical owners from discovery through deployment.</li>
                <li>Integrate models and tools with APIs, data sources, permissions, and monitoring.</li>
                <li>Document decisions and hand over systems that client teams can operate and extend.</li>
              </ul>
            </div>
            <div className="rsec">
              <h2>Relevant experience</h2>
              <ul>
                <li>Production experience with LLM applications, retrieval-augmented generation, or agent frameworks.</li>
                <li>Strong Python, plus experience with APIs and cloud services such as AWS.</li>
                <li>Experience evaluating model outputs and handling failure cases and uncertainty.</li>
                <li>Clear communication with both technical colleagues and business users.</li>
              </ul>
            </div>
            <div className="rsec">
              <h2>Location and working hours</h2>
              <p>Remote, US only. Working hours overlap with client teams as agreed for each engagement.</p>
            </div>
            <div className="rsec">
              <h2>How to apply</h2>
              <p>Submit your profile through the register-interest form with examples of systems you have built or improved. Please exclude confidential client information.</p>
            </div>
          </div>
          <aside className="rcard">
            <span className="k-badge" style={{ justifySelf: "start" }}>Open role</span>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>AI Engineer</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>Applied AI</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Remote, US only</dd>
              </div>
            </dl>
            <Link className="btn btn-cyan btn-wide" href="/careers/open-positions#register-interest">Apply for this opportunity <span className="arr"><Icon name="arrow" /></span></Link>
            <Link className="link" href="/careers/open-positions#opportunities">All opportunities <span className="arr"><Icon name="arrow" /></span></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
