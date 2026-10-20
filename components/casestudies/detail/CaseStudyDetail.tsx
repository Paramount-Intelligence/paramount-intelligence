import type { ReactNode } from "react";
import type { CaseStudy } from "@prisma/client";
import Button from "@/components/site/Button";
import ClosingCta from "@/components/site/ClosingCta";
import PageHero from "@/components/site/PageHero";
import { getCaseCardByRoute } from "@/lib/case-cards-db";
import { ROUTES } from "@/lib/site-nav";

type Item = { title: string; description: string };

/** A field with content: placeholders such as "N/A" count as empty. */
const has = (v?: string | null): v is string => !!v && !/^(n\/?a|-+|—|tbd)?$/i.test(v.trim());

/** Plain text from /admin: paragraphs, and lines starting with •, -, * or > as "+" notes. */
function Text({ text }: { text?: string | null }) {
  if (!has(text)) return null;
  const blocks: ReactNode[] = [];
  let items: string[] = [];
  const flush = (key: number) => {
    if (!items.length) return;
    blocks.push(
      <ul key={`ul-${key}`}>
        {items.map((it, i) => (
          <li key={i}>
            <b className="plus">+</b>
            <span>{it}</span>
          </li>
        ))}
      </ul>,
    );
    items = [];
  };
  text.split("\n").forEach((line, i) => {
    const t = line.trim();
    const bullet = t.match(/^[•\-*>]\s+(.*)/);
    if (bullet) return void items.push(bullet[1]);
    flush(i);
    if (t) blocks.push(<p key={i}>{t}</p>);
  });
  flush(-1);
  return <div className="cd-text">{blocks}</div>;
}

const items = (v: unknown): Item[] =>
  Array.isArray(v) ? (v as Item[]).filter((x) => x && (has(x.title) || has(x.description))) : [];

/**
 * A case study without a full page, from the CaseStudy table (managed in /admin), in the redesign's style:
 * hero, client strip, "In a nutshell", numbered chapters for the fields that have content, closing card.
 */
export default async function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const card = await getCaseCardByRoute(`/case-studies/${cs.slug}`);
  const facts = [
    ["Client", cs.clientName],
    ["Industry", cs.clientIndustry || cs.industry],
    ["Market", cs.clientMarket],
    ["Technology", cs.clientTechnology],
  ].filter((f): f is [string, string] => has(f[1]));
  const nutshell = [
    ["Challenge", cs.challenges],
    ["Solution", cs.solution],
    ["Benefits", cs.benefits],
  ].filter((n): n is [string, string] => has(n[1]));
  const agents = items(cs.solutionAgents);
  const tech = items(cs.tech);

  const chapters: { id: string; label: string; title: string; body: ReactNode }[] = [];
  const add = (id: string, label: string, title: string, body: ReactNode, show: boolean) => {
    if (show) chapters.push({ id, label, title, body });
  };
  add("overview", "Overview", "Project overview", <Text text={cs.overview} />, has(cs.overview));
  add("client", "The client", "About the client", <Text text={cs.client} />, has(cs.client));
  add(
    "problem",
    "The problem",
    "The challenge",
    <>
      <Text text={cs.challenge} />
      {has(cs.keyConstraints) && (
        <div className="legend-box cd-legend">
          <em>Key constraints</em>
          <Text text={cs.keyConstraints} />
        </div>
      )}
    </>,
    has(cs.challenge) || has(cs.keyConstraints),
  );
  const grid = (list: Item[]) => (
    <div className="cd-grid">
      {list.map((a, i) => (
        <div className="box" key={i}>
          {has(a.title) && <h3>{a.title}</h3>}
          {has(a.description) && <p>{a.description}</p>}
        </div>
      ))}
    </div>
  );
  add("solution", "The solution", "What was built", grid(agents), agents.length > 0);
  add("technology", "Technology", "Technology stack", grid(tech), tech.length > 0);
  add("different", "What makes it different", "What makes it different", <Text text={cs.uniqueSolution} />, has(cs.uniqueSolution));
  add("results", "The result", "The result", <Text text={cs.results} />, has(cs.results));
  add("summary", "Summary", "Summary", <Text text={cs.summary} />, has(cs.summary));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Case Studies", href: ROUTES.caseStudies }, { label: cs.title }]}
        eyebrow="Case study"
        title={
          <>
            {cs.title}
            {card?.workInProgress && <span className="wip">Work in progress</span>}
          </>
        }
        body={cs.subtitle}
        ctas={
          <>
            <Button href={ROUTES.contact}>Discuss a project</Button>
            <Button href={ROUTES.caseStudies} variant="ghost" arrow={false}>
              All case studies
            </Button>
          </>
        }
      />
      <section className="sec band">
        <div className="wrap cd-strip">
          {facts.length > 0 && (
            <div className="sbox">
              <div className="eyebrow">Meet our client</div>
              <dl className="cd-facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="head" style={{ marginBottom: 0 }}>
            <div className="eyebrow">In a nutshell</div>
            <Text text={cs.description} />
          </div>
        </div>
      </section>
      {nutshell.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="outs">
              {nutshell.map(([k, v]) => (
                <div className="out" key={k}>
                  <span className="k">{k}</span>
                  <Text text={v} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {chapters.map((c, i) => (
        <section className={i % 2 === 0 ? "sec band" : "sec"} id={c.id} key={c.id}>
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">
                {String(i + 1).padStart(2, "0")} · {c.label}
              </div>
              <h2 className="title">{c.title}</h2>
            </div>
            {c.body}
          </div>
        </section>
      ))}
      <ClosingCta
        title="Facing a similar challenge?"
        body="Paramount supports similar challenges through consulting, specialist engineering, and managed delivery. An initial discussion establishes the objective, environment, and appropriate scope."
        backToCaseStudies
      />
    </>
  );
}
