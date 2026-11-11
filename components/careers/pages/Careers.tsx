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
  { href: "/careers/open-positions/personal-branding-ai-content-specialist", title: "Personal Branding & AI Content Specialist", meta: ["On-site", "Personal Branding & AI Content"] },
  { href: "/careers/open-positions/expression-of-interest", title: "Expressions of Interest", meta: ["Open to profiles", "Forward-deployed and applied AI engineering"] },
];

const FAQ: FaqItem[] = [
  { q: "What roles are available at Paramount Intelligence?", a: "We hire professionals across AI engineering, full-stack development, data engineering, and cloud technologies. Current opportunities and their requirements are listed on our Careers page." },
  { q: "Do I need prior experience in AI, data, or automation to apply?", a: "Requirements vary by role. We value strong technical fundamentals, practical experience, and problem-solving ability over familiarity with every tool or framework." },
  { q: "What is the company culture like?", a: "We value accountability, technical excellence, and open communication. Our teams focus on solving real business problems, taking ownership of their work, and delivering reliable solutions." },
  { q: "What kind of projects will I work on?", a: "You'll work on projects involving AI applications, intelligent agents, data platforms, and cloud solutions for startups, established enterprises, and Fortune 500 organizations." },
  { q: "How can I grow my career at Paramount Intelligence?", a: "Growth comes through hands-on experience, exposure to complex projects, and increasing technical responsibility. Opportunities to take greater ownership depend on your skills, performance, and business needs." },
  { q: "How do I apply?", a: "Apply through the relevant opening on our Careers page. Submit your resume and highlight your technical experience, relevant projects, and key skills." },
  { q: "What is the interview process like?", a: "Our process typically includes an application review, an initial discussion, and a technical interview or practical assessment. We focus on technical skills, problem-solving, and communication." },
  { q: "Can I work across multiple industries?", a: "Yes. Our projects span telecommunications, manufacturing, enterprise software, and other sectors. Assignments depend on your expertise and project requirements." },
  { q: "Do you offer training and development opportunities?", a: "We encourage continuous learning through hands-on projects, technical collaboration, code reviews, and exposure to emerging technologies." },
  { q: "How long does the hiring process take?", a: "Timelines vary by position and interview requirements. We aim to keep the process efficient and communicate next steps clearly throughout." },
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
          <p className="g-lead">Selected Paramount engagements and the prior professional experience of our leadership. Individual case studies describe the relationship and scope. Organization logos do not imply endorsement.</p>
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
