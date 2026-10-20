import Link from "next/link";
import RelatedCaseCard from "@/components/casestudies/RelatedCaseCard";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/services-ai-solutions-and-engineering.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function AiSolutionsAndEngineering() {
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
                <span aria-current="page">AI &amp; Agentic Engineering</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>AI &amp; Agentic Engineering</h1>
              <p className="body">We develop agents, copilots, and AI features around defined business workflows. We connect models to the right information and tools, define where people stay in control, and integrate the capability into the application or operating workflow.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss an AI requirement <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">Grounded outputs. Controlled actions.</div>
                <svg viewBox="0 0 400 260" role="img" aria-label="An AI agent uses approved information and business systems, with a review point before actions">
                  <path id="ag1" d="M92 128H150" fill="none" stroke="#09b6f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="ag2" d="M250 112C280 112 280 52 300 52" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="ag3" d="M250 128H300" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="ag4" d="M200 150V188" fill="none" stroke="#f5b83d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
                  <path id="ag5" d="M246 210H300" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="12" y="108" width="80" height="40" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="52.0" y="132.0" textAnchor="middle">Request</text>
                  <rect x="150" y="100" width="100" height="50" fill="#0f256e" stroke="#09b6f9" strokeWidth="1.6" />
                  <text className="vt" x="200.0" y="123.0" textAnchor="middle">AI agent</text>
                  <text className="vs" x="200.0" y="137.0" textAnchor="middle">tools + state</text>
                  <rect x="300" y="30" width="90" height="44" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="345.0" y="50.0" textAnchor="middle">Approved</text>
                  <text className="vs" x="345.0" y="64.0" textAnchor="middle">information</text>
                  <rect x="300" y="106" width="90" height="44" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="345.0" y="126.0" textAnchor="middle">Business</text>
                  <text className="vs" x="345.0" y="140.0" textAnchor="middle">systems</text>
                  <rect x="154" y="188" width="92" height="44" fill="rgba(245,184,61,.14)" stroke="#f5b83d" strokeWidth="1.4" />
                  <text className="vt" x="200" y="207" textAnchor="middle">Review point</text>
                  <text className="vs" x="200" y="222" textAnchor="middle">people approve</text>
                  <rect x="300" y="190" width="90" height="40" fill="rgba(61,190,139,.18)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <text className="vt" x="345.0" y="214.0" textAnchor="middle">Action</text>
                  <circle r="4" fill="#09b6f9">
                    <animateMotion dur="2.4s" begin="0s" repeatCount="indefinite">
                      <mpath href="#ag1" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="#ffffff">
                    <animateMotion dur="2.6s" begin="-.6s" repeatCount="indefinite">
                      <mpath href="#ag2" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="#ffffff">
                    <animateMotion dur="2.6s" begin="-1.2s" repeatCount="indefinite">
                      <mpath href="#ag3" />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#3dbe8b">
                    <animateMotion dur="2.4s" begin="-1s" repeatCount="indefinite">
                      <mpath href="#ag5" />
                    </animateMotion>
                  </circle>
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
              <h2 className="title">Integrated Engineering for Reliable AI</h2>
            </div>
            <p className="lead">A working demo is only part of the job. The application needs relevant data, appropriate permissions, reliable integrations, and a way to check its outputs. We engineer those pieces together so the capability can move beyond experimentation.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="link" />
              </span>
              <b>Grounded outputs</b>
              <p>Connect responses to approved information.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="lock" />
              </span>
              <b>Controlled actions</b>
              <p>Set permissions and review points.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="monitor" />
              </span>
              <b>Operational readiness</b>
              <p>Agree tests, monitoring, and ownership.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within AI &amp; Agentic Engineering</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="AI &amp; Agentic Engineering services">
              <button type="button" role="tab" id="services-ai-solutions-and-engineering-t0" aria-controls="services-ai-solutions-and-engineering-p0" aria-selected="true">
                <Icon name="spark" />
                <span>AI product development</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-solutions-and-engineering-t1" aria-controls="services-ai-solutions-and-engineering-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="msg" />
                <span>Copilots and knowledge applications</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-solutions-and-engineering-t2" aria-controls="services-ai-solutions-and-engineering-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="agent" />
                <span>AI agents and orchestration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-solutions-and-engineering-t3" aria-controls="services-ai-solutions-and-engineering-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="eval" />
                <span>Applied machine learning</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-ai-solutions-and-engineering-t4" aria-controls="services-ai-solutions-and-engineering-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="mic" />
                <span>Voice and multimodal AI</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-ai-solutions-and-engineering-p0" aria-labelledby="services-ai-solutions-and-engineering-t0">
                <span className="big-ic">
                  <Icon name="spark" />
                </span>
                <span className="lbl">AI &amp; Agentic Engineering</span>
                <h3>AI product development</h3>
                <p>We add AI to an existing product or build a new application around a clear user need. We define the workflow, develop the interface and backend, connect the data, and test the complete experience.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-solutions-and-engineering-p1" aria-labelledby="services-ai-solutions-and-engineering-t1" hidden>
                <span className="big-ic">
                  <Icon name="msg" />
                </span>
                <span className="lbl">AI &amp; Agentic Engineering</span>
                <h3>Copilots and knowledge applications</h3>
                <p>We help people find relevant information and prepare responses, summaries, and documents. We build retrieval over approved sources with source references, access controls, and review paths suited to the task.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-solutions-and-engineering-p2" aria-labelledby="services-ai-solutions-and-engineering-t2" hidden>
                <span className="big-ic">
                  <Icon name="agent" />
                </span>
                <span className="lbl">AI &amp; Agentic Engineering</span>
                <h3>AI agents and orchestration</h3>
                <p>We connect agents to tools and business systems so they can carry out bounded work. We define state, tool contracts, retries, confirmation steps, and escalation when a workflow cannot proceed reliably.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-solutions-and-engineering-p3" aria-labelledby="services-ai-solutions-and-engineering-t3" hidden>
                <span className="big-ic">
                  <Icon name="eval" />
                </span>
                <span className="lbl">AI &amp; Agentic Engineering</span>
                <h3>Applied machine learning</h3>
                <p>We build prediction, classification, recommendation, and detection capabilities where data and a measurable use case support them. We cover data preparation, evaluation, deployment, and monitoring requirements.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-ai-solutions-and-engineering-p4" aria-labelledby="services-ai-solutions-and-engineering-t4" hidden>
                <span className="big-ic">
                  <Icon name="mic" />
                </span>
                <span className="lbl">AI &amp; Agentic Engineering</span>
                <h3>Voice and multimodal AI</h3>
                <p>We create applications that work with speech, documents, images, and other relevant inputs. We connect the experience to business workflows and define handling for uncertainty, sensitive actions, and failed requests.</p>
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
              <h3>Less searching</h3>
              <p>Client teams can retrieve relevant context and prepare work within existing workflows.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>More useful products</h3>
              <p>Customers can complete tasks through AI features connected to the application&#x27;s data and services.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Clearer control</h3>
              <p>Reviewers can inspect outputs, approve actions, and handle exceptions before they affect customers or records.</p>
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
            <p>A named engineer or team works with client users and technical owners from problem framing through release. Deliverables include working software, agreed evaluation evidence, integration documentation, and an appropriate operational handover.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss an AI requirement <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid ">
            <RelatedCaseCard n="07" />
            <RelatedCaseCard n="12" />
            <RelatedCaseCard n="04" />
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
              <h2>AI Implementation for Business Workflows</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss a use case <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
