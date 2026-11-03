import Link from "next/link";
import RelatedCaseCard from "@/components/casestudies/RelatedCaseCard";
import Icon from "@/components/site/Icon";
import "@/components/industries/pe-hero-visual.css";

// Page content from docs/website-redesign/reference/industries-private-equity.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function PrivateEquity() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/industries">Industries</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Private Equity</span>
              </nav>
              <div className="eyebrow">Private Equity</div>
              <h1>Turn portfolio priorities into working AI</h1>
              <p className="body">We help portfolio companies improve customer service, operational efficiency, and product development. Paramount works with sponsors, operating partners, and company leaders to identify useful initiatives and carry the agreed work into production.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a portfolio priority <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/case-studies">See relevant work </Link>
              </div>
            </div>
            <div>
              {/* Hero visual (Ali, 29 Oct 2026): docs/website-redesign/reference/pe-hero-visual/; styles in pe-hero-visual.css. */}
              <div className="pe-vis" aria-label="Reusable engineering approaches adapted to three separate company environments">
                <div className="eb">Sponsor and portfolio</div>
                <div className="q-sp"><b>PE sponsor &amp; operating partners</b><span>Portfolio priorities</span></div>
                <div className="q-stem"></div>
                <div className="q-band"><b>Reusable engineering approaches</b><span>Integration · Evaluation · Delivery</span></div>
                <div className="q5-st"><svg viewBox="0 0 540 288" aria-hidden="true"><path className="b0" d="M362 0V52H238V82"/><g><polygon points="184,192 238,219 238,232 184,205" fill="#0b2a3a"/><polygon points="292,192 238,219 238,232 292,205" fill="#103a4c"/><polygon className="tp" points="238,165 292,192 238,219 184,192" fill="#1d5466" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g><polygon points="184,152 238,179 238,192 184,165" fill="#0e2160"/><polygon points="292,152 238,179 238,192 292,165" fill="#173280"/><polygon className="tp" points="238,125 292,152 238,179 184,152" fill="#2350b8" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g className="ai a0"><polygon points="184,112 238,139 238,152 184,125" fill="#0e1c52"/><polygon points="292,112 238,139 238,152 292,125" fill="#15296a"/><polygon className="tp" points="238,85 292,112 238,139 184,112" fill="#22346f" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><path className="b1" d="M362 0V52H362V82"/><g><polygon points="308,192 362,219 362,232 308,205" fill="#0b2a3a"/><polygon points="416,192 362,219 362,232 416,205" fill="#103a4c"/><polygon className="tp" points="362,165 416,192 362,219 308,192" fill="#1d5466" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g><polygon points="308,152 362,179 362,192 308,165" fill="#0e2160"/><polygon points="416,152 362,179 362,192 416,165" fill="#173280"/><polygon className="tp" points="362,125 416,152 362,179 308,152" fill="#2350b8" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g className="ai a1"><polygon points="308,112 362,139 362,152 308,125" fill="#0e1c52"/><polygon points="416,112 362,139 362,152 416,125" fill="#15296a"/><polygon className="tp" points="362,85 416,112 362,139 308,112" fill="#22346f" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><path className="b2" d="M362 0V52H486V82"/><g><polygon points="432,192 486,219 486,232 432,205" fill="#0b2a3a"/><polygon points="540,192 486,219 486,232 540,205" fill="#103a4c"/><polygon className="tp" points="486,165 540,192 486,219 432,192" fill="#1d5466" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g><polygon points="432,152 486,179 486,192 432,165" fill="#0e2160"/><polygon points="540,152 486,179 486,192 540,165" fill="#173280"/><polygon className="tp" points="486,125 540,152 486,179 432,152" fill="#2350b8" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><g className="ai a2"><polygon points="432,112 486,139 486,152 432,125" fill="#0e1c52"/><polygon points="540,112 486,139 486,152 540,125" fill="#15296a"/><polygon className="tp" points="486,85 540,112 486,139 432,112" fill="#22346f" stroke="rgba(255,255,255,.3)" strokeWidth="1"/></g><line x1="166" y1="112" x2="180" y2="112" stroke="rgba(160,185,240,.6)" strokeWidth="1" strokeDasharray="2 3"/><line x1="166" y1="152" x2="180" y2="152" stroke="rgba(160,185,240,.6)" strokeWidth="1" strokeDasharray="2 3"/><line x1="166" y1="192" x2="180" y2="192" stroke="rgba(160,185,240,.6)" strokeWidth="1" strokeDasharray="2 3"/></svg><span className="q-pill">Adapted to each company’s needs</span><span className="q5-ll" style={{ top: "38.89%" }}>AI &amp; automation</span><span className="q5-ll" style={{ top: "52.78%" }}>Existing systems</span><span className="q5-ll" style={{ top: "66.67%" }}>Company data &amp; access</span><span className="q5-env" style={{ left: "44.07%" }}>Company A environment</span><span className="q5-env" style={{ left: "67.04%" }}>Company B environment</span><span className="q5-env" style={{ left: "90.00%" }}>Company C environment</span></div>
                <p className="cap">Built within each company’s environment, with documentation and handover for its team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cols2">
          <div className="head" style={{ margin: "0" }}>
            <div className="eyebrow">The operating challenge</div>
            <h2 className="title">An AI priority needs an implementation owner</h2>
          </div>
          <div className="stack-txt">
            <p className="statement">An operating team may know where manual work, fragmented information, or a product gap is limiting progress. The next step requires someone to translate that priority into a workable system, resolve dependencies, and stay accountable through delivery.</p>
            <p>We work with business owners and technical teams to define the use case, assess readiness, and build the capability in the company's environment. Engagements can support the sponsor's own operations or portfolio companies across sectors.</p>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Capabilities</div>
            <h2 className="title">Where Paramount helps</h2>
          </div>
          <div className="blocks">
            <div className="blk">
              <span className="ic">
                <Icon name="gauge" />
              </span>
              <h3>Operating improvement</h3>
              <p>Reduce repeated handling in support, reporting, document workflows, and internal operations. Connect AI to the systems people already use and define where review or approval remains necessary.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="code" />
              </span>
              <h3>Product and engineering execution</h3>
              <p>Add AI to existing products, develop custom applications, and recover stalled initiatives. Forward-deployed engineers work directly with users and technical owners to resolve the gap between prototype and production.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="repeat" />
              </span>
              <h3>Reusable delivery across the portfolio</h3>
              <p>Where requirements overlap, reuse suitable integration patterns, evaluation methods, and delivery practices. Keep each company&#x27;s access, data, scope, and operating responsibilities separate.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Delivery approach</div>
            <h2 className="title">Measurable Implementation &amp; Portfolio Expansion</h2>
          </div>
          <div className="stages">
            <span className="run" aria-hidden="true" />
            <button type="button" className="st">
              <span className="dot">
                <Icon name="chart" />
              </span>
              <span className="box">
                <span className="lbl">Step 1</span>
                <h3>Establish the baseline</h3>
                <p>Understand the current process, volume, effort, cost, and business owner.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="scale" />
              </span>
              <span className="box">
                <span className="lbl">Step 2</span>
                <h3>Prioritize the work</h3>
                <p>Compare expected benefit with readiness, dependencies, and delivery effort.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="blocks" />
              </span>
              <span className="box">
                <span className="lbl">Step 3</span>
                <h3>Build inside the environment</h3>
                <p>Integrate with the company&#x27;s tools and test with the people doing the work.</p>
              </span>
            </button>
            <button type="button" className="st">
              <span className="dot">
                <Icon name="eye" />
              </span>
              <span className="box">
                <span className="lbl">Step 4</span>
                <h3>Review the result</h3>
                <p>Assess the agreed measures and decide whether to improve, expand, or stop.</p>
              </span>
            </button>
          </div>
          <div className="legend-box" style={{ background: "var(--white)" }}>
            <em>Measures</em>
            <div className="chips pale" style={{ maxWidth: "420px" }}>
              <span>Handling time</span>
              <span>Throughput</span>
              <span>Adoption</span>
              <span>Rework</span>
              <span>Service quality</span>
              <span>Operating cost</span>
            </div>
            <p>Measures can include handling time, throughput, adoption, rework, service quality, and operating cost. Savings and financial impact are established from the engagement's own baseline and evidence.</p>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Relevant experience</div>
            <h2 className="title">Selected work</h2>
          </div>
          <div className="cgrid related">
            <RelatedCaseCard n="07" summary="Support engineers can use connected enterprise knowledge and review AI-drafted responses within their existing workflow." />
            <RelatedCaseCard n="49" />
            <RelatedCaseCard n="47" summary="Field submissions translated into structured records, summaries, and management insights through an engagement spanning discovery, integration, testing, and handover." />
          </div>
          <div className="ev-foot" style={{ marginTop: "24px" }}>
            <Link className="link" href="/case-studies">Explore case studies <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="legend-box appr" style={{ background: "var(--white)", marginTop: "0" }}>
            <em>Working with Paramount</em>
            <p>Engagement options include managed implementation, forward-deployed engineering within portfolio-company workstreams, and focused assessments. Paramount establishes clear delivery responsibilities and remains the contracting partner.</p>
            <div className="chips">
              <span>Managed implementation</span>
              <span>Forward-deployed engineering</span>
              <span>Focused assessments</span>
            </div>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Portfolio Engineering &amp; Implementation Support</h2>
              <p>Engagements can address a company-specific challenge or shared requirements across a portfolio. Initial discussions establish an appropriate delivery scope.</p>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss the opportunity <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
