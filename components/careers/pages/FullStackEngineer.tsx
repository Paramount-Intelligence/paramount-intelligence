import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/careers-full-stack-engineer.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function FullStackEngineer() {
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
                <span aria-current="page">Full Stack Engineer</span>
              </nav>
              <div className="eyebrow">Careers · Software &amp; Product Engineering</div>
              <h1>Full Stack Engineer</h1>
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
              <p>Full Stack Engineer, Software &amp; Product Engineering team.</p>
            </div>
            <div className="rsec">
              <h2>What the role will work on</h2>
              <p>Web applications, APIs, integrations, and AI features inside client products.</p>
            </div>
            <div className="rsec">
              <h2>Responsibilities</h2>
              <ul>
                <li>Build web applications, internal tools, and customer portals with the workflows and permissions users need.</li>
                <li>Develop APIs and integrations that connect business tools, customer data, and external platforms.</li>
                <li>Add AI features such as search, copilots, and document workflows to existing products.</li>
                <li>Write tests, set up deployment pipelines, and document the system for handover.</li>
                <li>Demonstrate working increments and resolve feedback with client product owners.</li>
              </ul>
            </div>
            <div className="rsec">
              <h2>Relevant experience</h2>
              <ul>
                <li>Production experience with TypeScript or JavaScript, React or Next.js, and a backend such as Node.js or Python.</li>
                <li>Experience with relational databases, REST APIs, and cloud deployment.</li>
                <li>Familiarity with integrating AI services into applications.</li>
                <li>Ownership of features from requirements through release.</li>
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
                <dd>Full Stack Engineer</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>Software &amp; Product Engineering</dd>
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
