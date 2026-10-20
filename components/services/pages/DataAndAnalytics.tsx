import Link from "next/link";
import CaseCard from "@/components/casestudies/CaseCard";
import Icon from "@/components/site/Icon";
import { caseCard } from "@/lib/case-cards";

// Page content from docs/website-redesign/reference/services-data-and-analytics.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function DataAndAnalytics() {
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
                <span aria-current="page">Data Engineering &amp; Intelligence</span>
              </nav>
              <div className="eyebrow">Services</div>
              <h1>Data Engineering &amp; Intelligence</h1>
              <p className="body">Paramount connects fragmented sources and resolves data and reporting inconsistencies to support reliable business information. We build the pipelines, models, and analytics that help people answer questions and give AI applications the context they need.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a data challenge <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/services">All services </Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">Consistency. Accessibility. Context.</div>
                <svg viewBox="0 0 400 260" role="img" aria-label="Data sources validated into shared measures for reporting and AI">
                  <rect x="10" y="22" width="96" height="34" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="58.0" y="43.0" textAnchor="middle">Applications</text>
                  <path id="dp0" d="M106 39C130 39 130 130 150 130" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.6s" begin="-0.0s" repeatCount="indefinite">
                      <mpath href="#dp0" />
                    </animateMotion>
                  </circle>
                  <rect x="10" y="78" width="96" height="34" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="58.0" y="99.0" textAnchor="middle">Databases</text>
                  <path id="dp1" d="M106 95C130 95 130 130 150 130" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.6s" begin="-0.4s" repeatCount="indefinite">
                      <mpath href="#dp1" />
                    </animateMotion>
                  </circle>
                  <rect x="10" y="134" width="96" height="34" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="58.0" y="155.0" textAnchor="middle">Documents</text>
                  <path id="dp2" d="M106 151C130 151 130 130 150 130" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.6s" begin="-0.8s" repeatCount="indefinite">
                      <mpath href="#dp2" />
                    </animateMotion>
                  </circle>
                  <rect x="10" y="190" width="96" height="34" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="58.0" y="211.0" textAnchor="middle">External</text>
                  <path id="dp3" d="M106 207C130 207 130 130 150 130" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.6s" begin="-1.2000000000000002s" repeatCount="indefinite">
                      <mpath href="#dp3" />
                    </animateMotion>
                  </circle>
                  <rect x="150" y="104" width="90" height="52" fill="#0f256e" stroke="#09b6f9" strokeWidth="1.6" />
                  <text className="vt" x="195" y="127" textAnchor="middle">Validate</text>
                  <text className="vs" x="195" y="142" textAnchor="middle">shared measures</text>
                  <path d="M240 116C262 116 262 70 282 70" fill="none" stroke="#09b6f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M240 144C262 144 262 190 282 190" fill="none" stroke="#09b6f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="282" y="44" width="108" height="54" fill="rgba(160,185,240,.10)" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" />
                  <text className="vt" x="336" y="64" textAnchor="middle">Reporting</text>
                  <rect x="298" y="82" width="9" height="8" fill="rgba(160,185,240,.5)" />
                  <rect x="314" y="77" width="9" height="13" fill="rgba(160,185,240,.5)" />
                  <rect x="330" y="72" width="9" height="18" fill="rgba(160,185,240,.5)" />
                  <rect x="346" y="67" width="9" height="23" fill="#09b6f9" />
                  <rect x="362" y="62" width="9" height="28" fill="rgba(160,185,240,.5)" />
                  <rect x="282" y="164" width="108" height="54" fill="rgba(61,190,139,.14)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <text className="vt" x="336" y="188" textAnchor="middle">AI context</text>
                  <text className="vs" x="336" y="204" textAnchor="middle">right user, right data</text>
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
              <h2 className="title">Data Quality as a Foundation for AI &amp; Analytics</h2>
            </div>
            <p className="lead">Inconsistent definitions, incomplete records, and disconnected systems can undermine reporting and AI outputs. We trace the problem through the data flow and address the foundations as well as the interface people see.</p>
          </div>
          <div className="slots">
            <div className="slot">
              <span className="ic">
                <Icon name="scale" />
              </span>
              <b>Consistency</b>
              <p>Shared definitions and reconciled data.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="users" />
              </span>
              <b>Accessibility</b>
              <p>Information available to the right users.</p>
            </div>
            <div className="slot">
              <span className="ic">
                <Icon name="layers" />
              </span>
              <b>Context</b>
              <p>Data prepared for the intended application.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">What we deliver</div>
            <h2 className="title">Services within Data Engineering &amp; Intelligence</h2>
          </div>
          <div className="vtabs">
            <div role="tablist" aria-orientation="vertical" aria-label="Data Engineering &amp; Intelligence services">
              <button type="button" role="tab" id="services-data-and-analytics-t0" aria-controls="services-data-and-analytics-p0" aria-selected="true">
                <Icon name="search" />
                <span>Data assessment and architecture</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-data-and-analytics-t1" aria-controls="services-data-and-analytics-p1" aria-selected="false" tabIndex={-1}>
                <Icon name="flow" />
                <span>Data pipelines and integration</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-data-and-analytics-t2" aria-controls="services-data-and-analytics-p2" aria-selected="false" tabIndex={-1}>
                <Icon name="check" />
                <span>Data quality and governance</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-data-and-analytics-t3" aria-controls="services-data-and-analytics-p3" aria-selected="false" tabIndex={-1}>
                <Icon name="chart" />
                <span>Reporting and business intelligence</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-data-and-analytics-t4" aria-controls="services-data-and-analytics-p4" aria-selected="false" tabIndex={-1}>
                <Icon name="eval" />
                <span>Data science and decision support</span>
                <Icon name="arrow" className="ico ar" />
              </button>
              <button type="button" role="tab" id="services-data-and-analytics-t5" aria-controls="services-data-and-analytics-p5" aria-selected="false" tabIndex={-1}>
                <Icon name="agent" />
                <span>Data for AI applications</span>
                <Icon name="arrow" className="ico ar" />
              </button>
            </div>
            <div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p0" aria-labelledby="services-data-and-analytics-t0">
                <span className="big-ic">
                  <Icon name="search" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Data assessment and architecture</h3>
                <p>We map sources, consumers, ownership, and bottlenecks. We define a practical target architecture and a sequence of improvements tied to business priorities.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p1" aria-labelledby="services-data-and-analytics-t1" hidden>
                <span className="big-ic">
                  <Icon name="flow" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Data pipelines and integration</h3>
                <p>We build ingestion and transformation workflows across operational applications, databases, documents, and external sources. We include validation, refresh logic, and failure handling.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p2" aria-labelledby="services-data-and-analytics-t2" hidden>
                <span className="big-ic">
                  <Icon name="check" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Data quality and governance</h3>
                <p>We resolve inconsistent records, define shared measures, and establish ownership. We implement access boundaries and checks that make issues visible.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p3" aria-labelledby="services-data-and-analytics-t3" hidden>
                <span className="big-ic">
                  <Icon name="chart" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Reporting and business intelligence</h3>
                <p>We build or repair dashboards, semantic models, and reporting workflows. We help teams reconcile numbers, understand performance, and reduce repetitive preparation.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p4" aria-labelledby="services-data-and-analytics-t4" hidden>
                <span className="big-ic">
                  <Icon name="eval" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Data science and decision support</h3>
                <p>We develop forecasting, segmentation, recommendation, and detection models for defined use cases. We evaluate model behavior and make outputs usable in operating decisions.</p>
                <Link className="link" href="/contact-us">Discuss this work <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
              <div className="vpanel" role="tabpanel" id="services-data-and-analytics-p5" aria-labelledby="services-data-and-analytics-t5" hidden>
                <span className="big-ic">
                  <Icon name="agent" />
                </span>
                <span className="lbl">Data Engineering &amp; Intelligence</span>
                <h3>Data for AI applications</h3>
                <p>We prepare content and structured data for retrieval, natural-language analytics, and agents. We define permissions, source context, refresh processes, and tenant boundaries.</p>
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
              <h3>Less reconciliation</h3>
              <p>Teams spend less effort resolving conflicting reports and disconnected records.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>Better visibility</h3>
              <p>Leaders can trace performance through shared measures and relevant detail.</p>
            </div>
            <div className="out">
              <span className="k">Outcome</span>
              <h3>More useful AI context</h3>
              <p>Applications retrieve the information appropriate to the user, task, and organization.</p>
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
            <p>We start with the question the business needs to answer and work back through the source systems. Deliverables include agreed data workflows, validation checks, reporting or application outputs, and documentation for ongoing ownership.</p>
            <Link className="btn btn-navy" href="/contact-us">Discuss a data challenge <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
          <div className="feat-label"><Icon name="brief" />Featured cases</div>
          <div className="cgrid four">
            <CaseCard card={caseCard("40")} />
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
              <h2>Data Foundations for Reliable Operations</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss a data requirement <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
