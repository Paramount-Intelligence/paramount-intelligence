import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/site/Icon";
import { ROUTES } from "@/lib/site-nav";

// The Privacy Policy approved by Ali (22 Oct 2026), word for word. Layout: .legal-wrap in app/site.css.

type Block = { p: ReactNode } | { ul: ReactNode[] } | { note: string };
type Section = { id: string; title: string; body: Block[] };

const contactLink = <Link href={ROUTES.contact}>contact us</Link>;
const label = (b: string, text: string) => (
  <>
    <b>{b}</b> {text}
  </>
);

/** The policy's sections, in order. The "On this page" menu is built from the same list. */
const SECTIONS: Section[] = [
  {
    id: "glossary",
    title: "I. Glossary",
    body: [
      {
        ul: [
          label("Personal data:", "any information that relates to an identified or identifiable person, such as a name or an email address."),
          label("Processing:", "any operation performed on personal data, such as collecting, storing, using, sharing, or deleting it."),
          label("Data controller:", "Paramount Intelligence, which decides how and why your personal data is processed."),
        ],
      },
    ],
  },
  {
    id: "whose-data",
    title: "II. Whose personal data we process",
    body: [
      { p: "We may process your personal data if:" },
      {
        ul: [
          "You are a client, potential client, or supplier.",
          "You work for an organization that uses our services.",
          "You contact us through our website, by email, or through other channels.",
          "You take part in our recruitment process.",
        ],
      },
    ],
  },
  {
    id: "when",
    title: "III. When we process your data",
    body: [
      { p: "We may process your data in the following situations:" },
      {
        ul: [
          "When you contact us about our services.",
          "When you submit a form on our website.",
          "When you are a client or partner, to perform a contract or project.",
          "When you have made your professional details publicly available, for example on LinkedIn, or someone has referred you to us.",
        ],
      },
    ],
  },
  {
    id: "collected",
    title: "IV. What personal data we collect",
    body: [
      { p: "We collect personal data such as:" },
      {
        ul: [
          "Name, email address, phone number, and company details.",
          "Job title and professional qualifications.",
          "Communications between you and us, such as emails and calls.",
          "Other details relevant to your business with us.",
        ],
      },
    ],
  },
  {
    id: "use",
    title: "V. How we use your data",
    body: [
      { p: "We may use your personal data to:" },
      {
        ul: [
          "Respond to your enquiries and provide relevant information about our services.",
          "Manage and carry out contracts and business agreements.",
          "Improve our website and services.",
          "Consider you for a role when you apply to work with us.",
        ],
      },
    ],
  },
  {
    id: "legal-basis",
    title: "VI. Why we may process your data",
    body: [
      { p: "We process your personal data on the following grounds:" },
      {
        ul: [
          label("Contract:", "to provide our services or perform a contract with you."),
          label("Consent:", "where you have agreed to it, for example by submitting a form."),
          label("Legitimate interests:", "to run our business, respond to enquiries, and improve our services."),
          label("Legal obligation:", "to meet our tax and record-keeping duties under US law."),
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "VII. How long we keep your data",
    body: [
      {
        p: "We keep your personal data only for as long as we need it to provide our services or meet our obligations. After that, we delete it, unless we must keep it for legal or tax reasons. Client records may be kept for up to seven years.",
      },
    ],
  },
  {
    id: "access",
    title: "VIII. Who has access to your data",
    body: [
      { p: "Your personal data may be shared with:" },
      {
        ul: [
          "Authorized members of the Paramount Intelligence team.",
          "Service providers that help us run our website and services, such as hosting and email providers. They may use it only to provide those services to us.",
          "Authorities, where the law requires it.",
        ],
      },
      { note: "We do not sell or share your personal information." },
    ],
  },
  {
    id: "cookies",
    title: "IX. Cookies and similar technologies",
    body: [
      {
        p: "Our website uses only what it needs to work and to show us, in aggregate, how it is used. We do not use cookies for advertising or targeted marketing.",
      },
      {
        ul: [
          "Our website analytics count visits and page views without identifying you.",
          "Your browser may remember small preferences, such as whether you have closed a notice on our homepage.",
        ],
      },
      { p: "You can manage cookies and stored site data through your browser settings." },
    ],
  },
  {
    id: "rights",
    title: "X. Your privacy rights",
    body: [
      { p: "Depending on where you live in the United States, you may have the right to:" },
      {
        ul: [
          label("Access:", "ask for a copy of the personal data we hold about you."),
          label("Correction:", "ask us to correct personal data that is inaccurate."),
          label("Deletion:", "ask us to delete your personal data."),
          label("Limit use:", "ask us to limit how we use your personal data."),
          label("Portability:", "ask for your data in a structured format that can be moved to another service."),
          label("Objection:", "object to how we process your personal data for certain purposes."),
        ],
      },
      {
        p: (
          <>
            To use any of these rights, {contactLink}. We will not treat you differently for doing so.
          </>
        ),
      },
    ],
  },
  {
    id: "changes",
    title: "XI. Changes to this policy",
    body: [
      {
        p: "We may update this Privacy Policy from time to time to reflect changes in our practices or the law. Any updates will be posted on this page.",
      },
    ],
  },
  {
    id: "contact",
    title: "XII. Contact us",
    body: [
      {
        p: <>If you have questions about this policy or how we handle your personal data, please {contactLink}.</>,
      },
    ],
  },
];

function renderBlock(block: Block, i: number) {
  if ("note" in block) return <p key={i} className="lnote">{block.note}</p>;
  if ("ul" in block)
    return (
      <ul key={i} className="lul">
        {block.ul.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  return <p key={i}>{block.p}</p>;
}

export default function PrivacyPolicy() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="phero-grid solo">
            <div className="pcopy">
              <nav className="crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Privacy Policy</span>
              </nav>
              <div className="eyebrow">Legal</div>
              <h1>Privacy Policy</h1>
              <p className="body">How Paramount Intelligence collects, uses, and protects personal data.</p>
              <div className="ctas">
                <Link className="btn btn-cyan" href={ROUTES.contact}>Contact us <span className="arr"><Icon name="arrow" /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="legal-wrap">
            <nav className="toc" aria-label="Policy sections">
              <b>On this page</b>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.title}</a>
              ))}
            </nav>
            <div>
              <section className="lsec lintro" id="intro">
                <p>This Privacy Policy explains how Paramount Intelligence (“we”, “us”) collects, uses, and protects personal data when you visit our website or work with us.</p>
              </section>
              {SECTIONS.map((s) => (
                <section key={s.id} className="lsec" id={s.id}>
                  <h2>{s.title}</h2>
                  {s.body.map(renderBlock)}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
