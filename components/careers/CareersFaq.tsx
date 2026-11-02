"use client";

import { useState } from "react";
import Icon from "@/components/site/Icon";

export type FaqItem = { q: string; a: string };

/** The careers FAQ: all rows closed on load, one open at a time (reference careers-behaviour.js). */
export default function CareersFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="g-faq">
      {items.map((it, i) => (
        <div className="g-q" key={it.q}>
          <h3>
            <button type="button" id={`fq${i}`} aria-expanded={open === i} aria-controls={`fa${i}`} onClick={() => setOpen(open === i ? null : i)}>
              <span>{it.q}</span>
              <i className="g-chev">
                <Icon name="chev" />
              </i>
            </button>
          </h3>
          <div className="g-a" id={`fa${i}`} role="region" aria-labelledby={`fq${i}`} hidden={open !== i}>
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
