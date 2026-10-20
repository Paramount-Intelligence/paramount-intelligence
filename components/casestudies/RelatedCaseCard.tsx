import CaseCard from "@/components/casestudies/CaseCard";
import { getCaseCard, getOffSiteCaseCard } from "@/lib/case-cards-db";

/**
 * A related case card on a service or industry page: which card is fixed by the page; its content comes from the
 * CaseCard table. Nothing renders if the card is unpublished. `offSite`: a card taken off the website that this page
 * still shows, as work in progress with no link (lib/removed-case-studies.ts).
 */
export default async function RelatedCaseCard({ n, summary, offSite }: { n: string; summary?: string; offSite?: boolean }) {
  if (offSite) {
    const card = await getOffSiteCaseCard(n);
    return card ? <CaseCard card={card} summary={summary} linkless /> : null;
  }
  const card = await getCaseCard(n);
  return card ? <CaseCard card={card} summary={summary} /> : null;
}
