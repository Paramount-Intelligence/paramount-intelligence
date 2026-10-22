# Paramount Intelligence website (redesign, version 25, 19 October 2026)

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
| `case-study-telecom-in-app-assistant.html` | In-App AI Assistant for Telco Customer Self-Care (mobile telecom operator) | `/case-studies/in-app-ai-assistant-for-telco-customer-self-care` |
| `case-study-contract-intelligence.html` | Contract Intelligence Copilot (Global Life Sciences Enterprise) | `/case-studies/ai-powered-contract-intelligence-platform-for-global-life-sciences-enterprise` |
| `case-study-ai-commerce-advisor.html` | AI Commerce Advisor (e-commerce and retail technology platform) | `/case-studies/multi-agent-shopping-intelligence-on-aws-bedrock-agentcore` |
| `case-study-pe-backed-support-copilot.html` | Support Copilot (PE-backed enterprise DevOps platform) | `/case-studies/ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform` |
| `case-study-school-learning-platform.html` | School Learning Platform (fully remote school) | `/case-studies/full-stack-edtech-operating-system` |
| `case-study-market-intelligence-platform.html` | Market Intelligence Platform (Fortune 1000 industrial manufacturer) | `/case-studies/pricing-intelligence-and-recommendation-engine` |
| `case-study-engineering-knowledge-copilot.html` | Multimodal RAG Engineering Co-Pilot (Fortune 500 industrial automation company) | `/case-studies/multimodal-rag-co-pilot-advisory-for-industrial-automation-engineering` |
| `case-study-ai-idea-governance.html` | AI Idea Intake & Governance Platform (Fortune 500 industrial automation company) | `/case-studies/ai-idea-intake-and-governance` |
| `case-study-sow-generator.html` | SOW Generator (PE-backed DevOps software company) | `/case-studies/sow-generation-and-update-automation` |
| `case-study-implementation-execution-portal.html` | Implementation Execution Portal (PE-backed DevOps software company) | `/case-studies/implementation-execution-portal` |
| `case-study-ai-agent-registry.html` | AI Agent Registry on AWS AgentCore (global agriculture science company) | `/case-studies/ai-agent-governance-discovery-platform-on-aws-agentcore` |
| `case-study-enterprise-video-generation.html` | Enterprise Video Generation on Oracle Cloud | `/case-studies/ai-powered-enterprise-video-generation-platform-on-oracle-cloud` |
| `case-study-real-time-platform-intelligence.html` | Real-Time Platform Intelligence | `/case-studies/real-time-platform-intelligence-ecosystem-monitoring` |
| `case-study-zero-touch-email-support.html` | Zero-Touch Email Support | `/case-studies/automated-email-response-and-ticket-handling-system-for-zero-touch-customer-support` |
| `case-study-ai-talent-matching.html` | AI Talent Matching | `/case-studies/ai-agents-for-talent-matching-and-automated-talent-project-mapping` |
| `case-study-ai-enablement-staffing.html` | AI Enablement for Staffing | `/case-studies/ai-enablement-and-workflow-automation-for-staffing-and-consultancy-firm` |
| `case-study-multi-model-ai-infrastructure.html` | Multi-Model AI Infrastructure | `/case-studies/ai-infrastructure-for-a-multi-model-chatbot-platform-serving-80m-telecom-users` |
| `case-study-contract-risk-analysis.html` | Contract Risk Intelligence | `/case-studies/ai-systems-for-contract-document-ingestion-and-risk-analysis` |
| `case-study-investor-email-intelligence.html` | Investor Email Intelligence | `/case-studies/ai-powered-investor-email-processing-and-crm-data-structuring` |
| `case-study-ai-field-intelligence.html` | AI Field Intelligence (PE-backed field service platform; engagement in progress; replaces the old `/case-studies/truecontext-field-pulse` link) | `/case-studies/field-submission-intelligence` |
| `about-us.html` | About Us | `/about-us` |
| `careers.html` | Careers (2 open roles + register-interest form) | `/careers/open-positions` |
| `careers-ai-engineer.html` | AI Engineer role | new |
| `careers-full-stack-engineer.html` | Full Stack Engineer role | new |
| `contact-us.html` | Contact Us | `/contact-us` |

## Folders

- `assets/site.css`, `assets/site.js`: shared styles and behaviour for every page except the twenty case study pages (`case-study-*.html`), which carry their own styles.
- `assets/logo.png`, `assets/ali.jpg`, `assets/marty.jpg`, `assets/logos/`: brand mark, leadership photos, client/experience logos. `logo.png` is the refreshed 3D mark in the new theme colours (chosen by Ali, 16 Oct 2026); the name beside it keeps its colours (#0C4185 and #6F7584).
- `images/`: screenshots used by the case study pages (Telecom In-App Assistant `03–13` and `app-icon`, Contract Intelligence `ci-*`, AI Commerce Advisor `ac-*`, School Learning Platform `lms-*`, Market Intelligence Platform `dn-*`, Engineering Knowledge Co-Pilot `se-*`, AI Idea Governance `ag-*`, SOW Generator `fx-*`, Execution Portal `ep-*`, AI Agent Registry `sy-*`, Enterprise Video Generation `vg-ad-*` (three short silent MP4 clips plus poster stills)). The PE-backed Support Copilot page and the eight newest case study pages need no image files: their visuals are drawn in the page.
- `images/lms-ai-lesson.mp4`: the School Learning Platform lesson video (about 14 MB, 720p, H.264 with sound). Keep it in `images/` under this exact name.

## Notes for the developer

- Forms (Contact, Careers) validate and show their success state but do not send anything yet. Connect them to the real form handler.
- The Privacy Policy page is intentionally not included and not linked. Restore the existing policy and footer link when it is reviewed.
- Twenty case study cards open a redesigned page (see the table). Nineteen come first on the Case Studies page, in the order in `data/case-cards.json`; card 47 (AI Field Intelligence, added 22 Oct 2026) keeps its place after them. The other 30 cards show a "redesigned separately" notice instead of opening; point them to their detail pages as each one is rebuilt.
- The homepage "Evidence from the work" Fortune 500 industrial automation tile opens the AI Idea Governance page. The homepage Global agriculture science tile and project card, and the matching card on the Cloud & Production Engineering page, open the AI Agent Registry page.
- Both open roles (AI Engineer, Full Stack Engineer) are "Remote, US only" (confirmed by Ali, 14 Oct 2026).
- Case study cards (Case Studies page and the related-case cards on service and industry pages) use the homepage "Selected Project Experience" style: a labelled diagram on a grey panel, organisation and industry, heading, short description, 3–4 tags and "Read case study". The diagrams are inline SVG inside each card, so there are no thumbnail image files. They move gently (travelling dots on connectors, pulsing status dots, rising and falling bars, a scan line over documents) and hold still for visitors whose device is set to reduce motion.
- Client and experience logos (homepage, About, Services) are grey until the cursor is on them, then show their brand colours; on phones a tap does the same.
- `CASE-STUDY-DESIGN-GUIDE.md` explains how future case study pages should be built.
- Every page carries a small script with id `pi-top` that scrolls to the top (or to the `#hash`) when a page is opened from a link. It exists only because these are separate static files. Next.js navigation already does this, so don't port it.
- The homepage `<title>` is "Paramount Intelligence Website" only because of the preview. Use proper page titles in the app.
- Service pages show these related case cards: AI & Technology Consulting 05, 30; AI & Agentic Engineering 07, 12, 04; Software & Product Engineering 01, 06, 27, 26; Data Engineering & Intelligence 03, 40, 14, 17; Cloud & Production Engineering 08, 23, 12; Workflow Automation 07, 28, 48.
- Client names are not shown anywhere on the site (Ali, 20 Oct 2026): case study pages, cards and screenshots describe each client by type (for example "PE-backed DevOps software company"). Screenshots have client logos and names blurred. Only the logo strip on the homepage, About and Services names organisations.
