import Link from "next/link";
import Icon from "@/components/site/Icon";

// Page content from docs/website-redesign/reference/about-us.html (the spec). Behaviour: lib/site-behaviours.ts.
export default function AboutUs() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">About Us</span>
              </nav>
              <div className="eyebrow">About us</div>
              <h1>AI Engineering &amp; Consulting with Clear Delivery Accountability</h1>
              <p className="body">Paramount Intelligence is a US-registered AI engineering and consulting firm. We help organizations make technology decisions, build useful capabilities, and resolve the engineering problems that stand between an idea and everyday use.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Work with Paramount <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cols2">
          <div className="stack-txt">
            <div className="eyebrow">Who we are</div>
            <h2 className="title">Consulting judgment. Hands-on engineering.</h2>
            <p className="statement">We bring business understanding and technical execution into the same engagement.</p>
            <div className="chips pale">
              <span>AI agents and applications</span>
              <span>Custom software</span>
              <span>Data engineering</span>
              <span>Cloud infrastructure</span>
              <span>Workflow automation</span>
            </div>
          </div>
          <div className="stack-txt">
            <p>Our work spans AI agents and applications, custom software, data engineering, cloud infrastructure, and workflow automation.</p>
            <p>Clients come to us with different starting points: a product to build, a process to improve, a missing specialist capability, or an application that is not working as intended. We shape the scope around the requirement and define who owns delivery.</p>
            <div className="badges" style={{ gridTemplateColumns: "1fr 1fr", margin: "0" }}>
              <div><Icon name="blocks" />A product to build</div>
              <div><Icon name="flow" />A process to improve</div>
              <div style={{ borderLeft: "0", borderTop: "1px solid var(--line)" }}><Icon name="person" />A missing specialist capability</div>
              <div style={{ borderTop: "1px solid var(--line)" }}><Icon name="wrench" />An application not working as intended</div>
            </div>
            <p>Our forward-deployed engineers work directly with users, executives, product leaders, and engineering teams. Applied R&amp;D informs the technical choices. Clear documentation and handover make the result easier to operate and extend.</p>
          </div>
        </div>
      </section>
      <section className="sec band">
        <div className="wrap">
          <div className="mv">
            <div>
              <div className="eyebrow">Mission</div>
              <p>Help organizations turn important business needs into useful, dependable technology.</p>
            </div>
            <div>
              <div className="eyebrow">Vision</div>
              <p>Be the engineering and consulting firm organizations trust with the work that matters to their operations and customers.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Values</div>
            <h2 className="title">How we work</h2>
          </div>
          <div className="values">
            <div className="val">
              <span className="n">01</span>
              <span className="vic">
                <Icon name="owner" />
              </span>
              <h3>Own the agreed work</h3>
              <p>Make responsibilities clear and stay accountable for progress, decisions, and quality.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">02</span>
              <span className="vic">
                <Icon name="wrench" />
              </span>
              <h3>Engineer for real use</h3>
              <p>Design around actual workflows, data, access, and operating constraints.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">03</span>
              <span className="vic">
                <Icon name="flask" />
              </span>
              <h3>Test the approach</h3>
              <p>Use evidence from evaluation and delivery to guide technology choices.</p>
              <span className="bar2" />
            </div>
            <div className="val">
              <span className="n">04</span>
              <span className="vic">
                <Icon name="eye" />
              </span>
              <h3>Work openly</h3>
              <p>Show progress, raise issues early, and explain trade-offs in language clients can act on.</p>
              <span className="bar2" />
            </div>
          </div>
        </div>
      </section>
      <section className="sec band" id="leadership">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Leadership</div>
            <h2 className="title">The people accountable for your engagement</h2>
          </div>
          <div className="leaders rows">
            <div className="leader">
              <div className="ph">
                <img src="/images/team/ali.jpg" alt="Ali Azzam, Founder and CEO" width="720" height="812" />
              </div>
              <div className="txt">
                <span className="role">Founder &amp; CEO</span>
                <h3>Ali Azzam</h3>
                <p>Ali leads technical direction, architecture, and delivery quality at Paramount. He has designed and shipped production AI systems for Fortune 500, PE-backed, and high-growth companies as well as funded startups, working directly with founders, executives, and engineering teams.</p>
                <p>His experience spans AI agents and multi-agent platforms, enterprise copilots and retrieval, customer-facing AI for a telecom operator with 80M+ subscribers, data engineering and analytics, AWS cloud infrastructure, and workflow automation. He stays hands-on in technical decisions on every engagement.</p>
              </div>
            </div>
            <div className="leader">
              <div className="ph">
                <img src="/images/team/marty.jpg" alt="Marty Kaufman, Founder and Commercial Lead" width="640" height="640" />
              </div>
              <div className="txt">
                <span className="role">Founder &amp; Commercial Lead</span>
                <h3>Marty Kaufman</h3>
                <p>Marty leads client relationships and commercial alignment at Paramount. He brings commercial and executive leadership experience across technology services and is based in the United States, working with client executives to clarify priorities and shape each engagement.</p>
                <p>He coordinates commercial decisions with Paramount's technical leadership, giving clients a clear point of contact for engagement structure, priorities, and ongoing collaboration. His focus is keeping delivery connected to the business result the client set out to achieve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="logos-head">
            <div>
              <div className="eyebrow">Track record</div>
              <h2 className="title" style={{ marginTop: "12px" }}>Selected Engagement &amp; Leadership Experience</h2>
              <p>Our case studies show the context, delivered capability, and outcomes behind the work. They include Paramount engagements and relevant prior experience of our leadership across enterprise, PE-backed, and digital businesses.</p>
            </div>
            <Link className="link" href="/case-studies">Explore our case studies <span className="arr"><Icon name="arrow" /></span></Link>
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
              <img className="tall" src="/images/logos/syngenta.png" alt="Syngenta" />
            </div>
          </div>
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Partner with Paramount Intelligence</h2>
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
              <Link className="btn btn-cyan btn-wide" href="/contact-us">Start a conversation <span className="arr"><Icon name="arrow" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
