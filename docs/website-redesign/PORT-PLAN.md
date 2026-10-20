# Port plan: website redesign into the Next.js app

Goal: the redesigned site (spec in `reference/`, version 25, approved by Ali on 19 Oct 2026) becomes the real paramountintelligence.co. It uses this repo's existing structure and stack: App Router routes in `app/`, sections in `components/<area>/`, Prisma for case studies, the existing admin console and email APIs. Nothing is served from `reference/`.

Work on feature branches. Open each pull request into `uat`. Never touch `main`.

---

## 1. Route map

| Reference page | Route | Action |
|---|---|---|
| `index.html` | `/` (`app/page.tsx`) | Replace |
| `services.html` | `/services` | Replace. Keep the `#forward-deployed-engineering` anchor. |
| `services-ai-strategy-and-consulting.html` | `/services/ai-strategy-and-consulting` | Replace |
| `services-ai-solutions-and-engineering.html` | `/services/ai-solutions-and-engineering` | Replace |
| `services-software-product-engineering.html` | `/services/software-product-engineering` | **New route** |
| `services-data-and-analytics.html` | `/services/data-and-analytics` | Replace |
| `services-cloud-services.html` | `/services/cloud-services` | Replace |
| `services-ai-workflow-automation.html` | `/services/ai-workflow-automation` | Replace |
| `industries.html` | `/industries` | Replace |
| `industries-private-equity.html` | `/industries/private-equity` | **New route** |
| `industries-digital-natives.html` | `/industries/digital-natives` | **New route** |
| `case-studies.html` | `/case-studies` | Replace (50 cards, search, paging; see section 3) |
| `case-study-*.html` (19 pages) | `/case-studies/<slug>` | Replace the detail view for these slugs (see section 4) |
| `about-us.html` | `/about-us` | Replace |
| `careers.html` | `/careers/open-positions` | Replace (2 roles + register-interest form) |
| `careers-ai-engineer.html` | `/careers/open-positions/ai-engineer` | Replace via the existing `[slug]` route |
| `careers-full-stack-engineer.html` | `/careers/open-positions/full-stack-engineer` | Replace via `[slug]` |
| `contact-us.html` | `/contact-us` | Replace and wire the form (section 5) |

Every link in the reference uses a flat file name, such as `services-cloud-services.html`. Map each one to its route above (the case study routes are in the table in `README-site.md`).

Don't port two preview workarounds:
- the `pi-top` script on every reference page, which scrolls to the top (or to the `#hash`) when a page is opened from a link. Next.js navigation already does this; make sure nothing in the app breaks it;
- the homepage `<title>` "Paramount Intelligence Website". Give every route a proper title and metadata.

### Existing routes with no page in the redesign (ask Ali before removing or redirecting)

- `/services/ai-studio-and-platform-engineering`
- the 8 current industry pages: `b2b-enterprise-solutions`, `digital-lifestyle-and-entertainment`, `e-commerce-and-marketplaces`, `fintech-and-digital-payments`, `manufacturing-industrial-and-energy`, `mobility-ride-hailing-and-delivery`, `technology-and-enterprise-software`, `telecommunications`
- `/faq`, `/newsletter`, `/for-candidates`, `/careers/life-at-pi`, `/careers/apply-now`
- `/privacy-policy`: Ali asked for it to be blocked until it has been reviewed. The redesign doesn't link to it. Decide between hiding it (404 or `noindex`) and leaving it unlinked.
- `AssistantWidget` is imported in `app/layout.tsx`. The redesign has no assistant.

Until Ali decides, keep these routes working with the new Header and Footer, and add permanent redirects only when he confirms them. **Decided 20 Oct 2026:** keep them as they are, unlinked and out of the sitemap. Hide `/privacy-policy` (404) and remove the AssistantWidget (section 7).

---

## 2. Shared pieces (phase 1)

Build these first. Every page uses them.

- **Styles:** `reference/assets/site.css` holds the design system: tokens, header, footer, hero, buttons, cards, sections, card drawing animations (`ca-*` keyframes) and the logo-hover rules.
  - Bring it into the app as global CSS next to `app/globals.css`.
  - Check its class names (`.btn`, `.hero`, `.wrap`, `.sec`, `.band`, `.card`, …) against the existing pages that stay, and scope them if anything collides.
  - Tailwind v4 also scans files in the repo for class names. If it picks up classes from `docs/website-redesign/reference/`, add `@source not "../docs";` to `globals.css`.
- **Behaviour:** `reference/assets/site.js` is plain JS. Rebuild each behaviour as a small client component:
  - header dropdowns and the mobile menu, accordions and tabs;
  - the homepage lifecycle lanes and forward-deployed stages;
  - the copy-email button, toasts, logo tap-to-colour on phones;
  - case study search and paging, and form validation.
- **Components:**
  - `components/Header.tsx` and `components/Footer.tsx`: replace with the redesign versions. Montserrat is already loaded in `app/layout.tsx`.
  - Add a shared closing CTA ("What a first conversation covers"), the page hero (dark gradient and grid) and the button with its arrow block.
- **Assets:**
  - Logos `reference/assets/logos/*` → `public/images/logos/`.
  - Leadership photos `ali.jpg` and `marty.jpg` → `public/images/team/`.
  - Paramount mark `assets/logo.png`: the refreshed 3D mark in the new theme colours (chosen by Ali, 16 Oct 2026). Use it in the Header and Footer. The name "Paramount Intelligence" beside it keeps its current colours (#0C4185 and #6F7584, both weight 700).
  - Case study screens `reference/images/*` → `public/images/case-studies/` (keep the file names). This includes `lms-ai-lesson.mp4` (about 14 MB) and the Enterprise Video Generation clips `vg-ad-*.mp4` with their poster stills.
- **Scoping (done in phase 1):** the reference is built on browser defaults, while the old pages rely on Tailwind's preflight. So `site.css`'s element rules (`a`, `img`, `button`, headings, `p`, `ul`, the body font and colour) apply only inside the header (`.nav`), the footer (`.foot`) and a redesigned page's root (`.pi-page`), and preflight is undone inside them (see the top of `app/site.css`). Render every redesigned page with `components/site/SitePage.tsx` (Header, `<main id="top" className="pi-page">`, Footer). Anything a page renders outside `<main>` (a toast, a lightbox) needs `pi-page` too.
- **Scroll position:** `<html data-scroll-behavior="smooth">` makes Next.js switch smooth scrolling off during route changes, so every page opens at the top.
- **Font weights:** Montserrat is loaded at 300–800, as in the reference. Text set heavier (a `<b>` inside bold text) renders at 800, as it does there.

### Notes from phase 2 (pages)

- Each page's `<main>` is a component (`components/home/HomePage.tsx`, `components/services/pages/*`, `components/industries/pages/*`) with the reference markup as written: classes, copy and drawings unchanged, reference links mapped to routes, sprite icons as `<Icon>`, case cards as `<CaseCard>`.
- Behaviour from `site.js` (homepage panel and lifecycle, stepped stages, tabs, consulting funnel, software layers, release pipeline) is in `lib/site-behaviours.ts`. `components/site/PageBehaviours.tsx` (part of `SitePage`) runs it once the page is mounted and cleans it up on navigation.
- The version 25 `index.html` has no `<!doctype html>` (the preview script and title were put above it), so a browser renders it in quirks mode. Every other reference page, and the version 16 homepage, use standards mode, as the app does. Compare the homepage in standards mode.
- **Note:** the phase 1 commit on `website-redesign` was built from version 16. `site.css` and `site.js` are unchanged in version 25; the logo and the nine new pages' images (`sy-*`, `vg-ad-*`) are new.

## 3. Case study cards and the listing (phase 3)

- `data/case-cards.json` has all 50 cards in display order. Each card has:
  - `title`, `summary`, `org`, `industry` and `tags`;
  - `currentRoute`, its current `/case-studies/<slug>`;
  - `fullCaseStudyPage`, which reference page it opens, if any;
  - `workInProgress`;
  - `cardArtSvg`, the card drawing.
- **Order:** the 19 cards that open a full case study page come first: 04, 06, 12, 07, 50, 01, 05, 48, 49, 19, 08, 26, 40, 33, 32, 25, 23, 22, 28. Card 47 (Work in progress) follows, then the rest by number. `case-cards.json` is already in this order.
- **Card text** in `case-cards.json` is the approved version 25 text (for example card 05 "A senior engineer's knowledge, on call", card 19 organisation "Fortune 1000 industrial manufacturer", card 26 "Enterprise video ads in minutes, not weeks", card 40 "Every journey, watched live").
- **Card layout:** the drawing on a grey panel; organisation and industry; heading; summary; tags in mono chips; "Read case study →". A green "Full case study" tab and/or an amber "Work in progress" tab sits on the drawing's bottom edge. There are no attribution tags.
- **Drawings:** render `cardArtSvg` as inline SVG (it's trusted static markup from this repo). The motion comes from the `ca-*` classes in `site.css` and SVG `animateMotion`. It must stop under `prefers-reduced-motion`.
- **Cards without a full page** show a "redesigned separately" notice in the reference. In the app they link to their existing `/case-studies/<slug>` detail page (restyled in phase 4).
- **Done in phase 2 (data option A):** `lib/case-cards.ts`, generated by `node docs/website-redesign/data/generate-case-cards.mjs` from `case-cards.json`, and `components/casestudies/CaseCard.tsx`, used for the related cards on the service and industry pages. The industry label and the search text (`data-search`) come from the reference listing, because the JSON holds a longer industry list and no search text. Industry pages word some cards in their own way; `CaseCard` takes a `summary` for that.
- **Done in phase 3:** `/case-studies` (`components/casestudies/listing/`). `CaseArchive` is a client component with the reference's search and paging: every typed word must appear in a card's search text, 12 cards a page, the other cards stay in the grid with `hidden`, and changing page scrolls back to the grid. The page passes the card data to it from the server, so the drawings aren't in the JavaScript bundle. The old database listing (`app/case-studies/CaseStudiesClient.tsx`) is no longer used.
- **Card 50** (Implementation Execution Portal) has no route until its page is built in phase 4; until then it links to `/case-studies`.
- **Data source (decision for Ali):**
  - **Option A, faster and lower risk:** the cards come from `case-cards.json` (as a typed module in `lib/`) for the first release.
  - **Option B, fully database-driven:** add card fields to `CaseStudy` and edit them in `/admin`: card summary, organisation label, card industry, tags (or `CaseTech`), drawing, featured order, work-in-progress and full-page flag. This needs a Prisma migration and a seed from `case-cards.json`.
  - Recommendation: do A first, then B in its own pull request.
- **Done in phase 7 (data option B, decided by Ali on 20 Oct 2026):**
  - **Table:** the cards live in their own table, `CaseCard`, rather than in fields on `CaseStudy`. The 19 full pages and card 50 have no `CaseStudy` row. Each card has its number, position, title, summary, organisation, industry label, tags, search text, slug, Full case study and Work in progress flags, drawing (SVG) and Published flag.
  - **Migration:** `prisma/migrations/20261020120000_add_case_cards` creates the table and inserts the 50 cards from `lib/case-cards.ts` (`ON CONFLICT DO NOTHING`), so a deploy's `prisma migrate deploy` fills it. It is generated by `docs/website-redesign/data/generate-case-cards-migration.mjs`, and it changes no existing table.
  - **Hiding the 31:** `20261020160000_unpublish_removed_case_cards` unpublishes the 31 cards taken off the website, which stay in `/admin` as hidden. `lib/case-cards-db.ts` also skips any card whose slug is in `lib/removed-case-studies.ts`, so to bring one back, take it off that list and publish it in `/admin`.
  - **Reading:**
    - `lib/case-cards-db.ts` reads the published cards for the listing, the related cards on the service and industry pages (`RelatedCaseCard`; which cards appear stays fixed per page), the Work in progress tag on the database detail page, the full pages' metadata and the sitemap.
    - If the table can't be read or is empty, the site uses `lib/case-cards.ts`.
  - **Editing:** the "Case Cards" tab in `/admin` (`components/admin/CaseCardsAdmin.tsx`) lists the cards in order, with arrows to reorder.
    - It edits every field, with a live preview of the card, and can add, unpublish and delete cards.
    - A saved position is the card's place in the list; the others move down.
    - Saving refreshes the site's pages straight away (`revalidatePath`).
  - **API:** `app/api/admin/case-cards` checks the admin login on every request.
    - The drawing may contain only SVG shapes, text and animation: no scripts, event handlers, links or external references.
    - The search text keeps the reference's text; for a new card it defaults to the card's own text.
- **Slugs:** card 50 (Implementation Execution Portal) uses `implementation-execution-portal`.
- **31 case studies taken off the website (Ali, 20 Oct 2026):** these are the 31 cards without a full case study page. They are listed in `lib/removed-case-studies.ts`, and the site now shows the 19 full case studies.
  - **Hidden:** their cards (left out of `lib/case-cards.ts` by the generator), their related cards on the service and industry pages, and the homepage's "Explore the field-service case study" link. The field-service proof box itself stays.
  - **404:** their `/case-studies/<slug>` pages, and their entries in `GET /api/case-studies`.
  - **Kept:** their `CaseStudy` rows stay in the database and in `/admin`. Removing an entry from the list brings that case study back.
- **Related cards:** service and industry pages show 2–4 related case cards. Copy the selection from each reference page. On the service pages:

  | Service page | Related cards |
  |---|---|
  | AI & Technology Consulting | 05, 30 |
  | AI & Agentic Engineering | 07, 12, 04 |
  | Software & Product Engineering | 01, 06, 27, 26 |
  | Data Engineering & Intelligence | 03, 40, 14, 17 |
  | Cloud & Production Engineering | 08, 23, 12 |
  | Workflow Automation | 07, 28, 48 |

- **Links into case study pages from other pages:** the homepage "Evidence from the work" Fortune 500 industrial automation tile opens the AI Idea Governance page. The homepage Global agriculture science tile and project card, and card 08 on Cloud & Production Engineering, open the AI Agent Registry page.

## 4. The nineteen full case study pages (phase 4)

These pages were supplied as finished, self-contained HTML. Each has its own `<style>` and `<script>`, a "Where am I" reading bar (`#pi-prog`), and interactive demos; most have a Proof gallery with a full-size preview. **Content, numbers, colours, masking ("[PRICE]", blurred names, fictional demo names), "Client data protected" strips, "Work in progress" tags and interactions must not change.**

The table of reference files, pages and slugs is in `README-site.md` ("Pages"). By card, in listing order:

- **The ten earlier pages:** 04 Telecom In-App Assistant, 06 Contract Intelligence, 12 AI Commerce Advisor, 07 PE-backed Support Copilot, 50 Implementation Execution Portal (new slug, see section 3), 01 School Learning Platform, 05 Engineering Knowledge Co-Pilot, 48 AI Idea Governance (Work in progress), 49 SOW Generator, 19 Market Intelligence Platform. All ten were edited after review in version 25; use the files in `reference/`, not older copies.
- **Nine new pages:** 08 AI Agent Registry (images `sy-*`), 26 Enterprise Video Generation (clips `vg-ad-*`), 40 Real-Time Platform Intelligence, 33 Zero-Touch Email Support, 32 AI Talent Matching, 25 AI Enablement for Staffing, 23 Multi-Model AI Infrastructure, 22 Contract Risk Intelligence, 28 Investor Email Intelligence. The PE-backed Support Copilot page and the seven newest pages draw their visuals in the page and need no image files.

Zero-Touch, Talent Matching, Contract Risk and Investor Email show no "Engagement: Paramount engagement" line, because attribution is unconfirmed. Don't add it back unless Ali confirms.

Check the slugs against `case-cards.json` (`currentRoute`) and the `CaseStudy` table. If a slug doesn't match a `CaseStudy` row, ask Ali before adding or renaming one.

**Recommended approach:**
- Give each page its own static route (`app/case-studies/<slug>/page.tsx`); a static segment takes precedence over `[slug]`.
- Render the page body, without its `pi-` header and footer, inside the shared Header and Footer.
- Load its stylesheet scoped to the page and run its script once the markup is mounted.
- Point its image paths at `public/images/case-studies/`.
- Rewriting these pages fully in React is possible but slow, and risks changing interactions. Do it only page by page, with Ali's agreement.

All other slugs keep the existing database-driven detail page (`components/casestudies/detail/*`), restyled to the new design system.

**Done in phase 4:**
- `node docs/website-redesign/tools/generate-case-study-pages.mjs` builds each page from its reference file into `content/case-studies/<key>/` (`body.html`, `style.css`, `script-N.js`, plus `pages.json`) and writes its route, `app/case-studies/<slug>/page.tsx`. Re-run it when a reference page changes; don't edit the generated files.
  - The page's own header, footer and menu script are dropped; the shared Header and Footer take their place. HTML and CSS comments are dropped.
  - Links point to app routes and images to `/images/case-studies/`.
  - Its CSS is scoped to its root, `<main class="cs-page cs-<key>">`: `html`, `body` and `:root` rules apply to the root (with `overflow: hidden` as `clip`, so the reading bar still sticks), and keyframes get a `cs-<key>-` prefix.
  - The reading bar measures the shared header, so it sits directly under it.
- `components/casestudies/full/FullCaseStudy.tsx` renders a page; `CaseStudyScripts.tsx` runs its scripts once it is mounted. The scripts see only the page in their document queries, and leaving the page removes every listener, timer, animation frame and observer they added.
- Isolation from the rest of the site: `postcss/scope-site-css.cjs` keeps `site.css` and Tailwind's `[hidden]` rule out of `.cs-page`; the rest of Tailwind's preflight and utilities are reverted inside it (see the end of `app/site.css`). The pages load Montserrat italic 400 and, on Contract Intelligence, Caveat 600, as the reference does.
- Card 50 (Implementation Execution Portal) uses the slug in section 3, `implementation-execution-portal`.
- The database-driven page (`components/casestudies/detail/CaseStudyDetail.tsx`) shows the CaseStudy fields in the redesign's parts: hero, "Meet our client" and "In a nutshell", numbered chapters for the fields that have content (placeholders such as "N/A" count as empty), and the closing card with "View all case studies". The old detail components are no longer used.

**Checks for each page, at 1440px and 390px:**
- the reading bar stays under the header and tracks every section;
- all screens load, and the gallery opens them full size;
- every control works, with no console errors and no sideways scroll;
- the header menus work.

## 5. Forms (phase 5)

- **Contact** (`/contact-us`): the reference fields map onto the existing `POST /api/send-contact-email` JSON body:

  | Reference field | API field |
  |---|---|
  | `f-name` | `name` |
  | `f-email` | `email` |
  | `f-co` | `company` |
  | `f-phone` | `phone` |
  | `f-topic` | `subject` |
  | `f-msg` | `message` |

  Keep the reference's validation messages and success state.
  - The route currently interpolates user input straight into the email HTML. Escape it.
- **Careers register-interest** (`/careers/open-positions`): fields `c-name`, `c-email`, `c-loc`, `c-area`, `c-url`, `c-work` and `c-cv` (file). Send them to `POST /api/send-application-email`, which accepts multipart form data:
  - split the name into first and last name;
  - the area becomes the position;
  - the URL becomes LinkedIn or portfolio;
  - the work note becomes the cover letter.
  
  Confirm the mapping with Ali.
- **Roles:** both roles say "Location: Remote, US only". Role content comes from the reference role pages. Jobs are currently hard-coded in `components/careers/open-positions/JobListings.tsx`.

**Done in phase 5:**
- **Pages:** `/about-us`, `/contact-us`, `/careers/open-positions` and the two roles (`components/about/pages/`, `components/contact/pages/`, `components/careers/pages/`).
  - The roles render through `app/careers/open-positions/[slug]/page.tsx`. The nine older postings there are no longer linked but keep their URLs until Ali decides on them.
  - The old About, Contact and open-positions components are no longer used (phase 6 cleanup).
- **Behaviour:** `lib/site-behaviours.ts` adds the reference's copy buttons, filter chips (the role filter) and form validation.
- **Sending:** after validation, the form sends its data as in the tables above. The careers form maps the fields like this:
  - the URL goes in `linkedIn` when it is a LinkedIn address, otherwise in `portfolio`;
  - the location and time zone go at the top of `coverLetter`, because the API has no field for them;
  - the résumé is attached as `resume` when one is chosen.
- **Success and failure:**
  - The success state is the reference's, without its "Design preview: this form is not connected yet" note.
  - When a send fails, a short message under the button asks the person to try again or email marty@paramountintelligence.co. The reference has no failure state.
- **Escaping:** both email routes now escape form input placed in the email HTML (`lib/escape-html.ts`).
- **Upload limit:** Vercel caps a request at 4.5 MB. The reference says "up to 10 MB"; Ali changed the hint to "up to 4 MB" (20 Oct 2026). A larger résumé is refused as soon as it is chosen, with "This file is larger than 4 MB. Please choose a smaller PDF or DOCX file." under the upload box, and the form isn't sent.

## 6. Phases (one pull request into `uat` each)

1. Shared pieces: styles, Header, Footer, closing CTA, hero, buttons, assets.
2. Homepage, Services overview and the 6 service pages, Industries and its 2 pages.
3. Case Studies listing and cards (data option A).
4. The nineteen full case study pages, then the restyled database-driven detail page for the other 31 cards.
5. About, Careers (listing and 2 roles), Contact, with the forms wired.
6. Decisions on the old routes (redirects), metadata and Open Graph for every route, `sitemap`/`robots`, and removing anything unused.
7. Optional: case card fields in the database and `/admin` (data option B).

For every pull request:
- `npx next build --webpack` passes against a non-production database;
- each changed route has been checked at 1440px and 390px, with no console errors and no sideways scroll;
- the description lists the routes changed and gives screenshots.

## 7. Open questions for Ali

1. ~~Should the old routes listed in section 1 be removed, redirected or kept?~~ Kept (answered 20 Oct 2026, see below).
2. ~~Card data: option A first, then B?~~ A in phases 2–6, then B in phase 7 (a `CaseCard` table, filled by its migration).
3. ~~Privacy Policy: hide it or leave it unlinked?~~ Hidden (answered 20 Oct 2026).
4. ~~Keep or remove the AssistantWidget?~~ Removed (answered 20 Oct 2026).
5. The careers register-interest field mapping (section 5).
6. ~~Card 01 says "Confidential Education Provider", while the page names the school. Update the card text?~~ Resolved: client names came off the whole site (20 Oct 2026), so the page no longer names the school.

### Answered by Ali on 20 Oct 2026 (done in phase 6)

- **Old routes:**
  - The old routes in section 1 and the nine older job postings stay, as they are today.
  - They render inside the new Header and Footer, and nothing links to them.
  - They are not in the sitemap.
- **Privacy Policy:** `/privacy-policy` returns a 404 until the reviewed policy is ready. The previous page is in the git history (`components/privacy/`).
- **AssistantWidget:** removed, together with its token route (`/api/token`) and the LiveKit packages.

**Also done in phase 6:**
- **Metadata:** every route gets its title, description, canonical URL, and Open Graph and Twitter tags from `pageMetadata` (`lib/metadata.ts`).
  - `metadataBase` is https://paramountintelligence.co.
  - The reference has no share image, so link previews use the square logo icon as a "summary" card.
  - The full case study pages without a meta description in the reference use their card summary.
  - The old routes take their description from their own hero text.
  - `/admin` is noindex.
- **`app/sitemap.ts`:** lists the redesigned pages, the two roles, the 19 full case study pages and the other cards whose slug is in the `CaseStudy` table. It refreshes hourly.
- **`app/robots.ts`:** disallows `/admin` and `/api/` and points to the sitemap.
- **Unused code removed:**
  - every component and lib file that no route reaches;
  - the old listing (`CaseStudiesClient.tsx`), the unused server actions (`app/actions/`), and the `create-next-app` SVGs;
  - the packages only that code used (LiveKit, Radix navigation menu, class-variance-authority).
- **Not removed:**
  - **Images (20 Oct 2026):** the 24 images in `public/images/` that only removed code used are deleted. The 22 images no code has ever referenced are kept, because they were probably uploaded for case studies entered in `/admin`. The live `CaseStudy` table may point at them in `image`/`heroImage`, and the older industry pages still show `heroImage`. Delete them once the live table is checked:
    `Gratia-logo.png`, `Gratia-logo2.png`, `Mapline-cover-2.jpg`, `Schneider-electric2.png`, `Swap-Icon-cover.png`, `aliazzam.png`, `alibaba-logo2.png`, `aramco-logo2.png`, `case-studies/22.png`, `case-studies/23.png`, `case-studies/24.png`, `case-studies/25.png`, `case-studies/26.png`, `davidson-logo2.png`, `deloitte2.png`, `donaldson-logo2.png`, `download.png`, `engineering.png`, `health.png`, `multiAgent.jpeg`, `techcrunch-vector-logo.svg`, `veon_logo.png`;
  - `pages/api/case-studies` and `db-server.js`.

### Answered in version 25 (19 Oct 2026)

- Card 05 now reads "A senior engineer's knowledge, on call" (client prefix removed 20 Oct 2026); the co-pilot is in production.
- Card 19's organisation is now "Fortune 1000 industrial manufacturer" (client name removed 20 Oct 2026).
- School learning platform: parents see their own children and their own portal; teachers see only their own portal.
- Both open roles are "Remote, US only".

## 8. Client names off the site (20 Oct 2026)

Ali approved three changes (CLAUDE-CODE-3-CHANGES-20OCT.md): Marty's Calendly link, Marty's new photo, and no client names in any case study work.

- **Names:** case study pages, cards, the homepage and screenshots describe each client by type ("PE-backed DevOps software company", "Fortune 500 industrial automation company", and so on). Only the logo strips (homepage, About, Services) name organisations. Screenshots have client logos and names blurred; the lesson video's watermark is blurred.
- **Reference files renamed:** `case-study-telecom-in-app-assistant.html`, `case-study-pe-backed-support-copilot.html`, `case-study-sow-generator.html`, `case-study-implementation-execution-portal.html`, `case-study-engineering-knowledge-copilot.html`, `case-study-ai-idea-governance.html`, `case-study-market-intelligence-platform.html`, `case-study-ai-agent-registry.html`, `case-study-school-learning-platform.html`; images `app-icon.webp`, `lms-*` (the school's screens) and the four telecom screens named after the app.
- **Slugs renamed** (the old ones answer 308 to the new; the pairs are in `lib/removed-case-studies.ts` and `next.config.ts` reads them): `field-submission-intelligence`, `ai-idea-intake-and-governance`, `sow-generation-and-update-automation`, `implementation-execution-portal`. A `CaseStudy` row still stored under an old slug names the client, so the public case study API leaves it out.
- **Database:** `prisma/migrations/20261020200000_remove_client_names_from_case_cards` updates the twelve CaseCard rows that named a client (only the fields that changed). The `CaseStudy` seed holds no client names.
- **Featured cases on service and industry pages (Ali, 20 Oct 2026):** every page shows three cards, chosen from the cards still on the site because many of the reference's picks were taken off. AI & Technology Consulting 05, 48, 25; AI & Agentic Engineering 07, 12, 04; Software & Product Engineering 01, 06, 26; Data Engineering & Intelligence 40, 19, 28; Cloud & Production Engineering 08, 23, 12; Workflow Automation 07, 28, 48; Private Equity 07, 49, 47; Digital Natives 12, 07, 40. Card 47 (field-service) has no case study page, so on Private Equity it shows as Work in progress with no link (`SHOWN_WITHOUT_LINK` in `lib/removed-case-studies.ts`); it stays off the listing. The grids (`.cgrid.related`) use CSS subgrid, so each card's labels, title, summary, tags and link line up with the cards beside it.
