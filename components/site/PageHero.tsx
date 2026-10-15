import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  crumbs?: Crumb[];
  eyebrow?: string;
  /** Wrap words in <i> for the cyan accent. */
  title: ReactNode;
  body?: ReactNode;
  /** Buttons, usually <Button>s. */
  ctas?: ReactNode;
  /** Right-hand visual panel. Without it the hero is single-column (`solo`). */
  visual?: ReactNode;
};

/** Inner-page hero: dark gradient with the 56px grid (reference `.phero`). */
export default function PageHero({ crumbs, eyebrow, title, body, ctas, visual }: PageHeroProps) {
  return (
    <section className="phero">
      <div className="wrap">
        <div className={visual ? "phero-grid" : "phero-grid solo"}>
          <div className="pcopy">
            {crumbs && crumbs.length > 0 && (
              <nav className="crumb" aria-label="Breadcrumb">
                {crumbs.map((c, i) => (
                  <Fragment key={`${c.label}-${i}`}>
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  </Fragment>
                ))}
              </nav>
            )}
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1>{title}</h1>
            {body && <p className="body">{body}</p>}
            {ctas && <div className="ctas">{ctas}</div>}
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}

/** Homepage hero shell (reference `.hero`): same gradient and grid; content is page-specific. */
export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <section className="hero">
      <div className="wrap">{children}</div>
    </section>
  );
}
