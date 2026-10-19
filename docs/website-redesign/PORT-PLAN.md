# Port plan: website redesign into the Next.js app

Goal: the redesigned site (spec in `reference/`) becomes the real paramountintelligence.co. It uses this repo's existing structure and stack: App Router routes in `app/`, sections in `components/<area>/`, Prisma for case studies, the existing admin console and email APIs. Nothing is served from `reference/`.

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
| `case-study-*.html` (10 pages) | `/case-studies/<slug>` | Replace the detail view for these slugs (see section 4) |
| `about-us.html` | `/about-us` | Replace |
| `careers.html` | `/careers/open-positions` | Replace (2 roles + register-interest form) |
| `careers-ai-engineer.html` | `/careers/open-positions/ai-engineer` | Replace via the existing `[slug]` route |
| `careers-full-stack-engineer.html` | `/careers/open-positions/full-stack-engineer` | Replace via `[slug]` |
| `contact-us.html` | `/contact-us` | Replace and wire the form (section 5) |

Every link in the reference uses a flat file name, such as `services-cloud-services.html`. Map each one to its route above.

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
  - Paramount mark `assets/logo.png`: compare it with the existing `public/images/logo.png`.
  - Case study screens `reference/images/*` → `public/images/case-studies/` (keep the file names). This includes `alh-ai-lesson.mp4`, about 14 MB.

## 3. Case study cards and the listing (phase 3)

- `data/case-cards.json` has all 50 cards in display order. Each card has:
  - `title`, `summary`, `org`, `industry` and `tags`;
  - `currentRoute`, its current `/case-studies/<slug>`;
  - `fullCaseStudyPage`, which reference page it opens, if any;
  - `workInProgress`;
  - `cardArtSvg`, the card drawing.
- **Card layout:** the drawing on a grey panel; organisation and industry; heading; summary; tags in mono chips; "Read case study →". A green "Full case study" tab and/or an amber "Work in progress" tab sits on the drawing's bottom edge. There are no attribution tags.
- **Drawings:** render `cardArtSvg` as inline SVG (it's trusted static markup from this repo). The motion comes from the `ca-*` classes in `site.css` and SVG `animateMotion`. It must stop under `prefers-reduced-motion`.
- **Cards without a full page** currently show a "redesigned separately" notice. Once the port is live, link them to their existing `/case-studies/<slug>` detail page (restyled) instead.
- **Data source (decision for Ali):**
  - **Option A, faster and lower risk:** the cards come from `case-cards.json` (as a typed module in `lib/`) for the first release.
  - **Option B, fully database-driven:** add card fields to `CaseStudy` and edit them in `/admin`: card summary, organisation label, card industry, tags (or `CaseTech`), drawing, featured order, work-in-progress and full-page flag. This needs a Prisma migration and a seed from `case-cards.json`.
  - Recommendation: do A first, then B in its own pull request.
- **Slugs:** card 50 (Flexagon Implementation Execution Portal) has no slug yet. Propose `flexagon-implementation-execution-portal`.
- **Related cards:** service and industry pages show 2–4 related case cards. Copy the selection from each reference page.

## 4. The ten full case study pages (phase 4)

These pages were supplied as finished, self-contained HTML. Each has its own `<style>` and `<script>`, a "Where am I" reading bar (`#pi-prog`), a Proof gallery with a full-size preview, and many interactive demos. **Content, numbers, colours and interactions must not change.**

| Reference file | Card | Current slug |
|---|---|---|
| `case-study-jazz.html` | 04 | `in-app-ai-assistant-for-telco-customer-self-care` |
| `case-study-contract-intelligence.html` | 06 | `ai-powered-contract-intelligence-platform-for-global-life-sciences-enterprise` |
| `case-study-ai-commerce-advisor.html` | 12 | `multi-agent-shopping-intelligence-on-aws-bedrock-agentcore` |
| `case-study-flexagon-support-copilot.html` | 07 | `ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform` |
| `case-study-flexagon-execution-portal.html` | 50 | new (see section 3) |
| `case-study-ash-shajrah-lms.html` | 01 | `full-stack-edtech-operating-system` |
| `case-study-schneider-ecostruxure-copilot.html` | 05 | `multimodal-rag-co-pilot-advisory-for-industrial-automation-engineering` |
| `case-study-schneider-ai-idea-governance.html` | 48 | `schneider-ai-initiative-tracker` |
| `case-study-flexagon-sow-generator.html` | 49 | `flexagon-sow-automation` |
| `case-study-donaldson-market-intelligence.html` | 19 | `pricing-intelligence-and-recommendation-engine` |

Check these slugs against `case-cards.json` (`currentRoute`) and the `CaseStudy` table.

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
4. The ten full case study pages, then the restyled database-driven detail page.
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
6. Three cards differ from their pages:
   - card 01 says "Confidential Education Provider", while the page names Ash-Shajrah;
   - card 05 describes an advisory blueprint, while the page says live in production;
   - card 19's organisation is "MSA Project Team", while the page names Donaldson.

   Update the card text?
