-- Hide the 31 cards taken off the website at Ali's request (20 Oct 2026; lib/removed-case-studies.ts).
-- They stay in the table, so /admin still shows them (as hidden). Nothing else changes.
UPDATE "CaseCard" SET "published" = false, "updatedAt" = CURRENT_TIMESTAMP
WHERE "number" IN ('02', '03', '09', '10', '11', '13', '14', '15', '16', '17', '18', '20', '21', '24', '27', '29', '30', '31', '34', '35', '36', '37', '38', '39', '41', '42', '43', '44', '45', '46', '47');
