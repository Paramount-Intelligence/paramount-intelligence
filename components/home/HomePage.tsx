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
              <p className="body">We build, improve, and operate production-grade AI systems inside your products, data, and workflows, including taking stalled initiatives into production. Work with a Paramount-led team, or embed our forward-deployed engineers alongside yours.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a project <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/case-studies">See our work</Link>
              </div>
            </div>
            <div className="vis hv" aria-label="AI built inside your environment">
              <div className="eyebrow">Built inside your environment</div>
              <div className="hv-body">
                <p className="sub">AI connected to the systems you already run, documented and handed over.</p>
                <div className="h1-map">
                  <em>Your environment</em>
                  <div className="h1-in">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <line x1="50" y1="56" x2="14" y2="22" style={{ animationDelay: "0.30s" }} />
                      <line x1="50" y1="56" x2="86" y2="22" style={{ animationDelay: "0.55s" }} />
                      <line x1="50" y1="56" x2="16" y2="58" style={{ animationDelay: "0.80s" }} />
                      <line x1="50" y1="56" x2="84" y2="58" style={{ animationDelay: "1.05s" }} />
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
                    <span className="h1-s" style={{ "--x": "16%", "--xm": "22.3%", "--y": "58%", "--ym": "31%", animationDelay: "0.80s" } as CSSProperties}>Data warehouse</span>
                    <span className="h1-s" style={{ "--x": "84%", "--xm": "77.7%", "--y": "58%", "--ym": "31%", animationDelay: "1.05s" } as CSSProperties}>Support desk</span>
                    <span className="h1-s" style={{ "--x": "22%", "--xm": "31.5%", "--y": "92%", "--ym": "91%", animationDelay: "1.30s" } as CSSProperties}>Documents</span>
                    <span className="h1-s" style={{ "--x": "78%", "--xm": "68.5%", "--y": "92%", "--ym": "91%", animationDelay: "1.55s" } as CSSProperties}>Your team</span>
                    <div className="h1-core">
                      <span>Paramount</span>
                      <b>AI capability</b>
                    </div>
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
        </div>
      </section>
      {/* LOGOS */}
      <section className="sec" style={{ paddingBlock: "clamp(56px,7vw,88px)" }}>
        <div className="wrap">
          <div className="logos-head">
            <div>
              <h2>Experience across enterprise and digital businesses</h2>
              <p>Selected Paramount engagements and the prior professional experience of our leadership. Individual case studies describe the relationship and scope. Organization logos do not imply endorsement.</p>
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
      {/* OUTCOMES */}
      <section className="sec" id="who">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Where we help</div>
            <h2 className="title">The improvements you need next</h2>
            <p className="lead">We work with Fortune 500 companies, private equity-backed businesses, and high-growth startups. Each engagement starts from the result the business needs, with the scope, delivery approach, and success measures shaped around it.</p>
            <div className="aud" aria-hidden="true">
              <span>Fortune 500 companies</span>
              <span>PE-backed businesses</span>
              <span>High-growth startups</span>
            </div>
          </div>
          <div className="pi-ox">
            <div className="pi-ox-list" role="tablist" aria-orientation="vertical" aria-label="Business objectives">
              <button type="button" role="tab" id="ox-t0" aria-controls="ox-p0" aria-selected="true">
                <small>01</small>
                <span>A new capability your users can use</span>
              </button>
              <button type="button" role="tab" id="ox-t1" aria-controls="ox-p1" aria-selected="false" tabIndex={-1}>
                <small>02</small>
                <span>Less manual work in existing systems</span>
              </button>
              <button type="button" role="tab" id="ox-t2" aria-controls="ox-p2" aria-selected="false" tabIndex={-1}>
                <small>03</small>
                <span>A reliable application in production</span>
              </button>
              <button type="button" role="tab" id="ox-t3" aria-controls="ox-p3" aria-selected="false" tabIndex={-1}>
                <small>04</small>
                <span>An initiative moving past its blockers</span>
              </button>
              <button type="button" role="tab" id="ox-t4" aria-controls="ox-p4" aria-selected="false" tabIndex={-1}>
                <small>05</small>
                <span>AI delivery alongside your team</span>
              </button>
            </div>
            <div>
              <div className="pi-ox-p" role="tabpanel" id="ox-p0" aria-labelledby="ox-t0">
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <span className="mi" style={{ width: "44px", height: "44px", display: "grid", placeItems: "center", border: "1.5px solid var(--navy)", color: "var(--royal)", flex: "none" }}>
                    <Icon name="spark" />
                  </span>
                  <h3>A new capability your users can use</h3>
                </div>
                <div className="pi-flow">
                  <div className="pi-f blk">
                    <span className="pi-k">What is holding it back</span>
                    <p>A business opportunity without the engineering needed to deliver it.</p>
                  </div>
                  <span className="pi-arr" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f how">
                    <span className="pi-k">How we help</span>
                    <p>Design, build, and integrate a custom AI capability or application.</p>
                  </div>
                  <span className="pi-arr b" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f res">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span className="pi-k">The result</span>
                    <p>A new capability your users can use</p>
                  </div>
                </div>
                <ul className="pi-ox-pts">
                  <li>Identify the users, workflow, and result that matter.</li>
                  <li>Choose suitable AI and conventional software components.</li>
                  <li>Build and test against agreed acceptance criteria, connected to existing systems.</li>
                </ul>
              </div>
              <div className="pi-ox-p" role="tabpanel" id="ox-p1" aria-labelledby="ox-t1" hidden>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <span className="mi" style={{ width: "44px", height: "44px", display: "grid", placeItems: "center", border: "1.5px solid var(--navy)", color: "var(--royal)", flex: "none" }}>
                    <Icon name="flow" />
                  </span>
                  <h3>Less manual work in existing systems</h3>
                </div>
                <div className="pi-flow">
                  <div className="pi-f blk">
                    <span className="pi-k">What is holding it back</span>
                    <p>Useful AI ideas that do not connect to the product or the day-to-day workflow.</p>
                  </div>
                  <span className="pi-arr" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f how">
                    <span className="pi-k">How we help</span>
                    <p>Embed AI in software, data, and processes, with appropriate controls.</p>
                  </div>
                  <span className="pi-arr b" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f res">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span className="pi-k">The result</span>
                    <p>Less manual work in existing systems</p>
                  </div>
                </div>
                <ul className="pi-ox-pts">
                  <li>Retrieve knowledge from approved sources, within existing permissions.</li>
                  <li>Classify, extract, and draft work, with defined checks.</li>
                  <li>Route exceptions to a named reviewer, with every action recorded.</li>
                </ul>
              </div>
              <div className="pi-ox-p" role="tabpanel" id="ox-p2" aria-labelledby="ox-t2" hidden>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <span className="mi" style={{ width: "44px", height: "44px", display: "grid", placeItems: "center", border: "1.5px solid var(--navy)", color: "var(--royal)", flex: "none" }}>
                    <Icon name="wrench" />
                  </span>
                  <h3>A reliable application in production</h3>
                </div>
                <div className="pi-flow">
                  <div className="pi-f blk">
                    <span className="pi-k">What is holding it back</span>
                    <p>A promising prototype or AI-built app that breaks outside its sandbox.</p>
                  </div>
                  <span className="pi-arr" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f how">
                    <span className="pi-k">How we help</span>
                    <p>Assess, repair, integrate, and deploy it with an agreed operating model.</p>
                  </div>
                  <span className="pi-arr b" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f res">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span className="pi-k">The result</span>
                    <p>A reliable application in production</p>
                  </div>
                </div>
                <ul className="pi-ox-pts">
                  <li>Review inherited code and AI-generated applications.</li>
                  <li>Resolve unreliable outputs, broken integrations, and data issues.</li>
                  <li>Establish release checks, monitoring, and an operating owner.</li>
                </ul>
              </div>
              <div className="pi-ox-p" role="tabpanel" id="ox-p3" aria-labelledby="ox-t3" hidden>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <span className="mi" style={{ width: "44px", height: "44px", display: "grid", placeItems: "center", border: "1.5px solid var(--navy)", color: "var(--royal)", flex: "none" }}>
                    <Icon name="blocks" />
                  </span>
                  <h3>An initiative moving past its blockers</h3>
                </div>
                <div className="pi-flow">
                  <div className="pi-f blk">
                    <span className="pi-k">What is holding it back</span>
                    <p>Messy data, disconnected APIs, or infrastructure that slows delivery.</p>
                  </div>
                  <span className="pi-arr" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f how">
                    <span className="pi-k">How we help</span>
                    <p>Build or repair the foundations so the initiative can move forward.</p>
                  </div>
                  <span className="pi-arr b" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f res">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span className="pi-k">The result</span>
                    <p>An initiative moving past its blockers</p>
                  </div>
                </div>
                <ul className="pi-ox-pts">
                  <li>Data that arrives through repeatable pipelines, with quality checks.</li>
                  <li>Tested APIs and integrations with the systems already in place.</li>
                  <li>Infrastructure, access controls, and releases that can be repeated.</li>
                </ul>
              </div>
              <div className="pi-ox-p" role="tabpanel" id="ox-p4" aria-labelledby="ox-t4" hidden>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <span className="mi" style={{ width: "44px", height: "44px", display: "grid", placeItems: "center", border: "1.5px solid var(--navy)", color: "var(--royal)", flex: "none" }}>
                    <Icon name="team" />
                  </span>
                  <h3>AI delivery alongside your team</h3>
                </div>
                <div className="pi-flow">
                  <div className="pi-f blk">
                    <span className="pi-k">What is holding it back</span>
                    <p>A priority that needs hands-on engineering across users, systems, and production constraints.</p>
                  </div>
                  <span className="pi-arr" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f how">
                    <span className="pi-k">How we help</span>
                    <p>A Paramount forward-deployed engineer or team carries the agreed work from requirements to release.</p>
                  </div>
                  <span className="pi-arr b" aria-hidden="true">
                    <i />
                  </span>
                  <div className="pi-f res">
                    <span className="tick">
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <span className="pi-k">The result</span>
                    <p>AI delivery alongside your team</p>
                  </div>
                </div>
                <ul className="pi-ox-pts">
                  <li>Engineers from the Paramount FDE Network, with a named Paramount lead.</li>
                  <li>Work within your delivery process, with you directing priorities.</li>
                  <li>Working increments reviewed with your team on a short cadence.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="pi-note">A custom requirement is welcome, including conventional software, data, and cloud work without an AI component.</p>
          <div className="pi-commit-cap">What you can count on</div>
          <div className="pi-commit">
            <div className="c1">
              <div className="ct">
                <Icon name="owner" />
                <span>01</span>
              </div>
              <b>Named responsibility</b>
              <p>A named Paramount lead on every engagement, accountable for the agreed work.</p>
            </div>
            <div className="c2">
              <div className="ct">
                <Icon name="layers" />
                <span>02</span>
              </div>
              <b>Technology matched to the requirement</b>
              <p>We select technology to fit the client's environment, operating requirements, and constraints.</p>
            </div>
            <div className="c3">
              <div className="ct">
                <Icon name="monitor" />
                <span>03</span>
              </div>
              <b>Visible progress</b>
              <p>Working increments demonstrated early and often, so decisions rest on evidence.</p>
            </div>
            <div className="c4">
              <div className="ct">
                <Icon name="check" />
                <span>04</span>
              </div>
              <b>A release you can operate</b>
              <p>Agreed release checks, documentation, and handover, with work done inside your environment.</p>
            </div>
          </div>
        </div>
      </section>
      {/* TWO WAYS TO ENGAGE */}
      <section className="sec pi-char" id="engage">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Two ways to engage</div>
            <h2 className="title">Lead the work with Paramount, or embed our engineers</h2>
            <p className="lead">Engage Paramount to lead a defined initiative, or bring specialist engineers into your team. Either way, Paramount remains your accountable contracting partner.</p>
          </div>
          <div className="pi-models">
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
          <div className="pi-net">
            <div>
              <span className="pi-k" style={{ color: "var(--cyan)" }}>Paramount FDE Network</span>
              <h3>Our network of vetted contract engineers</h3>
              <p>Paramount's own network of vetted contract engineers: 50+ forward-deployed engineers, plus AI engineers and other engineering and project specialists. Every engineer is contracted by Paramount and works under NDA, and every engagement has a named Paramount lead.</p>
              <Link className="link" href="/services#fde-network">How the network works <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
            <div className="pi-stats">
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
          <div className="stages five" id="stages">
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
          <div className="legend-box proof" style={{ background: "var(--white)" }}>
            <em>Proof from the work</em>
            <div className="proof-l">
              <div className="proof-h">
                <span className="n">
                  <b>8</b>
                  <span>weeks</span>
                </span>
                <span className="wip">Work in progress</span>
              </div>
              <div className="proof-tl" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
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
              <span className="org">Global agriculture company</span>
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
      <section className="sec band pi-char" id="projects">
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
              <h2>Start with the priority that needs to move</h2>
              <p>Tell us what you need to build, improve, or operate. We will propose a clear next step and the expertise to deliver it, from a focused assessment or one embedded engineer to a managed engagement.</p>
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
