import Link from "next/link";
import CaseArchive from "@/components/casestudies/listing/CaseArchive";
import Icon from "@/components/site/Icon";
import { getCaseCards } from "@/lib/case-cards-db";

// Page content from docs/website-redesign/reference/case-studies.html (the spec). Search and paging: CaseArchive.
export default async function CaseStudiesPage() {
  const cards = await getCaseCards();
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Case Studies</span>
              </nav>
              <div className="eyebrow">Case studies</div>
              <h1>AI &amp; Engineering Case Studies</h1>
              <p className="body">Explore how business requirements became applications, connected workflows, and usable information. Each case explains the problem, the engineering, and what the team could do afterward.</p>
              <p style={{ fontSize: ".86rem", color: "var(--on-dark-2)", maxWidth: "62ch" }}>Our experience includes Paramount engagements and prior work by our leadership. Individual cases identify the relevant context.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href="/contact-us">Discuss a project <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec band" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <CaseArchive cards={cards} />
        </div>
      </section>
      <section className="close">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-l">
              <div className="eyebrow">Start a conversation</div>
              <h2>Facing a similar challenge?</h2>
              <p>Paramount supports similar challenges through consulting, specialist engineering, and managed delivery. An initial discussion establishes the objective, environment, and appropriate scope.</p>
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
