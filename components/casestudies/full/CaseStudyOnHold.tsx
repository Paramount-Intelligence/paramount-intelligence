import SitePage from "@/components/site/SitePage";
import PageHero from "@/components/site/PageHero";
import Button from "@/components/site/Button";
import ClosingCta from "@/components/site/ClosingCta";
import { getCaseCardByRoute } from "@/lib/case-cards-db";
import { ROUTES } from "@/lib/site-nav";

/** What a case study page shows while its content is held back (lib/case-studies-on-hold.ts): its card's title. */
export default async function CaseStudyOnHold({ route }: { route: string }) {
  const card = await getCaseCardByRoute(route);
  const title = card?.title ?? "Case study";
  return (
    <SitePage>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Case Studies", href: ROUTES.caseStudies }, { label: title }]}
        eyebrow="Case study"
        title={
          <>
            {title}{" "}
            <span className="wip" style={{ verticalAlign: "middle" }}>
              Work in progress
            </span>
          </>
        }
        body="This case study is in progress. The full write-up will be published here when the work is complete."
        ctas={
          <>
            <Button href={ROUTES.caseStudies}>All case studies</Button>
            <Button href={ROUTES.contact} variant="ghost" arrow={false}>
              Discuss a project
            </Button>
          </>
        }
      />
      <ClosingCta />
    </SitePage>
  );
}
