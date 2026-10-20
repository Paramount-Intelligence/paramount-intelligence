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

Until Ali decides, keep these routes working with the new Header and Footer, and add permanent redirects only when he confirms them.

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
  - Case study screens `reference/images/*` → `public/images/case-studies/` (keep the file names). This includes `alh-ai-lesson.mp4` (about 14 MB) and the Enterprise Video Generation clips `vg-ad-*.mp4` with their poster stills.
- **Scoping (done in phase 1):** the reference is built on browser defaults, while the old pages rely on Tailwind's preflight. So `site.css`'s element rules (`a`, `img`, `button`, headings, `p`, `ul`, the body font and colour) apply only inside the header (`.nav`), the footer (`.foot`) and a redesigned page's root (`.pi-page`), and preflight is undone inside them (see the top of `app/site.css`). Render every redesigned page with `components/site/SitePage.tsx` (Header, `<main id="top" className="pi-page">`, Footer). Anything a page renders outside `<main>` (a toast, a lightbox) needs `pi-page` too.
- **Scroll position:** `<html data-scroll-behavior="smooth">` makes Next.js switch smooth scrolling off during route changes, so every page opens at the top.
- **Note:** the phase 1 commit on `website-redesign` was built from version 16. `site.css` and `site.js` are unchanged in version 25; the logo and the nine new pages' images (`sy-*`, `vg-ad-*`) are new.

## 3. Case study cards and the listing (phase 3)

- `data/case-cards.json` has all 50 cards in display order. Each card has:
  - `title`, `summary`, `org`, `industry` and `tags`;
  - `currentRoute`, its current `/case-studies/<slug>`;
  - `fullCaseStudyPage`, which reference page it opens, if any;
  - `workInProgress`;
  - `cardArtSvg`, the card drawing.
- **Order:** the 19 cards that open a full case study page come first: 04, 06, 12, 07, 50, 01, 05, 48, 49, 19, 08, 26, 40, 33, 32, 25, 23, 22, 28. Card 47 (Work in progress) follows, then the rest by number. `case-cards.json` is already in this order.
- **Card text** in `case-cards.json` is the approved version 25 text (for example card 05 "Schneider Electric: a senior engineer's knowledge, on call", card 19 organisation "Donaldson", card 26 "Enterprise video ads in minutes, not weeks", card 40 "Every journey, watched live").
- **Card layout:** the drawing on a grey panel; organisation and industry; heading; summary; tags in mono chips; "Read case study →". A green "Full case study" tab and/or an amber "Work in progress" tab sits on the drawing's bottom edge. There are no attribution tags.
- **Drawings:** render `cardArtSvg` as inline SVG (it's trusted static markup from this repo). The motion comes from the `ca-*` classes in `site.css` and SVG `animateMotion`. It must stop under `prefers-reduced-motion`.
- **Cards without a full page** currently show a "redesigned separately" notice. Once the port is live, link them to their existing `/case-studies/<slug>` detail page (restyled) instead.
- **Data source (decision for Ali):**
  - **Option A, faster and lower risk:** the cards come from `case-cards.json` (as a typed module in `lib/`) for the first release.
  - **Option B, fully database-driven:** add card fields to `CaseStudy` and edit them in `/admin`: card summary, organisation label, card industry, tags (or `CaseTech`), drawing, featured order, work-in-progress and full-page flag. This needs a Prisma migration and a seed from `case-cards.json`.
  - Recommendation: do A first, then B in its own pull request.
- **Slugs:** card 50 (Flexagon Implementation Execution Portal) has no slug yet. Propose `flexagon-implementation-execution-portal`.
- **Related cards:** service and industry pages show 2–4 related case cards. Copy the selection from each reference page. On the service pages:

  | Service page | Related cards |
  |---|---|
  | AI & Technology Consulting | 05, 30 |
  | AI & Agentic Engineering | 07, 12, 04 |
  | Software & Product Engineering | 01, 06, 27, 26 |
  | Data Engineering & Intelligence | 03, 40, 14, 17 |
  | Cloud & Production Engineering | 08, 23, 12 |
  | Workflow Automation | 07, 28, 48 |

- **Links into case study pages from other pages:** the homepage "Evidence from the work" Schneider Electric tile opens the AI Idea Governance page. The homepage Syngenta tile and Syngenta project card, and card 08 on Cloud & Production Engineering, open the Syngenta AgentCore Registry page.

## 4. The nineteen full case study pages (phase 4)

These pages were supplied as finished, self-contained HTML. Each has its own `<style>` and `<script>`, a "Where am I" reading bar (`#pi-prog`), and interactive demos; most have a Proof gallery with a full-size preview. **Content, numbers, colours, masking ("[PRICE]", blurred names, fictional demo names), "Client data protected" strips, "Work in progress" tags and interactions must not change.**

The table of reference files, pages and slugs is in `README-site.md` ("Pages"). By card, in listing order:

- **The ten earlier pages:** 04 Jazz, 06 Contract Intelligence, 12 AI Commerce Advisor, 07 Flexagon Support Copilot, 50 Flexagon Execution Portal (new slug, see section 3), 01 Ash-Shajrah, 05 EcoStruxure, 48 AI Idea Governance (Work in progress), 49 SOW Generator, 19 Donaldson. All ten were edited after review in version 25; use the files in `reference/`, not older copies.
- **Nine new pages:** 08 Syngenta AgentCore Registry (images `sy-*`), 26 Enterprise Video Generation (clips `vg-ad-*`), 40 Real-Time Platform Intelligence, 33 Zero-Touch Email Support, 32 AI Talent Matching, 25 AI Enablement for Staffing, 23 Multi-Model AI Infrastructure, 22 Contract Risk Intelligence, 28 Investor Email Intelligence. The Flexagon Support Copilot page and the seven newest pages draw their visuals in the page and need no image files.

Zero-Touch, Talent Matching, Contract Risk and Investor Email show no "Engagement: Paramount engagement" line, because attribution is unconfirmed. Don't add it back unless Ali confirms.

Check the slugs against `case-cards.json` (`currentRoute`) and the `CaseStudy` table. If a slug doesn't match a `CaseStudy` row, ask Ali before adding or renaming one.

**Recommended approach:**
- Give each page its own static route (`app/case-studies/<slug>/page.tsx`); a static segment takes precedence over `[slug]`.
- Render the page body, without its `pi-` header and footer, inside the shared Header and Footer.
- Load its stylesheet scoped to the page and run its script with `next/script` once the markup is mounted.
- Point its image paths at `public/images/case-studies/`.
- Rewriting these pages fully in React is possible but slow, and risks changing interactions. Do it only page by page, with Ali's agreement.

All other slugs keep the existing database-driven detail page (`components/casestudies/detail/*`), restyled to the new design system.

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

1. Should the old routes listed in section 1 be removed, redirected or kept?
2. Card data: option A first, then B?
3. Privacy Policy: hide it or leave it unlinked?
4. Keep or remove the AssistantWidget?
5. The careers register-interest field mapping (section 5).
6. Card 01 says "Confidential Education Provider", while the page names Ash-Shajrah. Update the card text? (Still open.)

### Answered in version 25 (19 Oct 2026)

- Card 05 now reads "Schneider Electric: a senior engineer's knowledge, on call"; EcoStruxure is in production.
- Card 19's organisation is now "Donaldson".
- Ash-Shajrah: parents see their own children and their own portal; teachers see only their own portal.
- Both open roles are "Remote, US only".
