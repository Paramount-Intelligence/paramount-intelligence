# Admin Portal - Case Studies Management

## Overview
The admin portal allows you to manage case studies through a web interface. All case studies are stored in a PostgreSQL database and can be created, edited, or deleted through the admin dashboard.

## Access
Navigate to: `http://localhost:3000/admin`

## Features

### View All Case Studies
- See a list of all case studies in a table format
- View title, subtitle, industry, business function, and creation date
- Sorted by most recent first

### Add New Case Study
1. Click the "Add Case Study" button
2. Fill in all required fields:
   - **Basic Information**: Title, Slug, Subtitle, Industry, Business Function, Image URLs, Description
   - **Client Information**: Client Name, Industry, Market, Technology
   - **In a Nutshell**: Challenge, Solution, Benefits
3. The slug is auto-generated from the title
4. Click "Create" to save

### Edit Existing Case Study
1. Click the edit icon (pencil) next to any case study
2. Modify the fields as needed
3. Click "Update" to save changes

### Delete Case Study
1. Click the delete icon (trash) next to any case study
2. Confirm the deletion
3. Case study will be permanently removed

## Database Structure

The case studies are stored in PostgreSQL with the following fields:
- `id` - Unique identifier
- `slug` - URL-friendly identifier
- `title` - Case study title
- `subtitle` - Brief description
- `image` - Grid/thumbnail image path
- `heroImage` - Detail page hero image path
- `industry` - Industry classification
- `businessFunction` - Business function category
- `description` - Full description
- `clientName`, `clientIndustry`, `clientMarket`, `clientTechnology` - Client details
- `challenge`, `solution`, `benefits` - Nutshell content
- `createdAt`, `updatedAt` - Timestamps

## API Endpoints

### GET /api/admin/case-studies
Fetches all case studies

### POST /api/admin/case-studies
Creates a new case study
```json
{
  "slug": "example-slug",
  "title": "Example Title",
  "subtitle": "Example Subtitle",
  ...
}
```

### GET /api/admin/case-studies/[id]
Fetches a single case study by ID

### PUT /api/admin/case-studies/[id]
Updates an existing case study

### DELETE /api/admin/case-studies/[id]
Deletes a case study

## Seeding Data

To reset and re-seed the database with the original 22 case studies:

```bash
npx prisma db seed
```

## Database Migrations

To create a new migration after schema changes:

```bash
npx prisma migrate dev --name migration_name
```

## Important Notes

1. **Image Paths**: Images should be uploaded to `/public/images/case-studies/` and referenced with paths like `/images/case-studies/1-l.png`

2. **Slugs**: Must be unique and URL-friendly (lowercase, hyphens, no special characters)

3. **Industry Filters**: The case studies page uses partial string matching for industries, so "Ride-hailing, Mobility" will match both "Ride-hailing" and "Mobility" filters

4. **Pagination**: The public case studies page displays 9 items per page

## Troubleshooting

### Database Connection Issues
Check your `.env` file for correct DATABASE_URL

### Prisma Client Not Found
Run: `npx prisma generate`

### Seed Script Fails
Make sure `tsx` is installed: `npm install -D tsx`
