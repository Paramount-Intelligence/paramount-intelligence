# Paramount Intelligence website

This repository is the live paramountintelligence.co website and its admin console.

## Stack

- Next.js 16 (App Router, `app/`) with TypeScript and React 19.
- Styling: `app/globals.css` (Tailwind v4 via `@import "tailwindcss"`, plus CSS variables). Montserrat comes from `next/font/google` in `app/layout.tsx`.
- Data: PostgreSQL through Prisma (`prisma/schema.prisma`, client in `lib/prisma.ts`). Case studies live in the `CaseStudy` table and are managed in `/admin` (`components/admin/`, `app/api/admin/case-studies/`).
- Email: `app/api/send-contact-email` and `app/api/send-application-email` (nodemailer). Uploads: Cloudinary (`app/api/cloudinary-signature`).
- Deployed on Vercel (`@vercel/analytics`).
- Page sections live in `components/<area>/` (for example `components/casestudies/detail/`). Each route in `app/` composes them.

## Commands

- `npm run dev`: local development server.
- `npm run build` runs `prisma migrate deploy` **before** `next build`. Never run it with a production `DATABASE_URL`. To check that the app compiles, run `npx prisma generate && npx next build --webpack` with a local or UAT database.
- Environment variables are in `.env*` files (git-ignored). Never commit secrets.

## Branches and pull requests

- Never push to `main` and never merge into `main`. Ali (CEO) merges `uat` into `main` himself.
- Work on a feature branch. Open pull requests into `uat`.
- Keep each pull request to one reviewable step (see the phases in `docs/website-redesign/PORT-PLAN.md`).

## Current work: the website redesign

The site is being redesigned. The approved design is in `docs/website-redesign/reference/`: a complete static version of every new page, with its assets and case study screens. Open `reference/index.html` in a browser to see it.

**Port the redesign into this Next.js app, in the same structure and stack.** Follow `docs/website-redesign/PORT-PLAN.md`. The reference HTML is the spec for layout, copy, colours and behaviour. Rebuild it as React components and routes; don't serve the reference files.

## Content rules (apply to every change)

- Use the copy in the reference pages as written. Don't invent metrics, clients or claims.
- Never publish internal notes: anything marked internal, "INTERNAL REVIEW", "NOT FOR PUBLICATION", developer notes, or attribution holds.
- The twenty full case study pages were supplied by Ali. Keep their content, numbers, colours and interactions exactly as they are. Keep their masking ("[PRICE]", blurred names, fictional demo names) and their "Client data protected" notes.
- Work that is still in progress carries an amber "Work in progress" tag wherever it appears.
- Case study cards show no attribution tags ("Leadership experience", "Paramount engagement", "Advisory engagement").

## Design system (from the reference)

- Font: Montserrat 300–800. IBM Plex Mono for small technical labels.
- Colours: navy `#0F256E`, royal `#204ECF`, cyan `#09B6F9`, green `#3DBE8B`, dark `#262D3D`, band `#F3F3F3`, line `#D9DBE0`, pale `#EAF1FF`, text `#2B3245`, muted `#646C7E`, amber `#F5B83D` (Work in progress only).
- Hero background: the dark gradient plus a faint 56px grid, identical on every page (see `.hero` in `reference/assets/site.css`).
- Square corners, 1.5px navy outline boxes, white sections alternating with `#F3F3F3` bands.
- Primary button: cyan with navy text and the arrow in its own darker block. Section titles are light weight (400) in royal blue.
- Closing sections use the "What a first conversation covers" card. The footer contact is marty@paramountintelligence.co.
- Every page must work at 1440px and 390px: no sideways scroll, no console errors. Respect `prefers-reduced-motion`.

## Docs

- `docs/website-redesign/PORT-PLAN.md`: route map, data plan, phases, open questions.
- `docs/website-redesign/README-site.md`: notes on the static reference site.
- `docs/website-redesign/CASE-STUDY-DESIGN-GUIDE.md`: how case study pages and cards are designed.
- `docs/website-redesign/data/case-cards.json`: the 50 case study cards: order, title, summary, organisation, industry, tags, linked page and the card drawing (SVG).
