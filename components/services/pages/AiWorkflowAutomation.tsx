import Link from "next/link";
import RelatedCaseCard from "@/components/casestudies/RelatedCaseCard";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/services-ai-workflow-automation.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function AiWorkflowAutomation() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/services">Services</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Workflow Automation</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>Workflow Automation &amp; Systems Integration</h1>
              <p className="body">We integrate business systems and automate recurring tasks to reduce manual handoffs. We combine rules, integrations, and AI where useful, with people responsible for the decisions that need judgment.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a workflow <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">Connected work. Defined exceptions.</div>
                <svg viewBox="0 0 400 260" role="img" aria-label="A request is extracted and checked by rules; clear cases update systems and exceptions reach an owner">
                  <rect x="8" y="108" width="76" height="40" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="46.0" y="132.0" textAnchor="middle">Request</text>
                  <path id="au0" d="M84 128H104" fill="none" stroke="#09b6f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="104" y="108" width="76" height="40" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="142.0" y="132.0" textAnchor="middle">Extract</text>
                  <path d="M180 128H200" fill="none" stroke="#09b6f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M240 98L280 128L240 158L200 128Z" fill="#0f256e" stroke="#09b6f9" strokeWidth="1.6" />
                  <text className="vt" x="240" y="132" textAnchor="middle">Rules</text>
                  <path id="au1" d="M240 98V60H296" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="296" y="40" width="96" height="40" fill="rgba(61,190,139,.18)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <text className="vt" x="344.0" y="64.0" textAnchor="middle">System</text>
                  <text className="vs" x="344" y="92" textAnchor="middle">updated</text>
                  <path id="au2" d="M240 158V200H296" fill="none" stroke="#f5b83d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
                  <rect x="296" y="180" width="96" height="40" fill="rgba(245,184,61,.14)" stroke="#f5b83d" strokeWidth="1.4" />
                  <text className="vt" x="344.0" y="204.0" textAnchor="middle">Owner</text>
                  <text className="vs" x="344" y="232" textAnchor="middle">reviews exception</text>
                  <circle r="4" fill="#3dbe8b">
                    <animateMotion dur="2.4s" begin="0s" repeatCount="indefinite">
                      <mpath href="#au1" />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#f5b83d">
                    <animateMotion dur="3.6s" begin="-1.2s" repeatCount="indefinite">
                      <mpath href="#au2" />
                    </animateMotion>
                  </circle>
                  <text className="vk" x="8" y="30" textAnchor="start">TRACEABLE ACTIVITY</text>
                  <rect x="8" y="40" width="22" height="8" fill="#09b6f9" stroke="none" strokeWidth="1.4" />
                  <rect x="38" y="40" width="22" height="8" fill="#09b6f9" stroke="none" strokeWidth="1.4" />
                  <rect x="68" y="40" width="22" height="8" fill="#09b6f9" stroke="none" strokeWidth="1.4" />
                  <rect x="98" y="40" width="22" height="8" fill="#09b6f9" stroke="none" strokeWidth="1.4" />
                  <rect x="128" y="40" width="22" height="8" fill="rgba(160,185,240,.3)" stroke="none" strokeWidth="1.4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="why">
            <div className="head" style={{ margin: "0" }}>
              <div className="eyebrow">Why this work matters</div>
              <h2 className="title">Removing Friction Across Business Systems</h2>
            </div>
            <p className="lead">Work can stall while someone copies a record, checks a document, chases an approval, or routes an exception. We map the complete process and automate the steps that remove meaningful effort or delay.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="link" />
              </span>
              <b>Connected work</b>
              <p>Information moves across systems.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="person" />
              </span>
              <b>Defined exceptions</b>
              <p>Uncertain cases reach an owner.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="eye" />
              </span>
              <b>Traceable activity</b>
              <p>Client teams can follow what happened.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within Workflow Automation</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="Workflow Automation services">
              <button type="button" role="tab" id="services-ai-workflow-automation-t0" aria-controls="services-ai-workflow-automation-p0" aria-selected="true">
                <Icon name="route" />
                <span>Workflow discovery</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-workflow-automation-t1" aria-controls="services-ai-workflow-automation-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="file" />
                <span>Document processing</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-workflow-automation-t2" aria-controls="services-ai-workflow-automation-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="plug" />
                <span>System integration and orchestration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-workflow-automation-t3" aria-controls="services-ai-workflow-automation-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="check" />
                <span>Approvals and decision support</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-workflow-automation-t4" aria-controls="services-ai-workflow-automation-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="blocks" />
                <span>Low-code automation</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-ai-workflow-automation-p0" aria-labelledby="services-ai-workflow-automation-t0">
                <span className="big-ic">
                  <Icon name="route" />
                </span>
                <span className="lbl">Workflow Automation</span>
                <h3>Workflow discovery</h3>
                <p>We map the process from request to completion. We identify waiting time, repeat handling, approval points, and the best first improvement.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-workflow-automation-p1" aria-labelledby="services-ai-workflow-automation-t1" hidden>
                <span className="big-ic">
                  <Icon name="file" />
                </span>
                <span className="lbl">Workflow Automation</span>
                <h3>Document processing</h3>
                <p>Extract, classify, and prepare information from forms, emails, and documents. Define validation and review requirements before the data reaches downstream systems.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-workflow-automation-p2" aria-labelledby="services-ai-workflow-automation-t2" hidden>
                <span className="big-ic">
                  <Icon name="plug" />
                </span>
                <span className="lbl">Workflow Automation</span>
                <h3>System integration and orchestration</h3>
                <p>We connect CRM, support, finance, and internal applications through APIs and workflow tools. We handle retries, duplicate events, and failed dependencies.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-workflow-automation-p3" aria-labelledby="services-ai-workflow-automation-t3" hidden>
                <span className="big-ic">
                  <Icon name="check" />
                </span>
                <span className="lbl">Workflow Automation</span>
                <h3>Approvals and decision support</h3>
                <p>We route work to the right person with relevant context. Use rules for deterministic decisions and AI to assist with interpretation, drafting, or prioritization.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-workflow-automation-p4" aria-labelledby="services-ai-workflow-automation-t4" hidden>
                <span className="big-ic">
                  <Icon name="blocks" />
                </span>
                <span className="lbl">Workflow Automation</span>
                <h3>Low-code automation</h3>
                <p>We build maintainable workflows in tools such as Microsoft Power Automate and n8n where they fit the requirement. We provide documentation and clear ownership for ongoing changes.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Outcomes</div>
            <h2 className="title">What changes after delivery</h2>
          </div>
          <div className="outs">
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Less repetition</h3>
              <p>Routine records, notifications, and document steps move automatically.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Fewer lost handoffs</h3>
              <p>Work reaches the next system or a named reviewer with its context intact.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>More operational visibility</h3>
              <p>Activity and exceptions can be reviewed rather than reconstructed from separate inboxes.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Approach and project experience</div>
            <h2 className="title">How the work is delivered</h2>
          </div>
          <div className="legend-box appr" style={{ background: "var(--white)", marginTop: "0", marginBottom: "clamp(36px,5vw,52px)" }}>
            <em>Approach</em>
            <p>We agree the workflow boundary and expected improvement, build and test the integration, and demonstrate normal and exception paths. The handover includes business rules and maintenance responsibilities.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss a workflow <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid related">
            <RelatedCaseCard n="07" />
            <RelatedCaseCard n="28" />
            <RelatedCaseCard n="48" />
          </div>
          <div className="ev-foot" style={{ marginTop: "24px" }}>
            <Link className="link" href="/case-studies">View all case studies <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Connected Workflows for More Efficient Operations</h2>
            </div>
            <div className="cta-r">
              <span className="cta-k">What a first conversation covers</span>
              <ol className="cta-steps">
                <li>
                  <b>01</b>
                  <span>Your business objective</span>
                </li>
                <li>
                  <b>02</b>
                  <span>The technical context</span>
                </li>
                <li>
                  <b>03</b>
                  <span>The right next step</span>
                </li>
              </ol>
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss workflow automation <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
