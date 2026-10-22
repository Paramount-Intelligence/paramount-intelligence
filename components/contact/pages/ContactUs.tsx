import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/contact-us.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function ContactUs() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Contact Us</span>
              </nav>
              <div className="eyebrow">Contact us</div>
              <h1>Connect with Paramount Intelligence</h1>
              <p className="body">Contact Paramount to discuss an AI initiative, software requirement, technology decision, or engineering challenge. Engagements range from focused advisory and specialist support to managed implementation.</p>
              <div className="ctas">
                <a className="btn btn-cyan" href="https://calendly.com/marty-paramountintelligence/30min" target="_blank" rel="noopener">Schedule a conversation <span className="arr"><Icon name="arrow" /></span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap contact">
          <div className="form-wrap" id="enquiry">
            <div className="head" style={{ marginBottom: "24px" }}>
              <div className="eyebrow">Enquiries</div>
              <h2 className="title" style={{ fontSize: "clamp(1.5rem,2.6vw,2rem)" }}>Project &amp; Engagement Enquiries</h2>
            </div>
            <form className="form" data-form="contact" noValidate>
              <div className="field">
                <label htmlFor="f-name">Full name <span className="req">*</span></label>
                <input id="f-name" name="f-name" type="text" autoComplete="name" data-err="Name is required." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="f-email">Work email <span className="req">*</span></label>
                <input id="f-email" name="f-email" type="email" autoComplete="email" data-err="Enter a valid email address." />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="f-co">Company</label>
                <input id="f-co" name="f-co" type="text" autoComplete="organization" />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone number</label>
                <input id="f-phone" name="f-phone" type="tel" autoComplete="tel" />
                <span className="err" aria-live="polite" />
              </div>
              <div className="field full">
                <label htmlFor="f-topic">Area of interest <span className="req">*</span></label>
                <select id="f-topic" name="f-topic" data-err="Select a topic.">
                  <option value="">Select…</option>
                  <option>AI or agent development</option>
                  <option>AI inside existing software</option>
                  <option>Software or product engineering</option>
                  <option>Prototype recovery or production deployment</option>
                  <option>Data or analytics</option>
                  <option>Cloud or infrastructure</option>
                  <option>Workflow automation</option>
                  <option>Consulting or technology evaluation</option>
                  <option>Forward-deployed engineer or specialist</option>
                  <option>Partnership or consulting collaboration</option>
                  <option>Other requirement</option>
                </select>
                <span className="err" aria-live="polite" />
              </div>
              <div className="field full">
                <label htmlFor="f-msg">Message <span className="req">*</span></label>
                <textarea id="f-msg" name="f-msg" placeholder="Briefly describe the business objective, current systems, technical requirement, and expected timing." data-err="Include a brief description of the requirement." />
                <span className="err" aria-live="polite" />
              </div>
              <p className="note full">Please do not include passwords, confidential documents, or customer data in this form. We can arrange an appropriate way to share sensitive information.</p>
              <p className="hint full" style={{ fontSize: ".78rem", color: "var(--muted)" }}>Submission authorizes Paramount to respond to the inquiry using the contact details provided. Information about personal-data handling is available in the Privacy Policy.</p>
              <div className="actions full">
                <button className="btn btn-cyan" type="submit">Send inquiry <span className="arr"><Icon name="arrow" /></span></button>
              </div>
              <p className="send-err full" role="alert" hidden>The inquiry was not sent. Please try again or email ahmed@paramountintelligence.co. Your message has not been received.</p>
            </form>
            <div className="form-ok" tabIndex={-1} hidden>
              <span className="tick">
                <Icon name="check" />
              </span>
              <h3>Inquiry received</h3>
              <p>The team will review the inquiry and follow up to discuss the requirement and next step.</p>
              <button className="btn btn-line" type="button" data-reset>Send another inquiry</button>
            </div>
          </div>
          <div className="side">
            <div className="sbox">
              <h3>Direct contact</h3>
              <div className="person person-ph">
                <img src="/images/team/marty.jpg" alt="Marty Kaufman" width="72" height="72" />
                <div style={{ display: "grid", gap: "4px" }}>
                  <span className="k3">Engagement enquiries</span>
                  <b>Marty Kaufman</b>
                  <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>Co-founder &amp; Chief Commercial Officer</span>
                </div>
              </div>
              <div className="mail">
                <code id="m-marty">marty@paramountintelligence.co</code>
                <button type="button" data-copy="m-marty">Copy</button>
              </div>
              <div className="person">
                <span className="k3">Company</span>
                <b>Paramount Intelligence LLC | United States</b>
              </div>
            </div>
            <div className="sbox dark">
              <span className="eyebrow" style={{ color: "var(--cyan)" }}>Initial Consultation</span>
              <div className="cal" aria-hidden="true">
                <span className="h">M</span>
                <span className="h">T</span>
                <span className="h">W</span>
                <span className="h">T</span>
                <span className="h">F</span>
                <span className="h">S</span>
                <span className="h">S</span>
                <span className="" />
                <span className="av" />
                <span className="" />
                <span className="av" />
                <span className="" />
                <span className="" />
                <span className="" />
                <span className="" />
                <span className="av" />
                <span className="pick" />
                <span className="av" />
                <span className="av" />
                <span className="" />
                <span className="" />
              </div>
              <div className="slot2" aria-hidden="true">
                <span>Introductory conversation</span>
                <b>Pick a time</b>
              </div>
              <p>An introductory conversation establishes the business objective, current environment, and required support. The discussion helps determine the appropriate scope and next step.</p>
              <div>
                <a className="btn btn-cyan btn-wide" href="https://calendly.com/marty-paramountintelligence/30min" target="_blank" rel="noopener">Schedule a conversation <span className="arr"><Icon name="arrow" /></span></a>
              </div>
            </div>
            <div className="sbox">
              <h3>Why Paramount</h3>
              <div className="person" style={{ gridTemplateColumns: "auto 1fr", display: "grid", gap: "4px 14px" }}>
                <span style={{ gridRow: "span 2", color: "var(--royal)" }}>
                  <Icon name="owner" />
                </span>
                <b>Clear ownership</b>
                <span style={{ fontSize: ".86rem" }}>Know who is responsible for the engagement and technical work.</span>
              </div>
              <div className="person" style={{ gridTemplateColumns: "auto 1fr", display: "grid", gap: "4px 14px" }}>
                <span style={{ gridRow: "span 2", color: "var(--royal)" }}>
                  <Icon name="users" />
                </span>
                <b>Direct collaboration</b>
                <span style={{ fontSize: ".86rem" }}>Work with engineers who understand the requirement and build the solution.</span>
              </div>
              <div className="person" style={{ gridTemplateColumns: "auto 1fr", display: "grid", gap: "4px 14px" }}>
                <span style={{ gridRow: "span 2", color: "var(--royal)" }}>
                  <Icon name="layers" />
                </span>
                <b>Flexible scope</b>
                <span style={{ fontSize: ".86rem" }}>Start with a specific decision, one engineer, a workstream, or a managed project.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-tight">
        <div className="wrap">
          <div className="legend-box appr" style={{ background: "var(--white)", marginTop: "0" }}>
            <em>Partnership enquiries</em>
            <p>We also collaborate with consulting firms and delivery platforms on defined client requirements. Delivery roles, client communication, confidentiality, and commercial responsibilities are agreed for each engagement.</p>
            <span className="ic" style={{ width: "52px", height: "52px", display: "grid", placeItems: "center", background: "var(--navy)", color: "var(--white)" }}>
              <Icon name="handshake" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
