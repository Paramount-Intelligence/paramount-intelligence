import Link from "next/link";
import CaseCard from "@/components/casestudies/CaseCard";
import Icon from "@/components/site/Icon";
import { caseCard } from "@/lib/case-cards";

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
              <div className="vis">
                <div className="eyebrow">Sponsor and portfolio</div>
                <svg viewBox="0 0 400 260" role="img" aria-label="Sponsor and portfolio companies sharing reusable patterns with separate data">
                  <rect x="120" y="10" width="160" height="40" fill="#0f256e" stroke="#09b6f9" strokeWidth="1.6" />
                  <text className="vt" x="200.0" y="28.0" textAnchor="middle">Sponsor</text>
                  <text className="vs" x="200.0" y="42.0" textAnchor="middle">operating partners</text>
                  <path id="pe0" d="M200 50C200 70 68 70 68 92" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <rect x="14" y="92" width="108" height="76" fill="rgba(10,20,60,.5)" stroke="rgba(160,185,240,.7)" strokeWidth="1.4" />
                  <text className="vs" x="68" y="112" textAnchor="middle">Portfolio company</text>
                  <rect x="26" y="124" width="84" height="6" fill="rgba(160,185,240,.4)" stroke="none" strokeWidth="1.4" />
                  <rect x="26" y="136" width="60" height="6" fill="rgba(160,185,240,.25)" stroke="none" strokeWidth="1.4" />
                  <g transform="translate(98,146)">
                    <rect x="0" y="6" width="14" height="11" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                    <path d="M3 6V3a4 4 0 018 0v3" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                  </g>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.4s" begin="-0.0s" repeatCount="indefinite">
                      <mpath href="#pe0" />
                    </animateMotion>
                  </circle>
                  <path id="pe1" d="M200 50C200 70 198 70 198 92" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <rect x="144" y="92" width="108" height="76" fill="rgba(10,20,60,.5)" stroke="rgba(160,185,240,.7)" strokeWidth="1.4" />
                  <text className="vs" x="198" y="112" textAnchor="middle">Portfolio company</text>
                  <rect x="156" y="124" width="84" height="6" fill="rgba(160,185,240,.4)" stroke="none" strokeWidth="1.4" />
                  <rect x="156" y="136" width="60" height="6" fill="rgba(160,185,240,.25)" stroke="none" strokeWidth="1.4" />
                  <g transform="translate(228,146)">
                    <rect x="0" y="6" width="14" height="11" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                    <path d="M3 6V3a4 4 0 018 0v3" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                  </g>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.4s" begin="-0.5s" repeatCount="indefinite">
                      <mpath href="#pe1" />
                    </animateMotion>
                  </circle>
                  <path id="pe2" d="M200 50C200 70 328 70 328 92" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                  <rect x="274" y="92" width="108" height="76" fill="rgba(10,20,60,.5)" stroke="rgba(160,185,240,.7)" strokeWidth="1.4" />
                  <text className="vs" x="328" y="112" textAnchor="middle">Portfolio company</text>
                  <rect x="286" y="124" width="84" height="6" fill="rgba(160,185,240,.4)" stroke="none" strokeWidth="1.4" />
                  <rect x="286" y="136" width="60" height="6" fill="rgba(160,185,240,.25)" stroke="none" strokeWidth="1.4" />
                  <g transform="translate(358,146)">
                    <rect x="0" y="6" width="14" height="11" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                    <path d="M3 6V3a4 4 0 018 0v3" fill="none" stroke="#f5b83d" strokeWidth="1.4" />
                  </g>
                  <circle r="3" fill="#09b6f9">
                    <animateMotion dur="2.4s" begin="-1.0s" repeatCount="indefinite">
                      <mpath href="#pe2" />
                    </animateMotion>
                  </circle>
                  <rect x="14" y="190" width="368" height="40" fill="rgba(9,182,249,.12)" stroke="#09b6f9" strokeWidth="1.4" />
                  <text className="vt" x="198" y="210" textAnchor="middle">Reusable patterns</text>
                  <text className="vs" x="198" y="224" textAnchor="middle">integration · evaluation · delivery practices</text>
                  <text className="vs" x="390" y="252" textAnchor="end">Each company keeps its own data and access</text>
                </svg>
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
          <div className="cgrid ">
            <CaseCard card={caseCard("07")} summary="Support engineers can use connected enterprise knowledge and review AI-drafted responses within their existing workflow." />
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
