import type { CSSProperties } from "react";
import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/index.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">AI Engineering &amp; Consulting</div>
              <h1>
                <span>AI moves fast<i>.</i></span>
                <span>We make it work<i>.</i></span>
              </h1>
              <div className="trio">
                <span><b className="plus">+</b>Less repetitive work.</span>
                <span><b className="plus">+</b>Better products.</span>
                <span><b className="plus">+</b>Reliable systems.</span>
              </div>
              <p className="body">Paramount Intelligence helps organizations develop AI capabilities, improve business software, and move complex initiatives into production. We build inside your environment, integrate with existing systems, and provide the documentation and handover your team needs to operate and improve what we deliver.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a project <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/case-studies">See our work</Link>
              </div>
            </div>
            <div className="hv" aria-label="AI built inside your environment">
              <div className="eb">Built inside your environment</div>
              <p className="sub">AI connected to the systems you already run, documented and handed over.</p>
              <div className="h1-map">
                <em>Your environment</em>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="50" y1="56" x2="14" y2="22" style={{ animationDelay: "0.30s" }} />
                  <line x1="50" y1="56" x2="86" y2="22" style={{ animationDelay: "0.55s" }} />
                  <line x1="50" y1="56" x2="8" y2="58" style={{ animationDelay: "0.80s" }} />
                  <line x1="50" y1="56" x2="92" y2="58" style={{ animationDelay: "1.05s" }} />
                  <line x1="50" y1="56" x2="22" y2="92" style={{ animationDelay: "1.30s" }} />
                  <line x1="50" y1="56" x2="78" y2="92" style={{ animationDelay: "1.55s" }} />
                </svg>
                <i className="h1-p p0" />
                <i className="h1-p p1" />
                <i className="h1-p p2" />
                <i className="h1-p p3" />
                <i className="h1-p p4" />
                <i className="h1-p p5" />
                <span className="h1-s" style={{ "--x": "14%", "--xm": "26.2%", "--y": "22%", "--ym": "10%", animationDelay: "0.30s" } as CSSProperties}>ERP</span>
                <span className="h1-s" style={{ "--x": "86%", "--xm": "73.8%", "--y": "22%", "--ym": "10%", animationDelay: "0.55s" } as CSSProperties}>CRM</span>
                <span className="h1-s" style={{ "--x": "8%", "--xm": "22.3%", "--y": "58%", "--ym": "31%", animationDelay: "0.80s" } as CSSProperties}>Data warehouse</span>
                <span className="h1-s" style={{ "--x": "92%", "--xm": "77.7%", "--y": "58%", "--ym": "31%", animationDelay: "1.05s" } as CSSProperties}>Support desk</span>
                <span className="h1-s" style={{ "--x": "22%", "--xm": "31.5%", "--y": "92%", "--ym": "91%", animationDelay: "1.30s" } as CSSProperties}>Documents</span>
                <span className="h1-s" style={{ "--x": "78%", "--xm": "68.5%", "--y": "92%", "--ym": "91%", animationDelay: "1.55s" } as CSSProperties}>Your team</span>
                <div className="h1-core">
                  <span>Paramount</span>
                  <b>AI capability</b>
                </div>
              </div>
              <div className="h1-st">
                <span>Integrated</span>
                <span>Documented</span>
                <span>Handed over</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* LOGOS */}
      <section className="sec" style={{ paddingBlock: "clamp(56px,7vw,88px)" }}>
        <div className="wrap">
          <div className="logos-head">
            <div>
              <h2>Experience across enterprise and digital businesses</h2>
              <p>Selected Paramount engagements and the prior professional experience of our leadership. Individual case studies describe the relationship and scope.</p>
            </div>
            <Link className="link" href="/case-studies">Explore case studies <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="lwall" aria-label="Organizations">
            <div className="lw">
              <img className="tall" src="/images/logos/aramco.png" alt="Saudi Aramco" />
            </div>
            <div className="lw">
              <img src="/images/logos/donaldson.png" alt="Donaldson" />
            </div>
            <div className="lw">
              <img src="/images/logos/alibaba.png" alt="Alibaba.com" />
            </div>
            <div className="lw">
              <img className="small" src="/images/logos/veon.png" alt="VEON" />
            </div>
            <div className="lw">
              <img className="tall" src="/images/logos/schneider.png" alt="Schneider Electric" />
            </div>
            <div className="lw">
              <img className="small" src="/images/logos/toptal.png" alt="Toptal" />
            </div>
            <div className="lw">
              <img src="/images/logos/davidson.png" alt="Davidson" />
            </div>
            <div className="lw">
              <img src="/images/logos/truecontext.png" alt="TrueContext" />
            </div>
            <div className="lw">
              <img src="/images/logos/flexagon.png" alt="Flexagon" />
            </div>
            <div className="lw">
              <img src="/images/logos/syngenta.png" alt="Syngenta" />
            </div>
          </div>
        </div>
      </section>
      {/* CEO */}
      <section className="sec band">
        <div className="wrap ceo2">
          <div className="copy">
            <div className="eyebrow">Message from our CEO</div>
            <h2 className="title">Building Systems Your Business Can Own</h2>
            <blockquote className="ceo-q">Technology creates lasting value when it improves how a business works. That means better products, less repetitive work, and reliable systems that people can use every day. Achieving those improvements takes practical engineering, clear ownership, and close collaboration. That is the work we do.</blockquote>
            <p>We build inside your environment, integrate with the systems you already run, and work directly with your executives, business users, and engineers. Whether developing a new capability or recovering a stalled initiative, we document key technical decisions and operating procedures throughout delivery. At handover, your team has the knowledge and tools to run, change, and improve what we have built.</p>
            <p>Our standard is simple: deliver systems that work, strengthen your team&rsquo;s capabilities, and leave your business in control of its technology.</p>
            <div className="sig2">
              <div className="who2">
                <img src="/images/logo-mark.png" alt="" width="26" height="36" />
                <div>
                  <b>Ali Azzam</b>
                  <span>Founder &amp; CEO</span>
                </div>
              </div>
              <Link className="btn btn-line" href="/about-us">About Paramount <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
          <figure className="own" aria-label="From build to ownership: we build inside your environment, integrate with the systems you already run, document decisions and operating procedures, and hand over, so your team runs the system.">
            <div className="eyebrow">From build to ownership</div>
            <ol className="own-steps">
              <li><span className="n">01</span><div><b>Build</b><span>Inside your environment</span></div></li>
              <li><span className="n">02</span><div><b>Integrate</b><span>With the systems you already run</span></div></li>
              <li><span className="n">03</span><div><b>Document</b><span>Decisions and operating procedures</span></div></li>
              <li><span className="n">04</span><div><b>Hand over</b><span>Your team runs, changes and improves it</span></div></li>
            </ol>
            <div className="own-meter" aria-hidden="true">
              <div className="own-lbl"><span>Paramount</span><span className="y">Your team</span></div>
              <div className="own-bar"><i /></div>
            </div>
            <div className="own-end">
              <figcaption className="cap2">Who runs it, stage by stage.</figcaption>
              <span className="own-badge">
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="#fff" strokeWidth="2" /></svg>
                Yours to run
              </span>
            </div>
          </figure>
        </div>
      </section>
      {/* WHO WE WORK WITH */}
      <section className="sec" id="who">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Who we work with</div>
            <h2 className="title">Supporting Organizations Across the Technology Lifecycle</h2>
            <p className="lead">We work with private equity firms and their portfolio companies, Fortune 500 organizations, mid-market businesses, consulting firms, and funded startups. Engagements begin with a business objective, a technical requirement, or an existing application that needs improvement.</p>
            <div className="aud" aria-hidden="true">
              <span>Private equity &amp; portfolio companies</span>
              <span>Fortune 500</span>
              <span>Mid-market</span>
              <span>Consulting firms</span>
              <span>Funded startups</span>
            </div>
          </div>
          <div className="badges">
            <div><Icon name="users" />Direct collaboration</div>
            <div><Icon name="owner" />Clear delivery ownership</div>
            <div><Icon name="check" />Tested releases</div>
            <div><Icon name="gauge" />Operating cost awareness</div>
          </div>
          <div className="life">
            <div className="lc" aria-label="Where each engagement type sits in the technology lifecycle">
              <div className="lc-cap">Where we join the lifecycle</div>
              <div className="lc-grid">
                <div className="lc-ms">
                  <i />
                  <span>Business objective</span>
                </div>
                <div className="lc-ms">
                  <i />
                  <span>Prototype</span>
                </div>
                <div className="lc-ms">
                  <i />
                  <span>Production release</span>
                </div>
                <div className="lc-ms">
                  <i />
                  <span>Ongoing roadmap</span>
                </div>
                <button type="button" className="lane" data-i="0" style={{ "--s": "1", "--e": "4" } as CSSProperties}><small>01</small>New capability</button>
                <button type="button" className="lane" data-i="1" style={{ "--s": "2", "--e": "4" } as CSSProperties}><small>02</small>Recovery &amp; readiness</button>
                <button type="button" className="lane dash" data-i="2" style={{ "--s": "1", "--e": "5" } as CSSProperties}><small>03</small>Specialist engineering alongside your team</button>
              </div>
              <p className="lc-note" id="lcNote" />
            </div>
            <div className="acc" id="acc">
              <div className="acc-item">
                <button type="button" aria-expanded="false" id="ab0" aria-controls="ap0">
                  <span className="k">
                    <Icon name="spark" />
                  </span>
                  <h3>New Capability Development</h3>
                  <span className="pm" />
                </button>
                <div className="acc-body" id="ap0" role="region" aria-labelledby="ab0" hidden>
                  <p>We support product development, AI integration within existing software, and automation of manual workflows. We help define the first useful release and build the application, integrations, and data foundations it needs.</p>
                  <ul>
                    <li>Identify the users, workflow, and result that matter.</li>
                    <li>Choose suitable AI and conventional software components.</li>
                    <li>Build and test against agreed acceptance criteria.</li>
                    <li>Connect the release to existing client systems and ownership model.</li>
                  </ul>
                </div>
              </div>
              <div className="acc-item">
                <button type="button" aria-expanded="false" id="ab1" aria-controls="ap1">
                  <span className="k">
                    <Icon name="wrench" />
                  </span>
                  <h3>Technical Recovery &amp; Production Readiness</h3>
                  <span className="pm" />
                </button>
                <div className="acc-body" id="ap1" role="region" aria-labelledby="ab1" hidden>
                  <p>A prototype may work in a sandbox and still fail when it meets real data, permissions, or traffic. We assess what is blocking release, repair the foundations, and work through integration, evaluation, deployment, and handover.</p>
                  <ul>
                    <li>Review inherited code and AI-generated applications.</li>
                    <li>Resolve unreliable outputs, broken integrations, and data issues.</li>
                    <li>Consolidate overlapping tools where that makes maintenance simpler.</li>
                    <li>Establish release checks, monitoring, and an operating owner.</li>
                  </ul>
                </div>
              </div>
              <div className="acc-item">
                <button type="button" aria-expanded="false" id="ab2" aria-controls="ap2">
                  <span className="k">
                    <Icon name="team" />
                  </span>
                  <h3>Specialist Engineering &amp; Delivery Support</h3>
                  <span className="pm" />
                </button>
                <div className="acc-body" id="ap2" role="region" aria-labelledby="ab2" hidden>
                  <p>Paramount provides forward-deployed AI engineering, specialist expertise, and managed workstreams for defined delivery priorities. We work directly with client stakeholders and engineers, using the agreed delivery process and keeping responsibilities clear.</p>
                  <ul>
                    <li>Own a specific workstream or contribute within the product roadmap.</li>
                    <li>Add AI engineering, application development, data, or cloud expertise.</li>
                    <li>Demonstrate working progress and resolve decisions with client teams.</li>
                    <li>Document the work so the organization can continue to build on it.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FDE */}
      <section className="sec band" id="fde">
        <div className="wrap">
          <div className="fde-top">
            <div className="head" style={{ margin: "0" }}>
              <div className="eyebrow">Forward-deployed AI engineering</div>
              <h2 className="title">From business priority to working AI</h2>
            </div>
            <p className="lead">Paramount engineers work directly with business users, product leaders, and technical teams to turn defined requirements into integrated applications. Discovery, hands-on development, and production delivery remain connected throughout the engagement.</p>
          </div>
          <div className="stages" id="stages">
            <span className="run" id="run" aria-hidden="true" />
            <button type="button" className="st">
              <span className="dot">
                <Icon name="target" />
              </span>
              <span className="box">
                <span className="lbl">Stage 1</span>
                <h3>Understand and define</h3>
                <p>Establish the workflow, business objective, data requirements, and first release.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="flask" />
              </span>
              <span className="box">
                <span className="lbl">Stage 2</span>
                <h3>Prototype and validate</h3>
                <p>Test the approach with real users and representative information.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="blocks" />
              </span>
              <span className="box">
                <span className="lbl">Stage 3</span>
                <h3>Build and integrate</h3>
                <p>Connect AI, application logic, permissions, and existing enterprise systems.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="monitor" />
              </span>
              <span className="box">
                <span className="lbl">Stage 4</span>
                <h3>Deploy and transfer</h3>
                <p>Complete agreed evaluations, release the application, and provide monitoring, documentation, and handover.</p>
              </span>
            </button>
          </div>
          <div className="legend-box proof" style={{ background: "var(--white)" }}>
            <em>Proof from the work</em>
            <div className="proof-l">
              <div className="proof-h">
                <span className="n"><b>8</b><span>weeks</span></span>
                <span className="wip">Work in progress</span>
              </div>
              <div className="proof-tl" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i />
                <span className="ph d">Discovery</span>
                <span className="ph b">Build and integrate</span>
                <span className="ph p">Production</span>
              </div>
              <p>A PE-backed field-service software company is on track to move from discovery to production in eight weeks, converting field submissions into structured records, summaries, and management insights.</p>
            </div>
            <div className="acts">
              <Link className="btn btn-cyan" href="/case-studies/field-submission-intelligence">Explore the field-service case study <span className="arr"><Icon name="arrow" /></span></Link>
              <Link className="btn btn-line" href="/services#forward-deployed-engineering">Explore forward-deployed engineering <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
      {/* WHAT WE DO */}
      <section className="sec" id="what">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we do</div>
            <h2 className="title">The judgment and engineering behind the result</h2>
          </div>
          <div className="seg" role="tablist" aria-label="What we do">
            <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true">AI &amp; Engineering</button>
            <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabIndex={-1}>Consulting &amp; Applied R&amp;D</button>
          </div>
          <div className="tabp" role="tabpanel" id="p1" aria-labelledby="t1">
            <div className="copy">
              <h3>AI &amp; Engineering</h3>
              <p>We design and develop applications that connect AI capabilities with existing business systems. Our forward-deployed engineers collaborate with client teams on agents, custom software, data pipelines, enterprise integrations, and production delivery.</p>
              <div className="tags">
                <span>Agentic AI</span>
                <span>Custom applications</span>
                <span>Data integration</span>
                <span>Cloud delivery</span>
                <span>Evaluation</span>
              </div>
              <div>
                <Link className="link" href="/services/ai-solutions-and-engineering">Explore engineering services <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
            <div className="stack" aria-label="How the layers connect to existing business systems">
              <div className="stack-l">
                <div className="layer u"><Icon name="users" />Your users and teams</div>
                <div className="layer"><Icon name="agent" />Agentic AI</div>
                <div className="layer"><Icon name="eval" />Evaluation</div>
                <div className="layer"><Icon name="layout" />Custom applications</div>
                <div className="layer"><Icon name="db" />Data integration</div>
                <div className="layer"><Icon name="cloud" />Cloud delivery</div>
              </div>
              <div className="stack-w" aria-hidden="true">
                <svg viewBox="0 0 44 100" preserveAspectRatio="none">
                  <g fill="none" stroke="#204ecf" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
                    <path d="M0 26H22V91M0 43H22M0 59H22M0 75H22M0 91H22M22 58H44" />
                  </g>
                </svg>
              </div>
              <div className="stack-r">Existing business systems</div>
              <p className="stack-cap">Each layer connects to what you already run. Nothing is built in isolation.</p>
            </div>
          </div>
          <div className="tabp" role="tabpanel" id="p2" aria-labelledby="t2" hidden>
            <div className="copy">
              <h3>Consulting &amp; Applied R&amp;D</h3>
              <p>We help organizations assess technical feasibility and define an achievable delivery plan. Our R&amp;D team tests relevant models and tools, evaluates their limitations, and provides evidence to guide adoption, adaptation, or deferral.</p>
              <div className="tags">
                <span>Use-case discovery</span>
                <span>Architecture</span>
                <span>Technology evaluation</span>
                <span>Delivery planning</span>
                <span>Governance</span>
              </div>
              <div>
                <Link className="link" href="/services/ai-strategy-and-consulting">Explore consulting <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
            <div className="eval" aria-label="From discovery to an evidence-based decision">
              <div className="eval-flow">
                <span><em>01</em>Use-case discovery</span>
                <span><em>02</em>Architecture</span>
                <span><em>03</em>Technology evaluation</span>
                <span><em>04</em>Delivery planning</span>
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
              <div className="gov"><Icon name="owner" />Governance applies at every step: decisions, owners, and limitations are recorded.</div>
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section className="sec band" id="services">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Our services</div>
            <h2 className="title">Comprehensive AI &amp; Engineering Capabilities</h2>
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
          <div className="svc-foot">
            <p>Engagements can span multiple capabilities, including custom development, focused specialist assignments, and integrated delivery programs.</p>
            <Link className="btn btn-navy" href="/services">View all services <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      {/* EVIDENCE */}
      <section className="sec" style={{ paddingBlock: "clamp(56px,7vw,88px)" }}>
        <div className="wrap">
          <div className="rule">
            <span>Evidence from the work</span>
          </div>
          <div className="ev">
            <Link href="/case-studies/ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform">
              <span className="org">PE-backed DevOps software</span>
              <span className="tag">Support workflow</span>
              <p>Enterprise knowledge and response drafting inside the support workflow.</p>
            </Link>
            <Link href="/case-studies/ai-idea-intake-and-governance">
              <span className="org">Fortune 500 industrial automation</span>
              <span className="tag">Microsoft 365</span>
              <p>An AI initiative tracker deployed using existing Microsoft 365 tools.</p>
            </Link>
            <Link href="/case-studies/ai-agent-governance-discovery-platform-on-aws-agentcore">
              <span className="org">Global agriculture science</span>
              <span className="tag">AI governance</span>
              <p>A central registry for AI assets, ownership, and governance.</p>
            </Link>
          </div>
          <div className="ev-foot">
            <Link className="link" href="/case-studies">See what was delivered <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      {/* PROJECTS */}
      <section className="sec band" id="projects">
        <div className="wrap">
          <div className="head" style={{ gridTemplateColumns: "1fr auto", alignItems: "end" }}>
            <div style={{ display: "grid", gap: "14px" }}>
              <div className="eyebrow">Project experience</div>
              <h2 className="title">Selected Project Experience</h2>
            </div>
          </div>
          <div className="proj">
            {/* Support copilot */}
            <Link className="pc" href="/case-studies/ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform">
              <div className="art" aria-hidden="true">
                <svg viewBox="0 0 300 160">
                  <g fontFamily="Montserrat">
                    <rect x="6" y="14" width="78" height="26" fill="#fff" stroke="#d9dbe0" strokeWidth="1.5" />
                    <text className="sv-t" x="45.0" y="31.0" textAnchor="middle" style={{ fontSize: "11px" }}>Freshdesk</text>
                    <rect x="6" y="66" width="78" height="26" fill="#fff" stroke="#d9dbe0" strokeWidth="1.5" />
                    <text className="sv-t" x="45.0" y="83.0" textAnchor="middle" style={{ fontSize: "11px" }}>Confluence</text>
                    <rect x="6" y="118" width="78" height="26" fill="#fff" stroke="#d9dbe0" strokeWidth="1.5" />
                    <text className="sv-t" x="45.0" y="135.0" textAnchor="middle" style={{ fontSize: "11px" }}>Jira</text>
                    <path d="M84 27C110 27 108 79 124 79M84 79H124M84 131C110 131 108 79 124 79" fill="none" stroke="#204ecf" strokeWidth="1.5" />
                    <circle className="mv" r="3" fill="#09b6f9" opacity="0">
                      <animateMotion dur="2.4s" begin="0s" repeatCount="indefinite" path="M84 27C110 27 108 79 124 79" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.4s" begin="0s" repeatCount="indefinite" />
                    </circle>
                    <circle className="mv" r="3" fill="#09b6f9" opacity="0">
                      <animateMotion dur="2.4s" begin="-0.80s" repeatCount="indefinite" path="M84 79H124" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.4s" begin="-0.80s" repeatCount="indefinite" />
                    </circle>
                    <circle className="mv" r="3" fill="#09b6f9" opacity="0">
                      <animateMotion dur="2.4s" begin="-1.60s" repeatCount="indefinite" path="M84 131C110 131 108 79 124 79" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.4s" begin="-1.60s" repeatCount="indefinite" />
                    </circle>
                    <rect x="124" y="58" width="74" height="42" fill="#0f256e" stroke="#0f256e" strokeWidth="1.5" />
                    <text className="sv-w" x="161.0" y="76.0" textAnchor="middle">Grounded</text>
                    <text className="sv-w" x="161.0" y="90.0" textAnchor="middle">draft</text>
                    <path d="M198 79H214" fill="none" stroke="#204ecf" strokeWidth="1.5" />
                    <circle className="mv" r="2.5" fill="#09b6f9" opacity="0">
                      <animateMotion dur="1.2s" begin="-0.40s" repeatCount="indefinite" path="M198 79H214" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="1.2s" begin="-0.40s" repeatCount="indefinite" />
                    </circle>
                    <rect x="214" y="40" width="80" height="78" fill="#fff" stroke="#0f256e" strokeWidth="1.5" />
                    <text className="sv-s" x="221" y="56" style={{ fontSize: "7.8px" }}>HUMAN REVIEW</text>
                    <circle cx="228" cy="72" r="4" fill="#3dbe8b" className="ap" style={{ animationDelay: "-2.40s" }} />
                    <text className="sv-t" x="238" y="76" style={{ fontSize: "11px" }}>Approve</text>
                    <circle cx="228" cy="89" r="4" fill="#09b6f9" className="ap" style={{ animationDelay: "-1.60s" }} />
                    <text className="sv-t" x="238" y="93" style={{ fontSize: "11px" }}>Edit</text>
                    <circle cx="228" cy="106" r="4" fill="#455065" className="ap" style={{ animationDelay: "-0.80s" }} />
                    <text className="sv-t" x="238" y="110" style={{ fontSize: "11px" }}>Escalate</text>
                  </g>
                </svg>
              </div>
              <div className="in">
                <div className="meta">
                  <b>PE-backed DevOps software company</b>
                  <span>PE-backed · Enterprise Software, DevOps &amp; Configuration Management</span>
                </div>
                <h3>Support knowledge in one workflow</h3>
                <p>A support copilot brings ticket context, enterprise knowledge, and reviewable response drafts into the support process.</p>
                <div className="tech">
                  <span>Anthropic Claude</span>
                  <span>Qdrant</span>
                  <span>n8n</span>
                  <span>RAG</span>
                </div>
                <span className="link">Read case study <span className="arr"><Icon name="arrow" /></span></span>
              </div>
            </Link>
            {/* Agent registry */}
            <Link className="pc" href="/case-studies/ai-agent-governance-discovery-platform-on-aws-agentcore">
              <div className="art" aria-hidden="true">
                <svg viewBox="0 0 300 160">
                  <g fontFamily="Montserrat">
                    <rect x="6" y="6" width="288" height="148" fill="#fff" stroke="#0f256e" strokeWidth="1.5" />
                    <rect x="6" y="6" width="288" height="24" fill="#0f256e" />
                    <text className="sv-w" x="16" y="22">Registry</text>
                    <text className="sv-s" x="16" y="48">ASSET</text>
                    <text className="sv-s" x="132" y="48">OWNER</text>
                    <text className="sv-s" x="214" y="48">STATUS</text>
                    <path d="M16 54H284" fill="none" stroke="#d9dbe0" strokeWidth="1" />
                    <rect x="10" y="57" width="280" height="22" fill="#eaf1ff" className="arow" opacity="0.9" />
                    <text className="sv-t" x="16" y="72">Agent · claims</text>
                    <rect x="132" y="63" width="52" height="7" fill="#d9dbe0" className="ag" />
                    <rect x="214" y="61" width="62" height="16" fill="#3dbe8b" />
                    <text className="sv-w" x="245" y="73" textAnchor="middle" style={{ fontSize: "9.5px" }}>Approved</text>
                    <text className="sv-t" x="16" y="98">Gateway · search</text>
                    <rect x="132" y="89" width="44" height="7" fill="#d9dbe0" className="ag" style={{ animationDelay: "-0.90s" }} />
                    <rect x="214" y="87" width="62" height="16" fill="#eaf1ff" stroke="#204ecf" strokeWidth="1" />
                    <text className="sv-t" x="245" y="99" textAnchor="middle" style={{ fontSize: "9.5px" }}>Draft</text>
                    <text className="sv-t" x="16" y="124">Agent · pricing</text>
                    <rect x="132" y="115" width="56" height="7" fill="#d9dbe0" className="ag" style={{ animationDelay: "-1.80s" }} />
                    <rect x="214" y="113" width="62" height="16" fill="#fff" stroke="#455065" strokeWidth="1" strokeDasharray="3 2" />
                    <text className="sv-t" x="245" y="125" textAnchor="middle" style={{ fontSize: "9.5px", fill: "#455065" }}>Deprecated</text>
                    <path d="M16 140H284" fill="none" stroke="#d9dbe0" strokeWidth="1" />
                  </g>
                </svg>
              </div>
              <div className="in">
                <div className="meta">
                  <b>Global agriculture science company</b>
                  <span>Agriculture Technology &amp; Enterprise AI</span>
                </div>
                <h3>A governed view of enterprise AI</h3>
                <p>A central registry gives teams visibility into AI agents, gateways, ownership, and lifecycle status.</p>
                <div className="tech">
                  <span>AWS AgentCore</span>
                  <span>Lambda</span>
                  <span>React</span>
                  <span>Terraform</span>
                </div>
                <span className="link">Read case study <span className="arr"><Icon name="arrow" /></span></span>
              </div>
            </Link>
            {/* Shopping */}
            <Link className="pc" href="/case-studies/multi-agent-shopping-intelligence-on-aws-bedrock-agentcore">
              <div className="art" aria-hidden="true">
                <svg viewBox="0 0 300 160">
                  <g fontFamily="Montserrat">
                    <path d="M150 80L44 26M150 80L256 26M150 80L44 134M150 80L256 134" fill="none" stroke="#204ecf" strokeWidth="1.5" strokeDasharray="4 3" className="am" />
                    <circle className="mv" r="3" fill="#09b6f9" opacity="0">
                      <animateMotion dur="2.2s" begin="0s" repeatCount="indefinite" path="M44 26L150 80" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.2s" begin="0s" repeatCount="indefinite" />
                    </circle>
                    <circle className="mv" r="3" fill="#09b6f9" opacity="0">
                      <animateMotion dur="2.2s" begin="-1.10s" repeatCount="indefinite" path="M150 80L256 134" />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.2s" begin="-1.10s" repeatCount="indefinite" />
                    </circle>
                    <rect x="96" y="58" width="108" height="44" fill="#0f256e" />
                    <text className="sv-w" x="150" y="77" textAnchor="middle">Orchestrator</text>
                    <text className="sv-s" x="150" y="92" textAnchor="middle" style={{ fill: "#9fb3e8" }}>keeps context</text>
                    <rect x="6" y="12" width="88" height="28" fill="#fff" stroke="#0f256e" strokeWidth="1.5" />
                    <text className="sv-t" x="50.0" y="30.0" textAnchor="middle">Discovery</text>
                    <rect x="206" y="12" width="88" height="28" fill="#fff" stroke="#0f256e" strokeWidth="1.5" />
                    <text className="sv-t" x="250.0" y="30.0" textAnchor="middle">Comparison</text>
                    <rect x="6" y="120" width="88" height="28" fill="#fff" stroke="#0f256e" strokeWidth="1.5" />
                    <text className="sv-t" x="50.0" y="138.0" textAnchor="middle">Cart</text>
                    <rect x="206" y="120" width="88" height="28" fill="#eaf1ff" stroke="#204ecf" strokeWidth="1.5" />
                    <text className="sv-t" x="250.0" y="138.0" textAnchor="middle">Checkout ✓</text>
                  </g>
                </svg>
              </div>
              <div className="in">
                <div className="meta">
                  <b>E-commerce and retail technology platform</b>
                  <span>Ecommerce &amp; Retail Technology</span>
                </div>
                <h3>A shopping assistant connected from discovery to checkout</h3>
                <p>A multi-agent application helps shoppers compare products and manage cart workflows while retaining conversation context.</p>
                <div className="tech">
                  <span>Bedrock AgentCore</span>
                  <span>Strands SDK</span>
                  <span>FastAPI</span>
                  <span>DynamoDB</span>
                </div>
                <span className="link">Read case study <span className="arr"><Icon name="arrow" /></span></span>
              </div>
            </Link>
          </div>
          <div className="svc-foot" style={{ borderTop: "0", paddingTop: "0", justifyContent: "flex-end" }}>
            <Link className="btn btn-line" href="/case-studies">View all case studies <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Discuss an AI or Engineering Initiative</h2>
              <p>Paramount supports technology decisions, focused engineering assignments, and end-to-end delivery engagements. An initial discussion establishes the business objective, technical context, and appropriate next step.</p>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss a project <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
