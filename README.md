# v37 port: verification evidence

Evidence for the v37 pull requests into `uat`. This branch holds screenshots only and is not meant to be merged.

## `qa-report.txt`
The output of the handoff's `qa/check-pages.mjs`, run unmodified against the complete local build (all v37 PRs). Result: **All pages passed**, 104 of 104 page views (52 routes, at 1440px and 390px).

The local server had a small proxy in front of it. It answered `/_vercel/insights/*`, which Vercel serves in production and `next start` does not. Every other request passed through unchanged.

## `1440/*.jpg`, `390/*.jpg`
Side-by-side screenshots: the approved `artifact-v37-html` page on the left, the app on the right, with the background forms on.
- They cover the 14 updated pages and the telecom case study.
- They were taken with reduced motion, so the forms are still.
- The forms' fine detail is random on every load, on both sides.
- 1440px images are scaled to 50%.

## Pixel comparison, all 52 pages
Full-page screenshots of the app, compared pixel by pixel with the artifact. They were taken with reduced motion, animations off and the background script blocked on both sides, so they compare the page itself.
- **70 of 104 page views are identical.**
- **Case studies:** the small differences are each page's own live demo, such as a random heatmap, a step-through run, a chat's scroll position or a clock.
- **Cloud page:** the hero's live chart draws random data on every load. The artifact also differs from itself there.
- **Legacy industry and AI Studio pages:** the differences are the logo marquee's position and image resampling, which were there before v37.

| Page | 1440px | 390px |
|---|---|---|
| `/` | identical | identical |
| `/about-us` | identical | identical |
| `/careers/apply-now` | identical | identical |
| `/careers/life-at-pi` | identical | identical |
| `/careers/open-positions` | identical | identical |
| `/careers/open-positions/ai-engineer` | identical | identical |
| `/careers/open-positions/expression-of-interest` | identical | identical |
| `/careers/open-positions/full-stack-engineer` | identical | identical |
| `/case-studies` | identical | identical |
| `/case-studies/ai-agent-governance-discovery-platform-on-aws-agentcore` | 0.066% | identical |
| `/case-studies/ai-agents-for-talent-matching-and-automated-talent-project-mapping` | identical | identical |
| `/case-studies/ai-enablement-and-workflow-automation-for-staffing-and-consultancy-firm` | identical | identical |
| `/case-studies/ai-idea-intake-and-governance` | identical | identical |
| `/case-studies/ai-infrastructure-for-a-multi-model-chatbot-platform-serving-80m-telecom-users` | 0.016% | 0.026% |
| `/case-studies/ai-powered-contract-intelligence-platform-for-global-life-sciences-enterprise` | 0.069% | 0.134% |
| `/case-studies/ai-powered-enterprise-video-generation-platform-on-oracle-cloud` | identical | identical |
| `/case-studies/ai-powered-investor-email-processing-and-crm-data-structuring` | identical | identical |
| `/case-studies/ai-powered-support-copilot-for-pe-backed-enterprise-devops-platform` | identical | identical |
| `/case-studies/ai-systems-for-contract-document-ingestion-and-risk-analysis` | identical | identical |
| `/case-studies/automated-email-response-and-ticket-handling-system-for-zero-touch-customer-support` | identical | identical |
| `/case-studies/field-submission-intelligence` | identical | identical |
| `/case-studies/full-stack-edtech-operating-system` | identical | identical |
| `/case-studies/implementation-execution-portal` | 0.001% | 0.002% |
| `/case-studies/in-app-ai-assistant-for-telco-customer-self-care` | 0.065% | identical |
| `/case-studies/multi-agent-shopping-intelligence-on-aws-bedrock-agentcore` | 0.151% | 0.182% |
| `/case-studies/multimodal-rag-co-pilot-advisory-for-industrial-automation-engineering` | identical | identical |
| `/case-studies/pricing-intelligence-and-recommendation-engine` | identical | identical |
| `/case-studies/real-time-platform-intelligence-ecosystem-monitoring` | 0.013% | 0.044% |
| `/case-studies/sow-generation-and-update-automation` | 0.015% | 0.053% |
| `/contact-us` | identical | identical |
| `/faq` | identical | identical |
| `/for-candidates` | identical | identical |
| `/industries` | identical | identical |
| `/industries/b2b-enterprise-solutions` | 0.132% | 0.136% |
| `/industries/digital-lifestyle-and-entertainment` | 0.14% | 0.146% |
| `/industries/digital-natives` | identical | identical |
| `/industries/e-commerce-and-marketplaces` | 0.141% | 0.145% |
| `/industries/fintech-and-digital-payments` | 0.192% | 0.198% |
| `/industries/manufacturing-industrial-and-energy` | 0.14% | 0.145% |
| `/industries/mobility-ride-hailing-and-delivery` | 0.141% | 0.147% |
| `/industries/private-equity` | identical | identical |
| `/industries/technology-and-enterprise-software` | 0.14% | 0.14% |
| `/industries/telecommunications` | 0.175% | 0.193% |
| `/privacy-policy` | identical | identical |
| `/services` | identical | identical |
| `/services/ai-solutions-and-engineering` | identical | identical |
| `/services/ai-strategy-and-consulting` | identical | identical |
| `/services/ai-studio-and-platform-engineering` | 0.011% | 0.002% |
| `/services/ai-workflow-automation` | identical | identical |
| `/services/cloud-services` | 0.016% | 0.024% |
| `/services/data-and-analytics` | identical | identical |
| `/services/software-product-engineering` | identical | identical |
