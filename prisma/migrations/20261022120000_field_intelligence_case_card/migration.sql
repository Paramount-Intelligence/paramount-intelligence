-- Card 47 opens its new full case study page, AI Field Intelligence (Ali, 22 Oct 2026): new title, summary,
-- organisation and search text, the page's route, the "Full case study" tab, and back on the website.
-- Only card 47 changes; its industry, tags, drawing, position and "Work in progress" tab stay as they are.
UPDATE "CaseCard" SET
  "title" = 'Field submissions turned into answers managers can trust',
  "summary" = 'AI summaries turn technician form submissions into grounded daily and per-submission summaries for field-service managers.',
  "org" = 'PE-backed field service platform',
  "searchText" = 'Field submissions turned into answers managers can trust AI summaries turn technician form submissions into grounded daily and per-submission summaries for field-service managers. PE-backed field service platform Field-service software Field AI',
  "slug" = 'field-submission-intelligence',
  "fullCaseStudy" = true,
  "published" = true,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "number" = '47';
