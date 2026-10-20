import Link from "next/link";
import RelatedCaseCard from "@/components/casestudies/RelatedCaseCard";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/industries-digital-natives.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function DigitalNatives() {
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
                <span aria-current="page">Digital Natives</span>
              </nav>
              <div className="eyebrow">Digital Natives</div>
              <h1>Turn the AI roadmap into released product capabilities</h1>
              <p className="body">Paramount develops AI-enabled product capabilities and the engineering foundations required to support them. We work with software businesses, SaaS companies, marketplaces, digital platforms, and funded startups from discovery through integrated release.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a product initiative <span className="arr"><Icon name="arrow" /></span></Link>
                <Link className="btn btn-ghost" href="/case-studies">See our work </Link>
              </div>
            </div>
            <div>
              <div className="vis">
                <div className="eyebrow">From roadmap to release</div>
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
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cols2">
          <div className="head" style={{ margin: "0" }}>
            <div className="eyebrow">The product challenge</div>
            <h2 className="title">A working prototype is only the start</h2>
          </div>
          <div className="stack-txt">
            <p className="statement">The challenge may be a new agent workflow, unreliable retrieval, disconnected customer data, or a prototype that cannot yet ship.</p>
            <p>We work alongside client product and engineering teams to address the missing capability while keeping the release aligned with the product roadmap.</p>
            <div className="chips">
              <span>New agent workflow</span>
              <span>Unreliable retrieval</span>
              <span>Disconnected customer data</span>
              <span>Prototype that cannot yet ship</span>
            </div>
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
                <Icon name="spark" />
              </span>
              <h3>AI Product Development</h3>
              <p>Build search, copilots, recommendations, document workflows, and agent actions around user tasks. Connect the feature to the product&#x27;s identity, data, and services so it belongs in the experience.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="wrench" />
              </span>
              <h3>Prototype Recovery &amp; Production Integration</h3>
              <p>Review experimental applications and AI-generated code. Resolve integration, data handling, evaluation, performance, and deployment issues before broader use.</p>
            </div>
            <div className="blk">
              <span className="ic">
                <Icon name="layers" />
              </span>
              <h3>Product &amp; Platform Foundations</h3>
              <p>Strengthen APIs, data flows, release automation, monitoring, and documentation. Documentation and handover enable client teams to operate and extend the system.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cols2">
          <div className="stack-txt">
            <div className="eyebrow">How we work with client teams</div>
            <h2 className="title">Forward-Deployed Collaboration &amp; Delivery Ownership</h2>
            <p>We clarify the problem with product owners, prototype where it reduces uncertainty, and build against a scoped release plan. Regular demos expose issues early. Evaluation and regression checks help client teams assess changes before release.</p>
            <p>Our R&amp;D team tests relevant models and tools so technical choices reflect the application's requirements. We discuss limitations and operating costs alongside the feature's potential.</p>
          </div>
          <div className="stack" style={{ gridTemplateColumns: "1fr" }}>
            <div className="stack-l">
              <div className="layer"><Icon name="search" />Clarify the problem with product owners</div>
              <div className="layer"><Icon name="flask" />Prototype where it reduces uncertainty</div>
              <div className="layer"><Icon name="target" />Build against a scoped release plan</div>
              <div className="layer"><Icon name="play" />Regular demos expose issues early</div>
              <div className="layer"><Icon name="check" />Evaluation and regression checks before release</div>
            </div>
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
            <RelatedCaseCard n="12" summary="Product discovery, comparison, and cart workflows connected in a conversational application." />
            <RelatedCaseCard n="07" summary="Enterprise knowledge and ticket intelligence integrated into support operations." />
            <RelatedCaseCard n="47" summary="AI transforms field-service submissions into structured records, summaries, and management insights inside a SaaS workflow." />
          </div>
          <div className="ev-foot" style={{ marginTop: "24px" }}>
            <Link className="link" href="/case-studies">Explore case studies <span className="arr"><Icon name="arrow" /></span></Link>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cols2">
          <div className="stack-txt">
            <div className="eyebrow">Measures and engagement</div>
            <h2 className="title">Success measured for your product</h2>
            <p>Success depends on the product and use case. We agree measures such as task completion, feature adoption, response quality, release lead time, support effort, and cost per interaction.</p>
            <div className="chips pale">
              <span>Task completion</span>
              <span>Feature adoption</span>
              <span>Response quality</span>
              <span>Release lead time</span>
              <span>Support effort</span>
              <span>Cost per interaction</span>
            </div>
          </div>
          <div className="legend-box" style={{ background: "var(--white)", marginTop: "0", gridTemplateColumns: "1fr" }}>
            <em>Ways to engage</em>
            <p>Engagements can involve a single forward-deployed engineer, a managed workstream, or an ongoing engineering partnership. We coordinate with internal client teams and document the work for continued ownership.</p>
            <div className="chips">
              <span>Forward-deployed engineer</span>
              <span>Managed workstream</span>
              <span>Ongoing partnership</span>
            </div>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Integrated AI Capabilities for the Product Roadmap</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Discuss product delivery <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
