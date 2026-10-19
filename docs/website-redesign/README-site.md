# Paramount Intelligence website (redesign, October 2026)

Open `index.html` in a browser. All pages link to each other with relative links, so keep the folder structure as it is. Fonts load from Google Fonts, so an internet connection is needed for Montserrat; everything else is local.

## Pages

| File | Page | Live route on the current site |
|---|---|---|
| `index.html` | Homepage | `/` |
| `services.html` | Services overview (`#forward-deployed-engineering` anchor) | `/services` |
| `services-ai-strategy-and-consulting.html` | AI & Technology Consulting | `/services/ai-strategy-and-consulting` |
| `services-ai-solutions-and-engineering.html` | AI & Agentic Engineering | `/services/ai-solutions-and-engineering` |
| `services-software-product-engineering.html` | Software & Product Engineering | `/services/software-product-engineering` |
| `services-data-and-analytics.html` | Data Engineering & Intelligence | `/services/data-and-analytics` |
| `services-cloud-services.html` | Cloud & Production Engineering | `/services/cloud-services` |
| `services-ai-workflow-automation.html` | Workflow Automation | `/services/ai-workflow-automation` |
| `industries.html` | Industries | `/industries` |
| `industries-private-equity.html` | Private Equity | `/industries/private-equity` |
| `industries-digital-natives.html` | Digital Natives | `/industries/digital-natives` |
| `case-studies.html` | Case Studies listing (50 cases, search, paging) | `/case-studies` |
| `case-study-jazz.html` | Jazz: In-App AI Assistant for Telco Customer Self-Care | `/case-studies/in-app-ai-assistant-for-telco-customer-self-care` |
| `case-study-contract-intelligence.html` | Contract Intelligence Copilot (Global Life Sciences Enterprise) | `/case-studies/ai-powered-contract-intelligence-platform-for-global-life-sciences-enterprise` |
| `case-study-ai-commerce-advisor.html` | AI Commerce Advisor (Toptal) | `/case-studies/multi-agent-shopping-intelligence-on-aws-bedrock-agentcore` |
| `case-study-flexagon-support-copilot.html` | Flexagon Support Copilot (PE-backed enterprise DevOps platform) | `/case-studies/ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform` |
| `case-study-ash-shajrah-lms.html` | Ash-Shajrah Learning Hub (fully remote school platform) | `/case-studies/full-stack-edtech-operating-system` |
| `case-study-donaldson-market-intelligence.html` | Donaldson Market Intelligence Platform | `/case-studies/pricing-intelligence-and-recommendation-engine` |
| `case-study-schneider-ecostruxure-copilot.html` | EcoStruxure Multimodal RAG Co-Pilot (Schneider Electric) | `/case-studies/multimodal-rag-co-pilot-advisory-for-industrial-automation-engineering` |
| `case-study-schneider-ai-idea-governance.html` | AI Idea Intake & Governance Platform (Schneider Electric) | `/case-studies/schneider-ai-initiative-tracker` |
| `case-study-flexagon-sow-generator.html` | Flexagon SOW Generator | `/case-studies/flexagon-sow-automation` |
| `case-study-flexagon-execution-portal.html` | Flexagon Implementation Execution Portal | new card "Flexagon: from signed SOW to delivered documentation" (no old /case-studies/ URL) |
| `about-us.html` | About Us | `/about-us` |
| `careers.html` | Careers (2 open roles + register-interest form) | `/careers/open-positions` |
| `careers-ai-engineer.html` | AI Engineer role | new |
| `careers-full-stack-engineer.html` | Full Stack Engineer role | new |
| `contact-us.html` | Contact Us | `/contact-us` |

## Folders

- `assets/site.css`, `assets/site.js`: shared styles and behaviour for every page except the ten case study pages (`case-study-*.html`), which carry their own styles.
- `assets/logo.png`, `assets/ali.jpg`, `assets/marty.jpg`, `assets/logos/`: brand mark, leadership photos, client/experience logos.
- `images/`: screenshots used by the case study pages (Jazz `01–13`, Contract Intelligence `ci-*`, AI Commerce Advisor `ac-*`, Ash-Shajrah `alh-*`, Donaldson `dn-*`, EcoStruxure Co-Pilot `se-*`, AI Idea Governance `ag-*`, SOW Generator `fx-*`, Execution Portal `ep-*`). The Flexagon Support Copilot page needs no image files.
- `images/alh-ai-lesson.mp4`: the Ash-Shajrah lesson video (about 14 MB, 720p, H.264 with sound). Keep it in `images/` under this exact name.

## Notes for the developer

- Forms (Contact, Careers) validate and show their success state but do not send anything yet. Connect them to the real form handler.
- The Privacy Policy page is intentionally not included and not linked. Restore the existing policy and footer link when it is reviewed.
- Ten case study cards open a redesigned page: Jazz, Contract Intelligence, AI Commerce Advisor, Flexagon Support Copilot, Flexagon Execution Portal, Ash-Shajrah Learning Hub, EcoStruxure Co-Pilot, AI Idea Governance, Flexagon SOW Generator and Donaldson Market Intelligence. They come first on the Case Studies page. The other 40 cards show a "redesigned separately" notice instead of opening; point them to their detail pages as each one is rebuilt.
- The homepage "Evidence from the work" Schneider Electric tile opens the AI Idea Governance page.
- Both open roles (AI Engineer, Full Stack Engineer) are "Remote, US only" (confirmed by Ali, 14 Oct 2026).
- Case study cards (Case Studies page and the related-case cards on service and industry pages) use the homepage "Selected Project Experience" style: a labelled diagram on a grey panel, organisation and industry, heading, short description, 3–4 tags and "Read case study". The diagrams are inline SVG inside each card, so there are no thumbnail image files. They move gently (travelling dots on connectors, pulsing status dots, rising and falling bars, a scan line over documents) and hold still for visitors whose device is set to reduce motion.
- Client and experience logos (homepage, About, Services) are grey until the cursor is on them, then show their brand colours; on phones a tap does the same.
- `CASE-STUDY-DESIGN-GUIDE.md` explains how future case study pages should be built.
