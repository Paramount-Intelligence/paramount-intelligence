import Link from "next/link";
import CaseCard from "@/components/casestudies/CaseCard";
import Icon from "@/components/site/Icon";
import { caseCard } from "@/lib/case-cards";

// Page content from docs/website-redesign/reference/services-ai-strategy-and-consulting.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function AiStrategyAndConsulting() {
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
                <span aria-current="page">AI &amp; Technology Consulting</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>AI &amp; Technology Consulting</h1>
              <p className="body">We help organizations identify valuable AI opportunities, evaluate implementation options, and define the architecture and delivery plan. Recommendations draw on hands-on engineering experience and applied technical evaluation.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a technology decision <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis funnel">
                <div className="eyebrow">Evidence before commitment</div>
                <svg viewBox="0 0 440 262" id="funnel" role="img" aria-label="Many ideas are checked for value, feasibility and execution; most are deferred and one becomes a scoped next step with an owner">
                  <text className="fz-t" x="58" y="26" textAnchor="middle">IDEAS</text>
                  <rect x="12" y="38" width="94" height="172" fill="rgba(160,185,240,.06)" stroke="rgba(160,185,240,.25)" strokeDasharray="3 4" />
                  <text className="fz-t" x="158" y="26" textAnchor="middle">VALUE</text>
                  <path d="M158 38V66M158 174V210" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M151 66H165M151 174H165" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M158 72V168" stroke="rgba(9,182,249,.25)" strokeWidth="1" strokeDasharray="2 3" />
                  <text className="fz-t" x="248" y="26" textAnchor="middle">FEASIBILITY</text>
                  <path d="M248 38V86M248 154V210" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M241 86H255M241 154H255" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M248 92V148" stroke="rgba(9,182,249,.25)" strokeWidth="1" strokeDasharray="2 3" />
                  <text className="fz-t" x="338" y="26" textAnchor="middle">EXECUTION</text>
                  <path d="M338 38V104M338 136V210" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M331 104H345M331 136H345" stroke="#09b6f9" strokeWidth="3" />
                  <path d="M338 110V130" stroke="rgba(9,182,249,.25)" strokeWidth="1" strokeDasharray="2 3" />
                  <path d="M112 232H350" stroke="rgba(160,185,240,.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text className="fz-s" x="112" y="252">Deferred or adapted, with the reason recorded</text>
                  <g id="fzCard">
                    <rect x="368" y="88" width="64" height="64" fill="rgba(61,190,139,.16)" stroke="#3dbe8b" strokeWidth="1.8" />
                    <text className="fz-l" x="400" y="110" textAnchor="middle">Next</text>
                    <text className="fz-l" x="400" y="126" textAnchor="middle">step</text>
                  </g>
                  <text className="fz-s" x="400" y="170" textAnchor="middle">Owner</text>
                  <text className="fz-s" x="400" y="183" textAnchor="middle">+ measures</text>
                  <g id="fzDots" />
                </svg>
                <div className="fz-legend">
                  <span><i style={{ background: "#ffffff" }} />Opportunity</span>
                  <span><i style={{ background: "#09b6f9" }} />Passed a check</span>
                  <span><i style={{ background: "rgba(160,185,240,.45)" }} />Deferred</span>
                  <span><i style={{ background: "#3dbe8b" }} />Scoped next step</span>
                </div>
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
              <h2 className="title">Connecting AI Opportunity with Implementation Readiness</h2>
            </div>
            <p className="lead">A promising use case needs a business owner, suitable data, a workable architecture, and a way to assess success. We bring those considerations into the decision before an initiative becomes a larger commitment.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="chart" />
              </span>
              <b>Value</b>
              <p>Define the improvement and how to measure it.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="layers" />
              </span>
              <b>Feasibility</b>
              <p>Understand dependencies and constraints.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="route" />
              </span>
              <b>Execution</b>
              <p>Establish a scoped next step and an owner.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within AI &amp; Technology Consulting</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="AI &amp; Technology Consulting services">
              <button type="button" role="tab" id="services-ai-strategy-and-consulting-t0" aria-controls="services-ai-strategy-and-consulting-p0" aria-selected="true">
                <Icon name="search" />
                <span>Opportunity and workflow assessment</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-strategy-and-consulting-t1" aria-controls="services-ai-strategy-and-consulting-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="spark" />
                <span>AI product strategy</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-strategy-and-consulting-t2" aria-controls="services-ai-strategy-and-consulting-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="layers" />
                <span>Architecture and readiness</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-strategy-and-consulting-t3" aria-controls="services-ai-strategy-and-consulting-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="flask" />
                <span>Technology evaluation and applied R&amp;D</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-strategy-and-consulting-t4" aria-controls="services-ai-strategy-and-consulting-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="owner" />
                <span>Governance and operating ownership</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-ai-strategy-and-consulting-p0" aria-labelledby="services-ai-strategy-and-consulting-t0">
                <span className="big-ic">
                  <Icon name="search" />
                </span>
                <span className="lbl">AI &amp; Technology Consulting</span>
                <h3>Opportunity and workflow assessment</h3>
                <p>We work with leaders and users to identify recurring work, bottlenecks, and opportunities. We compare potential improvements with implementation effort, data readiness, and adoption requirements.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-strategy-and-consulting-p1" aria-labelledby="services-ai-strategy-and-consulting-t1" hidden>
                <span className="big-ic">
                  <Icon name="spark" />
                </span>
                <span className="lbl">AI &amp; Technology Consulting</span>
                <h3>AI product strategy</h3>
                <p>We evaluate where AI improves the customer experience or the economics of a product. We define the user problem, expected behavior, success measures, and first useful release.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-strategy-and-consulting-p2" aria-labelledby="services-ai-strategy-and-consulting-t2" hidden>
                <span className="big-ic">
                  <Icon name="layers" />
                </span>
                <span className="lbl">AI &amp; Technology Consulting</span>
                <h3>Architecture and readiness</h3>
                <p>We review existing applications, data, integration boundaries, and access controls. We compare architecture options and identify the changes required before implementation.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-strategy-and-consulting-p3" aria-labelledby="services-ai-strategy-and-consulting-t3" hidden>
                <span className="big-ic">
                  <Icon name="flask" />
                </span>
                <span className="lbl">AI &amp; Technology Consulting</span>
                <h3>Technology evaluation and applied R&amp;D</h3>
                <p>We test relevant models, agent frameworks, and tools against representative tasks. Clients receive findings on quality, limitations, cost, and integration, together with an adoption or deferral recommendation.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-strategy-and-consulting-p4" aria-labelledby="services-ai-strategy-and-consulting-t4" hidden>
                <span className="big-ic">
                  <Icon name="owner" />
                </span>
                <span className="lbl">AI &amp; Technology Consulting</span>
                <h3>Governance and operating ownership</h3>
                <p>We define decision rights, review gates, AI asset ownership, and release responsibilities. We align the operating model with the intended use and the organization&#x27;s existing controls.</p>
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
              <h3>Investment clarity</h3>
              <p>Evidence-based recommendations with explicit assumptions, limitations, and trade-offs.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Delivery clarity</h3>
              <p>A prioritized scope, architecture outline, dependencies, and acceptance measures.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Ownership clarity</h3>
              <p>Named decisions and responsibilities for implementation, review, and operation.</p>
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
            <p>The engagement can end with the decision and plan, or continue into engineering delivery. Deliverables include written findings and a clear explanation of the assumptions behind the recommendation.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss a technology decision <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid two">
            <CaseCard card={caseCard("05")} />
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
              <h2>Technology Decisions Supported by Evidence</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Talk through the requirement <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
