# Paramount Intelligence

[![Website](https://img.shields.io/badge/Website-paramountintelligence.co-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.paramountintelligence.co/)
[![Technology](https://img.shields.io/badge/Stack-Next.js%20%7C%20React%20%7C%20PostgreSQL%20%7C%20Prisma-blueviolet?style=for-the-badge)](https://nextjs.org/)

Paramount Intelligence is a premier global technology consulting and engineering partner. We help organizations translate high-level strategic ambitions into secure, scalable, and production-ready technical realities. By integrating AI strategy, machine learning, cloud infrastructure, and data analytics directly into mission-critical operations, we deliver measurable business impact.

---

## 🌟 Vision & Value Proposition

> [!IMPORTANT]
> *"True transformation happens when technology stops being a project and starts being the engine of your business."*
> — **Syed Ali Azzam**, CEO & Founding Partner

We support startups, mid-market organizations, and global enterprises at every stage of their technology journey. Our global engineering teams design, build, and operationalize intelligent systems, turning complex business pain points into durable capabilities.

---

## ⚙️ Core Services

### 🧠 1. AI Solutions & Engineering
Developing bespoke artificial intelligence applications, deep learning architectures, and large language model (LLM) agents tailored to optimize complex business workflows.

### 💼 2. AI Strategy & Consulting
Providing independent advisory combined with hands-on technical execution to help leadership teams prioritize, sequence, and evaluate AI investments with clear ROI metrics.

### 🏗️ 3. AI Studio & Platform Engineering
Designing robust LLMOps pipelines, model evaluation sandboxes, and secure cloud environments to build, deploy, and scale multi-model AI architectures safely.

### ⚡ 4. AI Workflow Automation
Eliminating operational friction, legacy overhead, and manual workarounds by automating data routing, ticket resolution, and system integrations with zero-touch automation.

### ☁️ 5. Cloud Services & Modernization
Designing modern cloud-native architectures (AWS, OCI, Azure) featuring high availability, enterprise-grade security, and automated continuous deployment (CI/CD) pipelines.

### 📊 6. Data & Analytics Platforms
Building low-latency data pipelines, real-time analytics engines, and business intelligence dashboards that convert unstructured data silos into actionable insights.

---

## 🏢 Industries We Serve

*   **Fintech & Digital Payments**: Building credit risk models, transaction fraud detection, and virtual financial assistants.
*   **Mobility, Ride-Hailing, & Delivery**: Optimizing demand forecasting, location-based fraud prevention, and real-time operations dashboards.
*   **E-Commerce & Marketplaces**: Delivering advanced conversion rate optimization (CRO), shopping assistants, and catalog management.
*   **Industrial Manufacturing & Energy**: Deploying pricing recommendation engines and multimodal RAG co-pilots for automation engineering.
*   **Telecommunications**: Powering multi-model chatbot platforms serving 80M+ users and churn prediction models.
*   **Healthcare Technology**: Architecting multi-agent backend systems for insurance navigation and ML-powered pharmacy catalog automation.
*   **Professional Services & Corporate Law**: Automating document ingestion, risk analysis, and contract intelligence platforms.
*   **Real Estate & Rentals**: Engineering investment analytics engines and property listing optimization tools.

---

## 📁 Case Studies & Engagements

The Paramount Intelligence database tracks high-impact client engagements across industries:

| Engagement Name | Industry | Focus Area / Function |
| :--- | :--- | :--- |
| **Multi-Model Telecom Chatbot Platform** | Telecommunications | AI Infrastructure for 80M+ Users, LLMOps |
| **Contract Document Ingestion & Risk Analysis** | Fintech & Digital Finance | Legal Review, Document Analysis, Risk Estimation |
| **APAC Pharmacy Catalog Automation** | Healthcare Technology | ML-powered Product Discovery, Catalog Ingest |
| **RFM-Based Marketing Optimization** | Ride-Hailing & Mobility | Customer Segmentation, Promotional Strategy |
| **Credit Risk & Alternative Reliability Index** | Telecommunications & Finance | Credit Scoring, Financial Inclusion, Lending |
| **AI Hiring & Candidate Assessment** | Professional Services | Talent Lifecycle Automation, HR Operations |
| **Shopping Intelligence Platform** | E-Commerce & Retail | Multi-Agent workflows on AWS Bedrock |
| **Short Term Rental Investment Engine** | Real Estate Analytics | Listing Optimization, Short Term Booking Strategy |
| **Multimodal RAG Co-Pilot for Automation** | Industrial Manufacturing | Knowledge Base Indexing, Industrial Engineering |
| **Enterprise Support Copilot** | DevOps & Productivity Software | DevOps Support, Automated Ticket Triage |

---

## 🛠️ Technology Stack & Architecture

This repository contains the Next.js frontend code and admin management console for the Paramount Intelligence official website.

*   **Framework**: Next.js (App Router with TypeScript)
*   **Styling**: Vanilla CSS, Tailwind CSS (admin module context)
*   **Icons**: Lucide Icons
*   **Database**: PostgreSQL
*   **ORM**: Prisma Client
*   **Libraries**: dotenv, webpack custom plugins

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.x or newer)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🔧 Environment Setup
Copy `.env.example` to `.env.local` and fill in the values (never commit real values). On Vercel, set the same names under Project → Settings → Environment Variables for each environment that needs them (Production, and Preview for UAT deployments), then redeploy. `.env.example` lists every variable the app reads; the main ones:

```env
# Database Connection String for Local / Core website database
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
DIRECT_URL="postgresql://user:password@host:port/database?schema=public"

# Database Connection String for PIMS (Paramount Intelligence Monitoring System)
PIMS_DATABASE_URL="postgresql://user:password@host:port/pims_database"
```

#### ✉️ Mail for the contact and careers forms
Both forms send through one SMTP account (`lib/mailer.ts`):

| Variable | Used for |
|---|---|
| `SMTP_HOST` | Mail server, for example `smtp.gmail.com`. Required. |
| `SMTP_PORT` | `465` (TLS) or `587` (STARTTLS). Default `587`. |
| `SMTP_SECURE` | `true` for port 465, `false` for 587. If unset, `true` only on port 465. |
| `SMTP_USER` | Login, usually the full email address. Required. |
| `SMTP_PASSWORD` | Password. For Gmail, an app password (Google Account → Security → App passwords), not the account password. Required. |
| `SMTP_FROM_EMAIL` | Sender address. If unset, `SMTP_USER`. With Gmail it must be `SMTP_USER` or one of its "Send mail as" aliases. |
| `CONTACT_EMAIL` | Inbox for Contact Us enquiries. If unset, `CAREERS_EMAIL`. |
| `CAREERS_EMAIL` | Inbox for careers submissions, and for contact enquiries when `CONTACT_EMAIL` is unset. Required. |

The careers form also uploads the résumé to Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) and saves the applicant in Airtable (`AIRTABLE_PERSONAL_ACCESS_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`).

To test the mail login without sending anything:
```bash
npm run smtp:check
```
It reads the settings from the environment (or `.env.local` / `.env`) and prints `SMTP login OK`, or `SMTP login failed:` with the error code and message. It never prints the password. If a form fails on Vercel, search the Vercel logs for `send-contact-email` or `send-application-email`: a missing setting is named there.

### 💻 Development Server
First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### 🏗️ Build & Production Deployment
To generate a production-ready optimized build:
```bash
npm run build
```

---

## 🛡️ Administrative Console & PIMS
The Admin Console is secure and restricted. It allows team leads and partners to:
1. Manage **Case Studies** displayed on the website.
2. Monitor employee activity and role distributions fetched dynamically from the **PIMS Database**.
3. Identify inactive employees using the **Inactive (3+ Days)** tab, tracking actual check-in timestamps from attendance logs.
