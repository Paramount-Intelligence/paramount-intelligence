import Link from "next/link";
import Icon, { type IconName } from "@/components/site/Icon";
import CareersFaq, { type FaqItem } from "@/components/careers/CareersFaq";
import CareersScrollIn from "@/components/careers/CareersScrollIn";
import "@/components/careers/careers.css";

// Page content from docs/website-redesign/reference/careers-revamp/ (reference/content.md, the copy, and
// reference/careers-redesign.html, the layout). The role pages are components/careers/JobPage.tsx.

const LOGOS: { src: string; alt: string; cls?: string }[] = [
  { src: "aramco", alt: "Saudi Aramco", cls: "tall" },
  { src: "donaldson", alt: "Donaldson" },
  { src: "alibaba", alt: "Alibaba.com" },
  { src: "veon", alt: "VEON", cls: "small" },
  { src: "schneider", alt: "Schneider Electric", cls: "tall" },
  { src: "toptal", alt: "Toptal", cls: "small" },
  { src: "davidson", alt: "Davidson" },
  { src: "truecontext", alt: "TrueContext" },
  { src: "flexagon", alt: "Flexagon" },
  { src: "syngenta", alt: "Syngenta" },
];

const AREAS: { icon: IconName; title: string; body: string }[] = [
  { icon: "agent", title: "Forward-deployed AI engineering", body: "Work with client stakeholders on discovery, prototyping, integration, evaluation, and deployment." },
  { icon: "code", title: "Software and platform engineering", body: "Build applications, APIs, internal tools, and the systems that support them." },
  { icon: "db", title: "Data and analytics", body: "Improve data flows, reporting, and the foundations for AI applications." },
  { icon: "check", title: "Quality and production delivery", body: "Test behavior, investigate failures, and improve release and operating practices." },
];

const STEPS: { title: string; body: string }[] = [
  { title: "Application review", body: "We review your background, experience, and problem-solving exposure, then hold a focused conversation about your goals and expectations, and give you clarity on our work, standards, and environment." },
  { title: "Practical or technical assessment", body: "Depending on the role, you complete a structured assessment based on real-world scenarios across AI, data, cloud, automation, or platform engineering. We look for ownership, judgment, and clear communication." },
  { title: "Technical or strategy interview", body: "A deep discussion with senior engineers or consultants on structured thinking, technical depth, and problem-solving approach. You also meet potential team members and discuss how you collaborate." },
  { title: "Final decision", body: "We provide clear feedback at the end of the process and extend an offer if there is strong mutual alignment. We then agree the role, team, and start details with you." },
];

const ROLES: { href: string; title: string; meta: [string, string] }[] = [
  { href: "/careers/open-positions/ai-engineer", title: "AI Engineer", meta: ["Remote, US only", "Applied AI"] },
  { href: "/careers/open-positions/full-stack-engineer", title: "Full Stack Engineer", meta: ["Remote, US only", "Software & Product Engineering"] },
  { href: "/careers/open-positions/expression-of-interest", title: "Expressions of Interest", meta: ["Open to profiles", "Forward-deployed and applied AI engineering"] },
];

const FAQ: FaqItem[] = [
  { q: "What roles are available at Paramount Intelligence?", a: "Current openings are listed on this page with the team and location for each role. Our priority areas are forward-deployed AI engineering and applied AI engineering." },
  { q: "Do I need prior experience in AI, data, or automation to apply?", a: "Experience in AI or data is valuable, and each listing describes what the role requires. We also welcome candidates from other technical backgrounds who can show relevant delivered work." },
  { q: "What is the company culture like?", a: "We value ownership, engineering judgment, clear communication, and evidence. Engineers work close to client users, product leaders, and the systems where the work needs to run." },
  { q: "What kind of projects will I work on?", a: "Client and internal engineering work across AI agents and retrieval, software and platform engineering, data and analytics, and quality and production delivery, from requirements through release and handover." },
  { q: "How can I grow my career at Paramount Intelligence?", a: "You take responsibility for business-critical work from requirements through delivery and handover, working alongside experienced engineers and the founders, who stay hands-on in architecture and quality." },
  { q: "How do I apply?", a: "Open a role below and use its Application tab. If no current role fits, submit an expression of interest. Include examples of systems you have built or improved, and exclude confidential client information." },
  { q: "What is the interview process like?", a: "Our process typically includes a screening call, followed by interviews with team members or hiring managers. Depending on the role, there may be a technical assessment or case study." },
  { q: "Can I work across multiple industries?", a: "Yes. Our client work spans sectors such as enterprise software, telecom, industrial automation, and life sciences, depending on current engagements." },
  { q: "Do you offer training and development opportunities?", a: "Most learning happens through delivery: real client systems, code and architecture reviews, and evaluation work with experienced colleagues." },
  { q: "How long does the hiring process take?", a: "It depends on the role and the number of candidates. We keep you informed throughout the process." },
];

const explore = (
  <a className="btn btn-cyan" href="#open-roles">
    Explore opportunities{" "}
    <span className="arr">
      <Icon name="arrow" />
    </span>
  </a>
);

export default function Careers() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Careers</span>
              </nav>
              <div className="eyebrow">Careers</div>
              <h1>Careers in AI &amp; Engineering</h1>
              <p className="body">Paramount offers opportunities to contribute to business-critical work requiring technical judgment and hands-on engineering. Our engagements bring engineers close to client users, product leaders, and the systems where the work needs to run.</p>
              <div className="ctas">{explore}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="g-sec g-logos">
        <div className="wrap">
          <h2 className="g-h2">Experience across enterprise and digital businesses</h2>
          <p className="g-lead">Selected Paramount engagements and the prior professional experience of our leadership. Individual case studies describe the relationship and scope.</p>
        </div>
        <div className="wrap">
          <div className="lwall" aria-label="Organizations">
            {LOGOS.map((l) => (
              <div className="lw" key={l.src}>
                <img className={l.cls} src={`/images/logos/${l.src}.png`} alt={l.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="g-sec g-band">
        <div className="wrap">
          <header className="g-head">
            <h2 className="g-h2">Where you could contribute</h2>
            <p className="g-lead">We look for people who can understand a problem, build the solution, and take responsibility for the work.</p>
          </header>
          <div className="g-cards">
            {AREAS.map((c) => (
              <article className="g-card" key={c.title}>
                <span className="g-ic">
                  <Icon name={c.icon} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="g-sec" id="process">
        <div className="wrap">
          <header className="g-head">
            <h2 className="g-h2">Our hiring process</h2>
            <p className="g-lead">A structured, transparent process designed to assess capability, alignment, and long-term potential.</p>
          </header>
          <ol className="g-steps">
            {STEPS.map((s, i) => (
              <li className="g-step" key={s.title}>
                <span className="g-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="g-center">{explore}</div>
        </div>
      </section>
      <section className="g-sec g-band g-open" id="open-roles">
        {/* Earlier links (/careers/open-positions#opportunities and #register-interest) land here too. */}
        <span className="g-anchor" id="opportunities" />
        <span className="g-anchor" id="register-interest" />
        <div className="wrap">
          <header className="g-head">
            <h2 className="g-h2">Open positions</h2>
            <p className="g-lead">Our priority areas are forward-deployed AI engineering and applied AI engineering. Current openings are listed only when the role and hiring requirements are confirmed.</p>
          </header>
          <div className="g-roles">
            {ROLES.map((r) => (
              <Link className="g-role" href={r.href} key={r.href}>
                <h3>{r.title}</h3>
                <p>
                  {r.meta[0]} <span aria-hidden="true">&bull;</span> {r.meta[1]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="g-sec" id="faq">
        <div className="wrap">
          <header className="g-head">
            <h2 className="g-h2">Frequently asked questions</h2>
          </header>
          <CareersFaq items={FAQ} />
        </div>
      </section>
      <CareersScrollIn />
    </>
  );
}
