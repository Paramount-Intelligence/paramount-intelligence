# Paramount Intelligence: case study design guide

Reference build: `case-study-telecom-in-app-assistant.html` ("In-App AI Assistant for Telco Customer Self-Care", for a mobile telecom operator).
Use it as the model for every future case study on paramountintelligence.co. Open it in a browser before starting, then follow this guide.

---

## 1. What a case study page is

A case study is a **scroll story built like the Paramount decks**: each chapter leads with something the reader can watch or touch (an animation, a toggle, a diagram, a phone, a simulator), and the copy works as captions to it. It is not a wall of text and it never repeats the same bullet list in several sections.

Every case study page has three fixed parts and a variable middle:

| Part | Rule |
|---|---|
| **Top bar** | The website's own header (logo, Home, Services ▾, Industries ▾, Case Studies [active], About Us, Careers, Contact Us, cyan "Discuss a project" button). Never the case study's own nav. |
| **Middle** | The story chapters (section 3 below). This is where each case is different. |
| **Closing card** | The website's closing card (dark gradient band, card with heading + one line on the left; "What a first conversation covers" 01/02/03 list + "Discuss a project" button + "View all case studies" link on the right). |
| **Footer** | The website's footer (brand blurb, Services, Industries, Company, Contact: marty@paramountintelligence.co with Copy button, LinkedIn, "© 2026 Paramount Intelligence. All rights reserved." and "AI moves fast. We make it work."). |

**Never include** on a case study: its own sticky nav, "Book a consultation" / "Book a free consultation" buttons, "Try X again" buttons at the end, "Presented by …" or "Web paramountintelligence.co" lines, links to the old website, or any internal review notes.

---

## 2. Design system

**Font:** Montserrat (Google Fonts, weights 300–800); IBM Plex Mono for small technical labels and traces.

**Colour tokens** (same palette as the corporate and capability decks):

| Token | Hex | Use |
|---|---|---|
| navy | `#0F256E` | Outline boxes, dark panels, primary text accents |
| royal | `#204ECF` | Section titles (light weight), active states |
| cyan | `#09B6F9` | Accent, "+" bullets, highlighted keyword in headlines, primary button |
| green | `#3DBE8B` | "Live", verified, success, outcome tags |
| dark | `#262D3D` | Start of the cover gradient |
| band | `#F3F3F3` | Alternate grey section bands |
| line | `#D9DBE0` | Hairlines and card borders |
| pale | `#EAF1FF` | Soft highlight fills |
| text | `#2B3245` | Body text |
| muted | `#646C7E` | Captions |
| amber | `#F5B83D` | "Work in progress" tag only |

**Hero background (must match the homepage exactly):**

```css
background:
  radial-gradient(1000px 560px at 100% 100%, rgba(32,78,207,.95), transparent 62%),
  linear-gradient(135deg, #262d3d 0%, #1e2f6a 55%, #1a3a9e 100%);
/* plus the faint 56px grid overlay */
.hero::before{content:"";position:absolute;inset:0;
  background-image:linear-gradient(rgba(160,185,240,.07) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(160,185,240,.07) 1px,transparent 1px);
  background-size:56px 56px;
  mask-image:linear-gradient(180deg,transparent,#000 30%,#000 70%,transparent);
  pointer-events:none}
```

**Type scale:** hero H1 ~3.6–4.3rem bold with one keyword in cyan; section titles ~2–2.75rem **light weight (400) in royal blue**; uppercase eyebrows 0.72rem, letter-spacing 0.24em, cyan or royal.

**Shapes:** square corners, 1.5px navy outline boxes, white pages alternating with `#F3F3F3` bands, dark gradient only on the hero and the closing band.

**Buttons:** primary = cyan fill, navy text, with the arrow in its own darker block on the right (label + arrow block). Secondary = white outline on dark, navy outline on light.

---

## 3. Page anatomy (as in the telecom case)

1. **Hero**: eyebrow "Client case study · Client type · Market" (describe the client by type, for example "Mobile telecom operator"; never name the client, and blur client names and logos in screenshots) + green pill ("Live in production" or the true status); headline with a cyan keyword; one-sentence lede; three "+" bullets (bold label + short phrase); two CTAs (try/see the demo, see the story); a meta row (Client · Channel · Built on); on the right **one interactive proof visual** (telecom case: an 80-dot matrix, one dot per million people, toggling 80M+ subscribers → 40M app users → 3–4M using SIA).
2. **Client strip**: grey "Meet our client" panel (Client, Industry, Market) + "In a nutshell" paragraph.
3. **Numbered chapters** (`01 · The problem`, `02 · The complication`, `03 · The resolution`, `04 · How it works`, `05 · What makes it different`, `06 · The result`, plus unnumbered "What customers ask" and "Proof" chapters). Each chapter has:
   - eyebrow + light royal title + one-line sub;
   - one visual or interaction (telecom examples: before/after journey toggle with a big counter; question hub with filters; four-lock ring that fills as each constraint is tapped; auto tap-through phone with a numbered 4-step path and struck-through "not this" chips; screenshot filmstrip; phone simulator synced to a live architecture diagram and a mono "live trace" console; side-by-side chatbot duel; animated result cards);
   - a **legend box** of "+" notes underneath (navy outline box with a small label sitting on its top border, two columns of "+ **Bold lead:** explanation").
4. **Closing card** and **footer** (section 1).

Numbering is only used because the chapters really are a sequence. Keep chapter count to what the story needs (6–9).

---

## 4. Rules that came from Ali's review

- Real client logos and real product screenshots only; never draw imitations. Put screenshots in `images/` (webp, ~420px wide phone captures).
- Facts and numbers exactly as approved. Never invent metrics. Label illustrative demos as demo data.
- No internal notes on any public page ("INTERNAL REVIEW", attribution holds, developer notes).
- Each case carries one attribution context where known: Paramount engagement / Leadership experience (prior role) / Advisory engagement.
- Work that is still in progress gets an amber **"Work in progress"** tag wherever it is mentioned.
- Everything must read at phone width (≈390px): no sideways scroll, every diagram has a stacked fallback, and every interactive element has a readable resting state.
- Respect `prefers-reduced-motion`: show the final state instead of animating.

---

## 5. Building a new case study

1. Start from `case-study-telecom-in-app-assistant.html`. Keep the `<style>` block of the story and the scoped site header/footer/closing styles (`pi-` prefixed classes) as they are.
2. Replace the middle chapters with the new story. Reuse the existing components (outline boxes, legend boxes, phone frame, filmstrip, rings, toggles, diagrams) before inventing new ones.
3. Change the hero eyebrow, headline, lede, bullets, meta row and proof visual. Keep the hero background CSS above unchanged.
4. Change only the left side of the closing card (eyebrow, heading with cyan ending, one line). Keep the right side ("What a first conversation covers", "Discuss a project", "View all case studies").
5. Name the file `case-study-<slug>.html` and put its screenshots in `images/` with numbered names (`01-….webp`).
6. Give the website card: title (short, outcome-first), one-line summary, organisation, industry, 3–4 short tags (main technologies), and the labels for its card drawing (section 8).
7. Check at 1440px and 390px: all images load, every animation runs, interactive parts respond, nothing overlaps or scrolls sideways, no console errors.

---

## 6. Files in this package

- `case-study-telecom-in-app-assistant.html`: the live case study page (open it from inside this folder so `images/` and `assets/` load).
- `images/`: the 13 app screenshots and the app icon.
- `assets/logo.png`: the Paramount mark used in the top bar and footer.
- `CASE-STUDY-DESIGN-GUIDE.md`: this guide.

---

## 7. Reading-progress bar (added 11 Oct 2026)

Every case study page has a sticky bar directly under the site top bar that shows which chapter the reader is in: "Reading" label, numbered chapter links (01 Overview, 02 Problem, … last Result), the active chapter highlighted in navy with a cyan underline, finished chapters marked green, "Section n / total" on the right, and a cyan-to-green progress line along the bottom. It is generated automatically from the page: the hero becomes "Overview", and every `section.ch` with an `.eyebrow` becomes a chapter (number prefix and "The" are dropped; "What customers ask" → "Questions", "What makes it different" → "Difference"; for "04 · How it works · Proposal Validator" the last part is used). So when building a new case study: keep the hero as `section.hero`, give each chapter `class="ch"` and an eyebrow, and keep the closing section `id="contact"`. The bar is added when the page is put on the website; don't build your own section nav.

Case study cards on the website show no attribution tags (no "Leadership experience", "Paramount engagement" or "Advisory engagement" labels).

---

## 8. Case study cards (updated 14 Oct 2026)

Every case card on the website (Case Studies page, and the related-case cards on service and industry pages) uses the homepage "Selected Project Experience" style:

- **Drawing** on a light grey panel: a simple labelled diagram of what was built (white boxes, 1.5px navy outlines, one navy "core" box, cyan and green accents), drawn as inline SVG at 300 × 160. No screenshots and no numbers in the drawing. The drawing moves a little so it feels active: small cyan dots travel along the connectors, status dots pulse, bars rise and fall, documents get a scan line and step rows a moving highlight. All motion stops for `prefers-reduced-motion`. Examples: Freshdesk / Confluence / Jira → Grounded draft → Human review (support copilot); a registry table with status chips (Syngenta); an orchestrator linked to Discovery, Comparison, Cart and Checkout (Toptal).
- **Text:** organisation (royal, uppercase) and industry, heading, one-line description, 3–4 tech tags in grey mono chips, "Read case study →".
- **Labels:** cases with a full page get a green "Full case study" tab on the bottom edge of the drawing; work still in progress gets the amber "Work in progress" tab in the same place.
- When sending a new case study, include the card heading, description, tags and what the drawing should show (inputs → core → outputs, or the main screen to sketch).

