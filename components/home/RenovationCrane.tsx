"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/site-nav";

/** On/off switch for the card. Set to false to take it off the homepage when the rebuild is finished. */
export const SHOW_RENOVATION_CRANE = true;

const DISMISSED = "pi-renovation-crane-dismissed";

/**
 * "Pardon the cranes": a small card fixed to the bottom-right of the homepage saying the site is being rebuilt
 * (approved by Ali, 21 Oct 2026; styles `.pm-crane` in site.css). Closing it is remembered in localStorage. It isn't
 * rendered on the server: the flag is read after mount, so a visitor who closed it never sees it flash in.
 */
export default function RenovationCrane() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISSED) !== null;
    } catch {}
    if (SHOW_RENOVATION_CRANE && !dismissed) setOpen(true);
  }, []);

  if (!open) return null;

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {}
  };

  return (
    <div className="pm pm-crane" role="complementary" aria-label="Site under renovation">
      <button className="x" type="button" aria-label="Dismiss" onClick={dismiss}>
        &times;
      </button>
      <div className="sc" aria-hidden="true">
        <svg viewBox="0 0 320 190">
          <line x1="0" y1="182" x2="320" y2="182" stroke="#0f256e" strokeWidth="2" />
          <g stroke="#0f256e" strokeWidth="2" fill="none">
            <path d="M112 182 V34 M124 182 V34" />
            <path d="M112 60 L124 74 M124 60 L112 74 M112 88 L124 102 M124 88 L112 102 M112 116 L124 130 M124 116 L112 130 M112 144 L124 158 M124 144 L112 158" />
          </g>
          <rect x="104" y="20" width="28" height="16" fill="#0f256e" />
          <rect x="108" y="23" width="9" height="8" fill="#09b6f9" />
          <g className="jib">
            <path d="M60 34 H300" stroke="#0f256e" strokeWidth="4" />
            <path d="M118 34 L150 12 L300 34" stroke="#0f256e" strokeWidth="1.5" fill="none" />
            <rect x="62" y="36" width="26" height="14" fill="#646c7e" />
            <g className="hook">
              <line x1="236" y1="36" x2="236" y2="92" stroke="#0f256e" strokeWidth="1.5" />
              <path d="M231 92 h10 l-5 6z" fill="#0f256e" />
              <g className="load">
                <rect x="181" y="98" width="110" height="26" fill="#f5b83d" />
                <text x="236" y="115" textAnchor="middle" fontFamily="Montserrat" fontWeight="700" fontSize="10" fill="#262d3d">
                  COPY REWRITE
                </text>
              </g>
            </g>
          </g>
          <g fontFamily="Montserrat" fontWeight="700" fontSize="10" textAnchor="middle">
            <rect x="181" y="156" width="110" height="26" fill="#3dbe8b" />
            <text x="236" y="173" fill="#fff">DESIGN &#10003;</text>
            <rect x="181" y="130" width="110" height="26" fill="#204ecf" />
            <text x="236" y="147" fill="#fff">20 CASE STUDIES &#10003;</text>
            <g className="placed">
              <rect x="181" y="104" width="110" height="26" fill="#f5b83d" />
              <text x="236" y="121" fill="#262d3d">COPY REWRITE</text>
            </g>
            <rect x="12" y="156" width="84" height="26" fill="none" stroke="#9aa3b8" strokeDasharray="4 3" />
            <text x="54" y="173" fill="#9aa3b8" fontSize="9">OLD LINKS?</text>
          </g>
          <circle className="blink" cx="150" cy="12" r="3" fill="#ff5f57" />
        </svg>
      </div>
      <div className="bd">
        <b>Pardon the cranes.</b>
        <p>
          We&apos;re rebuilding this site in between client work, so a few links still lead nowhere. The case studies are
          finished, and they&apos;re the good part.
        </p>
        <div className="ft">
          <span>Site crew: Ali &amp; Marty</span>
          <Link href={ROUTES.caseStudies}>See them &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
