import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/services.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function ServicesOverview() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Services</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>AI Consulting &amp; Engineering Services</h1>
              <p className="body">Start with the improvement you need. We shape the scope, delivery approach, and success measures around it. Paramount builds, improves, and operates production-grade AI systems, through Paramount-led delivery or embedded specialist engineers.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss an engagement <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">One objective, connected capabilities</div>
                <svg viewBox="0 0 400 260" role="img" aria-label="Six service capabilities connected around your objective">
                  <path id="hs0" d="M200 130L200.0 32.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <path id="hs1" d="M200 130L323.1 81.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <path id="hs2" d="M200 130L323.1 179.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <path id="hs3" d="M200 130L200.0 228.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <path id="hs4" d="M200 130L76.9 179.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <path id="hs5" d="M200 130L76.9 81.0" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <circle cx="200" cy="130" r="50" fill="none" stroke="rgba(9,182,249,.3)">
                    <animate attributeName="r" values="46;60;46" dur="3.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="130" r="46" fill="#0f256e" stroke="#09b6f9" strokeWidth="1.6" />
                  <text className="vt" x="200" y="128" textAnchor="middle">Your</text>
                  <text className="vt" x="200" y="143" textAnchor="middle">objective</text>
                  <rect x="154.0" y="17.0" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="200.0" y="36.0" textAnchor="middle">Consulting</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="0.00s" repeatCount="indefinite">
                      <mpath href="#hs0" />
                    </animateMotion>
                  </circle>
                  <rect x="277.06220987776874" y="66.0" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="323.06220987776874" y="85.0" textAnchor="middle">Agentic AI</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="-0.45s" repeatCount="indefinite">
                      <mpath href="#hs1" />
                    </animateMotion>
                  </circle>
                  <rect x="277.06220987776874" y="164.0" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="323.06220987776874" y="183.0" textAnchor="middle">Software</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="-0.90s" repeatCount="indefinite">
                      <mpath href="#hs2" />
                    </animateMotion>
                  </circle>
                  <rect x="154.0" y="213.0" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="200.0" y="232.0" textAnchor="middle">Data</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="-1.35s" repeatCount="indefinite">
                      <mpath href="#hs3" />
                    </animateMotion>
                  </circle>
                  <rect x="30.93779012223129" y="164.00000000000003" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="76.93779012223129" y="183.00000000000003" textAnchor="middle">Cloud</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="-1.80s" repeatCount="indefinite">
                      <mpath href="#hs4" />
                    </animateMotion>
                  </circle>
                  <rect x="30.937790122231277" y="65.99999999999999" width="92" height="30" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="76.93779012223128" y="84.99999999999999" textAnchor="middle">Automation</text>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.8s" begin="-2.25s" repeatCount="indefinite">
                      <mpath href="#hs5" />
                    </animateMotion>
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-tight" style={{ paddingBottom: "0" }}>
        <div className="wrap">
          <div className="xstrip">
            <div>
              <h2>Experience with enterprise and PE-backed businesses</h2>
              <p>See the relevant engagement and leadership experience in our case studies. Organization logos do not imply endorsement.</p>
            </div>
            <Link className="link" href="/case-studies">Explore our work <span className="arr"><Icon name="arrow" /></span></Link>
            <div className="xlogos" aria-label="Organizations">
              <img className="t" src="/images/logos/aramco.png" alt="Saudi Aramco" />
              <img src="/images/logos/donaldson.png" alt="Donaldson" />
              <img src="/images/logos/alibaba.png" alt="Alibaba.com" />
              <img src="/images/logos/veon.png" alt="VEON" />
              <img className="t" src="/images/logos/schneider.png" alt="Schneider Electric" />
              <img src="/images/logos/toptal.png" alt="Toptal" />
            </div>
          </div>
        </div>
      </section>
      <section className="sec pi-char" id="capabilities">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Our services</div>
            <h2 className="title">Six service capabilities</h2>
            <p className="lead">Six connected capabilities, one integrated team. Combine them, or engage us for one, with or without AI.</p>
          </div>
          <div className="svc-grid">
            <Link className="card" href="/services/ai-strategy-and-consulting">
              <span className="ic">
                <Icon name="compass" />
              </span>
              <h3>AI &amp; Technology Consulting</h3>
              <p>We assess investment priorities, evaluate technical approaches, and define implementation requirements through clear findings, architecture options, and delivery plans.</p>
              <span className="link">Explore consulting <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="card" href="/services/ai-solutions-and-engineering">
              <span className="ic">
                <Icon name="agent" />
              </span>
              <h3>AI &amp; Agentic Engineering</h3>
              <p>We develop AI capabilities that retrieve information, prepare work, and execute controlled actions within products and business workflows.</p>
              <span className="link">Explore AI engineering <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="card" href="/services/software-product-engineering">
              <span className="ic">
                <Icon name="code" />
              </span>
              <h3>Software &amp; Product Engineering</h3>
              <p>We develop custom applications and integrations, enhance existing products, and establish the engineering foundations required to move prototypes into operational use.</p>
              <span className="link">Explore software engineering <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="card" href="/services/data-and-analytics">
              <span className="ic">
                <Icon name="db" />
              </span>
              <h3>Data Engineering &amp; Intelligence</h3>
              <p>We connect fragmented sources and improve data quality to support reporting, operational decisions, and AI applications.</p>
              <span className="link">Explore data services <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="card" href="/services/cloud-services">
              <span className="ic">
                <Icon name="cloud" />
              </span>
              <h3>Cloud &amp; Production Engineering</h3>
              <p>We resolve deployment challenges and implement infrastructure, access controls, release processes, and monitoring aligned with application requirements.</p>
              <span className="link">Explore production engineering <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
            <Link className="card" href="/services/ai-workflow-automation">
              <span className="ic">
                <Icon name="flow" />
              </span>
              <h3>Workflow Automation</h3>
              <p>We automate repetitive document, approval, and support workflows with defined business rules and exception handling.</p>
              <span className="link">Explore automation <span className="arr"><Icon name="arrow" /></span></span>
            </Link>
          </div>
          <div className="pi-capbase">
            <div className="qa">
              <Icon name="check" />
              <p><b>Quality and production assurance runs through every engagement.</b> <span>You know what “done” means before build begins.</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band" id="forward-deployed-engineering">
        <div className="wrap">
          <div className="fde-top">
            <div className="head" style={{ margin: "0" }}>
              <div className="eyebrow">Our approach</div>
              <h2 className="title">Forward-deployed AI engineering</h2>
            </div>
            <p className="lead">We work directly with the people who use the system and the teams responsible for running it. Our engineers help frame the problem, prototype the approach, connect the application to the client environment, and carry the agreed work through testing and release.</p>
          </div>
          <div className="stages five">
            <span className="run" aria-hidden="true" style={{ width: "28px" }} />
            <button type="button" className="st on" aria-pressed="true">
              <span className="dot">
                <Icon name="search" />
              </span>
              <span className="box">
                <span className="lbl">Step 1</span>
                <h3>Understand</h3>
                <p>Establish the use case, current workflow, baseline, data, and constraints.</p>
                <span className="pi-out"><em>What you receive</em>A defined use case, baseline, and first delivery priority</span>
              </span>
            </button>
            <button type="button" className="st" aria-pressed="false">
              <span className="dot">
                <Icon name="target" />
              </span>
              <span className="box">
                <span className="lbl">Step 2</span>
                <h3>Define</h3>
                <p>Agree the first release, architecture, dependencies, and acceptance measures.</p>
                <span className="pi-out"><em>What you receive</em>A prioritized backlog and scoped release plan</span>
              </span>
            </button>
            <button type="button" className="st" aria-pressed="false">
              <span className="dot">
                <Icon name="blocks" />
              </span>
              <span className="box">
                <span className="lbl">Step 3</span>
                <h3>Engineer</h3>
                <p>Build working increments and refine them with users.</p>
                <span className="pi-out"><em>What you receive</em>Working increments, integration tests, and evaluation results</span>
              </span>
            </button>
            <button type="button" className="st" aria-pressed="false">
              <span className="dot">
                <Icon name="rocket" />
              </span>
              <span className="box">
                <span className="lbl">Step 4</span>
                <h3>Release and transfer</h3>
                <p>Complete the agreed checks, deploy, document, and establish ownership.</p>
                <span className="pi-out"><em>What you receive</em>A tested release, documentation, and an operating owner</span>
              </span>
            </button>
            <button type="button" className="st opt" aria-pressed="false">
              <span className="dot">
                <Icon name="refresh" />
              </span>
              <span className="box">
                <span className="lbl">Step 5</span>
                <h3>Improve</h3>
                <p>Use operating feedback to guide further work where support is included.</p>
                <span className="pi-out"><em>What you receive</em>Prioritized improvements against agreed measures</span>
                <span className="opt-tag">Where support is included</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="sec" id="ways-to-engage">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Engagement models</div>
            <h2 className="title">Two ways to engage, five commercial forms</h2>
            <p className="lead">Engage Paramount to lead a defined initiative or bring specialist engineers into your team. Choose the support the objective needs; Paramount remains your accountable contracting partner.</p>
          </div>
          <div className="pi-models light">
            <div className="pi-model m1">
              <div className="mh">
                <Icon name="spark" />
                <div>
                  <span>Model 01</span>
                  <h3>Paramount-led delivery</h3>
                </div>
              </div>
              <div className="mb">
                <p>A defined system or workstream led by Paramount, from assessment and architecture through implementation, release, and handover. An assessment can be a complete engagement on its own.</p>
                <dl>
                  <div>
                    <dt>Paramount leads</dt>
                    <dd>The agreed scope, technical quality, and contracted deliverables</dd>
                  </div>
                  <div>
                    <dt>You provide</dt>
                    <dd>Business decisions, access, and acceptance</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="pi-hub" aria-hidden="true">
              <span>Named Paramount lead</span>
            </div>
            <div className="pi-model m2">
              <div className="mh">
                <Icon name="team" />
                <div>
                  <span>Model 02</span>
                  <h3>Embedded specialist engineers</h3>
                </div>
              </div>
              <div className="mb">
                <p>Contract engineers from the Paramount FDE Network work within your project and delivery process, contributing the expertise needed to build, integrate, or improve the system.</p>
                <dl>
                  <div>
                    <dt>You direct</dt>
                    <dd>Project priorities</dd>
                  </div>
                  <div>
                    <dt>Paramount</dt>
                    <dd>Selects, contracts, and manages the engineer, and stays accountable for the agreed contribution</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <p className="pi-shared">Both models include a named Paramount lead. Ongoing support and improvement are available under either model, within agreed coverage.</p>
          <div className="pi-forms-h">Five commercial forms</div>
          <div className="pi-spec" aria-label="Commercial forms, from client-directed to Paramount-owned delivery">
            <div className="pi-spec-axis">
              <b>You direct the work</b>
              <b>Paramount owns delivery</b>
            </div>
            <div className="pi-spec-bar" aria-hidden="true">
              <i style={{ left: "10%" }} />
              <i style={{ left: "30%" }} />
              <i style={{ left: "50%" }} />
              <i style={{ left: "70%" }} />
              <i style={{ left: "90%" }} />
            </div>
            <div className="pi-spec-cards">
              <div className="pi-form">
                <span className="tag">Embedded</span>
                <h3>Forward-deployed or specialist assignment</h3>
                <p>A vetted engineer from the Paramount FDE Network works with your users and technical team to build, integrate, and release the agreed work.</p>
                <div className="who"><em>Who directs</em>You direct priorities; Paramount selects, supports, and reviews the contribution.</div>
              </div>
              <div className="pi-form">
                <span className="tag">Either model</span>
                <h3>Ongoing engineering partnership</h3>
                <p>Continuing progress against a roadmap, with defined capacity and regular reviews agreed with your team.</p>
                <div className="who"><em>Who directs</em>Priorities set jointly; Paramount leads execution.</div>
              </div>
              <div className="pi-form own">
                <span className="tag">Paramount-led</span>
                <h3>Advisory assignment</h3>
                <p>Clarity on a decision: whether to proceed, which architecture fits, or what delivery requires.</p>
                <div className="who"><em>Who directs</em>Paramount leads the analysis; you own the decision.</div>
              </div>
              <div className="pi-form own">
                <span className="tag">Paramount-led</span>
                <h3>Operational support</h3>
                <p>Support for an agreed system: quality evaluation, incident investigation, cost review, and controlled updates.</p>
                <div className="who"><em>Who directs</em>Paramount leads support within agreed coverage; escalation is defined with your team.</div>
              </div>
              <div className="pi-form own">
                <span className="tag">Paramount-led</span>
                <h3>Managed project or workstream</h3>
                <p>An agreed result delivered against acceptance measures, with a named Paramount lead.</p>
                <div className="who"><em>Who directs</em>Paramount owns scope and delivery; you review and accept.</div>
              </div>
            </div>
          </div>
          <div className="legend-box" style={{ background: "var(--white)" }}>
            <em>Accountability</em>
            <span className="ic" style={{ width: "52px", height: "52px", display: "grid", placeItems: "center", background: "var(--navy)", color: "var(--white)" }}>
              <Icon name="owner" />
            </span>
            <p>Paramount remains the accountable contracting partner, with a named lead in both models. Scope, delivery ownership, and ways of working are agreed before the engagement begins.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss an engagement <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="sec band" id="fde-network">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Paramount FDE Network</div>
            <h2 className="title">Our network of vetted contract engineers</h2>
            <p className="lead">The Paramount FDE Network is Paramount's own network of vetted contract engineers. Paramount selects, contracts, and manages every engineer it places, under a named Paramount lead. It gives Paramount-led projects and embedded assignments access to 50+ forward-deployed engineers, plus AI engineers and other engineering and project specialists.</p>
          </div>
          <div className="pi-netgrid">
            <div className="pi-stats light">
              <div className="pi-stat">
                <b>50<small>+</small></b>
                <span>Vetted forward-deployed engineers under contract with Paramount, plus AI engineers and other specialists</span>
              </div>
              <div className="pi-stat">
                <b>48<small>h</small></b>
                <span>To start, once the engineer is selected and access and assignment terms are in place</span>
              </div>
              <div className="pi-stat">
                <b>1</b>
                <span>Named Paramount lead on every engagement, managing the engineers and the quality of the work</span>
              </div>
            </div>
            <figure className="pi-map" style={{ margin: "0" }}>
              <span className="pi-k">Where the network works from</span>
              <div className="pi-map-in">
                <img src="/pi/world-dots.svg" alt="" aria-hidden="true" />
                <span className="pi-pin a l" style={{ left: "17.7%", top: "25.0%" }}>
                  <i />
                  <span>Canada</span>
                </span>
                <span className="pi-pin b r" style={{ left: "20.7%", top: "38.1%" }}>
                  <i />
                  <span>United States</span>
                </span>
                <span className="pi-pin c l" style={{ left: "58.9%", top: "50.2%" }}>
                  <i />
                  <span>Saudi Arabia</span>
                </span>
                <span className="pi-pin d dn" style={{ left: "62.7%", top: "49.6%" }}>
                  <i />
                  <span>UAE</span>
                </span>
                <span className="pi-pin a r" style={{ left: "68.3%", top: "45.7%" }}>
                  <i />
                  <span>Pakistan</span>
                </span>
              </div>
              <figcaption>Engineers across the US, Canada, the Middle East, and Pakistan, working with clients worldwide.</figcaption>
            </figure>
          </div>
          <div className="pi-start">
            <span className="pi-k">How an assignment starts</span>
            <ol className="pi-start-steps">
              <li className="">
                <span className="n">01</span>
                <b>Match</b>
                <p>Skills, experience, and confirmed availability.</p>
              </li>
              <li className="">
                <span className="n">02</span>
                <b>Meet</b>
                <p>You meet the proposed engineer and the named Paramount lead.</p>
              </li>
              <li className="">
                <span className="n">03</span>
                <b>Agree and onboard</b>
                <p>Scope, responsibilities, terms, access, and ways of working.</p>
              </li>
              <li className="go">
                <span className="n">04</span>
                <span className="pi-clock"><Icon name="clock" />Within 48 hours</span>
                <b>Start</b>
                <p>Within 48 hours once selection, access, and terms are complete.</p>
              </li>
              <li className="">
                <span className="n">05</span>
                <b>Lead and review</b>
                <p>Completed work, quality, blockers, and milestones.</p>
              </li>
            </ol>
            <p className="pi-start-note">The 48-hour start applies once the engineer is selected and access and assignment terms are in place. For Paramount-led delivery, team introductions follow the agreed onboarding.</p>
          </div>
          <div className="pi-two">
            <div className="pi-box">
              <h3>How responsibility works</h3>
              <ul>
                <li>
                  <span><b>Paramount-led delivery:</b> Paramount leads the agreed scope, technical quality, and contracted deliverables.</span>
                </li>
                <li>
                  <span><b>Embedded assignment:</b> you direct priorities; Paramount selects, contracts, supports, and reviews the engineer's contribution.</span>
                </li>
                <li>
                  <span><b>In both:</b> a named Paramount lead is responsible for the agreed oversight.</span>
                </li>
              </ul>
            </div>
            <div className="pi-box">
              <h3>How we run the network</h3>
              <ul>
                <li>Every engineer is vetted by Paramount and contracted directly by Paramount.</li>
                <li>NDA signed with Paramount; IP assignment signed before client work begins.</li>
                <li>Profiles, skills, and availability managed on Paramount's own portal. Demonstration available on request.</li>
                <li>Work managed by a named Paramount lead, with communication, time tracking, and regular technical and client reviews.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" id="success-measures">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Success measures</div>
            <h2 className="title">Measured against your baseline</h2>
            <p className="lead">We define what improvement means before build. Measures are informed by the use case, the current baseline, and the agreed scope, so both teams assess the result on the same evidence.</p>
          </div>
          <div className="pi-meas">
            <div className="pi-m">
              <div className="g" aria-hidden="true">
                <span>Baseline<i /></span>
                <span className="t">Target<i /></span>
              </div>
              <span className="pi-k">Example measures</span>
              <h3>A shorter path to release</h3>
              <p>Time to an agreed release, workstream blockers resolved, and acceptance criteria met.</p>
            </div>
            <div className="pi-m">
              <div className="g" aria-hidden="true">
                <span>Baseline<i /></span>
                <span className="t">Target<i /></span>
              </div>
              <span className="pi-k">Example measures</span>
              <h3>Time returned to your team</h3>
              <p>Manual steps removed, time per task, or cases processed, compared with the current workflow.</p>
            </div>
            <div className="pi-m">
              <div className="g" aria-hidden="true">
                <span>Baseline<i /></span>
                <span className="t">Target<i /></span>
              </div>
              <span className="pi-k">Example measures</span>
              <h3>A more dependable service</h3>
              <p>Failure rate, recovery time, and AI output quality on an agreed evaluation set.</p>
            </div>
            <div className="pi-m">
              <div className="g" aria-hidden="true">
                <span>Baseline<i /></span>
                <span className="t">Target<i /></span>
              </div>
              <span className="pi-k">Example measures</span>
              <h3>Sustainable operating cost</h3>
              <p>Cost per task or transaction, infrastructure spend, and ongoing support effort.</p>
            </div>
            <div className="pi-m">
              <div className="g" aria-hidden="true">
                <span>Baseline<i /></span>
                <span className="t">Target<i /></span>
              </div>
              <span className="pi-k">Example measures</span>
              <h3>Use in the real workflow</h3>
              <p>Active use, completed tasks, approval rates, and user feedback after rollout.</p>
            </div>
          </div>
          <div className="pi-agree">
            <em>Agreed before build</em>
            <span>Baseline</span>
            <span>Target</span>
            <span>Data source</span>
            <span>Review period</span>
          </div>
          <div className="pi-assure">
            <div className="pi-forms-h" style={{ marginTop: "0" }}>Assuring the quality of what goes live</div>
            <div className="pi-as-row">
              <div className="pi-as-end a">
                <span><small>From</small>A fragile prototype</span>
              </div>
              <ol className="pi-as-steps">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <b>A defined result</b>
                  <p>Acceptance criteria known before build, with evidence reviewed against them.</p>
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <b>Tested behavior</b>
                  <p>Software, AI outputs, and integrations checked for their intended use.</p>
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <b>Controlled access</b>
                  <p>Identity, data, and permission requirements guide the implementation.</p>
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <b>Operational ownership</b>
                  <p>The team knows how to monitor the service and respond when something fails.</p>
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <b>A usable handover</b>
                  <p>Documentation needed to run and extend the work.</p>
                </li>
              </ol>
              <div className="pi-as-end z">
                <span><small>To</small>A supportable application</span>
              </div>
            </div>
            <p className="pi-note">Checks scale to the scope and intended use. Confidentiality, access, ownership of delivered IP, and support responsibilities are agreed in the engagement terms.</p>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Beyond the categories</div>
              <h2>Custom Requirements &amp; Specialist Engagements</h2>
              <p>Paramount supports requirements that extend across service categories, including AI integration within custom software, specialist engineering contributions, and complex cross-system initiatives. Scope and delivery arrangements reflect the requirements of each engagement.</p>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss an engagement <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
