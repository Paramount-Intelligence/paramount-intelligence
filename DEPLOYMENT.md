# Deployment Guide

## Environment Variables

### Development (.env)
```
DATABASE_URL="postgresql://postgres:7747@localhost:5432/paramount_intelligence?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3001"

# SMTP for job application email workflow
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM_EMAIL="careers@paramountintelligence.co"
CAREERS_EMAIL="careers@paramountintelligence.co"

# Airtable for job application record persistence
AIRTABLE_PERSONAL_ACCESS_TOKEN="pat_your_new_token"
AIRTABLE_BASE_ID="appXXXXXXXXXXXXXX"
AIRTABLE_TABLE_NAME="Job Applications"
```

### Production (.env.production)
```
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_API_URL="https://your-api-domain.com"

# SMTP for job application email workflow
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM_EMAIL="careers@paramountintelligence.co"
CAREERS_EMAIL="careers@paramountintelligence.co"

# Airtable for job application record persistence
AIRTABLE_PERSONAL_ACCESS_TOKEN="pat_your_new_token"
AIRTABLE_BASE_ID="appXXXXXXXXXXXXXX"
AIRTABLE_TABLE_NAME="Job Applications"
```

## Deployment Options

### Option 1: Deploy Both Services Together (Recommended for VPS/EC2)

1. **Deploy to a VPS (DigitalOcean, AWS EC2, etc.)**
   - Install Node.js and PostgreSQL on the server
   - Set production environment variables
   - Run both services:
     ```bash
     npm run dev:all
     # or in production mode:
     npm run build && npm start & node db-server.js
     ```

2. **Use a process manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "nextjs" -- start
   pm2 start db-server.js --name "db-api"
   ```

### Option 2: Deploy Separately (Recommended for Scale)

1. **Deploy Next.js Frontend to Vercel**
   - Push code to GitHub
   - Connect to Vercel
   - Set environment variable: `NEXT_PUBLIC_API_URL=https://your-api.com`

2. **Deploy Database API to Railway/Heroku/Render**
   - Deploy `db-server.js` separately
   - Connect to hosted PostgreSQL (Railway/Supabase/AWS RDS)
   - Set `DATABASE_URL` environment variable

### Option 3: Serverless (Alternative)

Replace the Express server with Vercel Serverless Functions:
- Move db-server.js logic to `/api` routes (would need to handle Prisma differently)
- Use Vercel's PostgreSQL or connect to Supabase

## Production Checklist

- [ ] Update `NEXT_PUBLIC_API_URL` in production environment
- [ ] Update `DATABASE_URL` to production database
- [ ] Enable CORS in production (update db-server.js if needed)
- [ ] Set up SSL/HTTPS for API server
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Set up monitoring/logging
