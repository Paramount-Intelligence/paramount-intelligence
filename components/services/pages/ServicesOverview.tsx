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
              <p className="body">Paramount combines advisory expertise with hands-on engineering to develop new capabilities, improve existing systems, and resolve delivery challenges. Each engagement connects the technical scope with a defined business objective.</p>
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
              <p>See the relevant engagement and leadership experience in our case studies.</p>
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
      <section className="sec" id="capabilities">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Our services</div>
            <h2 className="title">Six service capabilities</h2>
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
            <span className="run" aria-hidden="true" />
            <button type="button" className="st">
              <span className="dot">
                <Icon name="search" />
              </span>
              <span className="box">
                <span className="lbl">Step 1</span>
                <h3>Understand</h3>
                <p>Establish the use case, current workflow, baseline, data, and constraints.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="target" />
              </span>
              <span className="box">
                <span className="lbl">Step 2</span>
                <h3>Define</h3>
                <p>Agree the first release, architecture, dependencies, and acceptance measures.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="blocks" />
              </span>
              <span className="box">
                <span className="lbl">Step 3</span>
                <h3>Engineer</h3>
                <p>Build working increments and refine them with users.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="rocket" />
              </span>
              <span className="box">
                <span className="lbl">Step 4</span>
                <h3>Release and transfer</h3>
                <p>Complete the agreed checks, deploy, document, and establish ownership.</p>
              </span>
            </button>
            <button type="button" className="st opt">
              <span className="dot">
                <Icon name="refresh" />
              </span>
              <span className="box">
                <span className="lbl">Step 5</span>
                <h3>Improve</h3>
                <p>Use operating feedback to guide further work where support is included.</p>
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
            <h2 className="title">Ways to engage</h2>
          </div>
          <div className="ways">
            <div className="way">
              <span className="ic">
                <Icon name="brief" />
              </span>
              <h3>A managed project or workstream</h3>
              <p>Paramount owns an agreed scope, with a named lead and acceptance measures.</p>
            </div>
            <div className="way">
              <span className="ic">
                <Icon name="person" />
              </span>
              <h3>A forward-deployed engineer or specialist</h3>
              <p>A Paramount engineer contributes directly to a defined client priority, with technical support and oversight agreed for the assignment.</p>
            </div>
            <div className="way">
              <span className="ic">
                <Icon name="repeat" />
              </span>
              <h3>An ongoing engineering partnership</h3>
              <p>Continuing development across an agreed roadmap, with defined capacity and a regular review cadence.</p>
            </div>
            <div className="way">
              <span className="ic">
                <Icon name="compass" />
              </span>
              <h3>An advisory engagement</h3>
              <p>Focused assessment, evaluation, architecture, or delivery planning to support a specific decision.</p>
            </div>
            <div className="way">
              <span className="ic">
                <Icon name="monitor" />
              </span>
              <h3>Operational support</h3>
              <p>Maintain and improve an agreed system within defined coverage and responsibilities.</p>
            </div>
          </div>
          <div className="legend-box" style={{ background: "var(--white)" }}>
            <em>Accountability</em>
            <span className="ic" style={{ width: "52px", height: "52px", display: "grid", placeItems: "center", background: "var(--navy)", color: "var(--white)" }}>
              <Icon name="owner" />
            </span>
            <p>Paramount remains the accountable contracting partner. Scope, delivery ownership, and ways of working are agreed before the engagement begins.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss an engagement <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="sec band" id="applied-rd">
        <div className="wrap crit">
          <div className="head" style={{ margin: "0" }}>
            <div className="eyebrow">Applied R&amp;D</div>
            <h2 className="title">Applied R&amp;D &amp; Technology Evaluation</h2>
            <p className="lead">Our R&amp;D team tests emerging models, agents, and tools against real engineering needs. We evaluate approaches relevant to each engagement for output quality, integration effort, reliability, latency, and operating cost. Findings support a use-case-specific recommendation to adopt, adapt, or defer.</p>
          </div>
          <div className="eval" aria-label="Evaluation criteria leading to a recommendation">
            <div className="lc-cap">Evaluated against</div>
            <div className="crit-list">
              <div>
                <span className="ck">
                  <Icon name="check" />
                </span>
                <span>Output quality</span>
              </div>
              <div>
                <span className="ck">
                  <Icon name="check" />
                </span>
                <span>Integration effort</span>
              </div>
              <div>
                <span className="ck">
                  <Icon name="check" />
                </span>
                <span>Reliability</span>
              </div>
              <div>
                <span className="ck">
                  <Icon name="check" />
                </span>
                <span>Latency</span>
              </div>
              <div>
                <span className="ck">
                  <Icon name="check" />
                </span>
                <span>Operating cost</span>
              </div>
            </div>
            <div className="eval-arrow" aria-hidden="true">
              <svg viewBox="0 0 400 30" preserveAspectRatio="none">
                <path d="M50 0V10H350V0M200 10V28M194 22l6 6 6-6" fill="none" stroke="#204ecf" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="verdict">
              <span className="v1">Adopt<small>Evidence supports it</small></span>
              <span className="v2">Adapt<small>Works with changes</small></span>
              <span className="v3">Defer<small>Not ready yet</small></span>
            </div>
            <div className="gov"><Icon name="eye" />Recommendations are specific to each use case.</div>
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
