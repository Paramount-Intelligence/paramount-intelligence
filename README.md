This is the Paramount Intelligence website built with [Next.js](https://nextjs.org).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Setup

Create `.env.local` in the project root and add the following values:

```bash
# SMTP (job application emails)
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM_EMAIL="careers@paramountintelligence.co"
CAREERS_EMAIL="careers@paramountintelligence.co"

# Airtable (job application storage)
AIRTABLE_PERSONAL_ACCESS_TOKEN="pat_your_new_token"
AIRTABLE_BASE_ID="appXXXXXXXXXXXXXX"
AIRTABLE_TABLE_NAME="Job Applications"
```

Notes:
- Airtable API keys are deprecated. Use a Personal Access Token (PAT) with permission to create records in your target base/table.
- Keep tokens and SMTP credentials server-side only. Do not expose them in `NEXT_PUBLIC_*` variables.

## Test Job Application API

Once `npm run dev` is running, test the endpoint with a single command.

PowerShell (`Invoke-RestMethod`):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/send-application-email" -Method Post -ContentType "application/json" -Body '{"firstName":"Test","lastName":"Applicant","email":"test@example.com","phone":"03123456789","position":"AI Research Intern","experience":"0-1 years","linkedIn":"https://linkedin.com/in/test","portfolio":"https://github.com/test","coverLetter":"This is a test submission from local setup."}'
```

`curl` (JSON payload):

```bash
curl -X POST "http://localhost:3000/api/send-application-email" \
	-H "Content-Type: application/json" \
	-d '{"firstName":"Test","lastName":"Applicant","email":"test@example.com","phone":"03123456789","position":"AI Research Intern","experience":"0-1 years","linkedIn":"https://linkedin.com/in/test","portfolio":"https://github.com/test","coverLetter":"This is a test submission from local setup."}'
```

Expected result:
- Response contains `success: true`.
- A new record is created in Airtable.
- Notification email is sent to `CAREERS_EMAIL`.
- Confirmation email is sent to the applicant email.

## Deployment

See `DEPLOYMENT.md` and `VERCEL_DEPLOYMENT.md` for production setup instructions.
