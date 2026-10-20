import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/industries.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function IndustriesOverview() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Industries</span>
              </nav>
              <div className="eyebrow">Industries</div>
              <h1>AI &amp; Engineering Across Business Environments</h1>
              <p className="body">Business objectives, ownership structures, and operating models shape the requirements for AI implementation. Paramount supports private equity firms and digital businesses with consulting and engineering tailored to these requirements.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss an initiative <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Two areas of focus</div>
            <h2 className="title">Where we focus</h2>
          </div>
          <div className="aud2">
            <Link className="acard" href="/industries/private-equity">
              <div className="top" aria-hidden="true">
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
              <div className="in">
                <div className="eyebrow">Sponsors and portfolio companies</div>
                <h3>Private Equity</h3>
                <p>Turn operating priorities into working capabilities across the firm and its portfolio. We help identify the right work, deliver it inside existing systems, and define how progress will be measured.</p>
                <span className="link">Explore private equity <span className="arr"><Icon name="arrow" /></span></span>
              </div>
            </Link>
            <Link className="acard" href="/industries/digital-natives">
              <div className="top" aria-hidden="true">
                <svg viewBox="0 0 400 250" role="img" aria-label="Product capability moving from prototype to release with regular demos and regression checks">
                  <path d="M20 70H380" fill="none" stroke="rgba(160,185,240,.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="dn0" d="M20 70H380" fill="none" stroke="#09b6f9" strokeWidth="2" strokeDasharray="360" strokeDashoffset="0" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="70" r="9" fill="#0f256e" stroke="#09b6f9" strokeWidth="2" />
                  <text className="vt" x="20" y="44" textAnchor="start">Prototype</text>
                  <circle cx="140" cy="70" r="9" fill="#0f256e" stroke="#09b6f9" strokeWidth="2" />
                  <text className="vt" x="140" y="44" textAnchor="middle">Integrate</text>
                  <circle cx="260" cy="70" r="9" fill="#0f256e" stroke="#09b6f9" strokeWidth="2" />
                  <text className="vt" x="260" y="44" textAnchor="middle">Evaluate</text>
                  <circle cx="380" cy="70" r="9" fill="#3dbe8b" stroke="#3dbe8b" strokeWidth="2" />
                  <text className="vt" x="380" y="44" textAnchor="end">Release</text>
                  <circle r="4" fill="#ffffff">
                    <animateMotion dur="4s" begin="0s" repeatCount="indefinite">
                      <mpath href="#dn0" />
                    </animateMotion>
                  </circle>
                  <text className="vk" x="20" y="116" textAnchor="start">REGULAR DEMOS</text>
                  <path d="M30 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M72 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M114 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M156 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M198 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M240 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M282 128l7 12h-14z" fill="#09b6f9" />
                  <path d="M324 128l7 12h-14z" fill="rgba(160,185,240,.3)" />
                  <path d="M366 128l7 12h-14z" fill="rgba(160,185,240,.3)" />
                  <text className="vk" x="20" y="172" textAnchor="start">REGRESSION CHECKS</text>
                  <rect x="24" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M33 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="66" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M75 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="108" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M117 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="150" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M159 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="192" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M201 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="234" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M243 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="276" y="182" width="30" height="22" fill="rgba(61,190,139,.2)" stroke="#3dbe8b" strokeWidth="1.4" />
                  <path d="M285 193l4 4 8-8" fill="none" stroke="#3dbe8b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="318" y="182" width="30" height="22" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" strokeDasharray="3 3" />
                  <rect x="360" y="182" width="30" height="22" fill="none" stroke="rgba(160,185,240,.55)" strokeWidth="1.4" strokeDasharray="3 3" />
                  <text className="vs" x="380" y="236" textAnchor="end">Aligned with the product roadmap</text>
                </svg>
              </div>
              <div className="in">
                <div className="eyebrow">Software and digital businesses</div>
                <h3>Digital Natives</h3>
                <p>Build AI into the product and strengthen the engineering around it. We work with software companies, marketplaces, digital platforms, and funded startups to ship useful capabilities and resolve delivery gaps.</p>
                <span className="link">Explore digital natives <span className="arr"><Icon name="arrow" /></span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap cols2">
          <div className="head" style={{ margin: "0" }}>
            <div className="eyebrow">Our approach</div>
            <h2 className="title">A focused starting point, with broad engineering support</h2>
          </div>
          <div className="stack-txt">
            <p className="lead">These pages highlight two areas of focus. We also work with Fortune 500 organizations, mid-market businesses, and consulting firms across sectors. Engagements are defined by business and technical requirements rather than industry classification alone.</p>
            <div className="chips">
              <span>Private equity firms</span>
              <span>Portfolio companies</span>
              <span>Digital businesses</span>
              <span>Fortune 500 organizations</span>
              <span>Mid-market businesses</span>
              <span>Consulting firms</span>
            </div>
            <div>
              <Link className="btn btn-navy" href="/services">Explore all services <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Engineering Aligned with Business Priorities</h2>
              <p>Share the workflow, product, or technical challenge. We will help define the scope and the people needed to deliver it.</p>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Talk to Paramount <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
