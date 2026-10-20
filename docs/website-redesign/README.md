# Website redesign (October 2026)

The approved redesign of paramountintelligence.co, version 25, approved by Ali on 19 Oct 2026, and the plan for building it into this Next.js app.

## Contents

- `reference/`: the complete redesign as static HTML. It has 36 pages (including 19 full case study pages), `assets/` (styles, script, logos, leadership photos) and `images/` (case study screens and a lesson video). It's the spec for layout, copy, colours and behaviour. Open `reference/index.html` in a browser; links are relative, so the pages work from the folder. It isn't served by the app.
- `PORT-PLAN.md`: how to rebuild the redesign in this repo's structure and stack. It covers the route map, shared components, case study data, the nineteen full case study pages, form wiring, phases and open questions.
- `data/case-cards.json`: the 50 case study cards in display order, with their text, tags, linked pages and card drawings.
- `README-site.md`: notes that came with the static site, including the table of pages, files and routes.
- `CASE-STUDY-DESIGN-GUIDE.md`: how case study pages and cards are designed.

The repo-level `CLAUDE.md` summarises the stack, branch rules, content rules and design system.

## Branch flow

Feature branches → pull requests into `uat`. Ali merges `uat` into `main`.

## What this branch changes

It adds documentation and the reference copy only: `CLAUDE.md` and `docs/website-redesign/`. No page, route, component, API, schema or config in the app is modified.
