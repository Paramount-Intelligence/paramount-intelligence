"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/site/Icon";
import ApplicationForm from "./ApplicationForm";
import "./careers.css";

const CAREERS = "/careers/open-positions";

type JobPageProps = {
  /** Used for the tab and panel ids. */
  id: string;
  title: string;
  /** The details column: label and value pairs. */
  details: [string, string][];
  /** The Overview tab's content, before the "Apply for this Job" button. */
  overview: ReactNode;
  /** Preselected "Area of expertise" ("" for none). */
  area?: string;
};

/**
 * A standalone job page (no site header or footer), from the reference (careers-revamp/reference/careers-redesign.html):
 * a top bar with the back arrow and the logo, the title, the details column, and Overview and Application tabs.
 */
export default function JobPage({ id, title, details, overview, area }: JobPageProps) {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus = false) => {
    setTab(i);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = { ArrowRight: (i + 1) % 2, ArrowLeft: (i + 1) % 2, Home: 0, End: 1 }[e.key];
    if (n === undefined) return;
    e.preventDefault();
    select(n, true);
  };
  const apply = () => {
    select(1, true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="pi-page j-page">
      <header className="j-top">
        <Link className="j-back" href={`${CAREERS}#open-roles`} aria-label="Back to open positions">
          <Icon name="arrow" />
        </Link>
        <Link className="brand j-logo" href={CAREERS} aria-label="Paramount Intelligence careers">
          <img src="/images/logo-mark.png" alt="" width={28} height={38} />
          <b>
            <span className="b1">Paramount</span>
            <span className="b2">Intelligence</span>
          </b>
        </Link>
      </header>
      <main className="j-wrap">
        <h1 className="j-title">{title}</h1>
        <div className="j-grid">
          <aside className="j-meta">
            <dl>
              {details.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="j-main">
            <div className="j-tabs" role="tablist" aria-label={title}>
              {["Overview", "Application"].map((label, i) => (
                <button
                  key={label}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-t${i + 1}`}
                  aria-controls={`${id}-p${i + 1}`}
                  aria-selected={tab === i}
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="j-panel" role="tabpanel" id={`${id}-p1`} aria-labelledby={`${id}-t1`} hidden={tab !== 0}>
              {overview}
              <button className="btn btn-cyan j-apply" type="button" onClick={apply}>
                Apply for this Job{" "}
                <span className="arr">
                  <Icon name="arrow" />
                </span>
              </button>
            </div>
            <div className="j-panel" role="tabpanel" id={`${id}-p2`} aria-labelledby={`${id}-t2`} hidden={tab !== 1}>
              <ApplicationForm role={title} area={area} />
            </div>
          </div>
        </div>
      </main>
      <footer className="j-foot">
        &copy; 2026 Paramount Intelligence <span aria-hidden="true">&middot;</span> <Link href={CAREERS}>Careers</Link>
      </footer>
    </div>
  );
}
