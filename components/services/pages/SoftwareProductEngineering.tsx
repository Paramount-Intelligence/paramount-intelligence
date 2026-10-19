import Link from "next/link";
import CaseCard from "@/components/casestudies/CaseCard";
import Icon from "@/components/site/Icon";
import { caseCard } from "@/lib/case-cards";

// Page content from docs/website-redesign/reference/services-software-product-engineering.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function SoftwareProductEngineering() {
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
                <span aria-current="page">Software &amp; Product Engineering</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>Software &amp; Product Engineering</h1>
              <p className="body">Paramount develops custom products, extends existing applications, and prepares prototypes for operational use. We cover the application, backend, integrations, and engineering foundations needed to support it.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss an application <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">Connected to what you already run</div>
                <div className="iso" id="iso">
                  <div className="iso-scene" aria-hidden="true">
                    <div className="iso-stage">
                      <div className="pl pl3" data-l="2">
                        <span>Identity</span>
                        <span>Data</span>
                        <span>APIs</span>
                      </div>
                      <div className="pl pl2" data-l="1">
                        <span>Services</span>
                        <span className="ai">AI feature</span>
                        <span>Tests</span>
                      </div>
                      <div className="pl pl1" data-l="0">
                        <div className="sb">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="tb" />
                        <div className="card" />
                        <div className="ai" />
                      </div>
                    </div>
                  </div>
                  <ol className="iso-labels">
                    <li data-l="0">
                      <em>01</em>
                      <b>Application</b>
                      <small>Web apps, portals, internal tools</small>
                    </li>
                    <li data-l="1">
                      <em>02</em>
                      <b>Backend &amp; AI feature</b>
                      <small>Services, AI behavior, tests</small>
                    </li>
                    <li data-l="2">
                      <em>03</em>
                      <b>Existing systems</b>
                      <small>Identity, data, and APIs already in place</small>
                    </li>
                  </ol>
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
              <h2 className="title">Engineering Foundations for AI-Generated Applications</h2>
            </div>
            <p className="lead">AI coding tools can help teams create applications quickly. The harder work often appears in integration, permissions, testing, deployment, and maintenance. We assess the application as a complete system and resolve what prevents people from relying on it.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="users" />
              </span>
              <b>Workflow fit</b>
              <p>Build around actual users.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="link" />
              </span>
              <b>Connected systems</b>
              <p>Integrate with the software already in place.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="check" />
              </span>
              <b>Maintainability</b>
              <p>Establish tests, documentation, and ownership.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within Software &amp; Product Engineering</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="Software &amp; Product Engineering services">
              <button type="button" role="tab" id="services-software-product-engineering-t0" aria-controls="services-software-product-engineering-p0" aria-selected="true">
                <Icon name="layout" />
                <span>Custom applications and portals</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-software-product-engineering-t1" aria-controls="services-software-product-engineering-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="spark" />
                <span>AI in existing software</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-software-product-engineering-t2" aria-controls="services-software-product-engineering-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="wrench" />
                <span>Prototype recovery and application consolidation</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-software-product-engineering-t3" aria-controls="services-software-product-engineering-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="plug" />
                <span>APIs and enterprise integration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-software-product-engineering-t4" aria-controls="services-software-product-engineering-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="blocks" />
                <span>AI studios and platform tools</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-software-product-engineering-p0" aria-labelledby="services-software-product-engineering-t0">
                <span className="big-ic">
                  <Icon name="layout" />
                </span>
                <span className="lbl">Software &amp; Product Engineering</span>
                <h3>Custom applications and portals</h3>
                <p>We build web applications, internal tools, customer portals, and mobile experiences with the workflows and permissions application users need.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-software-product-engineering-p1" aria-labelledby="services-software-product-engineering-t1" hidden>
                <span className="big-ic">
                  <Icon name="spark" />
                </span>
                <span className="lbl">Software &amp; Product Engineering</span>
                <h3>AI in existing software</h3>
                <p>We add search, copilots, document processing, recommendations, or agent actions to the product. We connect the feature to existing identity, data, APIs, and user journeys.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-software-product-engineering-p2" aria-labelledby="services-software-product-engineering-t2" hidden>
                <span className="big-ic">
                  <Icon name="wrench" />
                </span>
                <span className="lbl">Software &amp; Product Engineering</span>
                <h3>Prototype recovery and application consolidation</h3>
                <p>We review experimental and AI-generated applications, identify reusable components, and repair the foundations. Consolidate overlapping tools where a shared application reduces maintenance and confusion.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-software-product-engineering-p3" aria-labelledby="services-software-product-engineering-t3" hidden>
                <span className="big-ic">
                  <Icon name="plug" />
                </span>
                <span className="lbl">Software &amp; Product Engineering</span>
                <h3>APIs and enterprise integration</h3>
                <p>We build services and integrations that connect business tools, customer data, and external platforms. We define contracts, validation, failure handling, and ownership across system boundaries.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-software-product-engineering-p4" aria-labelledby="services-software-product-engineering-t4" hidden>
                <span className="big-ic">
                  <Icon name="blocks" />
                </span>
                <span className="lbl">Software &amp; Product Engineering</span>
                <h3>AI studios and platform tools</h3>
                <p>We build interfaces and backend workflows for content generation, agent management, and AI operations. We integrate suitable model services and cloud platforms around the engagement requirements.</p>
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
              <h3>A usable release</h3>
              <p>Customers and colleagues can complete the intended tasks in a connected application.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>A clearer roadmap</h3>
              <p>Client teams can see what has shipped, what remains, and which dependencies matter.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>A supportable codebase</h3>
              <p>Tests, deployment guidance, and technical documentation help the next team operate and extend the software.</p>
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
            <p>We define a useful release, demonstrate working increments, and resolve feedback with client product and engineering owners. AI is included where it helps the requirement; conventional software engineering remains part of the service.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss an application <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid four">
            <CaseCard card={caseCard("01")} />
            <CaseCard card={caseCard("06")} />
            <CaseCard card={caseCard("27")} />
            <CaseCard card={caseCard("26")} />
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
              <h2>Custom Development &amp; Application Improvement</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss a software requirement <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
