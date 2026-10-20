import CaseCard from "@/components/casestudies/CaseCard";
import { getCaseCard } from "@/lib/case-cards-db";

/**
 * A related case card on a service or industry page: which card is fixed by the page (copied from the
 * reference); its content comes from the CaseCard table. Nothing renders if the card is unpublished.
 */
export default async function RelatedCaseCard({ n, summary }: { n: string; summary?: string }) {
  const card = await getCaseCard(n);
  return card ? <CaseCard card={card} summary={summary} /> : null;
}
