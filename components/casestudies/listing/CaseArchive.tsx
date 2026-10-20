"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import CaseCard from "@/components/casestudies/CaseCard";
import Icon from "@/components/site/Icon";
import type { CaseCardData } from "@/lib/case-cards";

const PER_PAGE = 12;

/**
 * Case study search and paging, as in the reference (case-studies.html and site.js): every word typed must
 * appear in a card's search text; 12 cards a page; the other cards stay in the grid, hidden.
 */
export default function CaseArchive({ cards }: { cards: CaseCardData[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const grid = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return cards.filter((c) => {
      const h = c.search.toLowerCase();
      return words.every((w) => h.includes(w));
    });
  }, [cards, query]);

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = new Set(list.slice((current - 1) * PER_PAGE, current * PER_PAGE));
  const visible = Math.min(PER_PAGE, total - (current - 1) * PER_PAGE);

  const go = (p: number) => {
    setPage(p);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    grid.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const button = (label: string, p: number, disabled: boolean, isCurrent = false) => (
    <button key={label} type="button" disabled={disabled} aria-current={isCurrent ? "page" : undefined} onClick={() => go(p)}>
      {label}
    </button>
  );

  return (
    <>
      <div className="arch-bar">
        <div className="search">
          <label htmlFor="caseSearch">Find relevant work</label>
          <div className="box2">
            <Icon name="search" />
            <input
              id="caseSearch"
              type="search"
              placeholder="Search by challenge, capability, or company"
              autoComplete="off"
              onInput={(e) => {
                setQuery(e.currentTarget.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <p className="count" id="caseCount" aria-live="polite">
          {`Showing ${total ? visible : 0} of ${total} case studies`}
        </p>
      </div>
      <div className="cgrid" id="caseGrid" ref={grid}>
        {cards.map((c) => (
          <CaseCard key={c.n} card={c} hidden={!shown.has(c)} />
        ))}
      </div>
      <div className="empty" id="caseEmpty" hidden={total !== 0}>
        <h3>No matching case studies</h3>
        <p>No case studies match the current search. Broader terms may return additional examples. Paramount also supports requirements beyond the published portfolio.</p>
        <Link className="btn btn-navy" href="/contact-us">Discuss an engagement <span className="arr"><Icon name="arrow" /></span></Link>
      </div>
      <nav className="pager" id="pager" aria-label="Case study pages">
        {pages > 1 && (
          <>
            {button("Previous", current - 1, current === 1)}
            {Array.from({ length: pages }, (_, i) => button(String(i + 1), i + 1, false, i + 1 === current))}
            {button("Next", current + 1, current === pages)}
          </>
        )}
      </nav>
    </>
  );
}
