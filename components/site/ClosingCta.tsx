import Link from "next/link";
import type { ReactNode } from "react";
import Button from "./Button";
import { ROUTES } from "@/lib/site-nav";

type ClosingCtaProps = {
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  /** "View all case studies" under the button, as on the case study pages. */
  backToCaseStudies?: boolean;
};

const STEPS = ["Your business objective", "The technical context", "The right next step"];

/** Closing section with the "What a first conversation covers" card. Defaults are the homepage copy. */
export default function ClosingCta({
  eyebrow = "Start a conversation",
  title = "Discuss an AI or Engineering Initiative",
  body = "Paramount supports technology decisions, focused engineering assignments, and end-to-end delivery engagements. An initial discussion establishes the business objective, technical context, and appropriate next step.",
  ctaLabel = "Discuss a project",
  ctaHref = ROUTES.contact,
  backToCaseStudies = false,
}: ClosingCtaProps) {
  return (
    <section className="close">
      <div className="wrap">
        <div className="cta-card">
          <div className="cta-l">
            <div className="eyebrow">{eyebrow}</div>
            <h2>{title}</h2>
            {body && <p>{body}</p>}
          </div>
          <div className="cta-r">
            <span className="cta-k">What a first conversation covers</span>
            <ol className="cta-steps">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <Button href={ctaHref} wide>
              {ctaLabel}
            </Button>
            {backToCaseStudies && (
              <Link className="cta-back" href={ROUTES.caseStudies}>
                View all case studies &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
