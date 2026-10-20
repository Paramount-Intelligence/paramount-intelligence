import Link from "next/link";
import RelatedCaseCard from "@/components/casestudies/RelatedCaseCard";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/services-cloud-services.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function CloudServices() {
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
                <span aria-current="page">Cloud &amp; Production Engineering</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>Cloud &amp; Production Engineering</h1>
              <p className="body">Paramount establishes the engineering foundations required to move prototypes into supportable production systems. We resolve deployment blockers and establish the cloud foundations, integrations, and release controls required for the intended use.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a production challenge <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis rel" id="rel">
                <div className="eyebrow">Repeatable releases. Visible operation.</div>
                <div className="rl-pipe" aria-label="Build, checks, deploy and monitor">
                  <div className="rl-line">
                    <span className="rl-fill" />
                  </div>
                  <div className="rl-node" data-i="0">
                    <span className="rl-ic">
                      <Icon name="blocks" />
                    </span>
                    <b>Build</b>
                  </div>
                  <div className="rl-node" data-i="1">
                    <span className="rl-ic">
                      <Icon name="check" />
                    </span>
                    <b>Checks</b>
                  </div>
                  <div className="rl-node" data-i="2">
                    <span className="rl-ic">
                      <Icon name="rocket" />
                    </span>
                    <b>Deploy</b>
                  </div>
                  <div className="rl-node" data-i="3">
                    <span className="rl-ic">
                      <Icon name="monitor" />
                    </span>
                    <b>Monitor</b>
                  </div>
                  <span className="rl-pkg" aria-hidden="true"><Icon name="layers" />Release</span>
                </div>
                <div className="rl-envs" aria-hidden="true">
                  <div className="rl-env " data-e="0">
                    <b>Dev</b>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                  </div>
                  <div className="rl-env " data-e="1">
                    <b>Staging</b>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                  </div>
                  <div className="rl-env prod" data-e="2">
                    <b>Production</b>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                    <span className="u">
                      <i />
                      <i />
                      <em />
                    </span>
                  </div>
                </div>
                <div className="rl-mon">
                  <div className="rl-chips">
                    <span className="ok"><i />Healthy</span>
                    <span className="rb"><Icon name="refresh" />Rollback ready</span>
                    <span className="own"><Icon name="owner" />Owner assigned</span>
                  </div>
                  <svg className="rl-spark" viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true">
                    <path className="area" d="" />
                    <path className="ln" d="" />
                  </svg>
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
              <h2 className="title">Production Readiness &amp; Operational Ownership</h2>
            </div>
            <p className="lead">Production engineering addresses data access, dependency failures, release processes, incident investigation, and recovery. We consider these requirements alongside application performance and operating cost.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="repeat" />
              </span>
              <b>Repeatable releases</b>
              <p>A defined deployment path.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="eye" />
              </span>
              <b>Visible operation</b>
              <p>Monitoring and failure handling.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="owner" />
              </span>
              <b>Clear ownership</b>
              <p>Runbooks and operating responsibilities.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within Cloud &amp; Production Engineering</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="Cloud &amp; Production Engineering services">
              <button type="button" role="tab" id="services-cloud-services-t0" aria-controls="services-cloud-services-p0" aria-selected="true">
                <Icon name="cloud" />
                <span>Cloud foundations</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-cloud-services-t1" aria-controls="services-cloud-services-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="rocket" />
                <span>Deployment and release engineering</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-cloud-services-t2" aria-controls="services-cloud-services-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="agent" />
                <span>AI infrastructure and model integration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-cloud-services-t3" aria-controls="services-cloud-services-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="route" />
                <span>Modernization and migration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-cloud-services-t4" aria-controls="services-cloud-services-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="wrench" />
                <span>Reliability and application recovery</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-cloud-services-p0" aria-labelledby="services-cloud-services-t0">
                <span className="big-ic">
                  <Icon name="cloud" />
                </span>
                <span className="lbl">Cloud &amp; Production Engineering</span>
                <h3>Cloud foundations</h3>
                <p>We configure environments, identity, networking, secrets, and infrastructure as code around the application and existing organizational controls.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-cloud-services-p1" aria-labelledby="services-cloud-services-t1" hidden>
                <span className="big-ic">
                  <Icon name="rocket" />
                </span>
                <span className="lbl">Cloud &amp; Production Engineering</span>
                <h3>Deployment and release engineering</h3>
                <p>We build repeatable pipelines for application and infrastructure changes. We define environment configuration, checks, rollback, and release ownership.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-cloud-services-p2" aria-labelledby="services-cloud-services-t2" hidden>
                <span className="big-ic">
                  <Icon name="agent" />
                </span>
                <span className="lbl">Cloud &amp; Production Engineering</span>
                <h3>AI infrastructure and model integration</h3>
                <p>We implement request handling, model routing, state management, and retrieval infrastructure. We evaluate latency, throughput, failure behavior, and operating cost.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-cloud-services-p3" aria-labelledby="services-cloud-services-t3" hidden>
                <span className="big-ic">
                  <Icon name="route" />
                </span>
                <span className="lbl">Cloud &amp; Production Engineering</span>
                <h3>Modernization and migration</h3>
                <p>We assess the current system and plan an achievable migration or improvement. Address dependencies, compatibility, data movement, and continuity during change.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-cloud-services-p4" aria-labelledby="services-cloud-services-t4" hidden>
                <span className="big-ic">
                  <Icon name="wrench" />
                </span>
                <span className="lbl">Cloud &amp; Production Engineering</span>
                <h3>Reliability and application recovery</h3>
                <p>We diagnose unreliable services, inherited applications, and failed integrations. We add monitoring, recovery behavior, and tests that support stable operation.</p>
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
              <h3>A repeatable release</h3>
              <p>Client teams can deploy changes through a documented process.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>A diagnosable service</h3>
              <p>Owners can see failures and understand how to respond.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>An informed operating plan</h3>
              <p>Capacity, dependencies, and recurring costs are visible enough to guide decisions.</p>
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
            <p>We assess the existing environment, agree readiness criteria, implement the required changes, and transfer operating knowledge. Continuing support is available within an agreed scope.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss a production challenge <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid ">
            <RelatedCaseCard n="08" />
            <RelatedCaseCard n="23" />
            <RelatedCaseCard n="12" />
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
              <h2>Engineering Support for Production Delivery</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss the blocker <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
