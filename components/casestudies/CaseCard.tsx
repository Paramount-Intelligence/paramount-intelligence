import Link from "next/link";
import Icon from "@/components/site/Icon";
import { ROUTES } from "@/lib/site-nav";
import type { CaseCardData } from "@/lib/case-cards";

type CaseCardProps = {
  card: CaseCardData;
  /** Some pages describe a case in their own words (industry pages). */
  summary?: string;
};

function tabs(card: CaseCardData) {
  if (!card.fullCaseStudy && !card.workInProgress) return "";
  return (
    '<span class="tabs">' +
    (card.fullCaseStudy ? '<span class="live">Full case study</span>' : "") +
    (card.workInProgress ? '<span class="wip">Work in progress</span>' : "") +
    "</span>"
  );
}

/** Reference `.ccard`: the drawing on a grey panel, then organisation, industry, title, summary and tags. */
export default function CaseCard({ card, summary }: CaseCardProps) {
  return (
    <Link className="ccard pc" href={card.route ?? ROUTES.caseStudies} data-search={card.search}>
      <div className="art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: card.art + tabs(card) }} />
      <div className="in">
        <div className="meta">
          <b>{card.org}</b>
          <span>{card.industry}</span>
        </div>
        <h3>{card.title}</h3>
        <p>{summary ?? card.summary}</p>
        <div className="tech">
          {card.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="link">
          Read case study <span className="arr"><Icon name="arrow" /></span>
        </span>
      </div>
    </Link>
  );
}
