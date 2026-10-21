import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/careers.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function Careers() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Careers</span>
              </nav>
              <div className="eyebrow">Careers</div>
              <h1>Careers in AI &amp; Engineering</h1>
              <p className="body">Paramount offers opportunities to contribute to business-critical work requiring technical judgment and hands-on engineering. Our engagements bring engineers close to client users, product leaders, and the systems where the work needs to run.</p>
              <div className="ctas">
                <a className="btn btn-cyan" href="#opportunities">Explore opportunities <span className="arr"><Icon name="arrow" /></span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" id="opportunities">
        <div className="wrap">
          <div className="why">
            <div className="head" style={{ margin: "0" }}>
              <div className="eyebrow">Opportunities</div>
              <h2 className="title">Opportunities at Paramount</h2>
            </div>
            <p className="lead">We look for people who can understand a problem, build the solution, and take responsibility for the work. Our priority areas are forward-deployed AI engineering and applied AI engineering. Current openings are listed only when the role and hiring requirements are confirmed.</p>
          </div>
          <div className="chipbar" data-chips aria-label="Filter opportunities">
            <button type="button" data-cat="all" aria-pressed="true">All opportunities</button>
            <button type="button" data-cat="Engineering" aria-pressed="false">Engineering</button>
            <button type="button" data-cat="Data" aria-pressed="false">Data</button>
            <button type="button" data-cat="Product &amp; Delivery" aria-pressed="false">Product &amp; Delivery</button>
            <button type="button" data-cat="Consulting" aria-pressed="false">Consulting</button>
          </div>
          <div className="roles" id="roles">
            <Link className="job" href="/careers/open-positions/ai-engineer" data-cat="Engineering">
              <div className="rt">
                <h3>AI Engineer</h3>
                <span className="open">Open role</span>
              </div>
              <dl>
                <dt>Location</dt>
                <dd>Remote, US only</dd>
                <dt>Team</dt>
                <dd>Applied AI</dd>
                <dt>Work</dt>
                <dd>AI agents, retrieval, evaluation, and enterprise AI applications delivered with client teams.</dd>
              </dl>
              <span className="link">View role <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="job" href="/careers/open-positions/full-stack-engineer" data-cat="Engineering">
              <div className="rt">
                <h3>Full Stack Engineer</h3>
                <span className="open">Open role</span>
              </div>
              <dl>
                <dt>Location</dt>
                <dd>Remote, US only</dd>
                <dt>Team</dt>
                <dd>Software &amp; Product Engineering</dd>
                <dt>Work</dt>
                <dd>Web applications, APIs, integrations, and AI features inside client products.</dd>
              </dl>
              <span className="link">View role <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
          </div>
          <div className="empty" id="eoi" hidden>
            <span className="k-badge">Open to profiles</span>
            <h3>Expressions of Interest</h3>
            <p style={{ maxWidth: "66ch" }}>Expressions of interest are welcome from professionals with relevant delivery experience. Submissions should include technical expertise and examples of systems developed or improved.</p>
            <a className="btn btn-navy" href="#register-interest">Submit a profile <span className="arr"><Icon name="arrow" /></span></a>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Areas of practice</div>
            <h2 className="title">Where you could contribute</h2>
          </div>
          <div className="areas">
            <div className="blk">
              <span className="ic">
                <Icon name="agent" />
              </span>
              <h3>Forward-deployed AI engineering</h3>
              <p>Work with client stakeholders on discovery, prototyping, integration, evaluation, and deployment.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="code" />
              </span>
              <h3>Software and platform engineering</h3>
              <p>Build applications, APIs, internal tools, and the systems that support them.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="db" />
              </span>
              <h3>Data and analytics</h3>
              <p>Improve data flows, reporting, and the foundations for AI applications.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="check" />
              </span>
              <h3>Quality and production delivery</h3>
              <p>Test behavior, investigate failures, and improve release and operating practices.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we value</div>
            <h2 className="title">What we look for</h2>
          </div>
          <div className="values">
            <div className="val">
              <span className="n">01</span>
              <span className="vic">
                <Icon name="owner" />
              </span>
              <h3>Ownership</h3>
              <p>Responsibility for agreed work from requirements through delivery and handover.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">02</span>
              <span className="vic">
                <Icon name="scale" />
              </span>
              <h3>Engineering judgment</h3>
              <p>Make trade-offs visible and choose an approach that fits the requirement.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">03</span>
              <span className="vic">
                <Icon name="msg" />
              </span>
              <h3>Clear communication</h3>
              <p>Work constructively with technical colleagues and business users.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">04</span>
              <span className="vic">
                <Icon name="check" />
              </span>
              <h3>Evidence</h3>
              <p>Relevant examples of delivered work, architecture decisions, and results that can be shared appropriately.</p>
              <span className="bar2" />
            </div>
          </div>
        </div>
      </section>
      <section className="sec band" id="register-interest">
        <div className="wrap cols2">
          <div className="stack-txt">
            <div className="eyebrow">Register interest</div>
            <h2 className="title">Share your profile</h2>
            <p>Expressions of interest are welcome from professionals with relevant delivery experience. Submissions should include technical expertise and examples of systems developed or improved.</p>
            <div className="chips pale">
              <span>Forward-deployed AI engineering</span>
              <span>Applied AI engineering</span>
            </div>
          </div>
          <div className="form-wrap">
            <form className="form" data-form="careers" noValidate>
              <div className="field">
                <label htmlFor="c-name">Full name <span className="req">*</span></label>
                <input id="c-name" name="c-name" type="text" autoComplete="name" data-err="Full name is required." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email <span className="req">*</span></label>
                <input id="c-email" name="c-email" type="email" autoComplete="email" data-err="Enter a valid email address." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="c-loc">Location and time zone <span className="req">*</span></label>
                <input id="c-loc" name="c-loc" type="text" data-err="Location and time zone are required." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="c-area">Area of expertise <span className="req">*</span></label>
                <select id="c-area" name="c-area" data-err="Select an area of expertise.">
                  <option value="">Select…</option>
                  <option>Forward-deployed AI engineering</option>
                  <option>Software engineering</option>
                  <option>Data and analytics</option>
                  <option>Cloud and platform engineering</option>
                  <option>Quality and evaluation</option>
                  <option>Product and consulting</option>
                  <option>Other</option>
                </select>
                <span className="err" aria-live="polite" />
              </div>
              <div className="field full">
                <label htmlFor="c-url">LinkedIn or portfolio URL</label>
                <input id="c-url" name="c-url" type="url" />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field full">
                <label htmlFor="c-work">Brief description of relevant work <span className="req">*</span></label>
                <textarea id="c-work" name="c-work" data-err="Describe your relevant work." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field full">
                <span className="lab">Resume upload</span>
                <div className="file">
                  <Icon name="file" />
                  <input id="c-cv" type="file" accept=".pdf,.docx" aria-label="Resume upload" data-max-mb="4" data-err="This file is larger than 4 MB. Please choose a smaller PDF or DOCX file." aria-describedby="c-cv-err" />
                </div>
                <span className="hint">PDF or DOCX, up to 4 MB. Please exclude confidential client information.</span>
                <span className="err" id="c-cv-err" aria-live="polite" hidden />
              </div>
              <div className="field full">
                <label className="check">
                  <input type="checkbox" id="c-ok" data-err="Please confirm to continue." />
                  <span>I agree to be contacted about relevant opportunities.</span>
                </label>
                <span className="err" aria-live="polite" />
              </div>
              <div className="actions full">
                <button className="btn btn-cyan" type="submit">Send my profile <span className="arr"><Icon name="arrow" /></span></button>
              </div>
              <p className="send-err full" role="alert" hidden>The submission could not be sent. Please try again. Your profile has not been received.</p>
            </form>
            <div className="form-ok" tabIndex={-1} hidden>
              <span className="tick">
                <Icon name="check" />
              </span>
              <h3>Profile received</h3>
              <p>The team will review the submission and follow up if a relevant opportunity becomes available.</p>
              <button className="btn btn-line" type="button" data-reset>Submit another profile</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
